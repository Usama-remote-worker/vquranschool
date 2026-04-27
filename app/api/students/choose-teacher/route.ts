import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "student") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { teacherId } = await req.json();
    if (!teacherId) {
      return NextResponse.json({ error: "Teacher ID is required" }, { status: 400 });
    }

    const studentId = session.user.id;

    // Check if the student has changed their teacher in the last 30 days
    const { rows } = await sql`
      SELECT last_teacher_change FROM Students WHERE user_id = ${studentId}
    `;

    if (rows.length > 0) {
      const lastChange = rows[0].last_teacher_change;
      if (lastChange) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        if (new Date(lastChange) > thirtyDaysAgo) {
          return NextResponse.json({ 
            error: "You can only change your teacher once every 30 days. Please contact support for urgent changes." 
          }, { status: 403 });
        }
      }
    }

    // Update the student's assigned teacher
    await sql`
      UPDATE Students
      SET assigned_teacher = ${teacherId},
          last_teacher_change = NOW()
      WHERE user_id = ${studentId}
    `;

    return NextResponse.json({ message: "Teacher assigned successfully" });
  } catch (error) {
    console.error("Error choosing teacher:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
