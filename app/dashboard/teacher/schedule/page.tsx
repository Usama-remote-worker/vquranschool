"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Users, Video, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface ScheduleSlot {
    id: string;
    day_of_week: number;
    start_time: string;
    student_name: string;
}

export default function TeacherSchedulePage() {
    const [schedule, setSchedule] = useState<ScheduleSlot[]>([]);
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
            <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                <p className="font-medium">Syncing your weekly roster...</p>
            </div>
        );
    }

    const today = new Date().getDay();
    const groupedSchedule = DAYS.map((day, index) => ({
        day,
        index,
        slots: schedule.filter(s => s.day_of_week === index).sort((a, b) => a.start_time.localeCompare(b.start_time))
    }));

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-serif">Weekly Teaching Roster</h1>
                    <p className="text-slate-500 mt-1">Manage your recurring class commitments and join live sessions.</p>
                </div>
            </div>

            {schedule.length === 0 ? (
                <Card className="border-slate-200 border-dashed bg-slate-50/50">
                    <CardContent className="p-20 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                            <AlertCircle className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif">No students assigned yet</h3>
                        <p className="text-slate-500 max-w-sm">When the administrator assigns students to your schedule, they will appear here grouped by day.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {groupedSchedule.map(({ day, index, slots }) => {
                        if (slots.length === 0) return null;
                        const isToday = index === today;

                        return (
                            <div key={day} className={`relative group ${isToday ? 'scale-[1.01] z-10' : ''} transition-transform`}>
                                {isToday && (
                                    <div className="absolute -left-1 top-0 bottom-0 w-1 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
                                )}
                                <Card className={`border-slate-200 shadow-sm overflow-hidden ${isToday ? 'border-blue-200 bg-blue-50/10' : ''}`}>
                                    <CardHeader className={`py-4 px-6 flex flex-row items-center justify-between border-b ${isToday ? 'bg-blue-600 text-white border-blue-700' : 'bg-slate-50/80 border-slate-100'}`}>
                                        <div className="flex items-center gap-3">
                                            <CalendarIcon className={`w-5 h-5 ${isToday ? 'text-white' : 'text-blue-600'}`} />
                                            <CardTitle className="text-lg font-bold font-serif">{day}</CardTitle>
                                            {isToday && (
                                                <span className="text-[10px] uppercase font-black tracking-widest bg-white/20 px-2 py-0.5 rounded-full">Today</span>
                                            )}
                                        </div>
                                        <span className={`text-xs font-bold ${isToday ? 'text-blue-100' : 'text-slate-400'}`}>
                                            {slots.length} {slots.length === 1 ? 'Session' : 'Sessions'}
                                        </span>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-slate-100">
                                            {slots.map((slot) => (
                                                <div key={slot.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                                                    <div className="flex items-center gap-6">
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-2 text-blue-700">
                                                                <Clock className="w-4 h-4" />
                                                                <span className="text-xl font-black font-mono tracking-tight">{slot.start_time.substring(0, 5)}</span>
                                                            </div>
                                                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">Start Time</span>
                                                        </div>
                                                        <div className="w-px h-10 bg-slate-100 hidden sm:block" />
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-2 text-slate-900">
                                                                <Users className="w-4 h-4 text-slate-400" />
                                                                <span className="text-lg font-bold">{slot.student_name}</span>
                                                            </div>
                                                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">Live Classroom Session</span>
                                                        </div>
                                                    </div>
                                                    <Button className={`w-full sm:w-auto h-11 px-8 font-bold rounded-xl shadow-lg transition-all ${isToday ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20' : 'bg-slate-800 hover:bg-slate-900'}`}>
                                                        <Video className="w-4 h-4 mr-2" /> Start Class
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
}
