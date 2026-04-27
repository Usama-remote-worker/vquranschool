"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
    CheckCircle2,
    XCircle,
    AlertCircle,
    Loader2,
    Calendar,
    Clock,
    ChevronDown,
    BookOpen,
    TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type AttendanceRecord = {
    id: string;
    student_name: string;
    student_email: string;
    class_date: string;
    class_time: string;
    status: string;
    notes?: string;
};

type Student = {
    id: string;
    name: string;
    email: string;
    course: string;
};

const STATUS_CONFIG = {
    completed: {
        label: "Completed ✓",
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: CheckCircle2,
        iconColor: "text-emerald-500",
    },
    student_absent: {
        label: "Student Absent",
        color: "bg-amber-50 text-amber-700 border-amber-200",
        icon: AlertCircle,
        iconColor: "text-amber-500",
    },
    teacher_absent: {
        label: "Teacher Absent",
        color: "bg-blue-50 text-blue-700 border-blue-200",
        icon: AlertCircle,
        iconColor: "text-blue-400",
    },
    cancelled: {
        label: "Cancelled",
        color: "bg-red-50 text-red-700 border-red-200",
        icon: XCircle,
        iconColor: "text-red-400",
    },
    rescheduled: {
        label: "Rescheduled",
        color: "bg-purple-50 text-purple-700 border-purple-200",
        icon: Calendar,
        iconColor: "text-purple-400",
    },
};

