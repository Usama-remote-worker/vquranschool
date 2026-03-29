"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Inbox, CheckCircle2, UserPlus, FileText, Loader2, Phone, Clock, BookOpen, MapPin, RefreshCw, Trash2 } from "lucide-react";

type Trial = {
    id: string;
    name: string;
    email: string;
    country: string | null;
    whatsapp: string | null;
    course: string | null;
    teacher: string | null;
    preferred_time: string | null;
    status: string;
    created_at: string;
};

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
    new:       { label: "New",       color: "text-amber-700",  bg: "bg-amber-50",  border: "border-amber-200" },
    contacted: { label: "Contacted", color: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-200"  },
    assigned:  { label: "Assigned",  color: "text-green-700",  bg: "bg-green-50",  border: "border-green-200" },
    completed: { label: "Completed", color: "text-slate-700",  bg: "bg-slate-50",  border: "border-slate-200" },
    cancelled: { label: "Cancelled", color: "text-red-700",    bg: "bg-red-50",    border: "border-red-200"   },
};

export default function AdminTrialsPage() {
    const [trials, setTrials] = useState<Trial[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>("all");

    const fetchTrials = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/trials");
            const data = await res.json();
            if (data.trials) setTrials(data.trials);
        } catch (err) {
            console.error("Failed to fetch trials:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTrials(); }, []);

    const updateStatus = async (id: string, status: string) => {
        setUpdatingId(id);
        try {
            const res = await fetch(`/api/admin/trials/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                setTrials(prev => prev.map(t => t.id === id ? { ...t, status } : t));
            }
        } catch (err) {
            console.error("Failed to update trial:", err);
        } finally {
            setUpdatingId(null);
        }
    };

    const deleteTrial = async (id: string) => {
        if (!confirm("Delete this trial request? This cannot be undone.")) return;
        setDeletingId(id);
        try {
            const res = await fetch(`/api/admin/trials/${id}`, { method: "DELETE" });
            if (res.ok) setTrials(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            console.error("Failed to delete trial:", err);
        } finally {
            setDeletingId(null);
        }
    };

    const filteredTrials = filterStatus === "all"
        ? trials
        : trials.filter(t => t.status === filterStatus);

    const counts = trials.reduce((acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Trial Class Requests</h1>
                    <p className="text-slate-500">Process incoming trial requests and contact prospective students.</p>
                </div>
                <Button variant="outline" onClick={fetchTrials} disabled={loading} className="border-slate-200 shrink-0">
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["new", "contacted", "assigned", "completed"].map(s => (
                    <button
                        key={s}
                        onClick={() => setFilterStatus(filterStatus === s ? "all" : s)}
                        className={`rounded-xl border p-3 text-left transition-all ${
                            filterStatus === s
                                ? `${statusConfig[s].bg} ${statusConfig[s].border} ring-2 ring-offset-1 ${statusConfig[s].border}`
                                : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                    >
                        <div className={`text-2xl font-bold ${filterStatus === s ? statusConfig[s].color : "text-slate-800"}`}>
                            {counts[s] || 0}
                        </div>
                        <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-0.5 capitalize">
                            {statusConfig[s].label}
                        </div>
                    </button>
                ))}
            </div>

            {/* Trial List */}
            {loading ? (
                <div className="flex items-center justify-center py-20 text-slate-500">
                    <Loader2 className="w-7 h-7 animate-spin text-blue-600 mr-3" />
                    Fetching trial requests...
                </div>
            ) : filteredTrials.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                    <Inbox className="w-12 h-12 mb-3 text-slate-300" />
                    <p className="font-semibold text-slate-500">
                        {filterStatus === "all" ? "No trial requests yet" : `No ${statusConfig[filterStatus]?.label} requests`}
                    </p>
                    <p className="text-sm mt-1">New requests appear here when students book trials from the website.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredTrials.map((trial) => {
                        const cfg = statusConfig[trial.status] || statusConfig.new;
                        const isUpdating = updatingId === trial.id;
                        const isDeleting = deletingId === trial.id;
                        const appliedDate = new Date(trial.created_at).toLocaleDateString("en-GB", {
                            day: "numeric", month: "short", year: "numeric"
                        });

                        return (
                            <Card key={trial.id} className="border-slate-200 shadow-sm">
                                <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${cfg.bg} ${cfg.color}`}>
                                            <Inbox className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                {trial.name}
                                                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                                                    {cfg.label}
                                                </span>
                                            </CardTitle>
                                            <p className="text-sm text-slate-500 mt-0.5">
                                                Submitted: {appliedDate} • {trial.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                                        {trial.status === "new" && (
                                            <Button
                                                size="sm" variant="outline"
                                                className="border-blue-200 text-blue-700 hover:bg-blue-50 flex-1 sm:flex-none"
                                                onClick={() => updateStatus(trial.id, "contacted")}
                                                disabled={isUpdating}
                                            >
                                                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <CheckCircle2 className="w-4 h-4 mr-1" />}
                                                Mark Contacted
                                            </Button>
                                        )}
                                        {trial.status === "contacted" && (
                                            <Button
                                                size="sm"
                                                className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none"
                                                onClick={() => updateStatus(trial.id, "assigned")}
                                                disabled={isUpdating}
                                            >
                                                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <UserPlus className="w-4 h-4 mr-1" />}
                                                Mark Assigned
                                            </Button>
                                        )}
                                        {trial.status === "assigned" && (
                                            <Button
                                                size="sm" variant="outline"
                                                className="border-green-200 text-green-700 hover:bg-green-50 flex-1 sm:flex-none"
                                                onClick={() => updateStatus(trial.id, "completed")}
                                                disabled={isUpdating}
                                            >
                                                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <CheckCircle2 className="w-4 h-4 mr-1" />}
                                                Mark Completed
                                            </Button>
                                        )}
                                        <Button
                                            size="sm" variant="ghost"
                                            className="text-red-500 hover:bg-red-50 hover:text-red-700"
                                            onClick={() => deleteTrial(trial.id)}
                                            disabled={isDeleting}
                                            title="Delete request"
                                        >
                                            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-5">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="flex items-start gap-2">
                                            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Country</p>
                                                <p className="text-sm font-medium text-slate-800">{trial.country || "—"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">WhatsApp</p>
                                                <p className="text-sm font-mono text-slate-800">{trial.whatsapp || "—"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <BookOpen className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Course Interest</p>
                                                <p className="text-sm font-semibold text-blue-600">{trial.course || "—"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Preferred Time</p>
                                                <p className="text-sm font-medium text-slate-800">{trial.preferred_time || "—"}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {trial.teacher && (
                                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-sm text-blue-700 bg-blue-50 rounded-lg px-3 py-2 border border-blue-100">
                                            <UserPlus className="w-4 h-4 shrink-0" />
                                            <span><strong>Teacher Preference:</strong> {trial.teacher}</span>
                                        </div>
                                    )}

                                    {trial.status === "new" && (
                                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
                                            <FileText className="w-4 h-4 shrink-0" />
                                            <span><strong>Action Required:</strong> Contact via WhatsApp to confirm trial time and assign a teacher.</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
