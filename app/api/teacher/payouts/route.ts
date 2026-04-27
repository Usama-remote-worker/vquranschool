import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sql } from "@vercel/postgres";

// GET /api/teacher/payouts?month=2026-04
// Teachers see their own monthly earnings summary
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user || !["teacher", "admin"].includes(session.user.role as string)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month") || new Date().toISOString().slice(0, 7);

    const teacherId = session.user.role === "admin"
        ? (searchParams.get("teacher_id") || session.user.id)
        : session.user.id;

    try {
        // Aggregate completed classes for the month
        const { rows: summary } = await sql`
            SELECT
                COUNT(*) FILTER (WHERE status = 'completed') AS completed_classes,
                COUNT(*) FILTER (WHERE status = 'student_absent') AS student_absences,
                COUNT(*) FILTER (WHERE status = 'teacher_absent') AS teacher_absences,
                COUNT(*) AS total_sessions
            FROM Attendance
            WHERE teacher_id = ${teacherId}
            AND TO_CHAR(class_date, 'YYYY-MM') = ${month}
        `;

        const completedClasses = parseInt(summary[0]?.completed_classes || "0");
        const ratePerClass = 10.00; // $10 per class — configurable or pulled from DB

        // Get or create the payout record
        const { rows: existing } = await sql`
            SELECT * FROM TeacherPayouts
            WHERE teacher_id = ${teacherId}
            AND TO_CHAR(payout_month, 'YYYY-MM') = ${month}
            LIMIT 1
        `;

        const payout = existing[0] || null;

        return NextResponse.json({
            month,
            teacher_id: teacherId,
            completed_classes: completedClasses,
            rate_per_class_usd: ratePerClass,
            estimated_earnings_usd: completedClasses * ratePerClass,
            payout_status: payout?.status || "not_generated",
            payout_record: payout,
            attendance_summary: summary[0],
        });
    } catch (error) {
        console.error("Payouts GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
