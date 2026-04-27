"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Video, BookOpen, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function StudentSchedulePage() {
    const [schedule, setSchedule] = useState<any[]>([]);
    const [planFrequency, setPlanFrequency] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSchedule() {
            try {
                const res = await fetch("/api/students/schedule");
                const data = await res.json();
                if (data.schedule) {
                    setSchedule(data.schedule);
                    setPlanFrequency(data.planFrequency);
                }
            } catch (error) {
                console.error("Failed to fetch schedule", error);
            } finally {
                setLoading(false);
            }
        }
        fetchSchedule();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Weekly Timetable</h1>
                    <p className="text-slate-500">Your regular recurring classes based on your plan.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-sm font-bold bg-blue-50 text-blue-700 px-4 py-2 rounded-xl border border-blue-100 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> Weekly Limit: {schedule.length} / {planFrequency === "2 days week" ? "2" : planFrequency === "3 days week" ? "3" : planFrequency === "5 days week" ? "5" : "—"} classes
                    </div>
                    <Link href="/dashboard/student/pricing">
                        <Button variant="outline" size="sm" className="rounded-xl border-blue-200 text-blue-700 hover:bg-blue-50 font-bold">
                            Upgrade Plan
                        </Button>
                    </Link>
                </div>
            </div>

            {schedule.length === 0 ? (
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-12 text-center flex flex-col items-center">
                    <AlertCircle className="w-12 h-12 text-amber-500 mb-4" />
                    <h3 className="text-lg font-bold text-amber-900">No active schedule found</h3>
                    <p className="text-amber-700 max-w-sm mt-1">
                        Once your payment is approved, our admin will assign your class days and times here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {schedule.map((slot) => (
                        <Card key={slot.id} className="border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                                <span className="font-bold uppercase tracking-widest text-[10px]">{DAYS[slot.day_of_week]}</span>
                                <div className="p-1 px-2 bg-white/10 rounded-md text-[11px] font-medium">
                                    Recurring
                                </div>
                            </div>
                            <CardContent className="p-5 space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase leading-none mb-1">Time</p>
                                        <p className="text-lg font-black text-slate-800">{slot.start_time.substring(0, 5)}</p>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold h-10 rounded-xl">
                                        <Video className="w-4 h-4 mr-2" /> Join Room
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
