"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, Inbox, Check, X, Loader2, ArrowRight, Users, GraduationCap, BookOpen } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const [pendingTeachers, setPendingTeachers] = useState<any[]>([]);
    const [trialRequests, setTrialRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersRes, trialsRes] = await Promise.all([
                fetch('/api/admin/users'),
                fetch('/api/admin/trials')
            ]);
            
            const usersData = await usersRes.json();
            const trialsData = await trialsRes.json();
            
            if (usersData.users) {
                setPendingTeachers(usersData.users.filter((u: any) => u.role === 'teacher' && u.status === 'pending'));
            }
            if (trialsData.trials) {
                setTrialRequests(trialsData.trials.slice(0, 5)); // Just take the 5 most recent
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleTeacherAction = async (teacherId: string, action: 'approved' | 'rejected') => {
        setActionId(teacherId);
        try {
            const res = await fetch('/api/teachers/approve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ teacher_id: teacherId, action })
            });

            if (res.ok) {
                setPendingTeachers(prev => prev.filter(t => t.id !== teacherId));
            }
        } catch (error) {
            console.error("Error updating teacher status:", error);
        } finally {
            setActionId(null);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Control Panel</h1>
                <p className="text-slate-500 mt-2">Manage users, approve teachers, and oversee all platform activity.</p>
            </div>

            {/* Quick Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Active Students</p>
                                <p className="text-2xl font-bold text-slate-900">Live Data</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Teachers</p>
                                <p className="text-2xl font-bold text-slate-900">Live Data</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500">Pending Trials</p>
                                <p className="text-2xl font-bold text-slate-900">{trialRequests.filter(t => t.status === 'new').length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Pending Teacher Applications */}
                <Card className="border-blue-100 shadow-sm flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 bg-slate-50/50 border-b border-slate-100 rounded-t-xl">
                        <div>
                            <CardTitle className="text-lg font-bold">Pending Applications</CardTitle>
                            <CardDescription>New teachers waiting for approval</CardDescription>
                        </div>
                        <UserCog className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                        <ul className="divide-y divide-slate-100">
                            {loading ? (
                                <li className="p-8 text-center text-slate-400">
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
                                    Loading applications...
                                </li>
                            ) : pendingTeachers.length === 0 ? (
                                <li className="p-8 text-center text-slate-500">No pending applications</li>
                            ) : (
                                pendingTeachers.map(teacher => (
                                    <li key={teacher.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/30 transition-colors">
                                        <div>
                                            <h3 className="font-bold text-slate-800">{teacher.name}</h3>
                                            <p className="text-xs text-slate-500 mt-0.5">{teacher.qualification}</p>
                                            <p className="text-sm text-blue-600 font-medium mt-1">{teacher.specialization}</p>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <Button 
                                                size="sm" 
                                                className="bg-blue-600 hover:bg-blue-700 h-8 shadow-sm"
                                                disabled={actionId === teacher.id}
                                                onClick={() => handleTeacherAction(teacher.id, 'approved')}
                                            >
                                                {actionId === teacher.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 mr-1" />}
                                                Approve
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                variant="outline" 
                                                className="text-red-600 border-red-200 hover:bg-red-50 h-8 shadow-sm"
                                                disabled={actionId === teacher.id}
                                                onClick={() => handleTeacherAction(teacher.id, 'rejected')}
                                            >
                                                <X className="w-4 h-4 mr-1" /> Reject
                                            </Button>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </CardContent>
                    <div className="p-4 bg-slate-50/30 border-t border-slate-100 rounded-b-xl">
                        <Link href="/dashboard/admin/teachers" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1 group">
                            Manage All Teachers <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </Card>

                {/* Recent Trial Requests */}
                <Card className="border-blue-100 shadow-sm flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 bg-slate-50/50 border-b border-slate-100 rounded-t-xl">
                        <div>
                            <CardTitle className="text-lg font-bold">Recent Trial Requests</CardTitle>
                            <CardDescription>Latest prospective students</CardDescription>
                        </div>
                        <Inbox className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                        <ul className="divide-y divide-slate-100">
                            {loading ? (
                                <li className="p-8 text-center text-slate-400">
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
                                    Loading requests...
                                </li>
                            ) : trialRequests.length === 0 ? (
                                <li className="p-8 text-center text-slate-500">No trial requests found</li>
                            ) : (
                                trialRequests.map(trial => (
                                    <li key={trial.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/30 transition-colors">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-slate-800">{trial.name}</h3>
                                                <span className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${trial.status === 'new' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                                                    {trial.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-500 mt-0.5 italic">{trial.course}</p>
                                        </div>
                                        <Link href="/dashboard/admin/trials">
                                            <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 shrink-0 h-8 shadow-sm">
                                                Process Request
                                            </Button>
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </CardContent>
                    <div className="p-4 bg-slate-50/30 border-t border-slate-100 rounded-b-xl">
                        <Link href="/dashboard/admin/trials" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1 group">
                            View All Requests <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
}
