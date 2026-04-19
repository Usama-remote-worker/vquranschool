import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'teacher') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const teacherId = session.user.id;

        // Fetch schedules for students assigned to this teacher
        const { rows: schedule } = await sql`
            SELECT cs.*, u.name as student_name
            FROM ClassSchedules cs
            JOIN Students s ON cs.student_id = s.user_id
            JOIN Users u ON s.user_id = u.id
            WHERE s.assigned_teacher = ${teacherId}
            ORDER BY cs.day_of_week ASC, cs.start_time ASC
        `;

        return NextResponse.json({ schedule });
    } catch (error) {
        console.error("Error fetching teacher schedule:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
