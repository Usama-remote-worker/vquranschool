import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);
    // Students can read settings (to see where to pay), but only admins can update
    
    try {
        const { rows } = await sql`SELECT key, value FROM SystemSettings`;
        const settings = rows.reduce((acc: any, row) => {
            acc[row.key] = row.value;
            return acc;
        }, {});
        
        return NextResponse.json({ settings });
    } catch (e: any) {
        // If table doesn't exist yet, return defaults
        return NextResponse.json({ 
            settings: {
                sadabiz_link: "https://sadapay.pk/u/academy",
                academy_whatsapp: "+923044296295",
                bank_details: JSON.stringify({
                    bank: "Meezan Bank",
                    account_name: "Usama Aimen",
                    account_number: "00300112681190",
                    iban: "PK02MEZN0000300112681190",
                    swift: "MEZN PK KA"
                })
            }
        });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { key, value } = await req.json();
        
        // Ensure table exists (Lazy creation)
        await sql`
            CREATE TABLE IF NOT EXISTS SystemSettings (
                key VARCHAR(50) PRIMARY KEY,
                value TEXT,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `;

        await sql`
            INSERT INTO SystemSettings (key, value, updated_at)
            VALUES (${key}, ${value}, NOW())
            ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
        `;

        return NextResponse.json({ message: "Setting updated" });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
