"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminCoursesPage() {
    const courses = [
        { id: 1, title: "Noorani Qaida", level: "Beginner", students: 0, teachers: 0 },
        { id: 2, title: "Quran Reading (Nazra)", level: "Intermediate", students: 0, teachers: 0 },
        { id: 3, title: "Quran Memorization (Hifz)", level: "Advanced", students: 0, teachers: 0 },
        { id: 4, title: "Tajweed Rules", level: "Intermediate", students: 0, teachers: 0 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manage Courses</h1>
                    <p className="text-slate-500">Add, edit, and organize academy curriculum offerings.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                    <Plus className="w-4 h-4 mr-2" /> Add New Course
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {courses.map((course) => (
                    <Card key={course.id} className="border-slate-200 hover:border-blue-200 transition-colors shadow-sm">
                        <CardHeader className="pb-3 flex flex-row items-start justify-between">
                            <div>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-blue-500" /> {course.title}
                                </CardTitle>
                                <CardDescription className="mt-1">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                                        {course.level}
                                    </span>
                                </CardDescription>
                            </div>
                            <div className="flex gap-1">
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-6 mt-2 pt-4 border-t border-slate-100">
                                <div>
                                    <div className="text-2xl font-bold text-slate-800">{course.students}</div>
                                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Active Students</div>
                                </div>
                                <div className="w-px h-10 bg-slate-200"></div>
                                <div>
                                    <div className="text-2xl font-bold text-slate-800">{course.teachers}</div>
                                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Instructors</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
