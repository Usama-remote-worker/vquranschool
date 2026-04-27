import type { Metadata } from "next";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Online Quran Courses | Noorani Qaida, Tajweed, Hifz & Islamic Studies | vQuranSchool",
  description:
    "Explore our comprehensive online Quran courses: Noorani Qaida for beginners, Quran reading with Tajweed, Hifz ul Quran memorization, and Islamic Studies. Certified tutors. Free trial class available for students in UK, USA, Canada & Australia.",
  alternates: { canonical: "https://vquranschool.com/courses" },
  openGraph: {
    title: "Online Quran Courses | vQuranSchool",
    description: "Noorani Qaida, Tajweed, Hifz & Islamic Studies. Certified tutors, 1-on-1 classes. Book your FREE trial!",
    url: "https://vquranschool.com/courses",
  },
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Online Quran Courses – vQuranSchool",
  url: "https://vquranschool.com/courses",
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@type": "Course", name: "Noorani Qaida for Beginners", description: "Learn the Arabic alphabet and basics of Quranic pronunciation for beginners.", provider: { "@type": "Organization", name: "vQuranSchool" } } },
    { "@type": "ListItem", position: 2, item: { "@type": "Course", name: "Quran Reading (Nazra) with Tajweed", description: "Fluently read the Holy Quran with correct Tajweed rules and Makharij.", provider: { "@type": "Organization", name: "vQuranSchool" } } },
    { "@type": "ListItem", position: 3, item: { "@type": "Course", name: "Quran Memorization (Hifz Program)", description: "Structured Hifz program to memorize the Holy Quran with certified Hafiz teachers.", provider: { "@type": "Organization", name: "vQuranSchool" } } },
    { "@type": "ListItem", position: 4, item: { "@type": "Course", name: "Tajweed Masterclass", description: "Advanced rules of recitation — Makharij, Sifat, and practical application.", provider: { "@type": "Organization", name: "vQuranSchool" } } },
    { "@type": "ListItem", position: 5, item: { "@type": "Course", name: "Islamic Studies for Kids", description: "Age-appropriate Islamic education covering basic Fiqh, Duas, and moral values.", provider: { "@type": "Organization", name: "vQuranSchool" } } },
  ],
};

export default function CoursesPage() {
    const courses = [
        { id: "1", title: "Noorani Qaida", description: "Learn the basics of Arabic reading with proper pronunciation.", level: "Beginner" },
        { id: "2", title: "Quran Reading (Nazra)", description: "Fluently read the Holy Quran with correct phonetics. Best after completing Qaida.", level: "Intermediate" },
        { id: "3", title: "Quran Memorization (Hifz)", description: "Commit the Holy Quran to memory with our structured program and retention exercises.", level: "Advanced" },
        { id: "4", title: "Tajweed Rules", description: "Master the intricate rules of recitation (Makharij & Sifat).", level: "Intermediate" },
        { id: "5", title: "Islamic Studies for Kids", description: "Age-appropriate learning of basic Islamic principles, Dua and Fiqh.", level: "Beginner" },
        { id: "6", title: "Islamic Ethical Values", description: "Learn about moral principles, character building, and ethical conduct in light of the Quran and Sunnah.", level: "All Levels" },
    ];

    return (
        <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
            <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32 flex items-center justify-center border-b border-slate-200 bg-white">
                {/* Visual Background */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <Image
                        src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2000&auto=format&fit=crop"
                        alt="Mosque Interior"
                        fill
                        className="object-cover mix-blend-multiply"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white"></div>
                </div>

                <div className="container px-4 md:px-6 relative z-10 mx-auto text-center">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Comprehensive Quran Education</p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-blue-950 mb-6 font-serif">
                        Online Quran Courses for Every Level
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                        From absolute beginners learning Noorani Qaida to advanced Hifz students — our certified tutors teach all levels. Serving students in the UK, USA, Canada &amp; Australia.
                    </p>
                    <p className="mt-4 text-sm text-slate-400">All courses include a <strong className="text-blue-600">FREE trial class</strong> — no commitment required.</p>
                </div>
            </section>

            <section className="py-24 relative overflow-hidden bg-slate-50">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent pointer-events-none"></div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    <div className="mt-24 text-center bg-white p-12 md:p-16 rounded-3xl shadow-xl border border-blue-100 max-w-4xl mx-auto relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-blue-600 to-emerald-400"></div>
                        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-50 blur-[120px] rounded-full pointer-events-none mix-blend-multiply"></div>

                        <h3 className="text-3xl lg:text-4xl font-bold text-blue-950 mb-6 font-serif relative z-10 mt-4">
                            Not sure where to start?
                        </h3>
                        <p className="text-lg md:text-xl text-slate-600 mb-10 font-light leading-relaxed relative z-10">
                            Book a free trial class and our experienced teachers will evaluate your level and recommend the perfect course for you.
                        </p>
                        <div className="relative z-10">
                            <Link href="/book-trial">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-10 text-lg font-bold shadow-lg shadow-blue-600/30 rounded-full text-white transition-all duration-300 hover:scale-[1.02]">
                                    Book a Free Evaluation
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
