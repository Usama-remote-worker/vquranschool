import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Users, Video, Clock, Star, CheckCircle, Globe, Award, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "Online Quran Classes UK | #1 Quran Academy for Kids in London, Manchester & Birmingham",
    description:
        "Join vQuranSchool for premium 1-on-1 online Quran classes in the UK. Certified male & female tutors teaching Noorani Qaida, Tajweed & Hifz at GMT/BST timings. Trusted by 200+ British Muslim families. Book your FREE trial today!",
    keywords: [
        "online quran classes uk",
        "quran classes for kids london",
        "quran teacher uk",
        "learn quran online birmingham",
        "tajweed classes manchester",
        "online quran academy uk",
        "female quran tutor uk",
        "quran lessons for children uk",
        "online quran school glasgow"
    ],
    alternates: { canonical: "https://vquranschool.com/online-quran-classes-uk" },
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What are the timings for online Quran classes in the UK?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We offer 24/7 flexible scheduling. Most our UK students prefer classes between 4 PM to 8 PM GMT/BST on weekdays, and morning slots on weekends. You can choose any time that suits your child's school routine.",
            },
        },
        {
            "@type": "Question",
            name: "Do you have female Quran teachers for girls in the UK?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, we have a large team of certified female Quran tutors available specifically for our UK-based sisters and young girls, ensuring a comfortable and secure learning environment.",
            },
        },
    ],
};

export default function UKLandingPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <div className="flex flex-col min-h-screen bg-slate-50">
                {/* ── HERO SECTION ── */}
                <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 bg-blue-950 overflow-hidden text-white">
                    <div className="absolute inset-0 z-0 opacity-20">
                        <Image
                            src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000&auto=format&fit=crop"
                            alt="London UK Quran Classes"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900 to-transparent" />
                    </div>

                    <div className="container px-4 mx-auto relative z-10">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/30 border border-blue-400/30 text-blue-200 text-xs font-bold tracking-widest uppercase mb-6">
                                🇬🇧 Serving 200+ Families Across the UK
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black font-serif leading-tight mb-6">
                                Premium Online Quran Classes for Kids in the <span className="text-blue-400">United Kingdom</span>
                            </h1>
                            <p className="text-xl text-blue-100 font-light leading-relaxed mb-10">
                                1-on-1 personalized Quran learning with certified tutors from the comfort of your home. 
                                Flexible GMT/BST timings for students in **London, Manchester, Birmingham, and Glasgow**.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/book-trial">
                                    <Button className="h-14 px-10 bg-white text-blue-900 hover:bg-blue-50 font-black text-lg rounded-2xl shadow-xl">
                                        Book Free Trial Class 🇬🇧
                                    </Button>
                                </Link>
                                <div className="flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                                    <span className="text-sm font-bold">DBS Checked Environment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── UK SPECIFIC BENEFITS ── */}
                <section className="py-24 bg-white">
                    <div className="container px-4 mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-4xl font-black text-slate-900 font-serif mb-4">Tailored for British Muslim Families</h2>
                            <p className="text-slate-500 text-lg">We understand the challenges of raising children in the West. Our academy bridges the gap by providing authentic Islamic education that fits your busy UK lifestyle.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {[
                                { 
                                    title: "GMT/BST Scheduling", 
                                    desc: "No more waking up early or staying up late. We have dedicated tutors available during UK after-school hours.",
                                    icon: Clock
                                },
                                { 
                                    title: "Fluent English Tutors", 
                                    desc: "Our teachers speak clear English and can explain complex Quranic concepts in a way UK-born kids understand.",
                                    icon: Users
                                },
                                { 
                                    title: "British Curriculum Sync", 
                                    desc: "We balance our lessons so they don't overwhelm children who already have heavy UK school workloads.",
                                    icon: BookOpen
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 group hover:bg-blue-600 transition-all duration-500">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                                        <item.icon className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed group-hover:text-blue-100 transition-colors">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PRICING STRIP (UK) ── */}
                <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <Zap className="w-[500px] h-[500px] absolute -top-40 -left-40" />
                    </div>
                    <div className="container px-4 mx-auto text-center relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black mb-8">Affordable Plans for Every UK Home</h2>
                        <div className="flex flex-wrap justify-center gap-10">
                            <div className="space-y-2">
                                <p className="text-blue-400 font-bold uppercase tracking-widest text-xs">Starting from</p>
                                <p className="text-5xl font-black">£35<span className="text-xl text-slate-500">/mo</span></p>
                            </div>
                            <div className="h-20 w-px bg-white/10 hidden md:block" />
                            <div className="max-w-md text-left">
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    Get premium 1-on-1 education for less than the cost of a local tutor. Quality learning shouldn't be expensive.
                                </p>
                                <Link href="/pricing">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl font-bold h-12">
                                        View All UK Plans →
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FAQ SECTION (UK Focused) ── */}
                <section className="py-24 bg-white">
                    <div className="container px-4 mx-auto max-w-4xl">
                        <h2 className="text-3xl font-black text-center mb-16 font-serif">Frequently Asked Questions for UK Students</h2>
                        <div className="space-y-6">
                            {[
                                { q: "Are your teachers available during UK winter/summer time changes?", a: "Yes, our system automatically adjusts for Daylight Saving Time (BST to GMT) so your class timings remain consistent throughout the year." },
                                { q: "Can I choose a female teacher for my daughter in London?", a: "Absolutely. We have a dedicated panel of qualified sisters for female students to ensure comfort and proper Islamic etiquette." },
                                { q: "How do I pay from the UK?", a: "You can pay securely using any UK Debit/Credit card via our SadaBiz link, or via Wise/Direct Bank Transfer. We provide invoices in GBP if requested." }
                            ].map((faq, i) => (
                                <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{faq.q}</h3>
                                    <p className="text-slate-600 leading-relaxed font-light">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

function Button({ children, className, ...props }: any) {
    return (
        <button 
            className={`flex items-center justify-center transition-all active:scale-95 ${className}`} 
            {...props}
        >
            {children}
        </button>
    );
}
