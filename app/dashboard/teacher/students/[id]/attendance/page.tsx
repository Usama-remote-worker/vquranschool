"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
    CheckCircle2, ArrowLeft, Loader2, BookOpen, 
    Calendar as CalendarIcon, Clock, MessageSquare, 
    Video, Star, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import Link from "next/link";

export default function MarkAttendancePage() {
    const { id: studentId } = useParams();
    const router = useRouter();
    const { addToast } = useToast();
    
    const [student, setStudent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    
    // Form State
    const [status, setStatus] = useState("completed");
    const [notes, setNotes] = useState("");
    const [classDate, setClassDate] = useState(new Date().toISOString().split('T')[0]);
    const [classTime, setClassTime] = useState(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await fetch(`/api/teachers/students`);
                const data = await res.json();
                const found = data.students?.find((s: any) => s.id === studentId);
                if (found) setStudent(found);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, [studentId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch("/api/attendance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    student_id: studentId,
                    class_date: classDate,
                    class_time: classTime,
                    status,
                    notes,
                }),
            });
            if (res.ok) {
                addToast("Progress logged successfully!", "success");
                router.push("/dashboard/teacher");
            } else {
                const data = await res.json();
                addToast(data.error || "Failed to log progress", "error");
            }
        } catch (error) {
            addToast("Network error", "error");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Log Class Progress</h1>
                    <p className="text-slate-500">Record attendance and lessons for <strong>{student?.name}</strong></p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
                    {/* Status Selection */}
                    <div>
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 block">Attendance Status</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[
                                { id: "completed", label: "Completed", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
                                { id: "student_absent", label: "Student Absent", color: "text-amber-700 bg-amber-50 border-amber-100" },
                                { id: "teacher_absent", label: "Teacher Absent", color: "text-red-700 bg-red-50 border-red-100" },
                                { id: "cancelled", label: "Cancelled", color: "text-slate-700 bg-slate-50 border-slate-100" },
                            ].map((s) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => setStatus(s.id)}
                                    className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all border ${
                                        status === s.id ? `${s.color} ring-2 ring-blue-500/20 shadow-md scale-[1.02]` : "bg-white border-slate-200 text-slate-400 hover:border-blue-300"
                                    }`}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Date */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <CalendarIcon className="w-3.5 h-3.5" /> Class Date
                            </label>
                            <Input 
                                type="date" 
                                value={classDate} 
                                onChange={(e) => setClassDate(e.target.value)}
                                className="rounded-xl h-12 border-slate-200 focus:ring-blue-500/20"
                            />
                        </div>
                        {/* Time */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5" /> Start Time (UTC)
                            </label>
                            <Input 
                                type="time" 
                                value={classTime} 
                                onChange={(e) => setClassTime(e.target.value)}
                                className="rounded-xl h-12 border-slate-200 focus:ring-blue-500/20"
                            />
                        </div>
                    </div>

                    {/* Progress Notes */}
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                            <BookOpen className="w-3.5 h-3.5" /> Progress & Lessons Covered
                        </label>
                        <Textarea 
                            placeholder="e.g. Completed Surah Al-Fatiha with Tajweed. Student needs more practice on Makhraj of 'Qaf'."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="min-h-[150px] rounded-2xl border-slate-200 focus:ring-blue-500/20 p-4"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button 
                        type="submit" 
                        disabled={submitting}
                        className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 text-lg group transition-all active:scale-95"
                    >
                        {submitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                Submit Progress Report
                            </>
                        )}
                    </Button>
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => router.back()}
                        className="h-14 px-8 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50"
                    >
                        Cancel
                    </Button>
                </div>
            </form>

            {/* Tips Section */}
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-[32px] flex items-start gap-4">
                <div className="p-3 bg-blue-600 rounded-2xl">
                    <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-blue-950">Tip for Teachers</h3>
                    <p className="text-sm text-blue-800 font-light mt-1">
                        Detailed notes help students and parents track progress. Mention specific verses or rules covered today. This also helps Admin verify your teaching hours for monthly payouts.
                    </p>
                </div>
            </div>
        </div>
    );
}
