"use client";

import { Sidebar } from "@/components/Sidebar";
import { LayoutDashboard, Users, Calendar, Settings, Shield, ClipboardList, DollarSign } from "lucide-react";

export default function TeacherDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const sidebarItems = [
        { title: "Dashboard", href: "/dashboard/teacher", icon: LayoutDashboard },
        { title: "My Students", href: "/dashboard/teacher/students", icon: Users },
        { title: "Schedule", href: "/dashboard/teacher/schedule", icon: Calendar },
        { title: "Attendance", href: "/dashboard/teacher/attendance", icon: ClipboardList },
        { title: "My Earnings", href: "/dashboard/teacher/earnings", icon: DollarSign },
        { title: "Profile", href: "/dashboard/teacher/profile", icon: Settings },
        { title: "Security", href: "/dashboard/teacher/security", icon: Shield },
    ];

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar items={sidebarItems} title="Teacher Portal" />
            <main className="flex-1 p-8 overflow-y-auto w-full max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
}
