import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { notifyPaymentExpiringSoon } from "@/lib/whatsapp";

/**
 * CRON API: This should be called once every 24 hours.
 * It checks for:
 * 1. Subscriptions expiring in 3 days (Sends warning)
 * 2. Subscriptions expired today (Updates status to expired)
 */
export async function GET(req: Request) {
    // Basic security check (ideally use a secret token in headers)
    const authHeader = req.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Fetch current SadaBiz link from settings
        const { rows: settingsRows } = await sql`SELECT value FROM SystemSettings WHERE key = 'sadabiz_link'`;
        const sadabizLink = settingsRows[0]?.value;

        // 1. Find and Notify users expiring in 3 days
        const { rows: expiringSoon } = await sql`
            SELECT u.name, s.whatsapp, s.access_expires_at
            FROM Students s
            JOIN Users u ON u.id = s.user_id
            WHERE s.payment_status = 'active'
            AND s.access_expires_at <= NOW() + INTERVAL '3 days'
            AND s.access_expires_at > NOW() + INTERVAL '2 days'
        `;

        for (const student of expiringSoon) {
            if (student.whatsapp) {
                const cleanNumber = student.whatsapp.replace(/[\s\-\+]/g, "");
                const expiryDate = new Date(student.access_expires_at).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric"
                });
                await notifyPaymentExpiringSoon(student.name, cleanNumber, expiryDate, sadabizLink);
            }
        }

        // 2. Mark users as expired if date has passed
        const { rowCount: expiredCount } = await sql`
            UPDATE Students
            SET payment_status = 'expired'
            WHERE payment_status = 'active'
            AND access_expires_at < NOW()
        `;

        return NextResponse.json({ 
            success: true, 
            notified: expiringSoon.length, 
            expiredMarked: expiredCount 
        });

    } catch (error: any) {
        console.error("Cron Job Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
