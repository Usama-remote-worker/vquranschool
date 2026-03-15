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
        const { student_id, action } = body;

        if (!student_id) {
            return NextResponse.json({ error: 'Missing student_id parameter' }, { status: 400 });
        }
        if (!['approved', 'rejected'].includes(action)) {
            return NextResponse.json({ error: 'Invalid action parameter. Must be "approved" or "rejected"' }, { status: 400 });
        }

        // Update the Student record status using Vercel Postgres
        await sql`
            UPDATE Students 
            SET status = ${action} 
            WHERE user_id = ${student_id}
        `;

        return NextResponse.json(
            { message: `Student has been successfully ${action}.` },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Admin Student Approval Exception:", error);
        return NextResponse.json(
            { error: error.message || 'Internal server error processing student approval' },
            { status: 500 }
        );
    }
}
