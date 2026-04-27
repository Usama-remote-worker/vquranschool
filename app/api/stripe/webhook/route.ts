import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS, PlanId } from "@/lib/stripe";
import { sql } from "@vercel/postgres";
import Stripe from "stripe";

// This endpoint MUST be excluded from CSRF protection
// Next.js does this automatically for route handlers
export async function POST(req: NextRequest) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
        return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        console.error("STRIPE_WEBHOOK_SECRET is not set!");
        return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    try {
        switch (event.type) {
            // ── Checkout completed → create/activate subscription in our DB
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                await handleCheckoutComplete(session);
                break;
            }

            // ── Monthly renewal succeeded → extend period end date
            case "invoice.payment_succeeded": {
                const invoice = event.data.object as Stripe.Invoice;
                await handleInvoiceSucceeded(invoice);
                break;
            }

            // ── Payment failed → mark subscription as expired
            case "invoice.payment_failed": {
                const invoice = event.data.object as Stripe.Invoice;
                await handleInvoiceFailed(invoice);
                break;
            }

            // ── Customer cancelled → mark as cancelled
            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                await handleSubscriptionDeleted(subscription);
                break;
            }

            default:
                // Ignore unhandled events
                break;
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook handler error:", error);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }
}

// ─── Handler: Checkout Completed ─────────────────────────────────────────────
async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
    const userId = session.metadata?.user_id;
    const planId = session.metadata?.plan_id as PlanId;

    if (!userId || !planId || !PLANS[planId]) {
        console.error("Missing metadata in checkout session:", session.id);
        return;
    }

    const plan = PLANS[planId];
    const stripeSubscriptionId = session.subscription as string;
    const stripeCustomerId = session.customer as string;

    // Fetch the subscription to get period dates
    const stripeSubscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
    // Type assertion needed because Stripe SDK types differ across versions
    const sub = stripeSubscription as unknown as { current_period_start: number; current_period_end: number };
    const periodStart = new Date(sub.current_period_start * 1000).toISOString();
    const periodEnd = new Date(sub.current_period_end * 1000).toISOString();

    // Upsert into our Subscriptions table
    await sql`
        INSERT INTO Subscriptions (
            student_id,
            plan,
            price_usd,
            classes_per_month,
            classes_per_week,
            status,
            stripe_customer_id,
            stripe_subscription_id,
            current_period_start,
            current_period_end
        ) VALUES (
            ${userId},
            ${planId},
            ${plan.price_usd},
            ${plan.classes_per_month},
            ${plan.classes_per_week},
            'active',
            ${stripeCustomerId},
            ${stripeSubscriptionId},
            ${periodStart},
            ${periodEnd}
        )
        ON CONFLICT (student_id) DO UPDATE SET
            plan = EXCLUDED.plan,
            price_usd = EXCLUDED.price_usd,
            classes_per_month = EXCLUDED.classes_per_month,
            classes_per_week = EXCLUDED.classes_per_week,
            status = 'active',
            stripe_customer_id = EXCLUDED.stripe_customer_id,
            stripe_subscription_id = EXCLUDED.stripe_subscription_id,
            current_period_start = EXCLUDED.current_period_start,
            current_period_end = EXCLUDED.current_period_end,
            updated_at = NOW()
    `;

    // Also update the student status to 'approved' if they were pending
    await sql`
        UPDATE Students SET status = 'approved'
        WHERE user_id = ${userId} AND status = 'pending'
    `;

    console.log(`✅ Subscription activated for user ${userId} — Plan: ${planId}`);
}

// ─── Handler: Invoice Succeeded (renewal) ────────────────────────────────────
async function handleInvoiceSucceeded(invoice: Stripe.Invoice) {
    // In newer Stripe SDK versions, subscription reference is nested
    const invoiceData = invoice as unknown as { subscription?: string; parent?: { subscription_details?: { subscription?: string } } };
    const stripeSubscriptionId = invoiceData.subscription || invoiceData.parent?.subscription_details?.subscription;
    if (!stripeSubscriptionId) return;

    const stripeSubscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
    const sub = stripeSubscription as unknown as { current_period_end: number };
    const periodEnd = new Date(sub.current_period_end * 1000).toISOString();

    await sql`
        UPDATE Subscriptions
        SET
            status = 'active',
            current_period_end = ${periodEnd},
            updated_at = NOW()
        WHERE stripe_subscription_id = ${stripeSubscriptionId}
    `;

    console.log(`✅ Subscription renewed: ${stripeSubscriptionId}`);
}

// ─── Handler: Invoice Failed ──────────────────────────────────────────────────
async function handleInvoiceFailed(invoice: Stripe.Invoice) {
    const invoiceData = invoice as unknown as { subscription?: string; parent?: { subscription_details?: { subscription?: string } } };
    const stripeSubscriptionId = invoiceData.subscription || invoiceData.parent?.subscription_details?.subscription;
    if (!stripeSubscriptionId) return;

    await sql`
        UPDATE Subscriptions
        SET status = 'expired', updated_at = NOW()
        WHERE stripe_subscription_id = ${stripeSubscriptionId}
    `;

    console.warn(`⚠️ Payment failed for subscription: ${stripeSubscriptionId}`);
}

// ─── Handler: Subscription Deleted (cancelled) ───────────────────────────────
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    await sql`
        UPDATE Subscriptions
        SET status = 'cancelled', updated_at = NOW()
        WHERE stripe_subscription_id = ${subscription.id}
    `;

    console.log(`🚫 Subscription cancelled: ${subscription.id}`);
}
