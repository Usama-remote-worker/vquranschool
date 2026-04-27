"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { User, GraduationCap, Globe, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Image from "next/image";

interface Teacher {
  id: string;
  name: string;
  qualification: string;
  specialization: string;
  experience: number;
  profile_photo: string;
  available_days: string;
  timezone: string;
}

export default function StudentTeacherSelection() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch("/api/teachers/available");
      const data = await res.json();
      if (res.ok) {
        setTeachers(data.teachers);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTeacher = async (teacherId: string) => {
    setSubmitting(teacherId);
    try {
      const res = await fetch("/api/students/choose-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacherId }),
      });
      const data = await res.json();
      
      if (res.ok) {
        addToast("Teacher selected successfully! You can now start your classes.", "success");
        // Optionally redirect or refresh
      } else {
        addToast(data.error || "Failed to select teacher", "error");
      }
    } catch (error) {
      addToast("Network error. Please try again.", "error");
    } finally {
      setSubmitting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="text-3xl font-bold text-blue-950 font-serif mb-2">Choose Your Teacher</h1>
        <p className="text-slate-500 font-light">Select a certified scholar to begin your Quranic journey. You can only change your teacher once every 30 days.</p>
        
        <div className="mt-6 flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-800 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p><strong>Note:</strong> Once you select a teacher, your schedule will be coordinated based on their availability. If you need a specific time slot, please check their available days.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teachers.map((teacher) => (
          <Card key={teacher.id} className="overflow-hidden border-slate-200 hover:shadow-xl transition-all group rounded-[32px]">
            <div className="relative aspect-[4/3] bg-slate-100">
              {teacher.profile_photo ? (
                <Image src={teacher.profile_photo} alt={teacher.name} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
                  <User className="w-20 h-20 text-blue-200" />
                </div>
              )}
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-widest border border-blue-100 shadow-sm">
                Certified
              </div>
            </div>
            
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-blue-950 font-serif">{teacher.name}</CardTitle>
              <CardDescription className="text-blue-600 font-medium text-xs flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" />
                {teacher.qualification}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Specialization: <strong>{teacher.specialization}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Available: {teacher.available_days}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span>Timezone: {teacher.timezone}</span>
                </div>
              </div>

              <Button 
                onClick={() => handleSelectTeacher(teacher.id)}
                disabled={submitting !== null}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]"
              >
                {submitting === teacher.id ? "Selecting..." : "Select This Teacher"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {teachers.length === 0 && (
        <div className="bg-white p-20 text-center rounded-[32px] border border-slate-200 shadow-sm">
          <User className="w-16 h-16 text-slate-200 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-blue-950 mb-2">No teachers available right now</h3>
          <p className="text-slate-500 font-light">We are currently assigning teachers. Please check back in a few moments.</p>
        </div>
      )}
    </div>
  );
}
