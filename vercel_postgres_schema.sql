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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
