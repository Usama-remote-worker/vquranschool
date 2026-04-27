import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set in environment variables.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-03-25.dahlia",
});

// ─── Plan Configuration ───────────────────────────────────────────────────────
// These match your pricing exactly. In Stripe, create Products & Prices for each.
// Store the Stripe Price IDs in your env.
export const PLANS = {
    "3x_monthly": {
        id: "3x_monthly",
        name: "3x Weekly - Monthly",
        price_usd: 48,
        classes_per_week: 3,
        billing: "monthly",
    },
    "3x_quarterly": {
        id: "3x_quarterly",
        name: "3x Weekly - Quarterly",
        price_usd: 130,
        classes_per_week: 3,
        billing: "quarterly",
    },
    "3x_semi": {
        id: "3x_semi",
        name: "3x Weekly - Semi-Annual",
        price_usd: 245,
        classes_per_week: 3,
        billing: "semi-annual",
    },
    "5x_monthly": {
        id: "5x_monthly",
        name: "5x Weekly - Monthly",
        price_usd: 99,
        classes_per_week: 5,
        billing: "monthly",
    },
    "5x_quarterly": {
        id: "5x_quarterly",
        name: "5x Weekly - Quarterly",
        price_usd: 270,
        classes_per_week: 5,
        billing: "quarterly",
    },
    "5x_semi": {
        id: "5x_semi",
        name: "5x Weekly - Semi-Annual",
        price_usd: 510,
        classes_per_week: 5,
        billing: "semi-annual",
    },
} as any;

export type PlanId = keyof typeof PLANS;
