import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET - Fetch all courses with student/teacher counts
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any)?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { rows: courses } = await sql`
            SELECT
                c.id,
                c.title,
                c.description,
                c.level,
                COUNT(DISTINCT s.user_id) AS student_count,
                COUNT(DISTINCT t.user_id) AS teacher_count
            FROM Courses c
            LEFT JOIN Students s ON s.course = c.title AND s.status = 'approved'
            LEFT JOIN Teachers t ON t.specialization = c.title AND t.status = 'approved'
            GROUP BY c.id, c.title, c.description, c.level
            ORDER BY c.title ASC
        `;

        return NextResponse.json({ courses });
    } catch (error: any) {
        console.error('Error fetching courses:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// POST - Create a new course
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any)?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const body = await req.json();
        const { title, description, level } = body;

        if (!title || !level) {
            return NextResponse.json({ error: 'Title and level are required.' }, { status: 400 });
        }

        const { rows } = await sql`
            INSERT INTO Courses (title, description, level)
            VALUES (${title}, ${description || null}, ${level})
            RETURNING id, title, description, level
        `;

        return NextResponse.json({ course: rows[0] }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating course:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
