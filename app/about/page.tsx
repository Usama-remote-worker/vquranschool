import { BookOpen, Users, Globe, Trophy, ShieldCheck, Heart, Lightbulb, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    const stats = [
        { label: "Active Students", value: "500+", icon: Users },
        { label: "Expert Tutors", value: "50+", icon: Trophy },
        { label: "Countries Reached", value: "25+", icon: Globe },
        { label: "Courses Offered", value: "12+", icon: BookOpen },
    ];

    const values = [
        {
            title: "Traditional values, modern reach",
            description: "We combine classical Quranic teaching methods with cutting-edge online technology.",
            icon: Lightbulb
        },
        {
            title: "Expertly Certified Tutors",
            description: "All our teachers are vetted and hold certifications from renowned Islamic institutions.",
            icon: ShieldCheck
        },
        {
            title: "Student-Centered Learning",
            description: "Every lesson is tailored to the individual pace and learning style of the student.",
            icon: Heart
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 -z-10"></div>
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-40"></div>
                
                <div className="container px-4 md:px-6 mx-auto text-center relative">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase mb-8 animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Learn About Us
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-blue-950 mb-8 font-serif leading-[1.1]">
                        Our Mission to Spread <br /> 
                        <span className="text-blue-600 italic">Quranic Enlightenment</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed mb-10">
                        We are a community of dedicated educators and learners committed to making authentic Quranic education accessible, engaging, and transformational for families around the world.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 -mt-12 relative z-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-blue-900/5 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                                    <stat.icon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="text-3xl font-bold text-blue-950 mb-1">{stat.value}</div>
                                <div className="text-slate-500 text-sm font-light">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 lg:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-blue-50 rounded-[40px] -z-10 group-hover:bg-blue-100/50 transition-colors"></div>
                            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2000&auto=format&fit=crop"
                                    alt="Learning Center"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white p-4 rounded-3xl shadow-2xl hidden md:block border border-slate-100">
                                <div className="w-full h-full rounded-2xl bg-blue-600 flex flex-col items-center justify-center text-white p-4 text-center">
                                    <div className="text-3xl font-bold mb-1">10+</div>
                                    <div className="text-[10px] uppercase tracking-wider font-bold opacity-80 leading-tight">Years of Excellence in Quran Teaching</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 leading-tight font-serif mb-6">
                                    Quality Islamic Education, <br /> Delivered to Your Home
                                </h2>
                                <p className="text-slate-600 text-lg leading-relaxed font-light">
                                    VQuran School was founded on a simple belief: that every Muslim, regardless of location or busy lifestyle, deserves access to high-quality, authentic Quranic teaching.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    "Customized learning plans for all ages",
                                    "Female teachers available for sisters and children",
                                    "Flexible scheduling to fit your time zone",
                                    "Progress tracking and regular evaluations"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <span className="text-slate-700 font-light">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-slate-600 text-lg leading-relaxed font-light">
                                Our platform bridges the gap between traditional wisdom and modern lifestyle, ensuring that the next generation remains connected to their heritage and the Word of Allah.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-blue-950 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>
                
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 italic">Our Core Values</h2>
                        <div className="w-20 h-1.5 bg-blue-500 mx-auto rounded-full mb-8"></div>
                        <p className="text-blue-100/70 text-lg font-light leading-relaxed">
                            These principles guide every interaction and every lesson we provide at VQuran School.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((v, idx) => (
                            <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-[32px] hover:bg-white/10 transition-colors">
                                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-8 shadow-lg shadow-blue-600/20">
                                    <v.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{v.title}</h3>
                                <p className="text-blue-100/60 font-light leading-relaxed">
                                    {v.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 lg:py-32">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto bg-blue-50 rounded-[48px] p-12 md:p-20 relative overflow-hidden">
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-100 rounded-full blur-[80px] opacity-60"></div>
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-200 rounded-full blur-[80px] opacity-60"></div>
                        
                        <h2 className="text-3xl md:text-5xl font-bold text-blue-950 font-serif mb-8 relative z-10">
                            Start Your Spiritual Journey <br /> With Us Today
                        </h2>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <Link href="/book-trial">
                                <Button className="h-16 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-xl shadow-blue-600/20 transition-all hover:scale-105">
                                    Book Your Free Trial
                                </Button>
                            </Link>
                            <Link href="/courses">
                                <Button variant="outline" className="h-16 px-10 rounded-2xl bg-white border-blue-200 text-blue-950 font-bold text-lg hover:bg-blue-50 transition-all">
                                    Explore Courses
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
