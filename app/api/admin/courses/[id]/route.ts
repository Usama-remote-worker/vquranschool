import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// PUT - Update a course
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any)?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { id } = await params;
        const body = await req.json();
        const { title, description, level } = body;

        if (!title || !level) {
            return NextResponse.json({ error: 'Title and level are required.' }, { status: 400 });
        }

        const { rows } = await sql`
            UPDATE Courses
            SET title = ${title}, description = ${description || null}, level = ${level}
            WHERE id = ${id}
            RETURNING id, title, description, level
        `;

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
        }

        return NextResponse.json({ course: rows[0] });
    } catch (error: any) {
        console.error('Error updating course:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// DELETE - Remove a course
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any)?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { id } = await params;

        const { rowCount } = await sql`
            DELETE FROM Courses WHERE id = ${id}
        `;

        if (rowCount === 0) {
            return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Course deleted successfully.' });
    } catch (error: any) {
        console.error('Error deleting course:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
