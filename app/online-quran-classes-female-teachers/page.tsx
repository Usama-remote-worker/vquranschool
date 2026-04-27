import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
    ShieldCheck, 
    Heart, 
    BookOpen, 
    Star, 
    CheckCircle, 
    MessageCircle, 
    Users, 
    Award,
    Clock,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Female Quran Teacher Online | Certified English Speaking Tutors | vQuranSchool",
    description:
        "Looking for a female Quran teacher online? vQuranSchool offers 1-on-1 live classes with certified, English-speaking Hafiza and Alima tutors for kids and sisters worldwide. Safe, private, and professional learning environment.",
    keywords: [
        "female quran teacher online",
        "online quran classes with female teachers",
        "lady quran tutor",
        "female tajweed teacher online",
        "certified female quran teacher",
        "english speaking female quran teacher",
        "quran classes for sisters",
        "online hifz for females"
    ],
    alternates: { canonical: "https://vquranschool.com/online-quran-classes-female-teachers" },
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Can I request a specific female Quran teacher?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, during your free trial, you can specify your preferences. We have a diverse panel of certified female tutors from different backgrounds to ensure you or your child feels comfortable.",
            },
        },
        {
            "@type": "Question",
            name: "Are your female teachers fluent in English?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely. We specialize in teachers who are native or highly fluent English speakers, specifically to help kids and sisters living in the West understand Quranic concepts clearly.",
            },
        },
    ],
};

