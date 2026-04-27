import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { notifyTeacherApproved, notifyTeacherRejected } from '@/lib/whatsapp';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any)?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized. Admin privileges required.' }, { status: 403 });
        }

        const body = await req.json();
        const { teacher_id, action } = body;

        if (!teacher_id) {
            return NextResponse.json({ error: 'Missing teacher_id parameter' }, { status: 400 });
        }
        if (!['approved', 'rejected'].includes(action)) {
            return NextResponse.json({ error: 'Invalid action. Must be "approved" or "rejected"' }, { status: 400 });
        }

        // Get teacher details before updating (for WhatsApp notification)
        const { rows: teacherRows } = await sql`
            SELECT u.name, u.email, t.whatsapp_number
            FROM Users u
            LEFT JOIN Teachers t ON t.user_id = u.id
            WHERE u.id = ${teacher_id}
            LIMIT 1
        `;

        if (!teacherRows[0]) {
            return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
        }

        const teacher = teacherRows[0];

        // Update the Teacher record status
        await sql`
            UPDATE Teachers 
            SET status = ${action} 
            WHERE user_id = ${teacher_id}
        `;

        // ── Send WhatsApp notification ──────────────────────────────────────
        const whatsappNumber = teacher.whatsapp_number || teacher.email;
        
        if (teacher.whatsapp_number) {
            // Clean the number: remove +, spaces, dashes
            const cleanNumber = teacher.whatsapp_number.replace(/[\s\-\+]/g, '');
            
            if (action === 'approved') {
                await notifyTeacherApproved(teacher.name, cleanNumber);
            } else {
                await notifyTeacherRejected(teacher.name, cleanNumber);
            }
        }

        return NextResponse.json(
            { 
                message: `Teacher has been successfully ${action}.`,
                whatsapp_sent: !!teacher.whatsapp_number
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Admin Approval Exception:", error);
        return NextResponse.json(
            { error: error.message || 'Internal server error processing teacher approval' },
            { status: 500 }
        );
    }
}
