"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Inbox, CheckCircle2, UserPlus, FileText } from "lucide-react";

export default function AdminTrialsPage() {
    const trialRequests: any[] = [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between items-start gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Trial Class Requests</h1>
                <p className="text-slate-500">Process incoming trial requests and assign them to teachers for evaluation.</p>
            </div>

            <div className="grid gap-6">
                {trialRequests.map((trial) => (
                    <Card key={trial.id} className="border-slate-200 shadow-sm">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trial.status === 'New' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                                    <Inbox className="w-5 h-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        {trial.student}
                                        <span className={`text-xs px-2 py-0.5 rounded-full border ${trial.status === 'New' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                            {trial.status}
                                        </span>
                                    </CardTitle>
                                    <p className="text-sm text-slate-500 mt-0.5">Applied: {trial.appliedOn}</p>
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-0 flex gap-2 w-full sm:w-auto">
                                <Button size="sm" variant="outline" className="border-slate-200 flex-1 sm:flex-none">
                                    <CheckCircle2 className="w-4 h-4 mr-2 text-blue-600" /> Mark Contacted
                                </Button>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none">
                                    <UserPlus className="w-4 h-4 mr-2" /> Assign Teacher
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Student Details</p>
                                    <p className="text-sm font-medium text-slate-800">{trial.age} Years Old • {trial.country}</p>
                                    <p className="text-sm text-slate-600 font-mono mt-1">{trial.whatsapp}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Course Interest</p>
                                    <p className="text-sm font-bold text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded border border-blue-100">{trial.course}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Time Preference</p>
                                    <p className="text-sm font-medium text-slate-800">{trial.preferredTime}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Teacher Preference</p>
                                    <p className="text-sm font-medium text-slate-800">{trial.preferredTeacher}</p>
                                </div>
                            </div>

                            {trial.status === 'New' && (
                                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-100">
                                    <FileText className="w-4 h-4" />
                                    <strong>Action Required:</strong> Please contact the student via WhatsApp to confirm the evaluation time and assign a teacher.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
