import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = session.user.email.toLowerCase();

        // Join Users and Students to get full profile
        const { rows } = await sql`
            SELECT 
                u.id, u.name, u.email, u.role,
                s.status, s.course, s.age, s.country, s.whatsapp, s.assigned_teacher,
                tu.name as teacher_name
            FROM Users u
            JOIN Students s ON u.id = s.user_id
            LEFT JOIN Users tu ON s.assigned_teacher = tu.id
            WHERE LOWER(u.email) = ${email}
            LIMIT 1
        `;

        if (rows.length === 0) {
            return NextResponse.json({ error: "Student profile not found" }, { status: 404 });
        }

        return NextResponse.json({ student: rows[0] });
    } catch (error: any) {
        console.error("Error fetching student profile:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
