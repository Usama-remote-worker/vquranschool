"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeacherSchedulePage() {
    const schedule: any[] = [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Teaching Schedule</h1>
                    <p className="text-slate-500">Manage your classes and join active sessions.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-slate-200">
                        Set Availability
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        Sync Calendar
                    </Button>
                </div>
            </div>

            <Card className="border-slate-200 shadow-sm">
                <CardHeader className="bg-slate-50 border-b border-slate-100 rounded-t-xl">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-blue-600" /> Upcoming Classes
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 text-sm font-medium text-slate-500 bg-white">
                                    <th className="py-4 px-6">Date</th>
                                    <th className="py-4 px-6">Time</th>
                                    <th className="py-4 px-6">Student</th>
                                    <th className="py-4 px-6">Course</th>
                                    <th className="py-4 px-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {schedule.map((slot) => (
                                    <tr key={slot.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="font-semibold text-slate-800">{slot.day}</div>
                                            <div className="text-xs text-slate-500">{slot.date}</div>
                                        </td>
                                        <td className="py-4 px-6 font-medium text-slate-700 flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-blue-500" /> {slot.time}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2 font-medium text-slate-800">
                                                <Users className="w-4 h-4 text-slate-400" /> {slot.student}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-blue-600 font-medium">
                                            {slot.course}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                <Video className="w-4 h-4 mr-2" /> Start Class
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
