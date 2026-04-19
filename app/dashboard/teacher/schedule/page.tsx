"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Users, Video, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function TeacherSchedulePage() {
    const [schedule, setSchedule] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSchedule() {
            try {
                const res = await fetch("/api/teacher/schedule");
                const data = await res.json();
                if (data.schedule) setSchedule(data.schedule);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchSchedule();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Teaching Roster</h1>
                    <p className="text-slate-500">View your weekly teaching commitments and join sessions.</p>
                </div>
            </div>

            {schedule.length === 0 ? (
                <Card className="border-slate-200 border-dashed">
                    <CardContent className="p-12 text-center flex flex-col items-center">
                        <AlertCircle className="w-10 h-10 text-slate-300 mb-3" />
                        <p className="text-slate-500 font-medium">No students currently scheduled.</p>
                    </CardContent>
                </Card>
            ) : (
                <Card className="border-slate-200 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b border-slate-100">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-blue-600" /> Weekly Schedule
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 text-[10px] font-black text-slate-400 bg-white uppercase tracking-widest">
                                        <th className="py-4 px-6">Day</th>
                                        <th className="py-4 px-6">Time</th>
                                        <th className="py-4 px-6">Student</th>
                                        <th className="py-4 px-6 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {schedule.map((slot) => (
                                        <tr key={slot.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="font-bold text-slate-900">{DAYS[slot.day_of_week]}</div>
                                            </td>
                                            <td className="py-4 px-6 font-medium text-slate-700">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-blue-500" /> {slot.start_time.substring(0, 5)}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2 font-bold text-slate-800">
                                                    <Users className="w-4 h-4 text-slate-400" /> {slot.student_name}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-bold rounded-lg px-4 shadow-sm">
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
            )}
        </div>
    );
}
