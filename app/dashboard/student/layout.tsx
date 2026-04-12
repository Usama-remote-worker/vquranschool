"use client";

import { Sidebar } from "@/components/Sidebar";
import { LayoutDashboard, BookOpen, User, Calendar, Settings, CreditCard, Shield } from "lucide-react";

export default function StudentDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const sidebarItems = [
        { title: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
        { title: "My Course", href: "/dashboard/student/course", icon: BookOpen },
        { title: "My Teacher", href: "/dashboard/student/teacher", icon: User },
        { title: "Schedule", href: "/dashboard/student/schedule", icon: Calendar },
        { title: "Pricing", href: "/dashboard/student/pricing", icon: CreditCard },
        { title: "Profile", href: "/dashboard/student/profile", icon: Settings },
        { title: "Security", href: "/dashboard/student/security", icon: Shield },
    ];

    return (
        <div className="flex bg-slate-100 min-h-screen">
            <Sidebar items={sidebarItems} title="Student Portal" />
            <main className="flex-1 p-8 overflow-y-auto w-full max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
}
