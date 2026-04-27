import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Calendar, User, ChevronLeft, Share2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | vQuranSchool Blog`,
    description: post.description,
    alternates: { canonical: `https://vquranschool.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <article className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb / Back */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm mb-12 group">
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Articles
          </Link>

          {/* Header */}
          <header className="mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-[11px] font-bold text-blue-700 uppercase tracking-widest mb-8 border border-blue-200">
              {post.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-blue-950 font-serif leading-tight mb-10">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm pb-10 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/20">
                  {post.author[0]}
                </div>
                <div className="flex flex-col">
                   <span className="font-bold text-blue-950 text-base">{post.author}</span>
                   <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-500">Certified Scholar</span>
                </div>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Calendar className="w-4 h-4 text-blue-500" />
                {post.date}
              </div>
              <div className="ml-auto flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors text-slate-600 font-bold text-xs border border-slate-200">
                  <Share2 className="w-4 h-4" />
                  Share Article
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-headings:text-blue-950 prose-p:text-slate-600 prose-p:font-light prose-a:text-blue-600 prose-img:rounded-3xl shadow-blue-500/5">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* CTA Footer */}
          <div className="mt-24 p-12 bg-white rounded-[40px] border border-slate-200 shadow-xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-950 mb-6 font-serif italic">Give Your Child the Best Start</h3>
            <p className="text-slate-600 mb-10 max-w-xl mx-auto font-light leading-relaxed">
              Join vQuranSchool today and experience 1-on-1 Quran classes with certified tutors. Book your free evaluation class now.
            </p>
            <Link href="/book-trial">
              <button className="h-16 px-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xl shadow-xl shadow-blue-600/20 transition-all hover:scale-105">
                Start My Free Trial
              </button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
