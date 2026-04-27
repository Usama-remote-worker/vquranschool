import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
    try {
        await sql`ALTER TABLE Students ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'unpaid';`;
        await sql`ALTER TABLE Students ADD COLUMN IF NOT EXISTS payment_receipt TEXT;`;
        await sql`ALTER TABLE Students ADD COLUMN IF NOT EXISTS access_expires_at TIMESTAMP WITH TIME ZONE;`;
        await sql`ALTER TABLE Students ADD COLUMN IF NOT EXISTS last_teacher_change TIMESTAMP WITH TIME ZONE DEFAULT NOW();`;
        
        return NextResponse.json({ message: "Migration Successful" });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
