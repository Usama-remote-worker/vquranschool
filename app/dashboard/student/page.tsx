"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, BookOpen, MessageSquare } from "lucide-react";

export default function StudentDashboard() {
    const { data: session } = useSession();

    // State for when actual DB is hooked up. Currently empty.
    const dashboardData = {
        course: "Not Enrolled",
        teacher: "No Teacher Assigned",
        nextClassTime: "No Upcoming Classes",
        progress: 0
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome, {session?.user?.name || "Student"}!</h1>
                <p className="text-slate-500 mt-2">Here is an overview of your learning journey.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-blue-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Assigned Teacher</CardTitle>
                        <User className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{dashboardData.teacher}</div>
                        <p className="text-xs text-slate-500 mt-1">Tajweed & Hifz Specialist</p>
                        <Button size="sm" variant="outline" className="w-full mt-4 text-blue-600 border-blue-200 hover:bg-blue-50">
                            <MessageSquare className="w-4 h-4 mr-2" /> Contact Teacher
                        </Button>
                    </CardContent>
                </Card>

                <Card className="border-blue-100 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Enrolled Course</CardTitle>
                        <BookOpen className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold text-slate-900">{dashboardData.course}</div>
                        <div className="mt-4 flex items-center justify-between text-sm">
                            <span className="text-slate-500">Progress</span>
                            <span className="font-medium text-blue-600">{dashboardData.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${dashboardData.progress}%` }}></div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-blue-100 shadow-sm md:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Next Class</CardTitle>
                        <Clock className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{dashboardData.nextClassTime}</div>
                        <div className="flex items-center gap-2 mt-4 text-sm text-amber-600 bg-amber-50 p-2 rounded border border-amber-100">
                            <Calendar className="w-4 h-4" /> Please join 5 mins early
                        </div>
                        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                            Join Zoom Meeting
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
