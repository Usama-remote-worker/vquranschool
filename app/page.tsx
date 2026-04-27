import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Users, Video, Clock, Star, CheckCircle, Globe, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Online Quran Classes | Learn Quran with Certified Tutors | vQuranSchool",
  description:
    "Start online Quran classes today with vQuranSchool. 1-on-1 live sessions with certified male & female tutors. Noorani Qaida, Tajweed, Hifz & Islamic Studies. Serving UK, USA, Canada, Australia. Book your FREE trial class!",
  alternates: { canonical: "https://vquranschool.com" },
  openGraph: {
    title: "vQuranSchool – #1 Online Quran Academy | Book Free Trial",
    description: "1-on-1 live online Quran classes with certified tutors. Tajweed, Hifz, Nazra for all ages. Trusted by 500+ families in UK, USA, Canada & Australia.",
    url: "https://vquranschool.com",
  },
};

// JSON-LD data for courses — helps rank in Google's course carousels
const coursesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Online Quran Courses at vQuranSchool",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Course",
        name: "Noorani Qaida for Beginners",
        description: "Learn the Arabic alphabet and fundamentals of Quranic pronunciation. Perfect for children and adults with no prior knowledge.",
        provider: { "@type": "Organization", name: "vQuranSchool", sameAs: "https://vquranschool.com" },
        url: "https://vquranschool.com/courses",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free trial class available" },
        hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Course",
        name: "Quran Reading with Tajweed",
        description: "Master the rules of Tajweed (proper Quranic recitation) and read the Holy Quran fluently with correct pronunciation.",
        provider: { "@type": "Organization", name: "vQuranSchool", sameAs: "https://vquranschool.com" },
        url: "https://vquranschool.com/courses",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free trial class available" },
        hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Course",
        name: "Hifz ul Quran (Memorization Program)",
        description: "Commit the Holy Quran to memory under the guidance of our qualified Hafiz teachers with a structured and proven curriculum.",
        provider: { "@type": "Organization", name: "vQuranSchool", sameAs: "https://vquranschool.com" },
        url: "https://vquranschool.com/courses",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free trial class available" },
        hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online" },
      },
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I start online Quran classes at vQuranSchool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply click 'Book Free Trial', fill in your details, and we'll schedule a complimentary 1-on-1 demo class with a certified Quran tutor — no credit card required.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer Quran classes for kids in the UK, USA, and Canada?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! vQuranSchool serves students across the UK, USA, Canada, Australia, and many more countries. Our flexible scheduling accommodates every time zone.",
      },
    },
    {
      "@type": "Question",
      name: "Are your Quran tutors certified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All our tutors are verified, qualified, and hold certifications from recognized Islamic institutions. We have both male and female teachers available.",
      },
    },
    {
      "@type": "Question",
      name: "How much do online Quran classes cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your first trial class is completely free. After that, we offer flexible monthly plans starting from just $25/month for 2 classes per week.",
      },
    },
  ],
};

const aggregateRatingJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "vQuranSchool",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    ratingCount: "523",
    reviewCount: "523",
  },
};

const courses = [
  {
    title: "Noorani Qaida",
    description: "Master the Arabic alphabet & correct pronunciation. Ideal for absolute beginners and young children starting their Quranic journey.",
    level: "Beginner",
    icon: "📖",
    badge: "Most Popular",
  },
  {
    title: "Quran Nazra & Tajweed",
    description: "Fluently recite the Holy Quran with Tajweed rules. Learn proper Makharij (articulation points) and achieve beautiful recitation.",
    level: "Intermediate",
    icon: "🎙️",
    badge: "Best Value",
  },
  {
    title: "Hifz ul Quran",
    description: "Commit the Holy Quran to memory with our structured, proven memorization program under expert Hafiz/Hafiza teachers.",
    level: "Advanced",
    icon: "🏆",
    badge: "Premium",
  },
];

