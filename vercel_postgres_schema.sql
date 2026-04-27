-- PostgreSQL schema for Vercel Postgres

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Delete types if they exist so this script can be re-run
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE teacher_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE student_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students Table (extends Users)
CREATE TABLE IF NOT EXISTS Students (
    user_id UUID PRIMARY KEY REFERENCES Users(id) ON DELETE CASCADE,
    age INTEGER,
    country VARCHAR(100),
    course VARCHAR(100),
    assigned_teacher UUID REFERENCES Users(id) ON DELETE SET NULL,
    whatsapp VARCHAR(50),
    status student_status DEFAULT 'pending'
);

-- Teachers Table (extends Users)
CREATE TABLE IF NOT EXISTS Teachers (
    user_id UUID PRIMARY KEY REFERENCES Users(id) ON DELETE CASCADE,
    experience INTEGER,
    qualification VARCHAR(255),
    specialization VARCHAR(100),
    profile_photo TEXT,
    available_days VARCHAR(100),
    start_time TIME,
    end_time TIME,
    timezone VARCHAR(50),
    status teacher_status DEFAULT 'pending'
);

-- Courses Table
CREATE TABLE IF NOT EXISTS Courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    level VARCHAR(50)
);

-- Trial Bookings Table
CREATE TABLE IF NOT EXISTS TrialBookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    whatsapp VARCHAR(50),
    course VARCHAR(100),
    teacher VARCHAR(255),
    preferred_time VARCHAR(255),
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Migration: Add status column if it doesn't already exist (for existing databases)
DO $$ BEGIN
    ALTER TABLE TrialBookings ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'new';
EXCEPTION WHEN others THEN null;
END $$;

-- ============================================================
-- PHASE 1 EXPANSION: Subscriptions, Scheduling, Attendance
-- ============================================================

-- Subscription plan enum
DO $$ BEGIN
    CREATE TYPE subscription_plan AS ENUM ('noor', 'tajweed', 'hifz');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Subscription status enum
DO $$ BEGIN
    CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired', 'trial');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Attendance status enum
DO $$ BEGIN
    CREATE TYPE attendance_status AS ENUM ('completed', 'student_absent', 'teacher_absent', 'cancelled', 'rescheduled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Subscriptions Table
-- Tracks which pricing plan each student is on and their billing cycle
-- One active subscription per student at a time (enforced by UNIQUE on student_id)
CREATE TABLE IF NOT EXISTS Subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL UNIQUE REFERENCES Users(id) ON DELETE CASCADE,
    plan subscription_plan NOT NULL,
    -- Plan details (stored for historical accuracy even if pricing changes)
    price_usd NUMERIC(10, 2) NOT NULL,          -- e.g. 35.00, 49.00, 75.00
    classes_per_month INTEGER NOT NULL,          -- e.g. 8, 12, 20
    classes_per_week INTEGER NOT NULL,           -- e.g. 2, 3, 5
    status subscription_status DEFAULT 'active',
    -- Stripe integration fields (populated after payment gateway added)
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    -- Billing cycle
    current_period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scheduled Sessions Table
-- Defines the RECURRING class schedule for a student-teacher pair
-- e.g., "Every Monday & Wednesday at 4:00 PM UTC"
CREATE TABLE IF NOT EXISTS ScheduledSessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES Subscriptions(id) ON DELETE SET NULL,
    -- Recurrence: comma-separated days e.g. 'Mon,Wed' or 'Mon,Tue,Wed,Thu,Fri'
    days_of_week VARCHAR(50) NOT NULL,
    -- Time stored in UTC; frontend converts to user's local timezone
    class_time TIME NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    timezone VARCHAR(50) DEFAULT 'UTC',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance Table
-- Teacher marks each individual class session after it concludes
CREATE TABLE IF NOT EXISTS Attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES ScheduledSessions(id) ON DELETE SET NULL,
    student_id UUID NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    -- The specific date this class was held (not just the recurring day)
    class_date DATE NOT NULL,
    class_time TIME NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    status attendance_status NOT NULL DEFAULT 'completed',
    -- Optional notes by teacher (e.g. "Student made great progress on Surah Al-Fatiha")
    notes TEXT,
    -- Jitsi room name for this session (for audit trail)
    jitsi_room VARCHAR(255),
    marked_by UUID REFERENCES Users(id) ON DELETE SET NULL,
    marked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teacher Payouts Table
-- Admin generates monthly payout reports. Amount based on completed attendance records.
-- Payout rate: Teacher earns a flat $10/class completed (configurable).
CREATE TABLE IF NOT EXISTS TeacherPayouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    -- Month this payout covers, stored as first day of month e.g. '2026-04-01'
    payout_month DATE NOT NULL,
    total_classes_completed INTEGER DEFAULT 0,
    rate_per_class_usd NUMERIC(10, 2) DEFAULT 10.00,
    total_amount_usd NUMERIC(10, 2) DEFAULT 0.00,
    -- Admin approval workflow
    status VARCHAR(50) DEFAULT 'pending',        -- pending | approved | paid
    payment_method VARCHAR(100),                 -- e.g. 'bank_transfer', 'paypal', 'jazzcash'
    payment_reference VARCHAR(255),
    paid_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(teacher_id, payout_month)
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_attendance_teacher_date ON Attendance(teacher_id, class_date);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON Attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_scheduled_sessions_teacher ON ScheduledSessions(teacher_id, is_active);
CREATE INDEX IF NOT EXISTS idx_scheduled_sessions_student ON ScheduledSessions(student_id, is_active);
CREATE INDEX IF NOT EXISTS idx_subscriptions_student ON Subscriptions(student_id, status);
CREATE INDEX IF NOT EXISTS idx_payouts_teacher_month ON TeacherPayouts(teacher_id, payout_month);
