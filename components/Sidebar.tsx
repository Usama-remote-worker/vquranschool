"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface SidebarItem {
    title: string;
    href: string;
    icon?: LucideIcon;
}

interface SidebarProps {
    items: SidebarItem[];
    title: string;
    className?: string;
}

export function Sidebar({ items, title, className }: SidebarProps) {
    const pathname = usePathname();

    return (
        <div className={cn("hidden md:flex flex-col w-64 border-r border-slate-200 bg-white min-h-[calc(100vh-4rem)] p-4", className)}>
            <div className="mb-8 px-4">
                <h2 className="text-xl font-bold tracking-tight text-blue-900">{title}</h2>
            </div>
            <nav className="space-y-1">
                {items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-50 text-blue-700 font-semibold"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                            )}
                        >
                            {item.icon && <item.icon className="h-5 w-5" />}
                            {item.title}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
