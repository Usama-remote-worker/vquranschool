"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, CheckCircle, Circle, PlayCircle } from "lucide-react";

export default function StudentCoursePage() {
    const syllabus: any[] = [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Course</h1>
                <p className="text-slate-500">Track your progress and access course materials.</p>
            </div>

            <Card className="border-blue-100 shadow-sm">
                <CardHeader className="bg-blue-50/50 border-b border-blue-50 rounded-t-xl">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">Not Enrolled in Any Course</CardTitle>
                            <CardDescription>Level N/A • Progress: 0%</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <h3 className="font-semibold text-slate-800 mb-4">Course Syllabus</h3>
                    <div className="space-y-4">
                        {syllabus.length === 0 ? (
                            <div className="text-center py-8 text-slate-500">
                                <p>You are not currently enrolled in any course.</p>
                                <p className="text-sm mt-2">Your course syllabus will appear here once you are assigned to a class.</p>
                            </div>
                        ) : (
                            syllabus.map((lesson) => (
                                <div key={lesson.id} className={`flex items-center gap-3 p-3 rounded-lg border ${lesson.current ? 'border-blue-200 bg-blue-50' : 'border-slate-100'}`}>
                                    {lesson.completed ? (
                                        <CheckCircle className="w-5 h-5 text-blue-500" />
                                    ) : lesson.current ? (
                                        <PlayCircle className="w-5 h-5 text-blue-600" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-slate-300" />
                                    )}
                                    <span className={`font-medium ${lesson.completed ? 'text-slate-500 line-through' : lesson.current ? 'text-blue-700 font-bold' : 'text-slate-700'}`}>
                                        Lesson {lesson.id}: {lesson.title}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
