"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Video, MoreVertical, FileText } from "lucide-react";

export default function TeacherStudentsPage() {
    const students: any[] = [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Students</h1>
                <p className="text-slate-500">Manage your assigned students and track their progress.</p>
            </div>

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                {students.map((student) => (
                    <Card key={student.id} className="border-slate-200">
                        <CardHeader className="pb-3 flex flex-row items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-600">
                                    {student.name.charAt(0)}
                                </div>
                                <div>
                                    <CardTitle className="text-lg">{student.name}</CardTitle>
                                    <p className="text-sm text-slate-500">{student.age} yrs • {student.country}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-slate-400">
                                <MoreVertical className="w-5 h-5" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <p className="text-sm font-medium text-blue-600 bg-blue-50 w-max px-2 py-1 rounded inline-block">
                                    {student.course}
                                </p>
                                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 mb-1">
                                    <span>Progress</span>
                                    <span className="font-semibold text-slate-700">{student.progress}%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full rounded-full" style={{ width: `${student.progress}%` }}></div>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-6">
                                <Button size="sm" variant="outline" className="flex-1 text-slate-600">
                                    <MessageSquare className="w-4 h-4 mr-2" /> Message
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 text-slate-600">
                                    <FileText className="w-4 h-4 mr-2" /> Report
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
