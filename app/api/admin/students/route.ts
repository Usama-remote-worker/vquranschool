import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notifyStudentApproved, notifyStudentRejected } from "@/lib/whatsapp";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { rows: students } = await sql`
            SELECT 
                u.id, u.name, u.email, u.created_at,
                s.age, s.country, s.course, s.whatsapp, s.status, s.assigned_teacher,
                s.payment_status, s.access_expires_at,
                t.name as teacher_name
            FROM Users u
            JOIN Students s ON u.id = s.user_id
            LEFT JOIN Users t ON t.id = s.assigned_teacher
            WHERE u.role = 'student'
            ORDER BY u.created_at DESC
        `;

        return NextResponse.json({ students });
    } catch (error) {
        console.error("Error fetching students for admin:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { studentId, action, teacherId } = await req.json();

        // Get student info for WhatsApp notification
        const { rows: studentRows } = await sql`
            SELECT u.name, s.whatsapp, s.course
            FROM Users u
            JOIN Students s ON s.user_id = u.id
            WHERE u.id = ${studentId}
            LIMIT 1
        `;

        if (!studentRows[0]) {
            return NextResponse.json({ error: "Student not found" }, { status: 404 });
        }

        const student = studentRows[0];

        if (action === "approve") {
            await sql`
                UPDATE Students 
                SET status = 'approved'
                WHERE user_id = ${studentId}
            `;

            // Send WhatsApp notification
            if (student.whatsapp) {
                const cleanNumber = student.whatsapp.replace(/[\s\-\+]/g, "");
                await notifyStudentApproved(student.name, cleanNumber, student.course || "Quran Studies");
            }
        } else if (action === "reject") {
            await sql`
                UPDATE Students 
                SET status = 'rejected'
                WHERE user_id = ${studentId}
            `;

            if (student.whatsapp) {
                const cleanNumber = student.whatsapp.replace(/[\s\-\+]/g, "");
                await notifyStudentRejected(student.name, cleanNumber);
            }
        } else if (action === "assign_teacher" && teacherId) {
            await sql`
                UPDATE Students 
                SET assigned_teacher = ${teacherId}
                WHERE user_id = ${studentId}
            `;
        }

        return NextResponse.json({ message: "Action completed successfully" });
    } catch (error) {
        console.error("Error updating student:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
