import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Users, Video, Clock, Star, CheckCircle, Globe, Award, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "Online Quran Classes USA & Canada | Certified Tutors for Kids in EST, CST, PST",
    description:
        "Premium 1-on-1 online Quran classes for kids and adults across USA & Canada. Expert male & female tutors teaching Tajweed, Hifz & Noorani Qaida at EST, CST, and PST timings. Trusted by 300+ North American families. Start your FREE trial!",
    keywords: [
        "online quran classes usa",
        "quran classes for kids canada",
        "quran teacher new york",
        "learn quran online california",
        "tajweed classes toronto",
        "online quran academy usa",
        "female quran tutor usa",
        "quran lessons for children texas",
        "online quran school chicago"
    ],
    alternates: { canonical: "https://vquranschool.com/online-quran-classes-usa-canada" },
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Do you have Quran classes at EST and PST timings?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! We have dedicated teachers working on North American shifts. Whether you are in New York (EST) or California (PST), we can provide classes during your preferred morning or evening slots.",
            },
        },
        {
            "@type": "Question",
            name: "Can I pay in USD or CAD?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely. Our payment system accepts all major North American credit and debit cards. You can pay in USD, and your bank will automatically handle the conversion if you're in Canada.",
            },
        },
    ],
};

export default function USACanadaLandingPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <div className="flex flex-col min-h-screen bg-slate-50">
                {/* ── HERO SECTION ── */}
                <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 bg-indigo-950 overflow-hidden text-white">
                    <div className="absolute inset-0 z-0 opacity-20">
                        <Image
                            src="https://images.unsplash.com/photo-1508433957232-310ae4fd29b2?q=80&w=2000&auto=format&fit=crop"
                            alt="USA Canada Quran Classes"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-indigo-900 to-transparent" />
                    </div>

                    <div className="container px-4 mx-auto relative z-10">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/30 border border-indigo-400/30 text-indigo-200 text-xs font-bold tracking-widest uppercase mb-6">
                                🇺🇸🇨🇦 Trusted by 300+ North American Families
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black font-serif leading-tight mb-6">
                                Online Quran Academy for Kids in <span className="text-indigo-400">USA & Canada</span>
                            </h1>
                            <p className="text-xl text-indigo-100 font-light leading-relaxed mb-10">
                                1-on-1 personalized Quran learning with certified tutors tailored to your timezone. 
                                Flexible slots for **New York, Houston, Los Angeles, and Toronto**.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/book-trial">
                                    <Button className="h-14 px-10 bg-white text-indigo-900 hover:bg-indigo-50 font-black text-lg rounded-2xl shadow-xl">
                                        Book Free Trial Class 🇺🇸🇨🇦
                                    </Button>
                                </Link>
                                <div className="flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                                    <Globe className="w-6 h-6 text-indigo-300" />
                                    <span className="text-sm font-bold">Native Urdu & English Speakers</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── BENEFITS SECTION ── */}
                <section className="py-24 bg-white">
                    <div className="container px-4 mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-4xl font-black text-slate-900 font-serif mb-4">Quranic Excellence in North America</h2>
                            <p className="text-slate-500 text-lg">Preserving Islamic identity and Quranic literacy for the next generation of American and Canadian Muslims.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            {[
                                { 
                                    title: "EST/CST/PST Coverage", 
                                    desc: "Our teachers work across all North American timezones, ensuring your child can learn after school or during weekends comfortably.",
                                    icon: Clock
                                },
                                { 
                                    title: "Certified Hafiz Tutors", 
                                    desc: "Learn from the best. Our tutors are graduates of reputable Islamic universities with specialized training in online pedagogy.",
                                    icon: Award
                                },
                                { 
                                    title: "1-on-1 Interaction", 
                                    desc: "No group distractions. Your child gets 100% of the teacher's attention for faster progress and perfect Tajweed.",
                                    icon: Video
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 group hover:bg-indigo-600 transition-all duration-500">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                                        <item.icon className="w-8 h-8 text-indigo-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed group-hover:text-indigo-100 transition-colors">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PRICING SECTION ── */}
                <section className="py-32 bg-indigo-50 border-t border-indigo-100">
                    <div className="container px-4 mx-auto text-center">
                        <h2 className="text-4xl font-black text-slate-900 mb-16 font-serif">Transparent North American Plans</h2>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white p-10 rounded-[40px] border border-indigo-200 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-6 py-1.5 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest">
                                    Best for Progress
                                </div>
                                <h3 className="text-2xl font-bold text-indigo-900 mb-2">3 Classes / Week</h3>
                                <p className="text-slate-500 mb-6">Ideal for steady learning</p>
                                <div className="flex items-baseline justify-center gap-1 mb-8">
                                    <span className="text-5xl font-black text-indigo-600">$48</span>
                                    <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">/ Month</span>
                                </div>
                                <Link href="/book-trial">
                                    <Button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold">
                                        Start with Free Trial
                                    </Button>
                                </Link>
                            </div>
                            <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">5 Classes / Week</h3>
                                <p className="text-slate-500 mb-6">Fastest memorization track</p>
                                <div className="flex items-baseline justify-center gap-1 mb-8">
                                    <span className="text-5xl font-black text-slate-900">$99</span>
                                    <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">/ Month</span>
                                </div>
                                <Link href="/book-trial">
                                    <Button className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold">
                                        Start with Free Trial
                                    </Button>
                                </Link>
                            </div>
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
