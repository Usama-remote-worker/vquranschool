"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Plus, Trash2, Search, User, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AdminSchedulesPage() {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [newSlot, setNewSlot] = useState({ day_of_week: 1, start_time: "10:00" });

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/students");
            const data = await res.json();
            if (res.ok) setStudents(data.students);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudentSchedule = async (studentId: string) => {
        try {
            const res = await fetch(`/api/admin/students/schedule?studentId=${studentId}`);
            const data = await res.json();
            setSelectedStudent({ ...selectedStudent, schedule: data.schedule });
        } catch (error) {
            console.error(error);
        }
    };

    const addScheduleSlot = async () => {
        if (!selectedStudent) return;
        try {
            const res = await fetch("/api/admin/students/schedule", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    studentId: selectedStudent.id, 
                    day_of_week: newSlot.day_of_week, 
                    start_time: newSlot.start_time 
                }),
            });
            if (res.ok) {
                fetchStudentSchedule(selectedStudent.id);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const removeScheduleSlot = async (slotId: string) => {
        try {
            const res = await fetch(`/api/admin/students/schedule?slotId=${slotId}`, { method: "DELETE" });
            if (res.ok) {
                fetchStudentSchedule(selectedStudent.id);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) || 
        s.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Student Schedule Manager</h1>
                <p className="text-slate-500 text-sm mt-1">Assign recurring class days and times to your students.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Student List */}
                <Card className="lg:col-span-4 border-slate-200 h-fit">
                    <CardHeader className="pb-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input 
                                placeholder="Search students..." 
                                className="pl-9 rounded-xl border-slate-200"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="max-h-[500px] overflow-y-auto divide-y divide-slate-100">
                            {filteredStudents.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => {
                                        setSelectedStudent(s);
                                        fetchStudentSchedule(s.id);
                                    }}
                                    className={`w-full text-left px-6 py-4 transition-colors flex items-center justify-between ${
                                        selectedStudent?.id === s.id ? "bg-blue-50 border-l-4 border-blue-600" : "hover:bg-slate-50"
                                    }`}
                                >
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                                        <p className="text-xs text-slate-500">{s.email}</p>
                                    </div>
                                    <User className={`w-4 h-4 ${selectedStudent?.id === s.id ? "text-blue-500" : "text-slate-300"}`} />
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule Editor */}
                <div className="lg:col-span-8 space-y-6">
                    {selectedStudent ? (
                        <>
                            <Card className="border-slate-200 overflow-hidden">
                                <CardHeader className="bg-slate-50 border-b border-slate-200">
                                    <div className="flex justify-between items-center text-sm">
                                        <CardTitle className="text-lg">Schedule for {selectedStudent.name}</CardTitle>
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold text-[10px]">
                                            ACTIVE PLAN
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                                        {DAYS.map((day, index) => {
                                            const slots = selectedStudent.schedule?.filter((s: any) => s.day_of_week === index) || [];
                                            return (
                                                <div key={day} className="flex flex-col gap-2">
                                                    <p className="text-[10px] font-black uppercase text-slate-400 text-center mb-1">{day.substring(0, 3)}</p>
                                                    <div className="min-h-[60px] bg-slate-50 rounded-xl border border-slate-100 p-2 space-y-2 flex flex-col items-center">
                                                        {slots.map((slot: any) => (
                                                            <div key={slot.id} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-center relative group shadow-sm">
                                                                <p className="font-bold text-slate-700 text-xs">{slot.start_time.substring(0, 5)}</p>
                                                                <button 
                                                                    onClick={() => removeScheduleSlot(slot.id)}
                                                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        {slots.length === 0 && <span className="text-[10px] text-slate-300 mt-4">—</span>}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-blue-100 bg-blue-50/30">
                                <CardContent className="p-6">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Plus className="w-4 h-4" /> Add New Session
                                    </h3>
                                    <div className="flex flex-wrap gap-4 items-end">
                                        <div className="space-y-1.5">
                                            <p className="text-xs font-bold text-slate-500 uppercase ml-1">Day</p>
                                            <select 
                                                value={newSlot.day_of_week}
                                                onChange={(e) => setNewSlot({...newSlot, day_of_week: parseInt(e.target.value)})}
                                                className="bg-white border border-slate-200 h-10 px-3 pr-8 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                                            >
                                                {DAYS.map((day, i) => <option key={i} value={i}>{day}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <p className="text-xs font-bold text-slate-500 uppercase ml-1">Start Time</p>
                                            <Input 
                                                type="time" 
                                                value={newSlot.start_time}
                                                onChange={(e) => setNewSlot({...newSlot, start_time: e.target.value})}
                                                className="bg-white border-slate-200 h-10 rounded-xl"
                                            />
                                        </div>
                                        <Button onClick={addScheduleSlot} className="bg-blue-600 hover:bg-blue-700 h-10 px-8 rounded-xl font-bold shadow-lg shadow-blue-600/20">
                                            Add Slot
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center p-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400">
                            <Calendar className="w-16 h-16 mb-4 opacity-20" />
                            <p className="font-medium">Select a student from the left to manage their schedule</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
