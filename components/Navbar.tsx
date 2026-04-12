"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function Navbar() {
    const pathname = usePathname();

    if (pathname.startsWith("/dashboard")) {
        return null;
    }

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-tight text-blue-950 font-serif">
                        vquran<span className="text-blue-600 italic">school</span>
                    </span>
                </Link>

                <div className="hidden md:flex gap-8 items-center bg-slate-50/80 px-6 py-2.5 rounded-full border border-slate-200 shadow-sm">
                    <Link href="/" className="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
                    <Link href="/about" className="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-blue-600 transition-colors">Academy</Link>
                    <Link href="/courses" className="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-blue-600 transition-colors">Curriculum</Link>
                    <Link href="/teachers" className="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-blue-600 transition-colors">Faculty</Link>
                    <Link href="/contact" className="text-[13px] font-semibold tracking-wide uppercase text-slate-600 hover:text-blue-600 transition-colors">Contact</Link>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/login">
                        <Button variant="outline" className="rounded-full h-10 px-6 font-medium border-slate-200 text-slate-700 hover:bg-slate-50 transition-all">
                            Login
                        </Button>
                    </Link>
                    <Link href="/book-trial">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-10 px-6 font-medium shadow-md shadow-blue-600/20 transition-all hover:translate-y-[-1px]">
                            Book Trial
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
