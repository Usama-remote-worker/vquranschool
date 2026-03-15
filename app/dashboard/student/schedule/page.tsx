"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentSchedulePage() {
    const schedule: any[] = [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Class Schedule</h1>
                    <p className="text-slate-500">View and manage your upcoming sessions.</p>
                </div>
                <div className="text-sm font-medium bg-white px-4 py-2 rounded-md shadow-sm border border-slate-200 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" /> Your Timezone: <span className="text-slate-900">GMT (London)</span>
                </div>
            </div>

            <Card className="border-blue-100 shadow-sm">
                <CardHeader className="bg-blue-50/50 border-b border-blue-50 rounded-t-xl">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-blue-600" /> This Week's Classes
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <ul className="divide-y divide-slate-100">
                        {schedule.map((slot) => (
                            <li key={slot.id} className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition-colors">
                                <div className="flex gap-4 items-start">
                                    <div className="bg-blue-100 text-blue-700 w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0">
                                        <span className="text-xs font-bold uppercase">{slot.day.substring(0, 3)}</span>
                                        <span className="text-lg font-extrabold leading-none mt-1">{slot.date.split(' ')[1].replace(',', '')}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg">{slot.type}</h3>
                                        <p className="text-slate-600 flex items-center gap-1.5 mt-1 text-sm bg-slate-100 w-max px-2 py-0.5 rounded-md">
                                            <Clock className="w-3.5 h-3.5" /> {slot.time}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                                    <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                                        {slot.status}
                                    </span>
                                    <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                                        <Video className="w-4 h-4 mr-2" /> Join Class
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
