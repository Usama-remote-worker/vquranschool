import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe, PLANS, PlanId } from "@/lib/stripe";
import { sql } from "@vercel/postgres";

// POST /api/stripe/create-checkout
// Creates a Stripe Checkout session for the selected plan
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "student") {
        return NextResponse.json({ error: "Students only." }, { status: 403 });
    }

    try {
        const { planId } = await req.json() as { planId: PlanId };
        const plan = PLANS[planId];

        if (!plan) {
            return NextResponse.json({ error: "Invalid plan selected." }, { status: 400 });
        }

        if (!plan.stripe_price_id) {
            return NextResponse.json(
                { error: "Stripe Price ID not configured for this plan. Contact admin." },
                { status: 500 }
            );
        }

        // Check if student already has an active subscription
        const { rows: existing } = await sql`
            SELECT id, status FROM Subscriptions
            WHERE student_id = ${session.user.id}
            AND status = 'active'
            LIMIT 1
        `;

        if (existing.length > 0) {
            return NextResponse.json(
                { error: "You already have an active subscription." },
                { status: 400 }
            );
        }

        // Get or create Stripe customer
        let stripeCustomerId: string | undefined;
        const { rows: subRows } = await sql`
            SELECT stripe_customer_id FROM Subscriptions
            WHERE student_id = ${session.user.id}
            AND stripe_customer_id IS NOT NULL
            LIMIT 1
        `;

        if (subRows.length > 0 && subRows[0].stripe_customer_id) {
            stripeCustomerId = subRows[0].stripe_customer_id;
        } else {
            const customer = await stripe.customers.create({
                email: session.user.email!,
                name: session.user.name || undefined,
                metadata: {
                    user_id: session.user.id,
                    role: "student",
                },
            });
            stripeCustomerId = customer.id;
        }

        const baseUrl = process.env.NEXTAUTH_URL || "https://vquranschool.vercel.app";

        // Create Stripe Checkout session
        const checkoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: plan.stripe_price_id,
                    quantity: 1,
                },
            ],
            metadata: {
                user_id: session.user.id,
                plan_id: planId.toString(),
                student_email: session.user.email!,
            },
            subscription_data: {
                metadata: {
                    user_id: session.user.id,
                    plan_id: planId.toString(),
                },
            },
            success_url: `${baseUrl}/dashboard/student/payments?success=true&plan=${planId}`,
            cancel_url: `${baseUrl}/dashboard/student/pricing?cancelled=true`,
            allow_promotion_codes: true,
            billing_address_collection: "required",
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        console.error("Stripe checkout error:", error);
        return NextResponse.json({ error: "Failed to create checkout session." }, { status: 500 });
    }
}
