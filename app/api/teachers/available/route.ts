import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch teachers who are approved
    const { rows: teachers } = await sql`
      SELECT u.id, u.name, t.qualification, t.specialization, t.experience, t.profile_photo, t.available_days, t.timezone
      FROM Users u
      JOIN Teachers t ON u.id = t.user_id
      WHERE t.status = 'approved'
      ORDER BY u.name ASC
    `;

    return NextResponse.json({ teachers });
  } catch (error) {
    console.error("Error fetching available teachers:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
