"use client";

import { useEffect, useState } from "react";
import { Check, X, FileImage, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaymentRecord {
    id: string;
    name: string;
    email: string;
    payment_status: string;
    payment_receipt: string | null;
    access_expires_at: string | null;
}

export default function AdminPaymentsPage() {
    const [payments, setPayments] = useState<PaymentRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [showReceipt, setShowReceipt] = useState<string | null>(null);

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/payments");
            const data = await res.json();
            if (res.ok) setPayments(data.payments);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const handleAction = async (studentId: string, action: "approve" | "reject", months: number = 1) => {
        if (!confirm(`Are you sure you want to ${action} this payment?`)) return;

        setProcessingId(studentId);
        try {
            const res = await fetch("/api/admin/payments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentId, action, months }),
            });
            if (res.ok) {
                fetchPayments();
            } else {
                alert("Action failed.");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setProcessingId(null);
            setShowReceipt(null);
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
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Payment Verifications</h1>
                    <p className="text-sm text-slate-500 mt-1">Review student transfer receipts and activate their plans.</p>
                </div>
                <Button onClick={fetchPayments} variant="outline" className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" /> Refresh List
                </Button>
            </div>

            {payments.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-xl border border-slate-200 shadow-sm text-slate-500">
                    No pending or active payments found.
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-xs">
                                <tr>
                                    <th className="px-6 py-4">Student</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Receipt</th>
                                    <th className="px-6 py-4">Expires</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {payments.map((p) => (
                                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-slate-900">{p.name}</p>
                                            <p className="text-slate-500 text-xs">{p.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    p.payment_status === "pending"
                                                        ? "bg-amber-100 text-amber-700"
                                                        : "bg-emerald-100 text-emerald-700"
                                                }`}
                                            >
                                                {p.payment_status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {p.payment_receipt ? (
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => setShowReceipt(p.payment_receipt)}
                                                    className="flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100"
                                                >
                                                    <FileImage className="w-4 h-4" /> View
                                                </Button>
                                            ) : (
                                                <span className="text-slate-400 text-xs">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {p.access_expires_at ? new Date(p.access_expires_at).toLocaleDateString() : "—"}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {p.payment_status === "pending" && (
                                                <div className="flex justify-end items-center gap-2">
                                                    <Button
                                                        onClick={() => handleAction(p.id, "approve", 1)}
                                                        disabled={processingId === p.id}
                                                        size="sm"
                                                        className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center shadow-sm"
                                                    >
                                                        <Check className="w-4 h-4 mr-1" /> Approve (1 mo)
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleAction(p.id, "reject")}
                                                        disabled={processingId === p.id}
                                                        size="sm"
                                                        variant="destructive"
                                                        className="flex items-center shadow-sm"
                                                    >
                                                        <X className="w-4 h-4 mr-1" /> Reject
                                                    </Button>
                                                </div>
                                            )}
                                            {p.payment_status === "active" && (
                                                <Button
                                                    onClick={() => handleAction(p.id, "approve", 1)}
                                                    disabled={processingId === p.id}
                                                    size="sm"
                                                    variant="outline"
                                                    className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                                                >
                                                    + Extend 1 Month
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Receipt Modal */}
            {showReceipt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="font-bold text-lg">Payment Receipt</h3>
                            <Button variant="ghost" size="icon" onClick={() => setShowReceipt(null)}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                        <div className="p-4 overflow-y-auto flex-1 flex justify-center bg-slate-100">
                            {showReceipt.startsWith("data:image") ? (
                                <img src={showReceipt} alt="Proof of Payment" className="max-w-full h-auto object-contain rounded" />
                            ) : (
                                <iframe src={showReceipt} className="w-full h-full min-h-[500px] border-0" />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
