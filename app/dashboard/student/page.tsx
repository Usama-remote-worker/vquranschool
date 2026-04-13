"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, BookOpen, MessageSquare, Loader2, Video, LayoutDashboard, CreditCard, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
    const { data: session } = useSession();
    const [studentData, setStudentData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [teacherName, setTeacherName] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchStudentInfo = async () => {
            if (!session?.user?.email) return;
            setLoading(true);
            try {
                const res = await fetch('/api/students/profile');
                const data = await res.json();
                if (data.student) {
                    setStudentData(data.student);
                    setTeacherName(data.student.teacher_name);
                    
                    // Immediately redirect pending students to the pricing page
                    if (data.student.status === 'pending') {
                        router.replace('/dashboard/student/pricing');
                    }
                }
            } catch (error) {
                console.error("Error fetching student info:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudentInfo();
    }, [session, router]);
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
