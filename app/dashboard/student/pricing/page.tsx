"use client";
import { useState } from "react";
import { Check, CreditCard, Building, Globe, Zap, BookOpen, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CourseCard } from "@/components/CourseCard";
import { useToast } from "@/components/ui/toast";

const courses = [
    { id: "1", title: "Noorani Qaida", description: "Learn the basics of Arabic reading with proper pronunciation.", level: "Beginner" },
    { id: "2", title: "Quran Reading (Nazra)", description: "Fluently read the Holy Quran with correct phonetics. Best after completing Qaida.", level: "Intermediate" },
    { id: "3", title: "Quran Memorization (Hifz)", description: "Commit the Holy Quran to memory with our structured program and retention exercises.", level: "Advanced" },
    { id: "4", title: "Tajweed Rules", description: "Master the intricate rules of recitation (Makharij & Sifat).", level: "Intermediate" },
    { id: "5", title: "Islamic Studies for Kids", description: "Age-appropriate learning of basic Islamic principles, Dua and Fiqh.", level: "Beginner" },
];

const tiers = [
    {
        id: "3x",
        label: "3 Classes / Week",
        sublabel: "Light & Steady",
        icon: BookOpen,
        color: "slate",
        plans: [
            {
                name: "Monthly",
                total: "$48",
                frequency: "/ month",
                perSession: "$4.00",
                sessions: 12,
                durationNote: "12 sessions / month",
                saving: null,
                description: "Try it month-to-month with no long commitment.",
                features: [
                    "3 live sessions per week",
                    "30 minutes per session",
                    "Daily Quran Reading",
                    "Basic Tajweed Rules",
                    "Cancel anytime",
                ],
                recommended: false,
            },
            {
                name: "Quarterly",
                total: "$130",
                frequency: "/ 3 months",
                perSession: "$3.62",
                sessions: 36,
                durationNote: "36 sessions total",
                saving: "Save $14",
                description: "3 months of steady, structured Quran learning.",
                features: [
                    "3 live sessions per week",
                    "30 minutes per session",
                    "Daily Sunnah Duas",
                    "Six Kalimas Memorization",
                    "Short Surah Memorization",
                ],
                recommended: false,
            },
            {
                name: "Semi-Annual",
                total: "$245",
                frequency: "/ 6 months",
                perSession: "$3.40",
                sessions: 72,
                durationNote: "72 sessions total",
                saving: "Save $43",
                description: "Best value for the 3×/week learner.",
                features: [
                    "3 live sessions per week",
                    "30 minutes per session",
                    "Salah (Prayer) Training",
                    "Islamic Manners & Etiquettes",
                    "Comprehensive Evaluation",
                ],
                recommended: false,
            },
        ],
    },
    {
        id: "5x",
        label: "5 Classes / Week",
        sublabel: "Intensive & Fast",
        icon: Zap,
        color: "blue",
        plans: [
            {
                name: "Monthly",
                total: "$99",
                frequency: "/ month",
                perSession: "$4.95",
                sessions: 20,
                durationNote: "20 sessions / month",
                saving: null,
                description: "Maximum immersion, ultimate flexibility.",
                features: [
                    "5 live sessions per week",
                    "30 minutes per session",
                    "Daily Quran Reading",
                    "Basic Tajweed Rules",
                    "Cancel anytime",
                ],
                recommended: false,
            },
            {
                name: "Quarterly",
                total: "$270",
                frequency: "/ 3 months",
                perSession: "$4.50",
                sessions: 60,
                durationNote: "60 sessions total",
                saving: "Save $27",
                description: "Our most popular plan — real results in 3 months.",
                features: [
                    "5 live sessions per week",
                    "30 minutes per session",
                    "Daily Sunnah Duas",
                    "Six Kalimas Memorization",
                    "Short Surah Memorization",
                ],
                recommended: true,
            },
            {
                name: "Semi-Annual",
                total: "$510",
                frequency: "/ 6 months",
                perSession: "$4.25",
                sessions: 120,
                durationNote: "120 sessions total",
                saving: "Save $84",
                description: "For the serious, long-term Quran student.",
                features: [
                    "5 live sessions per week",
                    "30 minutes per session",
                    "Salah (Prayer) Training",
                    "Islamic Manners & Etiquettes",
                    "Comprehensive Evaluation",
                ],
                recommended: false,
            },
        ],
    },
];

