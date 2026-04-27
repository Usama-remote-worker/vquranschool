import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sql } from "@vercel/postgres";

// GET /api/stripe/subscription
// Returns the current student's active subscription details
export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { rows } = await sql`
            SELECT
                s.id,
                s.plan,
                s.price_usd,
                s.classes_per_month,
                s.classes_per_week,
                s.status,
                s.current_period_start,
                s.current_period_end,
                s.stripe_subscription_id,
                s.created_at
            FROM Subscriptions s
            WHERE s.student_id = ${session.user.id}
            ORDER BY s.created_at DESC
            LIMIT 1
        `;

        if (rows.length === 0) {
            return NextResponse.json({ subscription: null });
        }

        return NextResponse.json({ subscription: rows[0] });
    } catch (error) {
        console.error("Subscription fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch subscription" }, { status: 500 });
    }
}
