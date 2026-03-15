import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any)?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        // Fetch users with their profiles to get the status
        const { rows: teachers } = await sql`
            SELECT u.id, u.name, u.email, u.role, t.status, t.specialization, t.qualification
            FROM Users u
            JOIN Teachers t ON u.id = t.user_id
        `;

        const { rows: students } = await sql`
            SELECT u.id, u.name, u.email, u.role, s.status, s.course, s.age, s.country, s.assigned_teacher
            FROM Users u
            JOIN Students s ON u.id = s.user_id
        `;

        return NextResponse.json({ 
            users: [...teachers, ...students] 
        });
    } catch (error: any) {
        console.error("Error fetching admin users:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
