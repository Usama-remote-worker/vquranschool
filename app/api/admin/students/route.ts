import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { rows: students } = await sql`
            SELECT u.id, u.name, u.email, s.plan_frequency 
            FROM Users u
            JOIN Students s ON u.id = s.user_id
            WHERE u.role = 'student'
            ORDER BY u.name ASC
        `;

        return NextResponse.json({ students });
    } catch (error) {
        console.error("Error fetching students for admin:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
