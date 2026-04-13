"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();

    if (pathname.startsWith("/dashboard")) {
        return null;
    }
    return (
        <footer className="w-full py-16 bg-blue-950 text-blue-100 border-t border-blue-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <span className="text-2xl font-bold tracking-tight text-white font-serif">
                            vquran<span className="text-blue-400">school</span>
                        </span>
                        <p className="text-sm text-blue-200/80 font-light leading-relaxed">
                            A professional online platform dedicated to providing the best Quranic education with experienced teachers globally.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-blue-200/80 font-light">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/courses" className="hover:text-white transition-colors">Courses</Link></li>
                            <li><Link href="/teachers" className="hover:text-white transition-colors">Find a Teacher</Link></li>
                            <li><Link href="/register-teacher" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors italic group flex items-center gap-1">
                                Become a Teacher <span className="text-xs group-hover:translate-x-0.5 transition-transform">→</span>
                            </Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-6">Support</h4>
                        <ul className="space-y-3 text-sm text-blue-200/80 font-light">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
                            <li><Link href="/book-trial" className="hover:text-white transition-colors">Book Free Trial</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-6">Contact Info</h4>
                        <ul className="space-y-3 text-sm text-blue-200/80 font-light">
                            <li>Email: support@vquranschool.com</li>
                            <li>WhatsApp: +92 304 4296295</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 border-t border-blue-900 pt-8 text-center text-sm font-light text-blue-300">
                    © {new Date().getFullYear()} vquranschool. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
