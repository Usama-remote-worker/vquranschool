import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !(session.user as any)?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { receiptBase64 } = body;

        if (!receiptBase64) {
             return NextResponse.json({ error: "Receipt is required" }, { status: 400 });
        }

        // Update the student record
        await sql`
            UPDATE Students
            SET payment_status = 'pending', payment_receipt = ${receiptBase64}
            WHERE user_id = ${(session.user as any).id}
        `;

        return NextResponse.json({ message: "Payment proof submitted successfully" });
    } catch (error: any) {
        console.error("Error submitting payment proof:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
