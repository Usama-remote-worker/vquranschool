import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Home, BookOpen, Users } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8">
        <Search className="w-12 h-12 text-blue-600" />
      </div>
      <h1 className="text-6xl font-black text-slate-900 mb-4 font-serif">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Page Not Found</h2>
      <p className="text-slate-500 max-w-md mb-10 text-lg font-light leading-relaxed">
        Assalamu Alaikum! It seems the page you are looking for has moved or doesn&apos;t exist. 
        Don&apos;t worry, you can still start your Quran journey below.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        <Link href="/">
          <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <Home className="w-5 h-5" /> Back to Home
          </Button>
        </Link>
        <Link href="/courses">
          <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Explore Courses
          </Button>
        </Link>
        <Link href="/teachers">
          <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <Users className="w-5 h-5" /> Meet our Teachers
          </Button>
        </Link>
        <Link href="/book-trial">
          <Button className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl shadow-blue-600/20">
            Book Free Trial Class
          </Button>
        </Link>
      </div>

      <div className="mt-16 text-slate-400 text-sm italic">
        &ldquo;Indeed, with hardship [will be] ease.&rdquo; — Quran 94:6
      </div>
    </div>
  );
}
