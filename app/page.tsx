"use client";

import { Button } from "@/components/ui/button";
import { TeacherCard } from "@/components/TeacherCard";
import { CourseCard } from "@/components/CourseCard";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Users, Video, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const courses = [
    { id: "1", title: "Noorani Qaida", description: "Learn the basics of Arabic reading with proper pronunciation.", level: "Beginner" },
    { id: "2", title: "Quran Reading (Nazra)", description: "Fluently read the Holy Quran with correct phonetics.", level: "Intermediate" },
    { id: "3", title: "Quran Memorization (Hifz)", description: "Commit the Holy Quran to memory with our structured program.", level: "Advanced" },
  ];

  const teachers = [
    { 
      id: "1", 
      name: "Sheikh Ahmed Al-Farsi", 
      specialization: "Hifz & Tajweed", 
      qualification: "Ijazah from Al-Azhar", 
      experience: 12, 
      profile_photo: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=400&auto=format&fit=crop" 
    },
    { 
      id: "2", 
      name: "Ustadha Maryam Khan", 
      specialization: "Qaida for Kids", 
      qualification: "Islamic Studies Diploma", 
      experience: 8, 
      profile_photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2204?q=80&w=400&auto=format&fit=crop" 
    },
    { 
      id: "3", 
      name: "Sheikh Omar Hassan", 
      specialization: "Arabic Grammar", 
      qualification: "B.A. Islamic Law", 
      experience: 10, 
      profile_photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop" 
    },
  ];

  const testimonials = [
    { name: "Saira K.", role: "Parent from UK", content: "My children have progressed so fast with vquranschool. The teachers are incredibly patient and the 1-on-1 focus is exactly what we needed.", stars: 5 },
    { name: "Omar J.", role: "Adult Student from USA", content: "I was always afraid of making mistakes in Tajweed, but Sheikh Ahmed made me feel comfortable from day one. Truly a premium experience.", stars: 5 },
    { name: "Fatima R.", role: "Hifz Student from Canada", content: "The flexible scheduling allows me to memorize Quran alongside my university studies. Highly recommended!", stars: 5 },
  ];

  const features = [
    { icon: <Video className="w-8 h-8 text-blue-600" />, title: "1-on-1 Live Classes", description: "Interactive personalized sessions via video call." },
    { icon: <Clock className="w-8 h-8 text-blue-600" />, title: "Flexible Schedule", description: "Choose timings that work best for your time zone." },
    { icon: <Users className="w-8 h-8 text-blue-600" />, title: "Expert Tutors", description: "Qualified & verified teachers for every level." },
    { icon: <BookOpen className="w-8 h-8 text-blue-600" />, title: "Structured Curriculum", description: "Progressive courses from beginner to hifz." },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">

      {/* 
        PREMIUM LIGHT HERO WITH NAVY ACCENTS
      */}
      <section className="relative overflow-hidden pt-32 pb-40 lg:pt-48 lg:pb-52 flex items-center justify-center min-h-[95vh] bg-white border-b border-slate-200">

        {/* Subtle Background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1591118139502-31c195973fe1?q=80&w=2000&auto=format&fit=crop"
            alt="Children Studying Quran"
            fill
            className="object-cover mix-blend-multiply"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white"></div>
        </div>

        {/* Ambient Lighting */}
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100 blur-[150px] rounded-full mix-blend-multiply"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-50 blur-[150px] rounded-full mix-blend-multiply"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10 mx-auto flex flex-col items-center mt-12">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full text-center space-y-8 max-w-4xl mx-auto"
          >
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-blue-950 font-serif leading-[1.1]">
              Master the Holy Quran from Anywhere
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-600 leading-relaxed font-light mt-6 max-w-2xl mx-auto">
              Professional, 1-on-1 interactive online Quran classes with certified teachers for you and your family.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/book-trial">
                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 rounded-full font-bold transition-all duration-300">
                  Book Free Trial
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-2 border-slate-200 text-blue-900 hover:bg-slate-50 hover:border-slate-300 rounded-full font-bold transition-all duration-300 bg-white shadow-sm">
                  Explore Courses
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Our Academy */}
      <section className="py-24 relative z-20 bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-blue-950 font-serif">Why Choose Our Academy</h2>
            <p className="text-slate-600 text-lg font-light">We bring the traditional Madrasah learning experience to the comfort of your home using modern technology.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                key={i}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 blur-3xl rounded-full transition-transform group-hover:scale-150 duration-700"></div>

                <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors duration-500 flex items-center justify-center mb-6 relative z-10 shadow-sm">
                  <div className="group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-950 font-serif relative z-10">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed font-light relative z-10 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Comprehensive Courses */}
      <section className="py-32 bg-white relative overflow-hidden border-t border-slate-200">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex justify-center items-center">
          <Image src="https://images.unsplash.com/photo-1591118139502-31c195973fe1?q=80&w=2000&auto=format&fit=crop" alt="Bismillah Calligraphy" fill className="object-cover scale-110 opacity-5" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-blue-950 font-serif">
              Our Comprehensive Courses
            </h2>
            <p className="text-slate-600 text-lg font-light leading-relaxed">
              Step-by-step learning paths designed for students of all ages and levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                key={course.id}
                className="h-full"
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/courses">
              <Button className="h-14 px-10 border-2 bg-white shadow-sm border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 rounded-full font-bold text-lg">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Meet Our Expert Teachers */}
      <section className="py-32 bg-slate-50 relative overflow-hidden border-t border-slate-200">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-blue-950 font-serif">Meet Our Expert Teachers</h2>
            <p className="text-slate-600 text-lg font-light">Learn from the best certified scholars with years of experience in online teaching.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teachers.map((teacher, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={teacher.id}
              >
                <TeacherCard teacher={teacher} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Reviews / Testimonials */}
      <section className="py-32 bg-white relative border-t border-slate-200">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-100 mb-2">
              <div className="flex">{[1,2,3,4,5].map(s => <span key={s} className="text-xs">⭐</span>)}</div>
              TrustScore 4.9/5
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-blue-950 font-serif">What Our Students Say</h2>
            <p className="text-slate-600 text-lg font-light">Join 500+ satisfied students learning Quran with us.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-200 relative"
              >
                <div className="text-blue-200 absolute top-6 right-8 text-6xl font-serif">"</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.stars)].map((_, i) => <span key={i} className="text-sm">⭐</span>)}
                </div>
                <p className="text-slate-700 mb-6 italic leading-relaxed">"{t.content}"</p>
                <div>
                  <p className="font-bold text-blue-950 font-serif">{t.name}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mt-1">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Start Your Journey Today */}
      <section className="py-32 relative overflow-hidden bg-white border-t border-slate-200">
        <div className="absolute inset-0 bg-blue-900 z-0">
          <Image src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2000&auto=format&fit=crop" alt="CTA Background" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 opacity-90"></div>
        </div>

        <div className="container px-4 md:px-6 mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto p-12 md:p-16 rounded-3xl"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 font-serif leading-tight">
              Start Your Holy Journey <br className="hidden md:block"/> with vquranschool Today
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Experience our interactive classroom environment with a free, no-obligation trial class and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-trial">
                <Button className="h-14 px-10 text-lg font-bold bg-white text-blue-900 hover:bg-slate-100 rounded-full shadow-2xl transition-all hover:scale-105">
                  Book Your Free Trial Now
                </Button>
              </Link>
              <Link href="/dashboard/student/pricing">
                <Button variant="outline" className="h-14 px-10 text-lg font-bold border-blue-400 text-white hover:bg-white/10 rounded-full transition-all">
                  See Our Plans
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-blue-300 text-sm font-light">No credit card required for trial • Cancel anytime</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
