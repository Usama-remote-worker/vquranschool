"use client";

import { Sidebar } from "@/components/Sidebar";
import { LayoutDashboard, Users, UserCog, BookOpen, Inbox, Shield } from "lucide-react";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const sidebarItems = [
        { title: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
        { title: "Teachers", href: "/dashboard/admin/teachers", icon: UserCog },
        { title: "Students", href: "/dashboard/admin/students", icon: Users },
        { title: "Courses", href: "/dashboard/admin/courses", icon: BookOpen },
        { title: "Trial Requests", href: "/dashboard/admin/trials", icon: Inbox },
        { title: "Security", href: "/dashboard/admin/security", icon: Shield },
    ];

    return (
        <div className="flex bg-slate-50 min-h-[calc(100vh-4rem)]">
            <Sidebar items={sidebarItems} title="Admin Panel" />
            <main className="flex-1 p-8 overflow-y-auto w-full max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
}
