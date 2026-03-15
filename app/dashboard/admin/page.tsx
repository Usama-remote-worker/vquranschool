"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, Inbox, Check, X } from "lucide-react";

export default function AdminDashboard() {
    const mockPendingTeachers: any[] = [];

    const mockTrialRequests: any[] = [];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Control Panel</h1>
                <p className="text-slate-500 mt-2">Manage users, approve teachers, and oversee all platform activity.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-blue-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 bg-slate-50 border-b border-slate-100 rounded-t-xl">
                        <CardTitle className="text-lg font-bold">New Teacher Applications</CardTitle>
                        <UserCog className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent className="p-0">
                        <ul className="divide-y divide-slate-100">
                            {mockPendingTeachers.map(teacher => (
                                <li key={teacher.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-bold text-slate-800">{teacher.name}</h3>
                                        <p className="text-sm text-slate-500">{teacher.qualification} • <span className="text-blue-600 font-medium">{teacher.specialization}</span></p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                            <Check className="w-4 h-4 mr-1" /> Approve
                                        </Button>
                                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                                            <X className="w-4 h-4 mr-1" /> Reject
                                        </Button>
                                    </div>
                                </li>
                            ))}
                            {mockPendingTeachers.length === 0 && (
                                <li className="p-8 text-center text-slate-500">No pending applications</li>
                            )}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border-blue-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 bg-slate-50 border-b border-slate-100 rounded-t-xl">
                        <CardTitle className="text-lg font-bold">Recent Trial Requests</CardTitle>
                        <Inbox className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent className="p-0">
                        <ul className="divide-y divide-slate-100">
                            {mockTrialRequests.map(trial => (
                                <li key={trial.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-bold text-slate-800">{trial.student} <span className="text-xs text-slate-400 font-normal">({trial.age} yrs)</span></h3>
                                        <p className="text-sm text-slate-500">Requested: <span className="text-blue-600 font-medium">{trial.course}</span> on {trial.appliedOn}</p>
                                    </div>
                                    <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 shrink-0">
                                        Assign Teacher
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
