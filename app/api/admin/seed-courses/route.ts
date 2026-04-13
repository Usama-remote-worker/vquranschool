import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
    try {
        // 1. Create table if not exists
        await sql`
            CREATE TABLE IF NOT EXISTS Courses (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                title TEXT UNIQUE NOT NULL,
                description TEXT,
                level TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;

        const courses = [
            {
                title: "Noorani Qaida",
                description: "The foundational course for beginners to learn Arabic alphabets and basic punctuation.",
                level: "Beginner"
            },
            {
                title: "Basic Tajweed",
                description: "Learn the essential rules of Tajweed for correct and beautiful Quran recitation.",
                level: "Beginner"
            },
            {
                title: "Quran Memorization (Hifz)",
                description: "Dedicated guidance for students looking to memorize the Holy Quran (partially or fully).",
                level: "Advanced"
            },
            {
                title: "Quran Translation (Tafseer)",
                description: "Deep dive into the meanings, context, and applications of Quranic verses.",
                level: "Advanced"
            },
            {
                title: "Islamic Studies for Kids",
                description: "Basic Fiqh, Hadith, Duas, and Islamic manners tailored for young learners.",
                level: "Beginner"
            },
            {
                title: "Arabic Language",
                description: "Learn to speak and understand the Arabic language for better Quran comprehension.",
                level: "Intermediate"
            }
        ];

        // 2. Insert courses (ignoring duplicates)
        for (const course of courses) {
            await sql`
                INSERT INTO Courses (title, description, level)
                VALUES (${course.title}, ${course.description}, ${course.level})
                ON CONFLICT (title) DO NOTHING;
            `;
        }

        return NextResponse.json({ 
            success: true, 
            message: "✅ Database seeded with 6 courses successfully!" 
        });
    } catch (error: any) {
        console.error('Seed error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
