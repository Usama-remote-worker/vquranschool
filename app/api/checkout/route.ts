import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe, PLANS, PlanId } from "@/lib/stripe";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { planId } = await req.json();
        const plan = PLANS[planId as PlanId];

        if (!plan) {
            return NextResponse.json({ error: "Invalid Plan" }, { status: 400 });
        }

        // 1. Create a Stripe Checkout Session
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: plan.name,
                            description: plan.description,
                        },
                        unit_amount: plan.price_usd * 100, // Stripe uses cents
                    },
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `${process.env.NEXTAUTH_URL}/dashboard/student/payments/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/student/pricing`,
            customer_email: session.user.email || undefined,
            metadata: {
                userId: session.user.id,
                planId: planId,
            },
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
