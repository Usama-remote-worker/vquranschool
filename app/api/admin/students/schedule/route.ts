import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { searchParams } = new URL(req.url);
        const studentId = searchParams.get("studentId");

        if (!studentId) return NextResponse.json({ error: "Student ID required" }, { status: 400 });

        const { rows: schedule } = await sql`
            SELECT * FROM ClassSchedules WHERE student_id = ${studentId}
            ORDER BY day_of_week ASC, start_time ASC
        `;

        return NextResponse.json({ schedule });
    } catch (error: unknown) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { studentId, day_of_week, start_time } = await req.json();

        await sql`
            INSERT INTO ClassSchedules (student_id, day_of_week, start_time)
            VALUES (${studentId}, ${day_of_week}, ${start_time})
        `;

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { searchParams } = new URL(req.url);
        const slotId = searchParams.get("slotId");

        if (!slotId) return NextResponse.json({ error: "Slot ID required" }, { status: 400 });

        await sql`DELETE FROM ClassSchedules WHERE id = ${slotId}`;

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Error" }, { status: 500 });
    }
}