const features = [
  { icon: Video, title: "1-on-1 Live Classes", description: "Fully interactive personalized sessions via secure video call — no group classes, just you and your tutor." },
  { icon: Clock, title: "Flexible Scheduling", description: "Book classes at times that suit YOUR schedule and timezone — morning, evening, or weekends." },
  { icon: Users, title: "Certified Tutors", description: "All teachers are background-checked, qualified scholars with years of online teaching experience." },
  { icon: BookOpen, title: "Structured Curriculum", description: "Proven step-by-step learning paths from Noorani Qaida all the way to full Quran memorization." },
  { icon: Globe, title: "Global Students", description: "Join 500+ Muslim families from the UK, USA, Canada, Australia, and 25+ countries worldwide." },
  { icon: Award, title: "Progress Tracking", description: "Monthly evaluations, detailed progress reports, and Ijazah certification for advanced students." },
];

const testimonials = [
  {
    name: "Saira K.",
    role: "Parent — London, UK",
    content: "My children have progressed remarkably with vQuranSchool. The teachers are incredibly patient and the 1-on-1 focus is exactly what my kids needed. Highly recommend for any Muslim family abroad!",
    stars: 5,
    flag: "🇬🇧",
  },
  {
    name: "Omar J.",
    role: "Adult Student — New York, USA",
    content: "I was always anxious about making Tajweed mistakes, but my teacher made me feel comfortable from day one. The structured approach really works. I can now read Quran with confidence.",
    stars: 5,
    flag: "🇺🇸",
  },
  {
    name: "Fatima R.",
    role: "Hifz Student — Toronto, Canada",
    content: "The flexible scheduling lets me memorize Quran alongside university studies. My teacher tracks my progress closely and adjusts the pace. I've memorized 5 Juz in 8 months!",
    stars: 5,
    flag: "🇨🇦",
  },
];