export default function PricingPage() {
    const [activeTier, setActiveTier] = useState<"3x" | "5x">("5x");
    const [loading, setLoading] = useState<string | null>(null);
    const { addToast } = useToast() as any;

    const handleCheckout = async (planId: string) => {
        setLoading(planId);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planId }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                addToast?.(data.error || "Checkout failed", "error");
            }
        } catch (error) {
            addToast?.("Network error. Try manual payment.", "error");
        } finally {
            setLoading(null);
        }
    };

    const currentTier = tiers.find((t) => t.id === activeTier)!;

    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 font-serif">Pricing & Courses</h1>
                    <p className="text-slate-500 mt-2 text-lg font-light">Select a convenient learning plan and start your Quranic journey today.</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border shadow-sm">
                    <Link href="/dashboard/student/payments">
                        <Button variant="outline" className="rounded-xl border-slate-200 text-slate-700 font-bold h-11 px-6">
                            <Building className="w-4 h-4 mr-2" /> Manual Bank Details
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-8 pt-8 border-t border-slate-200">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto">
                        {tiers.map((tier) => (
                            <button
                                key={tier.id}
                                onClick={() => setActiveTier(tier.id as "3x" | "5x")}
                                className={`flex-1 flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                                    activeTier === tier.id
                                        ? "bg-blue-600 text-white shadow-xl shadow-blue-600/30 scale-[1.05]"
                                        : "text-slate-500 hover:text-slate-800"
                                }`}
                            >
                                <tier.icon className="w-4 h-4" />
                                {tier.label}
                            </button>
                        ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm font-bold text-slate-400 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        Card Payments Secured by Stripe
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {currentTier.plans.map((plan, i) => {
                        const planId = `${activeTier}_${plan.name.toLowerCase().split('-')[0].trim().replace('quarterly', 'quarterly').replace('semi-annual', 'semi')}`;
                        return (
                            <div
                                key={i}
                                className={`relative flex flex-col rounded-[40px] bg-white border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                                    plan.recommended
                                        ? "border-blue-500 shadow-xl ring-4 ring-blue-500/5"
                                        : "border-slate-200 shadow-sm"
                                }`}
                            >
                                {plan.recommended && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-xl z-20 border-2 border-white">
                                        Most Popular
                                    </div>
                                )}

                                <div className={`p-8 rounded-t-[38px] border-b ${plan.recommended ? "bg-blue-50/50 border-blue-100" : "bg-slate-50/30 border-slate-100"}`}>
                                    <h3 className="font-black text-slate-900 text-2xl mb-1">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mt-4">
                                        <span className={`text-5xl font-black ${plan.recommended ? "text-blue-600" : "text-slate-900"}`}>{plan.total}</span>
                                        <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">{plan.frequency}</span>
                                    </div>
                                    {plan.saving && (
                                        <div className="inline-block mt-3 px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-lg uppercase tracking-wider">
                                            {plan.saving}
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 flex-1 space-y-6">
                                    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                        <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Cost Per Class</p>
                                            <p className="text-xl font-black text-slate-800">{plan.perSession}</p>
                                        </div>
                                    </div>

                                    <ul className="space-y-4">
                                        {plan.features.map((f, fi) => (
                                            <li key={fi} className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                                                    <Check className="w-3 h-3 text-emerald-600" />
                                                </div>
                                                <span className="text-slate-600 text-sm font-medium">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="p-8 pt-0 space-y-3">
                                    <Button
                                        onClick={() => handleCheckout(planId)}
                                        disabled={loading !== null}
                                        className={`w-full h-14 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-xl ${
                                            plan.recommended
                                                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30"
                                                : "bg-slate-900 hover:bg-black text-white"
                                        }`}
                                    >
                                        {loading === planId ? <Loader2 className="w-6 h-6 animate-spin" /> : "Pay via Card"}
                                    </Button>
                                    <Link href="/dashboard/student/payments" className="block w-full">
                                        <Button variant="ghost" className="w-full text-slate-500 font-bold hover:text-blue-600">
                                            Manual Transfer
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Quick comparison strip */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mt-8">
                <div className="bg-blue-950 text-white px-6 py-4">
                    <h3 className="font-bold text-base">Per-Session Price Comparison</h3>
                    <p className="text-blue-300 text-xs mt-0.5">Longer commitment = lower cost per session</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="text-left py-3 px-6">Plan</th>
                                <th className="text-center py-3 px-4">Sessions/Week</th>
                                <th className="text-center py-3 px-4">Duration</th>
                                <th className="text-center py-3 px-4">Total</th>
                                <th className="text-center py-3 px-4 font-bold text-blue-700">Per Session</th>
                                <th className="text-center py-3 px-4 text-emerald-600">Saving</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { label: "Light Monthly", freq: "3×/wk", dur: "1 month", total: "$48", per: "$4.00", save: "—", highlight: false },
                                { label: "Light Quarterly", freq: "3×/wk", dur: "3 months", total: "$130", per: "$3.62", save: "$14", highlight: false },
                                { label: "Light Semi-Annual", freq: "3×/wk", dur: "6 months", total: "$245", per: "$3.40", save: "$43", highlight: false },
                                { label: "Intensive Monthly", freq: "5×/wk", dur: "1 month", total: "$99", per: "$4.95", save: "—", highlight: false },
                                { label: "Intensive Quarterly ⭐", freq: "5×/wk", dur: "3 months", total: "$270", per: "$4.50", save: "$27", highlight: true },
                                { label: "Intensive Semi-Annual", freq: "5×/wk", dur: "6 months", total: "$510", per: "$4.25", save: "$84", highlight: false },
                            ].map((row, i) => (
                                <tr key={i} className={`border-t border-slate-100 ${row.highlight ? "bg-blue-50" : "hover:bg-slate-50"}`}>
                                    <td className={`py-3 px-6 font-semibold ${row.highlight ? "text-blue-800" : "text-slate-700"}`}>{row.label}</td>
                                    <td className="py-3 px-4 text-center text-slate-500">{row.freq}</td>
                                    <td className="py-3 px-4 text-center text-slate-500">{row.dur}</td>
                                    <td className="py-3 px-4 text-center text-slate-600">{row.total}</td>
                                    <td className={`py-3 px-4 text-center font-bold ${row.highlight ? "text-blue-700" : "text-slate-800"}`}>{row.per}</td>
                                    <td className={`py-3 px-4 text-center font-semibold ${row.save === "—" ? "text-slate-300" : "text-emerald-600"}`}>{row.save}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-blue-950 font-serif mb-2">Accepted Payment Methods</h2>
                <p className="text-slate-500 text-sm mb-6">Secure and flexible payments for students worldwide.</p>
                <div className="grid sm:grid-cols-3 gap-4">
                    {[
                        { icon: CreditCard, title: "Debit / Credit Card", desc: "Visa, Mastercard and more." },
                        { icon: Globe, title: "Global Transfer", desc: "Remitly, Wise, Western Union." },
                        { icon: Building, title: "Bank Transfer", desc: "Available in selected regions." },
                    ].map((m, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                                <m.icon className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-bold text-slate-800 text-sm">{m.title}</p>
                                <p className="text-xs text-slate-500">{m.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800 text-center">
                    Need a custom family plan? <Link href="/contact" className="font-bold underline hover:text-blue-600">Contact us</Link> for special discounts.
                </div>
            </div>

            {/* Courses Section */}
            <div className="space-y-6 pt-6 border-t border-slate-200">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">2</span>
                        Available Courses
                    </h2>
                    <p className="text-sm text-slate-500 mt-1 pl-8">Our expert teachers cover all these subjects during your live sessions. You can learn multiple subjects or switch at any time.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-8">
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}
