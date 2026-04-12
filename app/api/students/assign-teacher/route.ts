import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any)?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized. Admin privileges required.' }, { status: 403 });
        }

        const body = await req.json();
        const { student_id, teacher_id } = body;

        if (!student_id) {
            return NextResponse.json({ error: 'Missing student_id' }, { status: 400 });
        }

        // Update the Student record with the assigned teacher's user_id
        await sql`
            UPDATE Students 
            SET assigned_teacher = ${teacher_id || null} 
            WHERE user_id = ${student_id}
        `;

        return NextResponse.json(
            { message: `Teacher assignment updated successfully.` },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Assign Teacher Exception:", error);
        return NextResponse.json(
            { error: error.message || 'Internal server error processing assignment' },
            { status: 500 }
        );
    }
}
