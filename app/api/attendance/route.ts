import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sql } from "@vercel/postgres";

// POST /api/attendance — Teacher marks attendance for a class
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "teacher") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
        const body = await req.json();
        const {
            student_id,
            session_id,
            class_date,
            class_time,
            duration_minutes = 30,
            status,
            notes,
            jitsi_room,
        } = body;

        // Validate required fields
        if (!student_id || !class_date || !class_time || !status) {
            return NextResponse.json(
                { error: "Missing required fields: student_id, class_date, class_time, status" },
                { status: 400 }
            );
        }

        // Validate status value
        const validStatuses = ["completed", "student_absent", "teacher_absent", "cancelled", "rescheduled"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
                { status: 400 }
            );
        }

        // Ensure the student is actually assigned to this teacher
        const { rows: studentCheck } = await sql`
            SELECT s.user_id FROM Students s
            WHERE s.user_id = ${student_id}
            AND s.assigned_teacher = ${session.user.id}
            LIMIT 1
        `;

        if (studentCheck.length === 0) {
            return NextResponse.json(
                { error: "This student is not assigned to you." },
                { status: 403 }
            );
        }

        // Insert the attendance record
        const { rows } = await sql`
            INSERT INTO Attendance (
                session_id,
                student_id,
                teacher_id,
                class_date,
                class_time,
                duration_minutes,
                status,
                notes,
                jitsi_room,
                marked_by
            ) VALUES (
                ${session_id || null},
                ${student_id},
                ${session.user.id},
                ${class_date},
                ${class_time},
                ${duration_minutes},
                ${status},
                ${notes || null},
                ${jitsi_room || null},
                ${session.user.id}
            )
            RETURNING *
        `;

        return NextResponse.json({ success: true, attendance: rows[0] }, { status: 201 });
    } catch (error) {
        console.error("Attendance POST error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// GET /api/attendance?teacher_id=...&month=2026-04
// Teachers see their own records; admins can query any teacher
export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month") || new Date().toISOString().slice(0, 7); // "2026-04"
    const studentId = searchParams.get("student_id");

    try {
        // Admin can see anyone; teacher only sees their own
        const teacherId = session.user.role === "admin"
            ? (searchParams.get("teacher_id") || session.user.id)
            : session.user.id;

        // Student viewing their own attendance
        if (session.user.role === "student") {
            const { rows } = await sql`
                SELECT
                    a.*,
                    u.name AS teacher_name
                FROM Attendance a
                JOIN Users u ON u.id = a.teacher_id
                WHERE a.student_id = ${session.user.id}
                AND TO_CHAR(a.class_date, 'YYYY-MM') = ${month}
                ORDER BY a.class_date DESC, a.class_time DESC
            `;
            return NextResponse.json({ attendance: rows });
        }

        // Teacher or Admin viewing attendance records
        let query;
        if (studentId) {
            // Filter by specific student
            const { rows } = await sql`
                SELECT
                    a.*,
                    u.name AS student_name,
                    u.email AS student_email
                FROM Attendance a
                JOIN Users u ON u.id = a.student_id
                WHERE a.teacher_id = ${teacherId}
                AND a.student_id = ${studentId}
                AND TO_CHAR(a.class_date, 'YYYY-MM') = ${month}
                ORDER BY a.class_date DESC
            `;
            return NextResponse.json({ attendance: rows });
        } else {
            const { rows } = await sql`
                SELECT
                    a.*,
                    u.name AS student_name,
                    u.email AS student_email
                FROM Attendance a
                JOIN Users u ON u.id = a.student_id
                WHERE a.teacher_id = ${teacherId}
                AND TO_CHAR(a.class_date, 'YYYY-MM') = ${month}
                ORDER BY a.class_date DESC, a.class_time DESC
            `;
            return NextResponse.json({ attendance: rows });
        }
    } catch (error) {
        console.error("Attendance GET error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