export default function AttendancePage() {
    const { data: session } = useSession();
    const [students, setStudents] = useState<Student[]>([]);
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(
        new Date().toISOString().slice(0, 7) // "2026-04"
    );
    const [payoutSummary, setPayoutSummary] = useState<{
        completed_classes: number;
        estimated_earnings_usd: number;
    } | null>(null);

    // Mark attendance form state
    const [form, setForm] = useState({
        student_id: "",
        class_date: new Date().toISOString().slice(0, 10),
        class_time: "16:00",
        status: "completed",
        notes: "",
    });
    const [formSuccess, setFormSuccess] = useState(false);
    const [formError, setFormError] = useState("");

    const fetchData = useCallback(async () => {
        if (!session?.user?.id) return;
        setLoading(true);
        try {
            // Fetch assigned students
            const studentsRes = await fetch("/api/teachers/students");
            const data = await studentsRes.json();
            if (data.students) {
                setStudents(data.students);
                if (data.students.length > 0 && !form.student_id) {
                    setForm((f) => ({ ...f, student_id: data.students[0].id }));
                }
            }

            // Fetch attendance records for selected month
            const attRes = await fetch(`/api/attendance?month=${selectedMonth}`);
            const attData = await attRes.json();
            setRecords(attData.attendance || []);

            // Fetch payout summary
            const payoutRes = await fetch(`/api/teacher/payouts?month=${selectedMonth}`);
            const payoutData = await payoutRes.json();
            setPayoutSummary({
                completed_classes: payoutData.completed_classes || 0,
                estimated_earnings_usd: payoutData.estimated_earnings_usd || 0,
            });
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    }, [session?.user?.id, selectedMonth, form.student_id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleMarkAttendance = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setFormError("");
        setFormSuccess(false);

        try {
            const res = await fetch("/api/attendance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!res.ok) {
                setFormError(data.error || "Failed to mark attendance");
                return;
            }

            setFormSuccess(true);
            // Reset form but keep student/time defaults
            setForm((f) => ({ ...f, notes: "", status: "completed" }));
            // Refresh records
            fetchData();
            setTimeout(() => setFormSuccess(false), 3000);
        } catch {
            setFormError("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                <p className="font-medium text-lg">Loading attendance records...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Attendance Tracker
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Mark and review class attendance for your students.
                    </p>
                </div>
                {/* Month selector */}
                <div className="relative">
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="appearance-none pl-4 pr-10 py-2.5 text-sm font-semibold border border-slate-200 rounded-xl bg-white shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {Array.from({ length: 6 }, (_, i) => {
                            const d = new Date();
                            d.setMonth(d.getMonth() - i);
                            const val = d.toISOString().slice(0, 7);
                            return (
                                <option key={val} value={val}>
                                    {d.toLocaleString("default", { month: "long", year: "numeric" })}
                                </option>
                            );
                        })}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
            </div>

            {/* Earnings Summary Banner */}
            {payoutSummary && (
                <div className="grid grid-cols-2 gap-4">
                    <Card className="border-emerald-100 bg-emerald-50/50 shadow-sm">
                        <CardContent className="flex items-center gap-4 pt-6">
                            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                                    Classes Completed
                                </p>
                                <p className="text-4xl font-black text-emerald-700">
                                    {payoutSummary.completed_classes}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-blue-100 bg-blue-50/50 shadow-sm">
                        <CardContent className="flex items-center gap-4 pt-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                                    Estimated Earnings
                                </p>
                                <p className="text-4xl font-black text-blue-700">
                                    ${payoutSummary.estimated_earnings_usd.toFixed(2)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {/* Mark Attendance Form */}
                <Card className="border-blue-100 shadow-sm">
                    <CardHeader className="border-b border-slate-100 pb-4">
                        <CardTitle className="text-lg font-bold">Mark Class Attendance</CardTitle>
                        <CardDescription>Record the outcome of today&apos;s session</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleMarkAttendance} className="space-y-5">
                            {/* Student Select */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                    Student
                                </label>
                                <div className="relative">
                                    <select
                                        value={form.student_id}
                                        onChange={(e) => setForm((f) => ({ ...f, student_id: e.target.value }))}
                                        required
                                        className="w-full appearance-none pl-4 pr-10 py-3 text-sm font-medium border border-slate-200 rounded-xl bg-white shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="" disabled>Select a student…</option>
                                        {students.map((s) => (
                                            <option key={s.id} value={s.id}>{s.name} ({s.course})</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Date and Time row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                        <Calendar className="w-3 h-3 inline mr-1" />Date
                                    </label>
                                    <input
                                        type="date"
                                        value={form.class_date}
                                        onChange={(e) => setForm((f) => ({ ...f, class_date: e.target.value }))}
                                        required
                                        max={new Date().toISOString().slice(0, 10)}
                                        className="w-full px-4 py-3 text-sm font-medium border border-slate-200 rounded-xl bg-white shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                        <Clock className="w-3 h-3 inline mr-1" />Time (UTC)
                                    </label>
                                    <input
                                        type="time"
                                        value={form.class_time}
                                        onChange={(e) => setForm((f) => ({ ...f, class_time: e.target.value }))}
                                        required
                                        className="w-full px-4 py-3 text-sm font-medium border border-slate-200 rounded-xl bg-white shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                    Class Status
                                </label>
                                <div className="grid grid-cols-1 gap-2">
                                    {Object.entries(STATUS_CONFIG).map(([value, cfg]) => {
                                        const Icon = cfg.icon;
                                        return (
                                            <label
                                                key={value}
                                                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                                                    form.status === value
                                                        ? cfg.color + " border-current"
                                                        : "border-slate-100 bg-white hover:border-slate-200"
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value={value}
                                                    checked={form.status === value}
                                                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                                                    className="sr-only"
                                                />
                                                <Icon className={`w-4 h-4 ${form.status === value ? "" : "text-slate-300"}`} />
                                                <span className="text-sm font-semibold">{cfg.label}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                    Notes (Optional)
                                </label>
                                <textarea
                                    value={form.notes}
                                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                                    placeholder="e.g., Great progress on Surah Al-Fatiha today!"
                                    rows={3}
                                    className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl bg-white shadow-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            {/* Feedback */}
                            {formError && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-200 font-medium">
                                    {formError}
                                </div>
                            )}
                            {formSuccess && (
                                <div className="p-3 bg-emerald-50 text-emerald-700 text-sm rounded-xl border border-emerald-200 font-bold flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Attendance marked successfully!
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={submitting || !form.student_id}
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all hover:scale-[1.01] disabled:opacity-60"
                            >
                                {submitting ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</>
                                ) : (
                                    <><CheckCircle2 className="w-4 h-4 mr-2" />Mark Attendance</>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Attendance History */}
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="border-b border-slate-100 pb-4">
                        <CardTitle className="text-lg font-bold">Session History</CardTitle>
                        <CardDescription>
                            {records.length} records for {new Date(selectedMonth + "-01").toLocaleString("default", { month: "long", year: "numeric" })}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 overflow-y-auto max-h-[560px]">
                        {records.length === 0 ? (
                            <div className="text-center py-16 text-slate-400">
                                <Calendar className="w-10 h-10 mx-auto mb-3 text-slate-200" />
                                <p className="font-bold text-slate-500">No records yet</p>
                                <p className="text-sm mt-1">Mark attendance for your first class!</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {records.map((record) => {
                                    const cfg = STATUS_CONFIG[record.status as keyof typeof STATUS_CONFIG];
                                    const Icon = cfg?.icon || CheckCircle2;
                                    return (
                                        <div
                                            key={record.id}
                                            className={`p-4 rounded-xl border ${cfg?.color} flex items-start gap-3`}
                                        >
                                            <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${cfg?.iconColor}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-sm truncate">{record.student_name}</p>
                                                <p className="text-xs font-medium mt-0.5 opacity-80">
                                                    {new Date(record.class_date).toLocaleDateString("en-US", {
                                                        weekday: "short",
                                                        month: "short",
                                                        day: "numeric",
                                                    })} · {record.class_time.slice(0, 5)} UTC
                                                </p>
                                                {record.notes && (
                                                    <p className="text-xs mt-1.5 opacity-70 italic line-clamp-2">
                                                        &ldquo;{record.notes}&rdquo;
                                                    </p>
                                                )}
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border ${cfg?.color} flex-shrink-0`}>
                                                {cfg?.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
