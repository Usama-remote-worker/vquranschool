import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
    MapPin, 
    Star, 
    CheckCircle, 
    ShieldCheck, 
    Users, 
    Award,
    Clock,
    Video
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
    params: { city: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);
    return {
        title: `Online Quran Classes in ${city} | Female Quran Tutors | vQuranSchool`,
        description: `Premium 1-on-1 online Quran classes for kids and sisters in ${city}. Certified female English-speaking tutors teaching Tajweed and Hifz. Book your free trial in ${city} today!`,
        keywords: [
            `online quran classes ${params.city}`,
            `quran teacher ${params.city}`,
            `female quran tutor ${params.city}`,
            `learn quran online ${params.city}`,
            `tajweed classes ${params.city}`
        ],
        alternates: { canonical: `https://vquranschool.com/city/${params.city}` },
    };
}

export default function CityLandingPage({ params }: PageProps) {
    const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": `vQuranSchool ${city}`,
        "image": "https://vquranschool.com/logo.png",
        "@id": `https://vquranschool.com/city/${params.city}`,
        "url": `https://vquranschool.com/city/${params.city}`,
        "telephone": "+923044296295",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Virtual Campus",
            "addressLocality": city,
            "addressCountry": "Global"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 0,
            "longitude": 0
        },
        "areaServed": {
            "@type": "City",
            "name": city
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />

            <div className="flex flex-col min-h-screen bg-white">
                {/* ── HERO SECTION ── */}
                <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-slate-900 overflow-hidden text-white">
                    <div className="absolute inset-0 z-0 opacity-30">
                        <Image 
                            src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=2000&auto=format&fit=crop"
                            alt={`${city} Quran Learning`}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900" />
                    </div>
                    
                    <div className="container px-4 mx-auto relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-widest mb-8">
                            <MapPin className="w-4 h-4" /> Now Serving the {city} Muslim Community
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black font-serif leading-tight mb-8">
                            Learn Quran Online in <br /><span className="text-blue-400">{city}</span>
                        </h1>
                        <p className="text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto mb-12">
                            Join the #1 Academy for Overseas Families. Experience 1-on-1 sessions with 
                            certified female English-speaking scholars, tailored for the {city} lifestyle.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/book-trial">
                                <Button className="h-16 px-12 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl rounded-2xl shadow-2xl shadow-blue-600/30 active:scale-95 transition-all">
                                    Book Free Trial Class
                                </Button>
                            </Link>
                            <div className="flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                                <span className="text-sm font-bold">100% Safe & Secure Learning</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CITY BENEFITS ── */}
                <section className="py-24 bg-white">
                    <div className="container px-4 mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h2 className="text-4xl font-black text-slate-900 font-serif">Why Parents in <span className="text-blue-600">{city}</span> Trust Us</h2>
                                <p className="text-slate-500 text-lg leading-relaxed">
                                    Raising children in a fast-paced city like {city} comes with challenges. 
                                    We bridge the gap by providing authentic Islamic education that fits your local timezone and school schedule.
                                </p>
                                <div className="grid gap-6">
                                    {[
                                        { title: "Flexible Timing", desc: `Classes scheduled according to ${city} school hours and weekends.`, icon: Clock },
                                        { title: "Female Tutors", desc: "Private 1-on-1 sessions with highly qualified female scholars.", icon: Users },
                                        { title: "English Fluency", desc: "Our teachers speak clear English to ensure effective communication with kids.", icon: Award }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-6 p-6 rounded-3xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-300">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
                                                <item.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                                                <p className="text-slate-500 text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-square relative rounded-[60px] overflow-hidden shadow-2xl border-8 border-slate-50">
                                    <Image 
                                        src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1200&auto=format&fit=crop"
                                        alt={`${city} Student`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="py-24 bg-blue-600 text-white text-center relative overflow-hidden">
                    <div className="container px-4 mx-auto relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black font-serif mb-6">Start Your Journey in {city} Today</h2>
                        <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto font-light">
                            Join hundreds of families in {city} who have transformed their children's Quranic literacy with vQuranSchool.
                        </p>
                        <div className="flex justify-center">
                            <Link href="/book-trial">
                                <Button className="h-16 px-12 bg-white text-blue-600 hover:bg-blue-50 font-black text-xl rounded-2xl shadow-2xl shadow-black/20">
                                    Claim Your Free Demo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
