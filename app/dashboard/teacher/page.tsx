"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock, Video, UserCircle2, Loader2, Calendar, LayoutDashboard } from "lucide-react";
import Link from "next/link";

import { Student } from "@/types";

export default function TeacherDashboard() {
    const { data: session } = useSession();
    const [assignedStudents, setAssignedStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            if (!session?.user?.id) return;
            setLoading(true);
            try {
                const res = await fetch('/api/admin/users');
                const data = await res.json();
                if (data.users) {
                    // Find students where this teacher is assigned
                    const myStudents = data.users.filter((u: Student & { assigned_teacher?: string }) => u.assigned_teacher === session.user.id);
                    setAssignedStudents(myStudents);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, [session]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                <p className="font-medium text-lg">Loading your instructor dashboard...</p>
                <p className="text-sm mt-1">Syncing with Academy Database...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome, {session?.user?.name || "Teacher"}!</h1>
                    <p className="text-slate-500 mt-2">Here is a quick overview of your classes and students.</p>
                </div>
                <Link href="/dashboard/teacher/schedule">
                    <Button variant="outline" className="border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-50 shadow-sm">
                        <Calendar className="w-4 h-4 mr-2" /> View Weekly Schedule
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Upcoming Classes Card */}
                <Card className="border-blue-100 shadow-sm col-span-1 md:col-span-2 hover:border-blue-300 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 bg-slate-50/30 border-b border-slate-100 rounded-t-xl">
                        <div>
                            <CardTitle className="text-xl font-bold">Upcoming Sessions</CardTitle>
                            <CardDescription>Your next scheduled student meetings</CardDescription>
                        </div>
                        <Video className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {assignedStudents.length > 0 ? (
                                assignedStudents.slice(0, 3).map((student) => (
                                    <div key={student.id} className="flex items-center justify-between p-4 rounded-xl bg-blue-50/50 border border-blue-100 hover:border-blue-300 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                <UserCircle2 className="w-7 h-7" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-lg leading-none">{student.name}</p>
                                                <div className="flex items-center gap-3 mt-1.5">
                                                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">{student.course}</span>
                                                    <span className="w-1 h-1 bg-slate-400 rounded-full" />
                                                    <span className="text-xs text-slate-500 flex items-center font-medium">
                                                        <Clock className="w-3 h-3 mr-1" /> No Time Assigned Yet
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button className="bg-blue-600 hover:bg-blue-700 shadow-md transform active:scale-95 transition-all">
                                            <Video className="w-4 h-4 mr-2" /> Start Now
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 text-slate-500">
                                    <Clock className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                                    <p className="font-bold text-slate-600">No scheduled classes yet</p>
                                    <p className="text-sm mt-1">Accept student requests or wait for admin assignment.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats Card */}
                <Card className="border-blue-100 shadow-sm flex flex-col hover:border-blue-300 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 bg-slate-50/30 border-b border-slate-100 rounded-t-xl">
                        <CardTitle className="text-lg font-bold">Performance Summary</CardTitle>
                        <Users className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent className="space-y-8 pt-8 flex-grow">
                        <div className="group cursor-default">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">My Active Students</p>
                            <div className="flex items-end gap-2">
                                <span className="text-5xl font-black text-blue-600 transition-transform group-hover:scale-110 block transform-gpu">{assignedStudents.length}</span>
                                <span className="text-sm font-bold text-slate-400 mb-1.5 underline decoration-blue-200 decoration-4">Qualified</span>
                            </div>
                        </div>
                        <div className="group cursor-default">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Hours Taught</p>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black text-slate-800 transition-transform group-hover:scale-105 block transform-gpu">0.0</span>
                                <span className="text-sm font-bold text-slate-400 mb-1.5 underline decoration-slate-200 decoration-4">Total hrs</span>
                            </div>
                        </div>
                    </CardContent>
                    <div className="p-4 bg-slate-50/50 border-t border-slate-100 rounded-b-xl">
                        <div className="text-[10px] text-center uppercase tracking-widest font-black text-slate-400">Monthly Target: 40 hrs</div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden shadow-inner">
                            <div className="bg-blue-600 h-full w-[2%]" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Students List Table */}
            <Card className="border-slate-200 shadow-sm overflow-hidden hover:border-blue-200 transition-colors">
                <CardHeader className="bg-slate-50/30 border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg font-bold">My Student Roster</CardTitle>
                    <CardDescription>Comprehensive list of all students assigned to your guidance</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50/30">
                                    <th className="py-4 px-6">Student Information</th>
                                    <th className="py-4 px-6">Educational Path</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Administrative</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {assignedStudents.length > 0 ? (
                                    assignedStudents.map((student) => (
                                        <tr key={student.id} className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors group">
                                            <td className="py-5 px-6">
                                                <div className="font-bold text-slate-800 text-base">{student.name}</div>
                                                <div className="text-xs text-slate-500 mt-0.5">{student.email}</div>
                                            </td>
                                            <td className="py-5 px-6">
                                                <div className="font-bold text-blue-700">{student.course}</div>
                                                <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Quranic Curriculum</div>
                                            </td>
                                            <td className="py-5 px-6">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-green-50 text-green-700 border border-green-200 shadow-sm">
                                                    {student.status}
                                                </span>
                                            </td>
                                            <td className="py-5 px-6 text-right">
                                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-white hover:bg-blue-600 font-bold px-4 h-9 shadow-sm transition-all border border-blue-50">
                                                    Manage Profile
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="py-20 text-center">
                                            <LayoutDashboard className="w-12 h-12 mx-auto mb-4 text-slate-200" />
                                            <p className="text-slate-500 font-bold text-lg">Your roster is currently empty</p>
                                            <p className="text-slate-400 text-sm mt-1">Assigned students will appear here automatically.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
