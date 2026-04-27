import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Calendar, User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Online Quran Academy Blog | Islamic Education Tips & News | vQuranSchool",
  description: "Read the latest articles on Tajweed, Hifz, and Islamic education for kids. Expert tips for parents in the UK, USA, and Canada from the vQuranSchool team.",
  alternates: { canonical: "https://vquranschool.com/blog" },
};

export default function BlogListingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase mb-6">
            Insights & Resources
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-950 font-serif mb-6 leading-tight">
            Our <span className="text-blue-600 italic">Academy Blog</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            Expert advice, teaching methodologies, and guides to help your family on their Quranic journey.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className="group bg-white rounded-[32px] p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex flex-col relative overflow-hidden">
                {/* Category Accent Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 group-hover:bg-blue-600 transition-colors" />
                
                <div className="mb-6 flex items-center justify-between">
                  <div className="px-3 py-1 rounded-full bg-blue-50 text-[10px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100">
                    {post.category}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-blue-950 mb-4 group-hover:text-blue-600 transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                
                <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 flex-1 line-clamp-4">
                  {post.description}
                </p>
                
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm group/btn">
                    Read Story
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-blue-50 rounded-[40px] p-12 text-center border border-blue-100">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-4">Ready to start learning?</h2>
            <p className="text-slate-600 mb-8 font-light">Join hundreds of families who have already started their Quranic journey with us.</p>
            <Link href="/book-trial">
              <button className="h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20">
                Book Your Free Trial Class
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
