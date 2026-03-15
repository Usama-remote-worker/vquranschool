"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, MoreHorizontal, Check, X, Loader2 } from "lucide-react";

export default function AdminStudentsPage() {
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if (data.users) {
                setStudents(data.users.filter((u: any) => u.role === 'student'));
            }
        } catch (error) {
            console.error("Error fetching students:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleAction = async (studentId: string, action: 'approved' | 'rejected') => {
        try {
            const res = await fetch('/api/students/approve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ student_id: studentId, action })
            });

            if (res.ok) {
                fetchStudents(); // Refresh list
            } else {
                const error = await res.json();
                alert(error.error || "Failed to update status");
            }
        } catch (error) {
            console.error("Error updating student status:", error);
        }
    };

    const filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manage Students</h1>
                    <p className="text-slate-500">View enrolled students and oversee applications.</p>
                </div>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                        placeholder="Search students..." 
                        className="pl-9 h-10 border-slate-200 focus-visible:ring-blue-500" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <Card className="border-slate-200 shadow-sm overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row items-center justify-between py-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" /> All Students
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/50">
                                    <th className="py-4 px-6">Student Info</th>
                                    <th className="py-4 px-6">Course</th>
                                    <th className="py-4 px-6 text-center">Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center text-slate-500">
                                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                            Loading students...
                                        </td>
                                    </tr>
                                ) : filteredStudents.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center text-slate-500">
                                            No students found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map((student) => (
                                        <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="font-bold text-slate-800">{student.name}</div>
                                                <div className="text-xs font-medium text-slate-500 mt-0.5">{student.email}</div>
                                                <div className="text-xs text-slate-400 mt-0.5">{student.age} yrs • {student.country}</div>
                                            </td>
                                            <td className="py-4 px-6 font-medium text-blue-600">
                                                {student.course}
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${student.status === 'approved'
                                                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                                                        : student.status === 'rejected'
                                                        ? 'bg-red-50 text-red-700 border-red-200'
                                                        : 'bg-amber-50 text-amber-700 border-amber-200'
                                                    }`}>
                                                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                {student.status === 'pending' ? (
                                                    <div className="flex justify-end gap-2">
                                                        <Button 
                                                            onClick={() => handleAction(student.id, 'approved')}
                                                            size="icon" variant="outline" className="h-8 w-8 text-blue-600 border-blue-200 hover:bg-blue-50" title="Approve"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </Button>
                                                        <Button 
                                                            onClick={() => handleAction(student.id, 'rejected')}
                                                            size="icon" variant="outline" className="h-8 w-8 text-red-600 border-red-200 hover:bg-red-50" title="Reject"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-800">
                                                        <MoreHorizontal className="w-5 h-5" />
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
