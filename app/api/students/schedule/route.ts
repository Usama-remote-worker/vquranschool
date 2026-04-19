import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !(session.user as any)?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const studentId = (session.user as any).id;

        // Fetch the student's schedule
        const { rows: schedule } = await sql`
            SELECT * FROM ClassSchedules 
            WHERE student_id = ${studentId}
            ORDER BY day_of_week ASC, start_time ASC
        `;

        // Fetch student's plan frequency
        const { rows: studentInfo } = await sql`
            SELECT plan_frequency FROM Students WHERE user_id = ${studentId}
        `;

        return NextResponse.json({
            schedule,
            planFrequency: studentInfo[0]?.plan_frequency || "Not set"
        });
    } catch (error: any) {
        console.error("Error fetching schedule:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
