"use client";
import { useState, useEffect } from "react";
import { 
    CreditCard, Check, X, Loader2, Search, 
    Calendar, Download, ExternalLink, AlertCircle,
    DollarSign, TrendingUp, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export default function AdminPaymentsPage() {
    const [payments, setPayments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("pending");
    const [processing, setProcessing] = useState<string | null>(null);
    const { addToast } = useToast();

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/payments");
            const data = await res.json();
            if (data.payments) {
                setPayments(data.payments);
            }
        } catch (error) {
            addToast("Failed to fetch payments", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPayments(); }, []);

    const handleAction = async (studentId: string, action: "approve" | "reject") => {
        setProcessing(studentId);
        try {
            const res = await fetch("/api/admin/payments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentId, action, months: 1 }),
            });
            if (res.ok) {
                addToast(`Payment ${action}d successfully`, "success");
                fetchPayments();
            }
        } catch (error) {
            addToast("Action failed", "error");
        } finally {
            setProcessing(null);
        }
    };

    const filteredPayments = payments.filter(p => p.payment_status === filter || filter === "all");
    const totalRevenue = payments.filter(p => p.payment_status === "active").length * 45;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Payment Audits</h1>
                    <p className="text-slate-500 mt-1">Verify receipts and manage student subscriptions.</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border shadow-sm">
                    {["pending", "active", "all"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                                filter === f 
                                    ? "bg-blue-600 text-white shadow-md" 
                                    : "text-slate-400 hover:text-slate-600"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Revenue Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-600 p-6 rounded-3xl text-white shadow-xl shadow-emerald-600/20">
                    <div className="flex justify-between items-start">
                        <DollarSign className="w-8 h-8 opacity-50" />
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="mt-4 text-emerald-100 text-sm font-bold uppercase tracking-widest">Monthly Revenue (Est)</p>
                    <h2 className="text-4xl font-black">${totalRevenue}</h2>
                </div>
                <div className="bg-blue-600 p-6 rounded-3xl text-white shadow-xl shadow-blue-600/20">
                    <div className="flex justify-between items-start">
                        <CreditCard className="w-8 h-8 opacity-50" />
                        <AlertCircle className="w-5 h-5" />
                    </div>
                    <p className="mt-4 text-blue-100 text-sm font-bold uppercase tracking-widest">Pending Verification</p>
                    <h2 className="text-4xl font-black">{payments.filter(p => p.payment_status === "pending").length}</h2>
                </div>
                <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl shadow-slate-900/20">
                    <div className="flex justify-between items-start">
                        <Users className="w-8 h-8 opacity-50" />
                        <Check className="w-5 h-5" />
                    </div>
                    <p className="mt-4 text-slate-400 text-sm font-bold uppercase tracking-widest">Active Subscriptions</p>
                    <h2 className="text-4xl font-black">{payments.filter(p => p.payment_status === "active").length}</h2>
                </div>
            </div>

            {/* Payments List */}
            <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <th className="px-8 py-5">Student</th>
                                <th className="px-8 py-5">Course / WhatsApp</th>
                                <th className="px-8 py-5">Receipt</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto" />
                                        <p className="mt-4 text-slate-500 font-medium">Syncing payment records...</p>
                                    </td>
                                </tr>
                            ) : filteredPayments.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Search className="w-8 h-8 text-slate-200" />
                                        </div>
                                        <p className="text-slate-500 font-bold">No {filter} payments found.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredPayments.map((p) => (
                                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-slate-900">{p.name}</p>
                                            <p className="text-xs text-slate-500">{p.email}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-semibold text-blue-600">{p.course || "Noorani Qaida"}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{p.whatsapp || "N/A"}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            {p.payment_receipt ? (
                                                <button 
                                                    onClick={() => window.open(p.payment_receipt, '_blank')}
                                                    className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5" /> View Receipt
                                                </button>
                                            ) : (
                                                <span className="text-xs text-slate-300 italic">No file uploaded</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                p.payment_status === "active" 
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                                                    : p.payment_status === "pending"
                                                    ? "bg-amber-50 text-amber-700 border-amber-100"
                                                    : "bg-slate-100 text-slate-600 border-slate-200"
                                            }`}>
                                                {p.payment_status}
                                            </span>
                                            {p.access_expires_at && (
                                                <p className="text-[10px] text-slate-400 mt-1">
                                                    Exp: {new Date(p.access_expires_at).toLocaleDateString()}
                                                </p>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            {p.payment_status === "pending" && (
                                                <div className="flex justify-end gap-2">
                                                    <Button 
                                                        size="sm" 
                                                        onClick={() => handleAction(p.id, "approve")}
                                                        disabled={processing === p.id}
                                                        className="bg-emerald-600 hover:bg-emerald-700 h-9 font-bold rounded-xl"
                                                    >
                                                        {processing === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                                    </Button>
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline"
                                                        onClick={() => handleAction(p.id, "reject")}
                                                        disabled={processing === p.id}
                                                        className="border-red-200 text-red-600 hover:bg-red-50 h-9 font-bold rounded-xl"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
