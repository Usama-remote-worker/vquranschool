"use client";

import { Sidebar } from "@/components/Sidebar";
import { LayoutDashboard, Users, Calendar, Settings } from "lucide-react";

export default function TeacherDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const sidebarItems = [
        { title: "Dashboard", href: "/dashboard/teacher", icon: LayoutDashboard },
        { title: "My Students", href: "/dashboard/teacher/students", icon: Users },
        { title: "Schedule", href: "/dashboard/teacher/schedule", icon: Calendar },
        { title: "Profile", href: "/dashboard/teacher/profile", icon: Settings },
    ];

    return (
        <div className="flex bg-slate-50 min-h-[calc(100vh-4rem)]">
            <Sidebar items={sidebarItems} title="Teacher Portal" />
            <main className="flex-1 p-8 overflow-y-auto w-full max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
}
