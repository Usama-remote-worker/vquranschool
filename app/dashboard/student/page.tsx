"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, BookOpen, MessageSquare, Loader2, Video, LayoutDashboard, CreditCard, X, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
    const { data: session } = useSession();
    const [studentData, setStudentData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [teacherName, setTeacherName] = useState<string | null>(null);
    const [showPricingBanner, setShowPricingBanner] = useState(false);

    useEffect(() => {
        const fetchStudentInfo = async () => {
            if (!session?.user?.email) return;
            setLoading(true);
            try {
                const res = await fetch('/api/admin/users');
                const data = await res.json();
                if (data.users) {
                    const me = data.users.find((u: any) => u.email === session.user?.email);
                    if (me) {
                        setStudentData(me);
                        if (me.assigned_teacher) {
                            const teacher = data.users.find((u: any) => u.id === me.assigned_teacher);
                            if (teacher) setTeacherName(teacher.name);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching student info:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudentInfo();
    }, [session]);

    useEffect(() => {
        // Show pricing banner for new (pending) students who haven't dismissed it yet
        if (studentData?.status === 'pending') {
            const dismissed = localStorage.getItem(`pricing_banner_dismissed_${studentData.id}`);
            if (!dismissed) setShowPricingBanner(true);
        }
    }, [studentData]);

    const dismissBanner = () => {
        setShowPricingBanner(false);
        if (studentData?.id) {
            localStorage.setItem(`pricing_banner_dismissed_${studentData.id}`, 'true');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                <p className="font-medium">Loading your classroom dashboard...</p>
            </div>
        );
    }

    const isPending = studentData?.status === 'pending';
    const isApproved = studentData?.status === 'approved';

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* ── Welcome Banner (shown only to new/pending students) ── */}
            {showPricingBanner && (
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-6 shadow-xl shadow-blue-900/20">
                    {/* background decoration */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12)_0%,_transparent_60%)] pointer-events-none" />
                    <div className="absolute top-0 right-0 h-full w-1/3 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff fill-opacity=0.04%3E%3Cpath d=M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 pointer-events-none" />

                    <button
                        onClick={dismissBanner}
                        className="absolute top-4 right-4 p-1.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors z-10"
                        aria-label="Dismiss"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                            <Sparkles className="w-6 h-6 text-yellow-300" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">Welcome to vQuranSchool!</p>
                            <h2 className="text-xl font-bold mb-1">Choose the program that suits you best 🎓</h2>
                            <p className="text-blue-100 text-sm leading-relaxed">
                                We offer flexible plans — 3 or 5 live sessions per week. Pick what fits your schedule and start your Quran journey today.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                            <Link href="/dashboard/student/pricing">
                                <Button className="bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-xl h-11 px-6 w-full sm:w-auto shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02]">
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    View All Plans
                                </Button>
                            </Link>
                            <button
                                onClick={dismissBanner}
                                className="text-sm text-blue-200 hover:text-white font-medium transition-colors text-center"
                            >
                                Remind me later
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Page Header ── */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome, {session?.user?.name || "Student"}!</h1>
                <p className="text-slate-500 mt-2">Here is an overview of your learning journey.</p>
            </div>

            {/* ── Approval Status Alert ── */}
            {isPending && (
                <Card className="border-amber-200 bg-amber-50/50 shadow-sm border-l-4 border-l-amber-500">
                    <CardContent className="py-4 flex items-center gap-4">
                        <div className="p-2 bg-amber-100 rounded-full text-amber-600">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-amber-800">Application Under Review</p>
                            <p className="text-sm text-amber-700">The admin team is reviewing your registration for <span className="font-bold">{studentData?.course}</span>. We'll notify you soon!</p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* ── Main Stats Cards ── */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Teacher Card */}
                <Card className="border-blue-100 shadow-sm hover:border-blue-300 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-slate-50 rounded-t-xl bg-slate-50/30">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Assigned Teacher</CardTitle>
                        <User className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent className="pt-5">
                        <div className="text-2xl font-bold text-slate-900">{teacherName || "Not Assigned Yet"}</div>
                        <p className="text-xs text-slate-500 mt-1">Specialist in {studentData?.course || "Quranic Studies"}</p>
                        <Button
                            size="sm"
                            variant="outline"
                            className="w-full mt-6 text-blue-600 border-blue-200 hover:bg-blue-50 h-10 shadow-sm"
                            disabled={!studentData?.assigned_teacher}
                        >
                            <MessageSquare className="w-4 h-4 mr-2" /> Contact Teacher
                        </Button>
                    </CardContent>
                </Card>

                {/* Course Progress Card */}
                <Card className="border-blue-100 shadow-sm hover:border-blue-300 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-slate-50 rounded-t-xl bg-slate-50/30">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Enrolled Course</CardTitle>
                        <BookOpen className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent className="pt-5">
                        <div className="text-xl font-bold text-blue-700">{studentData?.course || "Not Enrolled"}</div>
                        <p className="text-xs text-slate-500 mt-1">Goal: Tajweed Mastery</p>
                        <div className="mt-8">
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                                <span>Curriculum Progress</span>
                                <span className="text-blue-600">0%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner border border-slate-50">
                                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `0%` }}></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Next Class Card */}
                <Card className="border-blue-100 shadow-sm hover:border-blue-300 transition-colors md:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-slate-50 rounded-t-xl bg-slate-50/30">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Next Live Session</CardTitle>
                        <Clock className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent className="pt-5">
                        <div className="text-2xl font-bold text-slate-900 italic">"Coming Soon"</div>
                        <div className="flex items-center gap-2 mt-4 text-sm text-blue-600 bg-blue-50 p-2.5 rounded-lg border border-blue-100">
                            <Calendar className="w-4 h-4 shrink-0" /> Schedule will be updated after approval
                        </div>
                        <Button
                            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 h-10 text-white shadow-sm"
                            disabled={!isApproved}
                        >
                            <Video className="w-4 h-4 mr-2" /> Join Zoom Meeting
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* ── Quick Links ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/dashboard/student/course">
                    <Card className="border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group flex items-center p-6 bg-white cursor-pointer">
                        <div className="p-4 bg-slate-50 rounded-2xl text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <LayoutDashboard className="w-6 h-6" />
                        </div>
                        <div className="ml-6 flex-grow">
                            <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">Course Materials</h3>
                            <p className="text-slate-500 text-sm">Access your notes, recordings, and assignments.</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-all group-hover:translate-x-1" />
                    </Card>
                </Link>
                <Link href="/dashboard/student/schedule">
                    <Card className="border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group flex items-center p-6 bg-white cursor-pointer">
                        <div className="p-4 bg-slate-50 rounded-2xl text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div className="ml-6 flex-grow">
                            <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">Weekly Schedule</h3>
                            <p className="text-slate-500 text-sm">View and manage your upcoming live classes.</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-all group-hover:translate-x-1" />
                    </Card>
                </Link>
            </div>
        </div>
    );
}
