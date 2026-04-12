import { Button } from "@/components/ui/button";
import { Check, CreditCard, Building, Globe, Star, Zap, BookOpen } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pricing & Packages | vQuranSchool",
    description: "Choose the perfect Quran learning plan for you. Flexible pricing with per-session transparency — starting from just $4.61/session.",
};

const plans = [
    {
        name: "Monthly Plan",
        tagline: "Perfect for beginners",
        price: "$99",
        frequency: "/ month",
        perSession: "$4.95",
        sessionsNote: "5 sessions/week · 20 sessions/month",
        description: "Start your Quran journey with maximum flexibility.",
        icon: BookOpen,
        features: [
            "5 live sessions per week",
            "30 minutes per session",
            "Daily Quran Reading",
            "Basic Tajweed Rules",
            "Cancel anytime",
        ],
        recommended: false,
        cta: "Start Learning",
        color: "border-slate-200",
        badge: null,
    },
    {
        name: "Quarterly Plan",
        tagline: "3 months · Best seller",
        price: "$270",
        frequency: "/ quarter",
        perSession: "$4.50",
        sessionsNote: "5 sessions/week · 60 sessions/quarter",
        description: "Our most popular plan — save $27 and build real consistency.",
        icon: Star,
        features: [
            "5 live sessions per week",
            "30 minutes per session",
            "Daily Sunnah Duas",
            "Six Kalimas Memorization",
            "Short Surah Memorization",
            "Save $27 vs monthly",
        ],
        recommended: true,
        cta: "Get Started",
        color: "border-blue-500",
        badge: "Most Popular · Save $27",
    },
    {
        name: "Semi-Annual Plan",
        tagline: "6 months · Best value",
        price: "$510",
        frequency: "/ 6 months",
        perSession: "$4.25",
        sessionsNote: "5 sessions/week · 120 sessions total",
        description: "Maximum savings for the committed long-term student.",
        icon: Zap,
        features: [
            "5 live sessions per week",
            "30 minutes per session",
            "Salah & Prayer Training",
            "Islamic Manners & Etiquettes",
            "Comprehensive Evaluation",
            "Save $84 vs monthly",
        ],
        recommended: false,
        cta: "Best Value",
        color: "border-slate-200",
        badge: "Save $84",
    },
];

