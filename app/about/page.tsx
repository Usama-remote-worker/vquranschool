import type { Metadata } from "next";
import { BookOpen, Users, Globe, Trophy, ShieldCheck, Heart, Lightbulb, CheckCircle2, Star, Clock, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About vQuranSchool – Trusted Online Quran Academy for UK, USA & Canada",
  description:
    "Learn about vQuranSchool, a leading online Quran academy trusted by 500+ families in the UK, USA, Canada & Australia. Certified male & female tutors, flexible scheduling, and proven Quran learning programs.",
  alternates: { canonical: "https://vquranschool.com/about" },
  openGraph: {
    title: "About vQuranSchool – Trusted Online Quran Academy",
    description: "500+ families trust vQuranSchool for online Quran classes. Certified tutors, flexible scheduling, all age groups. Serving UK, USA, Canada & Australia.",
    url: "https://vquranschool.com/about",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About vQuranSchool – Online Quran Academy",
  description: "vQuranSchool is a globally trusted online Quran academy offering certified 1-on-1 Quran classes for kids and adults in the UK, USA, Canada, Australia, and beyond.",
  mainEntity: {
    "@type": "EducationalOrganization",
    name: "vQuranSchool",
    foundingDate: "2016",
    numberOfEmployees: { "@type": "QuantitativeValue", value: "50" },
    areaServed: ["GB", "US", "CA", "AU", "PK", "IN", "AE"],
  },
};

const stats = [
  { label: "Active Students Worldwide", value: "500+", icon: Users, color: "text-blue-600" },
  { label: "Certified Quran Tutors", value: "50+", icon: Trophy, color: "text-blue-600" },
  { label: "Countries Served", value: "25+", icon: Globe, color: "text-blue-600" },
  { label: "Years of Excellence", value: "10+", icon: Award, color: "text-blue-600" },
];

const values = [
  {
    title: "Authentic Islamic Teaching Methods",
    description: "We combine classical Quranic teaching with modern online technology to deliver authentic Madrasah-quality education from anywhere in the world.",
    icon: Lightbulb,
  },
  {
    title: "Verified & Certified Tutors",
    description: "Every teacher is rigorously vetted, holds certifications from recognized Islamic institutions, and has proven online teaching experience.",
    icon: ShieldCheck,
  },
  {
    title: "Personalized 1-on-1 Learning",
    description: "Every lesson is tailored to the individual pace, age, and learning style of the student — no crowded group classes, just focused 1-on-1 attention.",
    icon: Heart,
  },
];

const whyItems = [
  "Customized learning plans for children, teens & adults",
  "Female Quran tutors available for sisters and girls",
  "Flexible scheduling — morning, evening, or weekends",
  "Students across UK, USA, Canada, Australia & 25+ countries",
  "Monthly progress reports & regular evaluations",
  "Ijazah certification pathway for advanced students",
  "Trial class 100% free — no credit card required",
  "Secure, private 1-on-1 video classroom environment",
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <div className="flex flex-col min-h-screen bg-white">

        {/* ── HERO ── */}
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 -z-10" />
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-40" />

          <div className="container px-4 md:px-6 mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              Trusted Online Quran Academy Since 2016
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-blue-950 mb-8 font-serif leading-[1.1]">
              About vQuranSchool —<br />
              <span className="text-blue-600 italic">Where Quran Education Meets Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed mb-6">
              We are a globally trusted online Quran academy dedicated to making authentic, high-quality Quranic education accessible to Muslim families everywhere — from London to Los Angeles, Toronto to Sydney.
            </p>
            <p className="text-base text-slate-500 max-w-2xl mx-auto font-light">
              Our certified male and female tutors deliver personalized 1-on-1 live classes in Noorani Qaida, Tajweed, Nazra, and Hifz for all ages and levels.
            </p>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-12 -mt-12 relative z-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-blue-900/5 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-blue-950 mb-1">{stat.value}</div>
                  <div className="text-slate-500 text-sm font-light">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUR STORY ── */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-blue-50 rounded-[40px] -z-10 group-hover:bg-blue-100/50 transition-colors" />
                <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2000&auto=format&fit=crop"
                    alt="Online Quran learning environment"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white p-4 rounded-3xl shadow-2xl hidden md:block border border-slate-100">
                  <div className="w-full h-full rounded-2xl bg-blue-600 flex flex-col items-center justify-center text-white p-4 text-center">
                    <div className="flex gap-0.5 mb-2">{[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-white text-white" />)}</div>
                    <div className="text-2xl font-bold">4.9/5</div>
                    <div className="text-[10px] uppercase tracking-wider font-bold opacity-80 leading-tight mt-1">Average Rating from 500+ Reviews</div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Our Mission</p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 leading-tight font-serif mb-6">
                    Quality Quran Education,<br />Delivered Directly to You
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed font-light">
                    vQuranSchool was founded on one belief: every Muslim — regardless of where they live or how busy their schedule is — deserves access to authentic, high-quality Quranic teaching. Whether you&apos;re in the UK, USA, Canada, or Australia, our certified tutors bring the Quran to your home.
                  </p>
                </div>

                <div className="space-y-3">
                  {whyItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-slate-700 font-light">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/book-trial">
                    <button className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all hover:scale-105">
                      Book Free Trial Class
                    </button>
                  </Link>
                  <Link href="/teachers">
                    <button className="h-14 px-8 border-2 border-slate-200 text-blue-950 hover:bg-slate-50 rounded-2xl font-bold transition-all">
                      Meet Our Tutors
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CORE VALUES ── */}
        <section className="py-24 bg-blue-950 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 italic">Our Core Values</h2>
              <div className="w-20 h-1.5 bg-blue-500 mx-auto rounded-full mb-8" />
              <p className="text-blue-100/70 text-lg font-light leading-relaxed">
                These principles guide every interaction and every lesson we deliver at vQuranSchool.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-[32px] hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-8 shadow-lg shadow-blue-600/20">
                    <v.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{v.title}</h3>
                  <p className="text-blue-100/60 font-light leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHICH COUNTRIES WE SERVE ── */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-blue-950 font-serif mb-4">Online Quran Classes Available Worldwide</h2>
            <p className="text-slate-500 mb-10 font-light max-w-xl mx-auto">
              Our flexible scheduling ensures students from every time zone can join live Quran classes.
            </p>
            <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
              {["🇬🇧 United Kingdom", "🇺🇸 United States", "🇨🇦 Canada", "🇦🇺 Australia", "🇦🇪 UAE", "🇵🇰 Pakistan", "🇮🇳 India", "🇸🇦 Saudi Arabia", "🇲🇾 Malaysia", "🇿🇦 South Africa", "🇩🇪 Germany", "🇫🇷 France"].map((c) => (
                <span key={c} className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-full text-sm text-slate-600 font-medium">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 lg:py-32">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto bg-blue-50 rounded-[48px] p-12 md:p-20 relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-100 rounded-full blur-[80px] opacity-60" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-200 rounded-full blur-[80px] opacity-60" />
              <h2 className="text-3xl md:text-5xl font-bold text-blue-950 font-serif mb-6 relative z-10">
                Start Your Quran Journey Today — <br />
                <span className="text-blue-600">First Class is FREE</span>
              </h2>
              <p className="text-slate-600 text-lg font-light mb-8 relative z-10 max-w-2xl mx-auto">
                Join 500+ Muslim families from the UK, USA, Canada &amp; Australia who trust vQuranSchool for authentic Quran education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link href="/book-trial">
                  <button className="h-16 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-xl shadow-blue-600/20 transition-all hover:scale-105">
                    Book Free Trial Class →
                  </button>
                </Link>
                <Link href="/courses">
                  <button className="h-16 px-10 rounded-2xl bg-white border-2 border-blue-200 text-blue-950 font-bold text-lg hover:bg-blue-50 transition-all">
                    View All Courses
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
