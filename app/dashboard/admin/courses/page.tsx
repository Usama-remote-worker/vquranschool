"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Plus, Edit2, Trash2, Loader2, X, Check, GraduationCap, Users } from "lucide-react";

type Course = {
    id: string;
    title: string;
    description: string | null;
    level: string;
    student_count: number;
    teacher_count: number;
};

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

const emptyForm = { title: "", description: "", level: "Beginner" };

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [error, setError] = useState("");

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/courses");
            const data = await res.json();
            if (data.courses) setCourses(data.courses);
        } catch (err) {
            console.error("Failed to fetch courses:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCourses(); }, []);

    const openAddModal = () => {
        setEditingCourse(null);
        setForm(emptyForm);
        setError("");
        setShowModal(true);
    };

    const openEditModal = (course: Course) => {
        setEditingCourse(course);
        setForm({ title: course.title, description: course.description || "", level: course.level });
        setError("");
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingCourse(null);
        setForm(emptyForm);
        setError("");
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title.trim()) { setError("Course title is required."); return; }
        setSaving(true);
        setError("");
        try {
            const url = editingCourse
                ? `/api/admin/courses/${editingCourse.id}`
                : "/api/admin/courses";
            const method = editingCourse ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || "Failed to save course."); return; }
            await fetchCourses();
            closeModal();
        } catch {
            setError("A server error occurred.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this course? This cannot be undone.")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
            if (res.ok) await fetchCourses();
        } catch (err) {
            console.error("Failed to delete course:", err);
        } finally {
            setDeletingId(null);
        }
    };

    const levelColor = (level: string) => {
        if (level === "Beginner") return "bg-green-50 text-green-700 border-green-200";
        if (level === "Intermediate") return "bg-blue-50 text-blue-700 border-blue-200";
        return "bg-purple-50 text-purple-700 border-purple-200";
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manage Courses</h1>
                    <p className="text-slate-500">Add, edit, and organize academy curriculum offerings.</p>
                </div>
                <Button onClick={openAddModal} className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap shadow-sm">
                    <Plus className="w-4 h-4 mr-2" /> Add New Course
                </Button>
            </div>

            {/* Course Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20 text-slate-500">
                    <Loader2 className="w-7 h-7 animate-spin text-blue-600 mr-3" />
                    Loading courses from database...
                </div>
            ) : courses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                    <BookOpen className="w-12 h-12 mb-3 text-slate-300" />
                    <p className="font-semibold text-slate-500">No courses yet</p>
                    <p className="text-sm mt-1">Click "Add New Course" to create your first course.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {courses.map((course) => (
                        <Card key={course.id} className="border-slate-200 hover:border-blue-300 transition-colors shadow-sm group">
                            <CardHeader className="pb-3 flex flex-row items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                                        <BookOpen className="w-5 h-5 text-blue-500 shrink-0" />
                                        <span className="truncate">{course.title}</span>
                                    </CardTitle>
                                    <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${levelColor(course.level)}`}>
                                            {course.level}
                                        </span>
                                        {course.description && (
                                            <CardDescription className="text-sm text-slate-500 truncate max-w-xs">
                                                {course.description}
                                            </CardDescription>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-1 ml-2">
                                    <Button
                                        size="icon" variant="ghost"
                                        className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                                        onClick={() => openEditModal(course)}
                                        title="Edit"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="icon" variant="ghost"
                                        className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                        onClick={() => handleDelete(course.id)}
                                        disabled={deletingId === course.id}
                                        title="Delete"
                                    >
                                        {deletingId === course.id
                                            ? <Loader2 className="w-4 h-4 animate-spin" />
                                            : <Trash2 className="w-4 h-4" />
                                        }
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-6 mt-2 pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <div className="text-xl font-bold text-slate-800">{course.student_count}</div>
                                            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Active Students</div>
                                        </div>
                                    </div>
                                    <div className="w-px h-10 bg-slate-200" />
                                    <div className="flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <div className="text-xl font-bold text-slate-800">{course.teacher_count}</div>
                                            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Instructors</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add / Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-800">
                                {editingCourse ? "Edit Course" : "Add New Course"}
                            </h2>
                            <Button size="icon" variant="ghost" onClick={closeModal} className="h-8 w-8 text-slate-400 hover:text-slate-700">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                        <form onSubmit={handleSave} className="px-6 py-5 space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="course-title">Course Title <span className="text-red-500">*</span></Label>
                                <Input
                                    id="course-title"
                                    placeholder="e.g. Noorani Qaida"
                                    value={form.title}
                                    onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="course-desc">Description</Label>
                                <Input
                                    id="course-desc"
                                    placeholder="Brief description (optional)"
                                    value={form.description}
                                    onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="course-level">Level <span className="text-red-500">*</span></Label>
                                <select
                                    id="course-level"
                                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={form.level}
                                    onChange={(e) => setForm(f => ({ ...f, level: e.target.value }))}
                                    required
                                >
                                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                            </div>
                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                                    {error}
                                </div>
                            )}
                            <div className="flex gap-3 pt-2">
                                <Button type="button" variant="outline" onClick={closeModal} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={saving} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                                    {saving
                                        ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...</>
                                        : <><Check className="w-4 h-4 mr-2" /> {editingCourse ? "Save Changes" : "Create Course"}</>
                                    }
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
