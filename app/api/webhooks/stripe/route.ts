import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { sql } from "@vercel/postgres";
import { notifyPaymentApproved } from "@/lib/whatsapp";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event;

    try {
        if (!sig || !webhookSecret) return NextResponse.json({ error: "Missing secret" }, { status: 400 });
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        console.error("Webhook Error:", err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;
        const userId = session.metadata.userId;
        const planId = session.metadata.planId;

        try {
            // Activate student in database
            await sql`
                UPDATE Students
                SET payment_status = 'active',
                    access_expires_at = NOW() + INTERVAL '1 month'
                WHERE user_id = ${userId}
            `;

            // Fetch student info for WhatsApp notification
            const { rows } = await sql`
                SELECT u.name, s.whatsapp, s.course
                FROM Users u
                JOIN Students s ON s.user_id = u.id
                WHERE u.id = ${userId}
                LIMIT 1
            `;

            const student = rows[0];
            if (student?.whatsapp) {
                const cleanNumber = student.whatsapp.replace(/[\s\-\+]/g, "");
                const expiryDate = new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString();
                
                await notifyPaymentApproved(
                    student.name,
                    cleanNumber,
                    student.course || "Quran Classes",
                    expiryDate
                );
            }

            console.log(`✅ Subscription activated for user ${userId}`);
        } catch (error) {
            console.error("Database update error during webhook:", error);
        }
    }

    return NextResponse.json({ received: true });
}
