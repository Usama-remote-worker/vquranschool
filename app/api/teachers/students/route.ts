import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const teacherId = session.user.id;

    // Join Users and Students to get student details assigned to this teacher
    const { rows } = await sql`
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        s.course, 
        s.status, 
        s.whatsapp,
        s.country,
        s.age
      FROM Users u
      JOIN Students s ON u.id = s.user_id
      WHERE s.assigned_teacher = ${teacherId}
    `;

    return NextResponse.json({ students: rows });
  } catch (error) {
    console.error("Error fetching teacher students:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
