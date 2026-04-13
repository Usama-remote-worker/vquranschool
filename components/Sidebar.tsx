"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon, LogOut, ChevronRight, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";

export interface SidebarItem {
    title: string;
    href: string;
    icon?: LucideIcon;
}

interface SidebarProps {
    items: SidebarItem[];
    title: string;
    subtitle?: string;
    className?: string;
}

export function Sidebar({ items, title, subtitle, className }: SidebarProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 right-4 z-[100] p-3 rounded-xl bg-blue-900 text-white shadow-lg border border-blue-700 active:scale-95 transition-all"
            >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile Backdrop Overlay */}
            {isOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[80]"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={cn(
                "fixed md:sticky top-0 left-0 flex flex-col w-64 min-h-screen h-full flex-shrink-0 z-[90] transition-transform duration-300 md:translate-x-0 overflow-y-auto",
                isOpen ? "translate-x-0" : "-translate-x-full",
                className
            )}
            style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)" }}>

            {/* Logo & Title */}
            <div className="px-6 pt-8 pb-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold bg-blue-600/20 border border-blue-600/40">
                        <span className="text-blue-500">Q</span>
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-sm tracking-tight">{title}</h2>
                        {subtitle && <p className="text-xs mt-0.5 text-slate-500">{subtitle}</p>}
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="md:hidden text-white/50 hover:text-white">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-5 space-y-0.5">
                {items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "group flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "text-white bg-blue-600/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                {item.icon && (
                                    <item.icon className={cn("h-[18px] w-[18px] flex-shrink-0 transition-colors",
                                        isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                                    )} />
                                )}
                                {item.title}
                            </div>
                            {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-400/70" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Divider */}
            <div className="mx-4 h-px bg-white/5" />

            {/* Sign Out */}
            <div className="px-3 py-4">
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-slate-400 hover:text-red-400 hover:bg-red-950/30"
                >
                    <LogOut className="h-[18px] w-[18px] flex-shrink-0 transition-colors" />
                    Sign Out
                </button>
            </div>
        </div>
        </>
    );
}