const countries = ["🇬🇧 United Kingdom", "🇺🇸 United States", "🇨🇦 Canada", "🇦🇺 Australia", "🇦🇪 UAE", "🇵🇰 Pakistan", "🇮🇳 India", "🇸🇦 Saudi Arabia"];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingJsonLd) }}
      />

      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">

        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden pt-28 pb-36 lg:pt-44 lg:pb-48 flex items-center justify-center min-h-[95vh] bg-white border-b border-slate-200">
          {/* Background image */}
          <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1591118139502-31c195973fe1?q=80&w=2000&auto=format&fit=crop"
              alt="Children studying Quran"
              fill
              className="object-cover mix-blend-multiply"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/85 to-white" />
          </div>
          {/* Ambient glow */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-blue-100 blur-[150px] rounded-full opacity-60" />
            <div className="absolute bottom-[-5%] right-[-5%] w-[55%] h-[55%] bg-indigo-50 blur-[150px] rounded-full opacity-60" />
          </div>

          <div className="container px-4 md:px-6 relative z-10 mx-auto flex flex-col items-center">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
              <span className="flex gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</span>
              4.9/5 · Trusted by 500+ Families Worldwide
            </div>

            {/* H1 — main commercial keyword */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-blue-950 font-serif leading-[1.08] text-center max-w-5xl">
              Learn Quran Online with{" "}
              <span className="text-blue-600 italic">Certified Tutors</span>
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl font-semibold">From the Comfort of Home</span>
            </h1>

            {/* Subtitle — transactional intent keywords */}
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light mt-6 max-w-2xl mx-auto text-center">
              Premium <strong>1-on-1 live Quran classes</strong> for kids &amp; adults in the{" "}
              <strong>UK, USA, Canada &amp; Australia</strong>. Expert teachers for Noorani Qaida,
              Tajweed, Nazra &amp; Hifz. Your first class is <span className="text-blue-600 font-bold">FREE</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link href="/book-trial">
                <button className="h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-2xl shadow-blue-600/25 transition-all duration-300 hover:scale-105 hover:shadow-blue-600/40 flex items-center gap-2">
                  🎓 Book Free Trial Class
                </button>
              </Link>
              <Link href="/courses">
                <button className="h-14 px-10 border-2 border-slate-200 text-blue-900 hover:bg-slate-50 hover:border-blue-200 rounded-full font-bold text-lg transition-all duration-300 bg-white shadow-sm">
                  Explore Courses →
                </button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              {["✅ No Credit Card Required", "✅ Cancel Anytime", "✅ Certified Teachers", "✅ All Time Zones"].map((t) => (
                <span key={t} className="text-sm text-slate-500 font-medium bg-white/80 border border-slate-100 px-3 py-1.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>

            {/* Country flags */}
            <div className="mt-8 text-center">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">Students from</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {countries.map((c) => (
                  <span key={c} className="text-xs bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full text-slate-600 font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── GLOBAL REACH / PROGRAMS ── */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/online-quran-classes-uk" className="group p-8 rounded-[40px] bg-blue-50 border border-blue-100 flex flex-col items-center text-center hover:bg-blue-600 transition-all duration-500">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🇬🇧</div>
                <h3 className="text-xl font-bold text-blue-900 group-hover:text-white">UK Quran School</h3>
                <p className="text-sm text-blue-600/70 group-hover:text-blue-100 mt-2">Specialized GMT/BST slots for British families.</p>
              </Link>
              <Link href="/online-quran-classes-usa-canada" className="group p-8 rounded-[40px] bg-indigo-50 border border-indigo-100 flex flex-col items-center text-center hover:bg-indigo-600 transition-all duration-500">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🇺🇸🇨🇦</div>
                <h3 className="text-xl font-bold text-indigo-900 group-hover:text-white">USA & Canada School</h3>
                <p className="text-sm text-indigo-600/70 group-hover:text-indigo-100 mt-2">EST, CST, PST timings for North America.</p>
              </Link>
              <Link href="/online-quran-classes-female-teachers" className="group p-8 rounded-[40px] bg-pink-50 border border-pink-100 flex flex-col items-center text-center hover:bg-pink-600 transition-all duration-500">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🌸</div>
                <h3 className="text-xl font-bold text-pink-900 group-hover:text-white">Female Quran Tutors</h3>
                <p className="text-sm text-pink-600/70 group-hover:text-pink-100 mt-2">1-on-1 private classes with certified sisters.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="py-24 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Why 500+ Families Choose Us</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-blue-950 font-serif">
                The Best Online Quran Academy for Your Family
              </h2>
              <p className="text-slate-600 text-lg font-light mt-4">
                We combine classical Madrasah teaching with modern technology to deliver authentic, engaging, and affordable Quran education worldwide.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 blur-3xl rounded-full transition-transform group-hover:scale-150 duration-700" />
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors duration-500 flex items-center justify-center mb-6 relative z-10 shadow-sm">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-blue-950 font-serif relative z-10">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-light relative z-10 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COURSES SECTION ── */}
        <section className="py-32 bg-white relative overflow-hidden border-t border-slate-200">
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Our Online Quran Courses</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-blue-950 font-serif">
                Structured Quran Courses for Every Level
              </h2>
              <p className="text-slate-600 text-lg font-light leading-relaxed mt-4">
                Whether you&apos;re a complete beginner, an intermediate student, or aiming for full Quran memorization — we have the right course for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course, i) => (
                <div
                  key={i}
                  className="flex flex-col rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden group"
                >
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 relative">
                    <span className="absolute top-4 right-4 bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {course.badge}
                    </span>
                    <div className="text-4xl mb-4">{course.icon}</div>
                    <h3 className="text-xl font-bold text-white font-serif">{course.title}</h3>
                    <span className="inline-block mt-2 text-xs font-bold text-blue-200 uppercase tracking-widest">
                      {course.level} Level
                    </span>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <p className="text-slate-600 leading-relaxed font-light flex-1">{course.description}</p>
                    <Link href="/book-trial" className="mt-8 block">
                      <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all hover:shadow-lg hover:shadow-blue-600/25 text-sm">
                        Book Free Trial →
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/courses">
                <button className="h-12 px-10 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 rounded-full font-bold transition-all">
                  View All Courses & Pricing
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── STUDENT TESTIMONIALS ── */}
        <section className="py-32 bg-slate-50 border-t border-slate-200">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-100 mb-4">
                <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
                4.9/5 TrustScore · 500+ Verified Reviews
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-blue-950 font-serif">
                What Parents &amp; Students Say About Our Online Quran Classes
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white border border-slate-200 relative shadow-sm hover:shadow-md transition-all">
                  <div className="text-blue-100 absolute top-6 right-8 text-6xl font-serif">&quot;</div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-slate-700 mb-6 italic leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                  <div>
                    <p className="font-bold text-blue-950 font-serif">{t.name} {t.flag}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ SECTION (ranks in People Also Ask) ── */}
        <section className="py-24 bg-white border-t border-slate-200">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Frequently Asked Questions</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-blue-950 font-serif">
                Everything You Need to Know About Online Quran Classes
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: "How do I start online Quran classes at vQuranSchool?",
                  a: "Simply click 'Book Free Trial', fill in your name, email, and preferred course. We'll schedule a complimentary 1-on-1 demo class with a certified Quran tutor — no credit card required and no obligation.",
                },
                {
                  q: "Do you offer Quran classes for kids in the UK, USA, and Canada?",
                  a: "Yes! We serve students across the UK, USA, Canada, Australia, UAE, and 25+ countries. Our flexible scheduling covers all time zones, including GMT, EST, PST, and AEST.",
                },
                {
                  q: "Are your Quran tutors certified and vetted?",
                  a: "Absolutely. All our teachers are background-checked, certified scholars, and trained in online teaching methods. We have both male and female teachers so families can choose based on preference.",
                },
                {
                  q: "How much do online Quran classes cost?",
                  a: "Your first trial class is FREE. After that, our plans start from just $25/month for 2 classes per week, going up to $75/month for the intensive Hifz programme. No hidden fees or long-term contracts.",
                },
                {
                  q: "Can adults learn Quran online at vQuranSchool?",
                  a: "Yes, we welcome students of all ages — from young children (as young as 4) to adults who are learning to read the Quran for the first time. Our teachers are experienced with all age groups.",
                },
              ].map((faq, i) => (
                <div key={i} className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-blue-200 transition-colors">
                  <h3 className="font-bold text-blue-950 text-lg mb-3 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light ml-8">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-950 z-0">
            <Image
              src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2000&auto=format&fit=crop"
              alt="Start online Quran classes"
              fill
              className="object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 opacity-95" />
          </div>

          <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-200 text-xs font-bold tracking-widest uppercase mb-8 border border-white/20">
                🎓 Start Your Quran Journey Today
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 font-serif leading-tight">
                Book Your <span className="text-blue-300">FREE Trial Class</span>
                <br />and Experience the Difference
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                Join 500+ Muslim families from the UK, USA, Canada &amp; Australia who are learning the Quran online with our certified tutors. Your first class is completely free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book-trial">
                  <button className="h-14 px-10 text-lg font-bold bg-white text-blue-900 hover:bg-slate-100 rounded-full shadow-2xl transition-all hover:scale-105 flex items-center gap-2">
                    🎓 Book Free Trial Now
                  </button>
                </Link>
                <Link href="/pricing">
                  <button className="h-14 px-10 text-lg font-bold border-2 border-blue-400 text-white hover:bg-white/10 rounded-full transition-all">
                    View Pricing Plans
                  </button>
                </Link>
              </div>
              <p className="mt-8 text-blue-300 text-sm font-light">
                No credit card required · Cancel anytime · All time zones
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
