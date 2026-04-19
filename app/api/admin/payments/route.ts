import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { rows } = await sql`
            SELECT u.name, u.email, s.user_id as id, s.payment_status, s.payment_receipt, s.access_expires_at
            FROM Students s
            JOIN Users u ON u.id = s.user_id
            WHERE s.payment_status != 'unpaid'
            ORDER BY u.created_at DESC
        `;
        return NextResponse.json({ payments: rows });
    } catch (e: unknown) {
        return NextResponse.json({ error: e instanceof Error ? e.message : "Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { studentId, action, months } = await req.json();

        if (action === "approve") {
            const addedMonths = months ? Number(months) : 1;
            // Use GREATEST(access_expires_at, NOW()) to ensure extension works for active users
            await sql`
                UPDATE Students
                SET payment_status = 'active', 
                    access_expires_at = COALESCE(GREATEST(access_expires_at, NOW()), NOW()) + (INTERVAL '1 month' * ${addedMonths}),
                    payment_receipt = NULL
                WHERE user_id = ${studentId}
            `;
        } else if (action === "reject") {
            await sql`
                UPDATE Students
                SET payment_status = 'unpaid',
                    payment_receipt = NULL
                WHERE user_id = ${studentId}
            `;
        }

        return NextResponse.json({ message: "Action Successful" });
    } catch (e: unknown) {
        return NextResponse.json({ error: e instanceof Error ? e.message : "Error" }, { status: 500 });
    }
}