export default function FemaleTeachersPillarPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <div className="flex flex-col min-h-screen bg-white">
                {/* ── HERO SECTION ── */}
                <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-pink-50/50 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-pink-100/30 -skew-x-12 translate-x-20 pointer-events-none" />
                    
                    <div className="container px-4 mx-auto relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-xs font-black uppercase tracking-widest border border-pink-200">
                                    🌸 Exclusively for Kids & Sisters
                                </div>
                                <h1 className="text-5xl md:text-6xl font-black text-slate-900 font-serif leading-[1.1]">
                                    Learn Quran with <br />
                                    <span className="text-pink-600 italic">Certified</span> Female <br />
                                    Tutors Online
                                </h1>
                                <p className="text-xl text-slate-600 font-light leading-relaxed max-w-xl">
                                    Experience the comfort and safety of 1-on-1 live sessions with our expert, 
                                    English-speaking female scholars. Tailored for children and sisters worldwide.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/book-trial">
                                        <Button className="h-14 px-10 bg-pink-600 hover:bg-pink-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-pink-600/20 active:scale-95 transition-all">
                                            Book Free Trial Class
                                        </Button>
                                    </Link>
                                    <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-pink-100 shadow-sm">
                                        <ShieldCheck className="w-6 h-6 text-pink-500" />
                                        <span className="text-sm font-bold text-slate-700">100% Private & Secure</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-square relative rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
                                    <Image 
                                        src="/images/teachers/hero_teacher.png"
                                        alt="Mother and daughter learning Quran"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                {/* Floating Trust Card */}
                                <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-pink-50 space-y-3 max-w-[240px] hidden md:block animate-bounce-slow">
                                    <div className="flex gap-1">
                                        {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                                    </div>
                                    <p className="text-sm font-bold text-slate-800">"The most patient teacher my daughter has ever had."</p>
                                    <p className="text-xs text-slate-400">— Sarah, London</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── WHY FEMALE TUTORS ── */}
                <section className="py-24 bg-white">
                    <div className="container px-4 mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-4xl font-black text-slate-900 font-serif mb-4">Why Choose a Female Quran Tutor?</h2>
                            <p className="text-slate-500 text-lg">We provide a nurturing environment where sisters and children can thrive without any hesitation.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { 
                                    title: "Comfort & Modality", 
                                    desc: "Our sisters-only classes provide the ultimate privacy and comfort for adult learners and young girls.",
                                    icon: Heart,
                                    color: "bg-pink-50 text-pink-600"
                                },
                                { 
                                    title: "Expert Tajweed", 
                                    desc: "Master the rules of recitation with teachers who understand the nuances of female phonetics and voice modulation.",
                                    icon: Award,
                                    color: "bg-purple-50 text-purple-600"
                                },
                                { 
                                    title: "Emotional Safety", 
                                    desc: "Female tutors often build a stronger emotional bond with young children, making the learning journey joyful.",
                                    icon: ShieldCheck,
                                    color: "bg-blue-50 text-blue-600"
                                }
                            ].map((item, i) => (
                                <div key={i} className="p-10 rounded-[40px] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 text-center flex flex-col items-center">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${item.color}`}>
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                    <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── QUALIFICATIONS ── */}
                <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -ml-48 -mb-48" />
                    
                    <div className="container px-4 mx-auto grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative order-2 lg:order-1">
                            {/* Premium Image Grid */}
                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                <div className="space-y-6">
                                    <div className="aspect-[4/5] rounded-[40px] overflow-hidden relative border border-white/10 group shadow-2xl">
                                        <Image 
                                            src="/images/teachers/female_teacher.png" 
                                            fill 
                                            alt="Certified Female Quran Teacher" 
                                            className="object-cover group-hover:scale-110 transition-transform duration-700" 
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <p className="text-xs font-bold text-white/90 tracking-widest uppercase">Verified Expert</p>
                                        </div>
                                    </div>
                                    <div className="aspect-square rounded-[40px] overflow-hidden relative border border-white/10 group shadow-xl">
                                        <Image 
                                            src="/images/teachers/graduation.png" 
                                            fill 
                                            alt="Academic Excellence" 
                                            className="object-cover group-hover:scale-110 transition-transform duration-700" 
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                        <div className="absolute top-4 left-4 bg-pink-600/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                                            Vetted
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6 pt-12">
                                    <div className="aspect-[3/4] rounded-[40px] overflow-hidden relative border border-white/10 group shadow-2xl">
                                        <Image 
                                            src="/images/teachers/quran_setup.png" 
                                            fill 
                                            alt="Premium Quran Study Setup" 
                                            className="object-cover group-hover:scale-110 transition-transform duration-700" 
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    </div>
                                    <div className="bg-gradient-to-br from-pink-600/30 to-blue-600/20 backdrop-blur-xl border border-white/10 aspect-square rounded-[40px] flex flex-col items-center justify-center text-center p-8 shadow-2xl">
                                        <Award className="w-12 h-12 text-pink-400 mb-4" />
                                        <p className="text-3xl font-black font-serif text-white">100%</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-pink-200">Certified Tutors</p>
                                    </div>
                                </div>
                            </div>
                            {/* Glow Behind Grid */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/5 rounded-full blur-[100px] -z-10" />
                        </div>
                        
                        <div className="space-y-10 order-1 lg:order-2">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-black font-serif leading-tight">Highly Qualified & <br /><span className="text-pink-400 italic underline decoration-blue-500/30 underline-offset-8">Vetted</span> Teachers</h2>
                                <div className="w-20 h-1.5 bg-blue-500 rounded-full" />
                            </div>
                            <p className="text-slate-400 text-lg leading-relaxed font-light">
                                We follow a **top 1% selection process**. Each tutor undergoes background checks, tajweed certifications, and pedagogical testing to ensure a premium learning experience.
                            </p>
                            <ul className="grid gap-6">
                                {[
                                    "Graduates from recognized Islamic Universities",
                                    "Certified Hafizas and Tajweed Masters",
                                    "Background checked and professionally vetted",
                                    "Native or Fluent English Speakers"
                                ].map((list, li) => (
                                    <li key={li} className="flex items-center gap-4">
                                        <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                                        <span className="text-lg font-medium text-slate-200">{list}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-6">
                                <Link href="/register-student">
                                    <Button className="h-14 px-10 bg-white text-slate-900 hover:bg-slate-100 font-black text-lg rounded-2xl shadow-xl">
                                        Meet a Teacher Today
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── COURSE SLOTS ── */}
                <section className="py-24 bg-white">
                    <div className="container px-4 mx-auto text-center">
                        <h2 className="text-4xl font-black text-slate-900 font-serif mb-16">Available Slots for Kids & Sisters</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { time: "Morning Slots", slots: "Available", icon: Clock },
                                { time: "Afternoon Slots", slots: "Limited", icon: Zap },
                                { time: "Evening Slots", slots: "Popular", icon: Users },
                                { time: "Weekend Slots", slots: "Filling Fast", icon: Award }
                            ].map((slot, i) => (
                                <div key={i} className="p-6 rounded-3xl border border-slate-100 bg-slate-50 space-y-3">
                                    <slot.icon className="w-8 h-8 text-pink-600 mx-auto" />
                                    <h3 className="font-bold text-slate-900">{slot.time}</h3>
                                    <p className={`text-xs font-black uppercase tracking-widest ${slot.slots === 'Available' ? 'text-emerald-500' : 'text-pink-500'}`}>{slot.slots}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="py-24 bg-pink-600 text-white text-center relative overflow-hidden">
                    <div className="container px-4 mx-auto relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black font-serif mb-6">Ready to Start Your Journey?</h2>
                        <p className="text-pink-100 text-xl mb-10 max-w-2xl mx-auto font-light">
                            Join 500+ sisters and children learning Quran online. Book your free 1-on-1 demo with a female tutor today.
                        </p>
                        <div className="flex justify-center">
                            <Link href="/book-trial">
                                <Button className="h-16 px-12 bg-white text-pink-600 hover:bg-pink-50 font-black text-xl rounded-2xl shadow-2xl">
                                    Book Free Trial Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