export default function PublicPricingPage() {
    return (
        <main className="bg-white">
            {/* Hero Banner */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(96,165,250,0.15)_0%,_transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(30,58,138,0.3)_0%,_transparent_60%)] pointer-events-none" />
                <div className="container mx-auto px-4 md:px-8 py-20 md:py-28 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-sm font-medium text-blue-200 mb-6">
                        <CreditCard className="w-4 h-4" />
                        Transparent, Per-Session Pricing
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-serif mb-6">
                        Simple, Honest Pricing
                    </h1>
                    <p className="text-xl text-blue-200 max-w-2xl mx-auto font-light">
                        No hidden fees. Know exactly what you pay per session.
                        Cancel anytime, upgrade anytime.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-300">
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> No enrollment fee</span>
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> Native Arabic teachers</span>
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> 1-on-1 live sessions</span>
                        <span className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> Free trial class</span>
                    </div>
                </div>
            </section>

            {/* Plans Grid */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-50 blur-[120px] rounded-full opacity-60 pointer-events-none" />
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col rounded-3xl bg-white border-2 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/10 ${plan.recommended
                                    ? 'border-blue-500 shadow-2xl shadow-blue-900/10 scale-[1.03] z-10'
                                    : `${plan.color} shadow-md`
                                    }`}
                            >
                                {plan.badge && (
                                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg ${plan.recommended ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' : 'bg-amber-400 text-amber-900'}`}>
                                        {plan.badge}
                                    </div>
                                )}

                                <div className={`p-8 rounded-t-3xl ${plan.recommended ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white' : 'bg-slate-50'}`}>
                                    <div className={`mb-4 w-12 h-12 rounded-2xl flex items-center justify-center ${plan.recommended ? 'bg-white/20' : 'bg-blue-100'}`}>
                                        <plan.icon className={`w-6 h-6 ${plan.recommended ? 'text-white' : 'text-blue-600'}`} />
                                    </div>
                                    <h2 className={`text-xl font-bold font-serif mb-1 ${plan.recommended ? 'text-white' : 'text-blue-950'}`}>{plan.name}</h2>
                                    <p className={`text-sm font-medium mb-4 ${plan.recommended ? 'text-blue-200' : 'text-slate-500'}`}>{plan.tagline}</p>
                                    <p className={`text-sm font-light leading-relaxed ${plan.recommended ? 'text-blue-100' : 'text-slate-500'}`}>{plan.description}</p>
                                </div>

                                <div className="px-8 py-6 border-b border-slate-100">
                                    {/* Total price */}
                                    <div className="flex items-end gap-2 mb-1">
                                        <span className="text-5xl font-extrabold text-blue-600">{plan.price}</span>
                                        <span className="text-slate-500 font-medium pb-1">{plan.frequency}</span>
                                    </div>
                                    {/* Per session highlight */}
                                    <div className="flex items-center gap-2 mt-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5">
                                        <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                                            <span className="text-white text-xs font-bold">₪</span>
                                        </div>
                                        <div>
                                            <span className="text-blue-700 font-bold text-lg">{plan.perSession}</span>
                                            <span className="text-blue-600 text-sm font-medium"> / session</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2 text-center">{plan.sessionsNote}</p>
                                </div>

                                <div className="px-8 py-6 flex-1">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                                                    <Check className="w-3 h-3 text-blue-600" />
                                                </div>
                                                <span className="text-slate-600 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="px-8 pb-8">
                                    <Link href="/register-student" className="w-full block">
                                        <Button className={`w-full h-12 rounded-xl font-bold text-base transition-all ${plan.recommended
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30'
                                            : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                                            }`}>
                                            {plan.cta}
                                        </Button>
                                    </Link>
                                    <p className="text-xs text-center text-slate-400 mt-3">
                                        Includes a <Link href="/book-trial" className="text-blue-600 hover:underline font-medium">free trial class</Link>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Compare note */}
                    <p className="text-center text-slate-400 text-sm mt-12">
                        All plans include 1-on-1 live sessions with qualified teachers. No hidden fees. Prices in USD.
                    </p>
                </div>
            </section>

            {/* Per-session comparison table */}
            <section className="bg-slate-50 border-y border-slate-200 py-16">
                <div className="container mx-auto px-4 md:px-8 max-w-3xl">
                    <h2 className="text-2xl font-bold text-center text-blue-950 font-serif mb-2">Price Per Session Breakdown</h2>
                    <p className="text-center text-slate-500 text-sm mb-10">The longer you commit, the more you save.</p>
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-blue-950 text-white">
                                    <th className="text-left py-4 px-6 font-semibold">Plan</th>
                                    <th className="text-center py-4 px-6 font-semibold">Total Price</th>
                                    <th className="text-center py-4 px-6 font-semibold">Sessions</th>
                                    <th className="text-center py-4 px-6 font-semibold">Per Session</th>
                                    <th className="text-center py-4 px-6 font-semibold">You Save</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="py-4 px-6 font-medium text-slate-800">Monthly</td>
                                    <td className="py-4 px-6 text-center text-slate-600">$99</td>
                                    <td className="py-4 px-6 text-center text-slate-600">20</td>
                                    <td className="py-4 px-6 text-center font-semibold text-slate-800">$4.95</td>
                                    <td className="py-4 px-6 text-center text-slate-400">—</td>
                                </tr>
                                <tr className="border-b border-slate-100 bg-blue-50">
                                    <td className="py-4 px-6 font-bold text-blue-800 flex items-center gap-2">
                                        Quarterly
                                        <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Popular</span>
                                    </td>
                                    <td className="py-4 px-6 text-center text-slate-600">$270</td>
                                    <td className="py-4 px-6 text-center text-slate-600">60</td>
                                    <td className="py-4 px-6 text-center font-bold text-blue-700">$4.50</td>
                                    <td className="py-4 px-6 text-center font-semibold text-green-600">$27</td>
                                </tr>
                                <tr className="hover:bg-slate-50">
                                    <td className="py-4 px-6 font-medium text-slate-800">Semi-Annual</td>
                                    <td className="py-4 px-6 text-center text-slate-600">$510</td>
                                    <td className="py-4 px-6 text-center text-slate-600">120</td>
                                    <td className="py-4 px-6 text-center font-bold text-emerald-700">$4.25</td>
                                    <td className="py-4 px-6 text-center font-semibold text-green-600">$84</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Payment Methods */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-blue-950 font-serif mb-3">Accepted Payment Methods</h2>
                        <p className="text-slate-500">Secure and flexible payment options for students worldwide.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: CreditCard, title: "Debit / Credit Card", desc: "Secure online payments via Visa, Mastercard, and more." },
                            { icon: Globe, title: "Global Transfer", desc: "Remitly, Western Union, Wise, and international services." },
                            { icon: Building, title: "Bank Transfer", desc: "Direct local bank transfer for selected regions." },
                        ].map((method, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
                                    <method.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-blue-950 mb-2">{method.title}</h3>
                                <p className="text-sm text-slate-500">{method.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 p-6 bg-blue-950 text-white rounded-2xl text-center">
                        <h3 className="font-bold text-lg mb-2">Ready to start your Quran journey?</h3>
                        <p className="text-blue-200 text-sm mb-6">Book a free trial class — no commitment, no credit card required.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/book-trial">
                                <Button className="bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-full h-11 px-8">
                                    Book Free Trial
                                </Button>
                            </Link>
                            <Link href="/register-student">
                                <Button variant="outline" className="border-blue-400 text-white hover:bg-blue-800 rounded-full h-11 px-8 bg-transparent">
                                    Register Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
