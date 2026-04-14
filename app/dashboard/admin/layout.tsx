"use client";

import { Sidebar } from "@/components/Sidebar";
import { LayoutDashboard, Users, UserCog, BookOpen, Inbox, Shield, Receipt } from "lucide-react";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const sidebarItems = [
        { title: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { title: "Teachers", href: "/dashboard/admin/teachers", icon: UserCog },
        { title: "Students", href: "/dashboard/admin/students", icon: Users },
        { title: "Courses", href: "/dashboard/admin/courses", icon: BookOpen },
        { title: "Trial Requests", href: "/dashboard/admin/trials", icon: Inbox },
        { title: "Payments", href: "/dashboard/admin/payments", icon: Receipt },
        { title: "Security", href: "/dashboard/admin/security", icon: Shield },
    ];

    return (
        <div className="flex min-h-screen" style={{ background: "#f1f5f9" }}>
            <Sidebar items={sidebarItems} title="vQuranSchool" subtitle="Admin Control Panel" />
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
