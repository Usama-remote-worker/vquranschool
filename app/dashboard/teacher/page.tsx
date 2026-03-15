"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock, Video, UserCircle2 } from "lucide-react";

export default function TeacherDashboard() {
    const { data: session } = useSession();

    const mockStudents: any[] = [];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, {session?.user?.name || "Teacher"}!</h1>
                <p className="text-slate-500 mt-2">Here is a quick overview of your classes and students.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-blue-100 shadow-sm col-span-1 md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xl font-bold">Upcoming Classes</CardTitle>
                        <Clock className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 mt-4">
                            {mockStudents.slice(0, 2).map((student) => (
                                <div key={student.id} className="flex items-center justify-between p-4 rounded-lg bg-blue-50 border border-blue-100">
                                    <div className="flex items-center gap-3">
                                        <UserCircle2 className="w-10 h-10 text-blue-500" />
                                        <div>
                                            <p className="font-bold text-slate-800">{student.name}</p>
                                            <p className="text-sm text-blue-600 font-medium">{student.course} • {student.nextClass}</p>
                                        </div>
                                    </div>
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                        <Video className="w-4 h-4 mr-2" /> Start Class
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-blue-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-bold">Quick Stats</CardTitle>
                        <Users className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent className="space-y-6 pt-4">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Active Students</p>
                            <p className="text-4xl font-extrabold text-blue-600 mt-1">0</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Hours Taught This Week</p>
                            <p className="text-2xl font-bold text-slate-800 mt-1">0 hrs</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-slate-200">
                <CardHeader>
                    <CardTitle>My Students</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 text-sm font-medium text-slate-500">
                                    <th className="pb-3 px-4">Student Name</th>
                                    <th className="pb-3 px-4">Course</th>
                                    <th className="pb-3 px-4">Status</th>
                                    <th className="pb-3 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {mockStudents.map((student) => (
                                    <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="py-4 px-4 font-semibold text-slate-800">{student.name}</td>
                                        <td className="py-4 px-4 text-blue-600">{student.course}</td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600">
                                                View Profile
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
