import { Button } from "@/components/ui/button";
import { Check, CreditCard, Building, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PricingPage() {
    const plans = [
        {
            name: "Monthly Plan",
            price: "$99",
            frequency: "/ month",
            perSession: "$4.95",
            sessionsNote: "20 sessions/month",
            description: "Flexible month-to-month learning.",
            features: [
                "5 Classes per week",
                "30 minutes per class",
                "Daily Quran Reading",
                "Basic Tajweed Rules",
            ],
            recommended: false
        },
        {
            name: "Quarterly Plan",
            price: "$270",
            frequency: "/ 3 months",
            perSession: "$4.50",
            sessionsNote: "60 sessions total · Save $27",
            description: "Our most popular plan. Save $27!",
            features: [
                "5 Classes per week",
                "30 minutes per class",
                "Daily Sunnah Duas",
                "Six Kalimas Memorization",
                "Short Surah Memorization"
            ],
            recommended: true
        },
        {
            name: "Semi-Annual Plan",
            price: "$510",
            frequency: "/ 6 months",
            perSession: "$4.25",
            sessionsNote: "120 sessions total · Save $84",
            description: "Best value for long-term students. Save $84!",
            features: [
                "5 Classes per week",
                "30 minutes per class",
                "Salah (Prayer) Training",
                "Islamic Manners & Etiquettes",
                "Comprehensive Evaluation"
            ],
            recommended: false
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Pricing & Packages</h1>
                <p className="text-slate-500">Choose a plan that fits your schedule and learning goals.</p>
            </div>

            <section className="relative overflow-hidden bg-slate-50">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent pointer-events-none"></div>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, index) => (
                            <div key={index} className={`relative flex flex-col p-8 rounded-3xl bg-white border ${plan.recommended ? 'border-blue-500 shadow-2xl shadow-blue-900/10 scale-105 z-10' : 'border-slate-200 shadow-sm mt-4 lg:mt-0'} transition-all hover:border-blue-300`}>
                                {plan.recommended && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-md">
                                        Most Popular
                                    </div>
                                )}
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-blue-950 font-serif mb-2">{plan.name}</h3>
                                    <p className="text-slate-500 font-light text-sm">{plan.description}</p>
                                </div>
                                <div className="mb-6">
                                    <span className="text-4xl font-extrabold text-blue-600">{plan.price}</span>
                                    <span className="text-slate-500 font-medium ml-1">{plan.frequency}</span>
                                    {/* Per session highlight */}
                                    <div className="flex items-center gap-2 mt-3 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
                                        <span className="text-blue-700 font-bold text-lg">{(plan as any).perSession}</span>
                                        <span className="text-blue-600 text-sm font-medium">/ session</span>
                                        <span className="ml-auto text-xs text-slate-400">{(plan as any).sessionsNote}</span>
                                    </div>
                                </div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                                <Check className="w-3.5 h-3.5 text-blue-600" />
                                            </div>
                                            <span className="text-slate-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/book-trial" className="w-full">
                                    <Button className={`w-full h-14 rounded-xl font-bold text-lg transition-all ${plan.recommended ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30' : 'bg-slate-50 hover:bg-slate-100 text-blue-700 border border-slate-200'}`}>
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Payment Methods Section */}
                    <div className="mt-32 max-w-4xl mx-auto bg-white border border-slate-200 p-10 md:p-14 rounded-3xl shadow-xl relative overflow-hidden">
                        <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-blue-50 blur-[80px] rounded-full pointer-events-none"></div>
                        
                        <div className="text-center mb-10 relative z-10">
                            <h2 className="text-3xl font-bold text-blue-950 font-serif mb-4">Accepted Payment Methods</h2>
                            <p className="text-slate-600 font-light">We offer flexible and secure payment methods for students across the globe.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 relative z-10">
                            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:border-blue-200 hover:bg-blue-50/50">
                                <CreditCard className="w-10 h-10 text-blue-600 mb-4" />
                                <h4 className="font-bold text-blue-950 mb-2">Debit / Credit Card</h4>
                                <p className="text-sm text-slate-500 font-light">Secure online payments via major credit & debit cards.</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:border-blue-200 hover:bg-blue-50/50">
                                <Globe className="w-10 h-10 text-blue-600 mb-4" />
                                <h4 className="font-bold text-blue-950 mb-2">Global Transfer</h4>
                                <p className="text-sm text-slate-500 font-light">Remitly, Western Union, Wise, and other international services.</p>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:border-blue-200 hover:bg-blue-50/50">
                                <Building className="w-10 h-10 text-blue-600 mb-4" />
                                <h4 className="font-bold text-blue-950 mb-2">Bank Transfer</h4>
                                <p className="text-sm text-slate-500 font-light">Direct local bank transfer available for selected regions.</p>
                            </div>
                        </div>

                        <div className="mt-10 p-6 bg-blue-50 text-blue-900 rounded-xl text-center border border-blue-100 relative z-10">
                            <h4 className="font-semibold mb-1">Need custom billing?</h4>
                            <p className="text-sm text-blue-700/80">If you have multiple family members enrolling, <Link href="/contact" className="underline font-medium hover:text-blue-600">contact us</Link> for special family discounts.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
