import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";

export const stripe = new Stripe(stripeKey, {
    apiVersion: "2026-03-25.dahlia" as any,
});

// ─── Plan Configuration ───────────────────────────────────────────────────────
// These match your pricing exactly. In Stripe, create Products & Prices for each.
// Store the Stripe Price IDs in your env.
export interface Plan {
    id: string;
    name: string;
    description: string;
    price_usd: number;
    classes_per_week: number;
    classes_per_month: number;
    billing: "monthly" | "quarterly" | "semi-annual";
    stripe_price_id?: string;
}

export const PLANS: Record<string, Plan> = {
    "3x_monthly": {
        id: "3x_monthly",
        name: "3x Weekly - Monthly",
        description: "12 sessions per month. Perfect for beginners.",
        price_usd: 48,
        classes_per_week: 3,
        classes_per_month: 12,
        billing: "monthly",
    },
    "3x_quarterly": {
        id: "3x_quarterly",
        name: "3x Weekly - Quarterly",
        description: "36 sessions total. Our value plan for steady learners.",
        price_usd: 130,
        classes_per_week: 3,
        classes_per_month: 36,
        billing: "quarterly",
    },
    "3x_semi": {
        id: "3x_semi",
        name: "3x Weekly - Semi-Annual",
        description: "72 sessions total. Best value for long-term commitment.",
        price_usd: 245,
        classes_per_week: 3,
        classes_per_month: 72,
        billing: "semi-annual",
    },
    "5x_monthly": {
        id: "5x_monthly",
        name: "5x Weekly - Monthly",
        description: "20 sessions per month. Intensive daily learning.",
        price_usd: 99,
        classes_per_week: 5,
        classes_per_month: 20,
        billing: "monthly",
    },
    "5x_quarterly": {
        id: "5x_quarterly",
        name: "5x Weekly - Quarterly",
        description: "60 sessions total. Our most popular intensive plan.",
        price_usd: 270,
        classes_per_week: 5,
        classes_per_month: 60,
        billing: "quarterly",
    },
    "5x_semi": {
        id: "5x_semi",
        name: "5x Weekly - Semi-Annual",
        description: "120 sessions total. The ultimate Quranic immersion.",
        price_usd: 510,
        classes_per_week: 5,
        classes_per_month: 120,
        billing: "semi-annual",
    },
};

export type PlanId = keyof typeof PLANS;
