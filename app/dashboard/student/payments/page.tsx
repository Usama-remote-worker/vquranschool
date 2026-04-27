"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
    CheckCircle2,
    XCircle,
    Clock,
    CreditCard,
    Building,
    Copy,
    CheckIcon,
    UploadCloud,
    AlertCircle,
    Loader2,
    Zap,
    Calendar,
    ArrowRight,
    Globe,
    Phone,
    ExternalLink
} from "lucide-react";
import Link from "next/link";
import { PLANS } from "@/lib/stripe";
import type { PlanId } from "@/lib/stripe";
import { Button } from "@/components/ui/button";

type Subscription = {
    id: string;
    plan: PlanId;
    price_usd: number;
    classes_per_month: number;
    classes_per_week: number;
    status: "active" | "cancelled" | "expired" | "trial";
    current_period_start: string;
    current_period_end: string;
};

function PaymentsContent() {
    const searchParams = useSearchParams();
    
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState<any>(null);
    
    // UI state
    const [view, setView] = useState<"overview" | "checkout" | "receipt">("overview");
    const [selectedPlan, setSelectedPlan] = useState<PlanId>("3x_monthly");
    const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");

    // Bank transfer state
    const [copiedField, setCopiedField] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const fetchSubscription = useCallback(async () => {
        try {
            const [subRes, setRes] = await Promise.all([
                fetch("/api/stripe/subscription"),
                fetch("/api/admin/settings")
            ]);
            const subData = await subRes.json();
            const setData = await setRes.json();
            
            setSubscription(subData.subscription || null);
            setSettings(setData.settings);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSubscription();
    }, [fetchSubscription]);

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(""), 2000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) {
                setUploadError("File is too large. Max size is 5MB.");
                return;
            }
            setSelectedFile(file);
            setUploadError("");
        }
    };

    const handleUploadReceipt = async () => {
        if (!selectedFile) return;
        setUploading(true);
        setUploadError("");
        
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            
            const res = await fetch("/api/stripe/upload-receipt", {
                method: "POST",
                body: formData,
            });
            
            const data = await res.json();
            if (res.ok) {
                setUploadSuccess(true);
            } else {
                setUploadError(data.error || "Failed to upload receipt.");
            }
        } catch (err) {
            setUploadError("Network error. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    const bankDetails = settings?.bank_details || {
        bank: "Mezan Bank",
        account_name: "Usama Aimen",
        account_number: "0000300112681190",
        iban: "PK02MEZN0000300112681190",
        swift: "MEZN PK KA",
    };

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700">
            {/* ── OVERVIEW / ACTIVE SUBSCRIPTION ── */}
            {view === "overview" && (
                <div className="space-y-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <h1 className="text-4xl font-black tracking-tight text-slate-900 font-serif">Payments & Billing</h1>
                            <p className="text-slate-500 mt-2 text-lg font-light">Manage your subscription, view receipts, and update payment methods.</p>
                        </div>
                        <Button 
                            onClick={() => setView("checkout")}
                            className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
                        >
                            <Zap className="w-5 h-5 mr-2" /> Upgrade Plan
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Status Card */}
                        <div className="lg:col-span-2 bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700 opacity-50" />
                            
                            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border ${
                                            subscription?.status === "active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                                        }`}>
                                            {subscription?.status || "No Active Plan"}
                                        </div>
                                    </div>
                                    
                                    <h2 className="text-5xl font-black text-slate-900 font-serif">
                                        {subscription ? PLANS[subscription.plan]?.name : "Explore our Plans"}
                                    </h2>
                                    
                                    <div className="flex flex-wrap gap-8 pt-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Billing</p>
                                            <p className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                                <Calendar className="w-5 h-5 text-blue-500" />
                                                {subscription ? new Date(subscription.current_period_end).toLocaleDateString() : "—"}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Cost</p>
                                            <p className="text-xl font-bold text-slate-800">
                                                ${subscription?.price_usd || 0} <span className="text-slate-400 text-sm">/ month</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center items-center md:items-end gap-4 min-w-[200px]">
                                    <div className="w-20 h-20 bg-blue-600 rounded-[28px] flex items-center justify-center shadow-2xl shadow-blue-600/30">
                                        <CreditCard className="w-10 h-10 text-white" />
                                    </div>
                                    <p className="text-slate-400 text-sm font-medium">Stripe Billing Enabled</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-slate-900 p-10 rounded-[48px] text-white space-y-8 shadow-2xl shadow-slate-900/20">
                            <h3 className="text-xl font-bold font-serif opacity-80">Class Usage</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm font-bold mb-3">
                                        <span className="text-slate-400">Monthly Limit</span>
                                        <span className="text-blue-400">{subscription?.classes_per_month || 0} Classes</span>
                                    </div>
                                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: subscription ? "75%" : "0%" }} />
                                    </div>
                                </div>
                                <div className="pt-4 flex items-center gap-4 group cursor-pointer">
                                    <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-blue-600 transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Support</p>
                                        <p className="font-bold text-lg">{settings?.academy_whatsapp || "+92 304 4296295"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── SELECT PLAN / CHECKOUT VIEW ── */}
            {view === "checkout" && (
                <div className="space-y-10">
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" onClick={() => setView("overview")} className="rounded-xl font-bold text-slate-500 hover:text-blue-600">
                            ← Back to Overview
                        </Button>
                        <h2 className="text-2xl font-black text-slate-900 font-serif">Choose a Payment Method</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div 
                            onClick={() => setPaymentMethod("card")}
                            className={`p-10 rounded-[40px] border-4 transition-all cursor-pointer group ${paymentMethod === "card" ? "border-blue-600 bg-blue-50/50 shadow-xl" : "border-slate-100 bg-white hover:border-slate-200"}`}
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className={`p-5 rounded-[24px] ${paymentMethod === "card" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400 group-hover:text-slate-600"} transition-colors`}>
                                    <Globe className="w-10 h-10" />
                                </div>
                                {paymentMethod === "card" && <CheckCircle2 className="w-8 h-8 text-blue-600" />}
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 font-serif mb-2">Global Card Payment</h3>
                            <p className="text-slate-500 leading-relaxed">Instant activation. Secure payments powered by Stripe. Supports Visa, Mastercard, and more.</p>
                        </div>

                        <div 
                            onClick={() => setPaymentMethod("bank")}
                            className={`p-10 rounded-[40px] border-4 transition-all cursor-pointer group ${paymentMethod === "bank" ? "border-emerald-600 bg-emerald-50/50 shadow-xl" : "border-slate-100 bg-white hover:border-slate-200"}`}
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className={`p-5 rounded-[24px] ${paymentMethod === "bank" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400 group-hover:text-slate-600"} transition-colors`}>
                                    <Building className="w-10 h-10" />
                                </div>
                                {paymentMethod === "bank" && <CheckCircle2 className="w-8 h-8 text-emerald-600" />}
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 font-serif mb-2">Bank Transfer (PK)</h3>
                            <p className="text-slate-500 leading-relaxed">Local transfer within Pakistan. Requires manual verification (approx. 12-24 hours).</p>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-center">
                        {paymentMethod === "card" ? (
                            <Link href="/dashboard/student/pricing">
                                <Button className="h-16 px-12 rounded-[24px] bg-slate-900 hover:bg-black text-white font-black text-xl shadow-2xl active:scale-95 transition-all">
                                    Proceed to Plans & Pricing <ArrowRight className="w-6 h-6 ml-3" />
                                </Button>
                            </Link>
                        ) : (
                            <Button 
                                onClick={() => setView("receipt")}
                                className="h-16 px-12 rounded-[24px] bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xl shadow-2xl active:scale-95 transition-all"
                            >
                                View Bank Details <Building className="w-6 h-6 ml-3" />
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* ── BANK TRANSFER / RECEIPT VIEW ── */}
            {view === "receipt" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-emerald-50 rounded-2xl">
                                    <Building className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 font-serif">Bank Details</h2>
                            </div>
                            
                            <div className="space-y-6">
                                {[
                                    { label: "Bank", value: bankDetails.bank },
                                    { label: "Account Title", value: bankDetails.account_name },
                                    { label: "Account Number", value: bankDetails.account_number, copy: true },
                                    { label: "IBAN (International)", value: bankDetails.iban, copy: true },
                                    { label: "SWIFT / BIC Code", value: bankDetails.swift, copy: true },
                                ].map((item, i) => (
                                    item.value && (
                                        <div key={i} className="group">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">{item.label}</p>
                                            <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${item.copy ? "bg-slate-50 border-slate-100 hover:border-emerald-200" : "bg-white border-slate-50"}`}>
                                                <span className={`font-bold text-slate-800 ${item.copy ? "font-mono text-sm" : "text-lg"}`}>{item.value}</span>
                                                {item.copy && (
                                                    <button 
                                                        onClick={() => handleCopy(item.value, item.label)}
                                                        className="p-2 text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                                                    >
                                                        {copiedField === item.label ? <CheckIcon className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>

                        <div className="bg-blue-900 p-8 rounded-[40px] text-white flex items-center gap-6 shadow-xl shadow-blue-900/20">
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                <Phone className="w-7 h-7 text-blue-300" />
                            </div>
                            <div>
                                <p className="text-blue-300 text-[10px] font-black uppercase tracking-widest">Support WhatsApp</p>
                                <p className="text-xl font-bold">{settings?.academy_whatsapp || "+92 304 4296295"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-50 rounded-2xl">
                                <UploadCloud className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 font-serif">Upload Receipt</h2>
                        </div>

                        {!uploadSuccess ? (
                            <div className="space-y-6">
                                <label className="block w-full border-4 border-dashed border-slate-100 rounded-[32px] p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group relative overflow-hidden">
                                    {selectedFile ? (
                                        <div className="flex flex-col items-center">
                                            <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-2" />
                                            <p className="text-lg font-bold text-slate-800">{selectedFile.name}</p>
                                            <p className="text-sm text-slate-400 mt-1">Ready to submit</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <UploadCloud className="w-16 h-16 text-slate-200 group-hover:text-blue-400 transition-colors mb-4" />
                                            <p className="text-xl font-bold text-slate-600 group-hover:text-blue-600">Select Receipt Image</p>
                                            <p className="text-sm text-slate-400 mt-2">Maximum file size: 5MB</p>
                                        </div>
                                    )}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>

                                {uploadError && (
                                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 shrink-0" /> {uploadError}
                                    </div>
                                )}

                                <Button
                                    onClick={handleUploadReceipt}
                                    disabled={!selectedFile || uploading}
                                    className="w-full h-16 rounded-[24px] bg-slate-900 hover:bg-black text-white font-black text-xl shadow-xl active:scale-95 transition-all"
                                >
                                    {uploading ? <><Loader2 className="w-6 h-6 animate-spin mr-2" /> Uploading...</> : "Submit for Verification"}
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center py-12 space-y-4">
                                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">Receipt Submitted!</h3>
                                <p className="text-slate-500 max-w-xs mx-auto">
                                    Our team will verify your transfer and activate your subscription within 24 hours.
                                </p>
                                <div className="pt-6">
                                    <Button variant="outline" onClick={() => setView("overview")} className="rounded-xl font-bold">
                                        Back to Dashboard
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function PaymentsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        }>
            <PaymentsContent />
        </Suspense>
    );
}
