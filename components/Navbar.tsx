"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Don't show Navbar in dashboard
    if (pathname.startsWith("/dashboard")) return null;

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Courses", href: "/courses" },
        { name: "Teachers", href: "/teachers" },
        { name: "Pricing", href: "/pricing" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
                            <Image 
                                src="/logo.png" 
                                alt="vquranschool logo" 
                                fill 
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-600 font-serif tracking-tight">
                            vquranschool
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-blue-600",
                                    pathname === link.href ? "text-blue-600" : "text-slate-600"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-3">
                            {session ? (
                                <Link href="/login">
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
                                        Login
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600 hover:bg-blue-50">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/book-trial">
                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-full px-6 shadow-lg shadow-blue-600/20">
                                            Free Trial
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden p-2 text-slate-600 hover:text-blue-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white p-4 space-y-4 animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={cn(
                                    "text-base font-medium px-4 py-2 rounded-lg transition-colors",
                                    pathname === link.href ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                            {session ? (
                                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">
                                        Login
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="outline" className="w-full rounded-xl border-slate-200">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/book-trial" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">
                                            Book Free Trial
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
