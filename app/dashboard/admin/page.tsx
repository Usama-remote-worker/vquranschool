"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    UserCog, Inbox, Check, X, Loader2, ArrowRight,
    Users, GraduationCap, BookOpen, TrendingUp, Clock,
    RefreshCw, ChevronRight, AlertCircle
} from "lucide-react";
import Link from "next/link";

import { Teacher, Student } from "@/types";

export default function AdminDashboard() {
    const [pendingTeachers, setPendingTeachers] = useState<Teacher[]>([]);
    const [trialRequests, setTrialRequests] = useState<any[]>([]);
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersRes, trialsRes] = await Promise.all([
                fetch("/api/admin/users"),
                fetch("/api/admin/trials"),
            ]);
            const usersData = await usersRes.json();
            const trialsData = await trialsRes.json();

            if (usersData.users) {
                setAllUsers(usersData.users);
                setPendingTeachers(usersData.users.filter((u: Teacher) => u.role === "teacher" && u.status === "pending"));
            }
            if (trialsData.trials) {
                setTrialRequests(trialsData.trials);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleTeacherAction = async (teacherId: string, action: "approved" | "rejected") => {
        setActionId(teacherId);
        try {
            const res = await fetch("/api/teachers/approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ teacher_id: teacherId, action }),
            });
            if (res.ok) {
                setPendingTeachers((prev) => prev.filter((t) => t.id !== teacherId));
            }
        } catch (error) {
            console.error("Error updating teacher status:", error);
        } finally {
            setActionId(null);
        }
    };

    const studentCount = allUsers.filter((u) => u.role === "student").length;
    const teacherCount = allUsers.filter((u) => u.role === "teacher").length;
    const newTrials = trialRequests.filter((t) => t.status === "new").length;
    const contactedTrials = trialRequests.filter((t) => t.status === "contacted").length;

    const stats = [
        {
            label: "Total Students",
            value: loading ? "—" : studentCount,
            icon: Users,
            color: "#1e40af",
            bg: "rgba(30,64,175,0.08)",
            trend: "Enrolled learners",
        },
        {
            label: "Total Teachers",
            value: loading ? "—" : teacherCount,
            icon: GraduationCap,
            color: "#1e3a5f",
            bg: "rgba(30,58,95,0.08)",
            trend: `${pendingTeachers.length} pending approval`,
        },
        {
            label: "Trial Requests",
            value: loading ? "—" : trialRequests.length,
            icon: Inbox,
            color: "#2563eb",
            bg: "rgba(37,99,235,0.08)",
            trend: `${newTrials} new · ${contactedTrials} contacted`,
        },
        {
            label: "Pending Actions",
            value: loading ? "—" : pendingTeachers.length + newTrials,
            icon: AlertCircle,
            color: "#1e40af",
            bg: "rgba(30,64,175,0.08)",
            trend: "Require your attention",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#0d1c18" }}>
                        Dashboard Overview
                    </h1>
                    <p className="mt-1.5 text-sm" style={{ color: "#5a7068" }}>
                        Welcome back, Admin. Here's what's happening at vQuranSchool.
                    </p>
                </div>
                <button
                    onClick={fetchData}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all hover:shadow-sm"
                    style={{ borderColor: "#cbd5e1", color: "#1e40af", background: "white" }}
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {stats.map((stat) => (
                    <div key={stat.label}
                        className="rounded-2xl p-5 border transition-all hover:shadow-md hover:-translate-y-0.5 duration-200"
                        style={{ background: "white", borderColor: "#e2e8f0" }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: stat.bg }}>
                                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                            </div>
                            <TrendingUp className="w-4 h-4" style={{ color: "#a0b8b0" }} />
                        </div>
                        <div className="text-3xl font-bold mb-1" style={{ color: "#0d1c18" }}>
                            {stat.value}
                        </div>
                        <div className="text-sm font-semibold mb-0.5" style={{ color: "#0d1c18" }}>
                            {stat.label}
                        </div>
                        <div className="text-xs" style={{ color: "#7a9890" }}>
                            {stat.trend}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2">

                {/* Pending Teacher Applications */}
                <div className="rounded-2xl border overflow-hidden flex flex-col"
                    style={{ background: "white", borderColor: "#e2e8f0" }}>
                    <div className="px-6 py-5 border-b flex items-center justify-between"
                        style={{ borderColor: "#f1f5f9", background: "#f8fafc" }}>
                        <div>
                            <h2 className="font-bold text-base" style={{ color: "#0f172a" }}>
                                Pending Applications
                            </h2>
                            <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
                                Teachers awaiting approval
                            </p>
                        </div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: "rgba(30,64,175,0.08)" }}>
                            <UserCog className="w-4 h-4" style={{ color: "#1e40af" }} />
                        </div>
                    </div>

                    <div className="flex-1">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-5 h-5 animate-spin mr-2" style={{ color: "#1e40af" }} />
                                <span className="text-sm" style={{ color: "#64748b" }}>Loading...</span>
                            </div>
                        ) : pendingTeachers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                                    style={{ background: "rgba(0,53,39,0.06)" }}>
                                    <Check className="w-6 h-6" style={{ color: "#1e40af" }} />
                                </div>
                                <p className="text-sm font-medium" style={{ color: "#0f172a" }}>All caught up!</p>
                                <p className="text-xs mt-1" style={{ color: "#64748b" }}>No pending teacher applications.</p>
                            </div>
                        ) : (
                            <ul>
                                {pendingTeachers.map((teacher) => (
                                    <li key={teacher.id}
                                        className="px-6 py-4 flex items-center justify-between gap-4 border-b last:border-0 transition-colors hover:bg-slate-50/50"
                                        style={{ borderColor: "#f0f5f3" }}>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold truncate" style={{ color: "#0f172a" }}>
                                                {teacher.name}
                                            </p>
                                            <p className="text-xs mt-0.5 truncate" style={{ color: "#64748b" }}>
                                                {teacher.specialization || teacher.qualification || teacher.email}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <button
                                                disabled={actionId === teacher.id}
                                                onClick={() => handleTeacherAction(teacher.id, "approved")}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                                                style={{ background: "#1e3a8a" }}
                                            >
                                                {actionId === teacher.id
                                                    ? <Loader2 className="w-3 h-3 animate-spin" />
                                                    : <Check className="w-3 h-3" />}
                                                Approve
                                            </button>
                                            <button
                                                disabled={actionId === teacher.id}
                                                onClick={() => handleTeacherAction(teacher.id, "rejected")}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
                                                style={{ color: "#b91c1c", background: "#fef2f2", border: "1px solid #fecaca" }}
                                            >
                                                <X className="w-3 h-3" /> Reject
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="px-6 py-4 border-t" style={{ borderColor: "#f1f5f9", background: "#f8fafc" }}>
                        <Link href="/dashboard/admin/teachers"
                            className="flex items-center justify-center gap-1.5 text-sm font-semibold group"
                            style={{ color: "#1e40af" }}>
                            Manage All Teachers
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Recent Trial Requests */}
                <div className="rounded-2xl border overflow-hidden flex flex-col"
                    style={{ background: "white", borderColor: "#e2e8f0" }}>
                    <div className="px-6 py-5 border-b flex items-center justify-between"
                        style={{ borderColor: "#f1f5f9", background: "#f8fafc" }}>
                        <div>
                            <h2 className="font-bold text-base" style={{ color: "#0f172a" }}>
                                Recent Trial Requests
                            </h2>
                            <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
                                Latest prospective students
                            </p>
                        </div>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: "rgba(212,175,55,0.12)" }}>
                            <Inbox className="w-4 h-4" style={{ color: "#D4AF37" }} />
                        </div>
                    </div>

                    <div className="flex-1">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-5 h-5 animate-spin mr-2" style={{ color: "#1e40af" }} />
                                <span className="text-sm" style={{ color: "#64748b" }}>Loading...</span>
                            </div>
                        ) : trialRequests.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                                    style={{ background: "rgba(212,175,55,0.08)" }}>
                                    <Inbox className="w-6 h-6" style={{ color: "#D4AF37" }} />
                                </div>
                                <p className="text-sm font-medium" style={{ color: "#0f172a" }}>No requests yet</p>
                                <p className="text-xs mt-1" style={{ color: "#64748b" }}>Trial bookings will appear here.</p>
                            </div>
                        ) : (
                            <ul>
                                {trialRequests.slice(0, 6).map((trial) => (
                                    <li key={trial.id}
                                        className="px-6 py-4 flex items-center justify-between gap-4 border-b last:border-0 transition-colors hover:bg-slate-50/50"
                                        style={{ borderColor: "#f0f5f3" }}>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-semibold truncate" style={{ color: "#0f172a" }}>
                                                    {trial.name}
                                                </p>
                                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                                                    trial.status === "new"
                                                        ? "bg-amber-50 text-amber-700"
                                                        : trial.status === "contacted"
                                                        ? "bg-blue-50 text-blue-700"
                                                        : trial.status === "assigned"
                                                        ? "bg-green-50 text-green-700"
                                                        : "bg-slate-100 text-slate-600"
                                                }`}>
                                                    {trial.status}
                                                </span>
                                            </div>
                                            <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>
                                                {trial.course} · {trial.country}
                                            </p>
                                        </div>
                                        <Link href="/dashboard/admin/trials">
                                            <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                                                style={{ color: "#1e40af", background: "rgba(30,64,175,0.07)" }}>
                                                View <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="px-6 py-4 border-t" style={{ borderColor: "#f1f5f9", background: "#f8fafc" }}>
                        <Link href="/dashboard/admin/trials"
                            className="flex items-center justify-center gap-1.5 text-sm font-semibold group"
                            style={{ color: "#1e40af" }}>
                            View All Trial Requests
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border p-6" style={{ background: "white", borderColor: "#e2e8f0" }}>
                <h2 className="font-bold text-base mb-4" style={{ color: "#0f172a" }}>Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {[
                        { label: "Manage Teachers", href: "/dashboard/admin/teachers", icon: UserCog },
                        { label: "Manage Students", href: "/dashboard/admin/students", icon: Users },
                        { label: "Manage Courses", href: "/dashboard/admin/courses", icon: BookOpen },
                        { label: "Trial Requests", href: "/dashboard/admin/trials", icon: Inbox },
                        { label: "Security", href: "/dashboard/admin/security", icon: Clock },
                    ].map((action) => (
                        <Link key={action.href} href={action.href}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all hover:shadow-md hover:-translate-y-0.5 duration-200 group"
                            style={{ borderColor: "#e0eae6", background: "#fafcfb" }}>
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors group-hover:scale-110 duration-200"
                                style={{ background: "rgba(30,64,175,0.08)" }}>
                                <action.icon className="w-5 h-5" style={{ color: "#1e40af" }} />
                            </div>
                            <span className="text-xs font-semibold" style={{ color: "#0f172a" }}>
                                {action.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
