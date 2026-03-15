"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Video, Star, Clock, BookOpen } from "lucide-react";

export default function StudentTeacherPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Teacher</h1>
                <p className="text-slate-500">View your assigned teacher's profile and communicate.</p>
            </div>

            <Card className="border-blue-100 shadow-sm overflow-hidden max-w-2xl">
                <div className="h-32 bg-slate-100 flex items-center justify-center relative">
                    <div className="w-24 h-24 rounded-full bg-slate-200 border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-slate-400 uppercase absolute -bottom-12 left-6">
                        ?
                    </div>
                </div>
                <CardContent className="pt-16 pb-8 px-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-400">No Teacher Assigned</h2>
                            <p className="font-medium text-slate-400">Specialization N/A</p>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                                <MessageSquare className="w-4 h-4 mr-2" /> Message
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <Video className="w-4 h-4 mr-2" /> Join Room
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <div className="flex items-center text-sm text-slate-400 gap-3">
                            <Star className="w-5 h-5 text-slate-300" />
                            <span className="font-medium">Experience details will appear here</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-400 gap-3">
                            <BookOpen className="w-5 h-5 text-slate-300" />
                            <span className="font-medium">Qualification details will appear here</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-400 gap-3">
                            <Clock className="w-5 h-5 text-slate-300" />
                            <span className="font-medium">Schedule will appear here once assigned</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
