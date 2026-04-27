"use client";

import { useEffect, useState, useCallback } from "react";
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

export default function PaymentsPage() {
    const searchParams = useSearchParams();
    
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState<any>(null);
    
    // UI state
    const [view, setView] = useState<"overview" | "checkout" | "receipt">("overview");
    const [selectedPlan, setSelectedPlan] = useState<PlanId>("tajweed");
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
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = async () => {
                const res = await fetch("/api/students/payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        receiptBase64: reader.result,
                        planId: selectedPlan,
                    }),
                });
                if (res.ok) {
                    setUploadSuccess(true);
                    setSelectedFile(null);
                    setTimeout(() => setView("overview"), 3000);
                } else {
                    const d = await res.json();
                    setUploadError(d.error || "Upload failed.");
                }
                setUploading(false);
            };
        } catch {
            setUploadError("Network error. Try again.");
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                <p className="text-slate-500 font-medium font-serif">Loading your academy details...</p>
            </div>
        );
    }

    const bankDetails = JSON.parse(settings?.bank_details || "{}");

    return (
        <div className="space-y-10 animate-in fade-in duration-500 max-w-6xl">
            {/* ── HEADER ── */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 font-serif">Payments & Billing</h1>
                    <p className="text-slate-500 mt-2 text-lg font-light">Securely manage your Quranic learning subscription.</p>
                </div>
                {view !== "overview" && (
                    <Button variant="ghost" onClick={() => setView("overview")} className="text-slate-500 font-bold hover:text-blue-600">
                        ← Back to Overview
                    </Button>
                )}
            </div>

            {/* ── ACTIVE SUBSCRIPTION BANNER ── */}
            {subscription?.status === "active" && view === "overview" && (
                <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 rounded-[40px] p-10 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Zap className="w-40 h-40" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex flex-col sm:flex-row justify-between gap-10">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center shrink-0 border border-white/10">
                                    <CheckCircle2 className="w-10 h-10 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-blue-300 text-xs font-black uppercase tracking-[0.3em]">Active Subscription</p>
                                    <h2 className="text-4xl font-black mt-1">{PLANS[subscription.plan]?.name || "Active Plan"}</h2>
                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="flex items-center gap-2 text-blue-200 text-sm font-bold bg-white/5 px-4 py-2 rounded-xl">
                                            <Calendar className="w-4 h-4" /> Valid until {new Date(subscription.current_period_end).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-center">
                                <p className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-1">Status</p>
                                <div className="px-6 py-2 bg-emerald-500 text-white font-black rounded-full shadow-lg shadow-emerald-500/20 uppercase text-xs tracking-widest">
                                    Fully Paid
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── OVERVIEW VIEW ── */}
            {view === "overview" && (subscription?.status !== "active") && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Card 1: Select Plan */}
                    <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
                        <h2 className="text-2xl font-black text-slate-900 font-serif">1. Choose Your Plan</h2>
                        <div className="grid gap-4">
                            {(Object.keys(PLANS) as PlanId[]).map((id) => (
                                <button
                                    key={id}
                                    onClick={() => setSelectedPlan(id)}
                                    className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all ${
                                        selectedPlan === id 
                                        ? "border-blue-600 bg-blue-50/50 shadow-md scale-[1.02]" 
                                        : "border-slate-100 hover:border-slate-200"
                                    }`}
                                >
                                    <div className="text-left">
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{PLANS[id].billing}</p>
                                        <h3 className="text-xl font-black text-slate-800">{PLANS[id].name}</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-blue-600">${PLANS[id].price_usd}</p>
                                        <p className="text-[10px] font-bold text-slate-400">USD / MONTH</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Card 2: Select Method */}
                    <div className="bg-slate-900 p-10 rounded-[40px] text-white space-y-8 shadow-2xl shadow-slate-900/20">
                        <h2 className="text-2xl font-black font-serif">2. Select Method</h2>
                        <div className="space-y-4">
                            <button
                                onClick={() => setPaymentMethod("card")}
                                className={`w-full flex items-center gap-6 p-8 rounded-3xl border-2 transition-all ${
                                    paymentMethod === "card" ? "border-blue-500 bg-blue-500/10" : "border-white/5 hover:border-white/10"
                                }`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${paymentMethod === "card" ? "bg-blue-600" : "bg-white/10"}`}>
                                    <CreditCard className="w-7 h-7" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-bold">Pay via Card</h3>
                                    <p className="text-slate-400 text-sm">International Visa/Mastercard via SadaBiz</p>
                                </div>
                            </button>

                            <button
                                onClick={() => setPaymentMethod("bank")}
                                className={`w-full flex items-center gap-6 p-8 rounded-3xl border-2 transition-all ${
                                    paymentMethod === "bank" ? "border-emerald-500 bg-emerald-500/10" : "border-white/5 hover:border-white/10"
                                }`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${paymentMethod === "bank" ? "bg-emerald-600" : "bg-white/10"}`}>
                                    <Building className="w-7 h-7" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-bold">Bank Transfer / Wise</h3>
                                    <p className="text-slate-400 text-sm">Manual verification (24h-48h)</p>
                                </div>
                            </button>
                        </div>

                        <Button 
                            onClick={() => setView(paymentMethod === "card" ? "checkout" : "receipt")}
                            className="w-full h-16 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-black text-xl shadow-xl active:scale-95 transition-all"
                        >
                            Proceed to Payment <ArrowRight className="w-6 h-6 ml-2" />
                        </Button>
                    </div>
                         {/* ── UNIVERSAL CARD CHECKOUT VIEW ── */}
            {view === "checkout" && (
                <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-300">
                    <div className="bg-white rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-5">
                            {/* Left Side: Summary */}
                            <div className="lg:col-span-2 bg-slate-900 p-10 text-white flex flex-col justify-between">
                                <div>
                                    <h2 className="text-3xl font-black font-serif mb-2">Checkout</h2>
                                    <p className="text-slate-400 text-sm font-medium">Complete your enrollment</p>
                                    
                                    <div className="mt-12 space-y-6">
                                        <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Selected Program</p>
                                            <h3 className="text-xl font-bold">{PLANS[selectedPlan].name}</h3>
                                            <p className="text-slate-400 text-sm mt-1">{PLANS[selectedPlan].classes_per_week} Classes per week</p>
                                        </div>
                                        
                                        <div className="flex justify-between items-end px-2">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Amount</p>
                                                <p className="text-4xl font-black text-white">${PLANS[selectedPlan].price_usd}</p>
                                            </div>
                                            <p className="text-blue-400 text-sm font-bold mb-1">USD</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 p-6 bg-blue-600/10 rounded-3xl border border-blue-500/20">
                                    <div className="flex items-center gap-3 text-blue-400 mb-2">
                                        <ShieldCheck className="w-5 h-5" />
                                        <span className="text-xs font-black uppercase tracking-widest">Secure Payment</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 leading-relaxed">
                                        Your payment is processed through trusted international gateways. We do not store your card details.
                                    </p>
                                </div>
                            </div>

                            {/* Right Side: Methods */}
                            <div className="lg:col-span-3 p-10 bg-white space-y-8">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 mb-6">Choose Payment Method</h3>
                                    
                                    <div className="space-y-4">
                                        {/* Method 1: Card via Link (SadaBiz or Payoneer) */}
                                        <div className="p-1 rounded-[32px] bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg shadow-blue-600/20">
                                            <div className="bg-white rounded-[30px] p-6 space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                                            <CreditCard className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-900">Debit / Credit Card</h4>
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Instant Activation</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <div className="w-8 h-5 bg-slate-100 rounded opacity-60"></div>
                                                        <div className="w-8 h-5 bg-slate-100 rounded opacity-60"></div>
                                                        <div className="w-8 h-5 bg-slate-100 rounded opacity-60"></div>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    {settings?.sadabiz_link && (
                                                        <a 
                                                            href={settings.sadabiz_link} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-3 font-bold transition-all shadow-md active:scale-[0.98]"
                                                        >
                                                            Pay via SadaPay <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                    {settings?.payoneer_link && (
                                                        <a 
                                                            href={settings.payoneer_link} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-xl flex items-center justify-center gap-3 font-bold transition-all shadow-md active:scale-[0.98]"
                                                        >
                                                            Pay via Payoneer <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Method 2: Universal Card to Bank (Wise / Remitly) */}
                                        <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-100">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                                    <Globe className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900">Universal Card-to-Bank</h4>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Use Wise, Remitly, or WorldRemit</p>
                                                </div>
                                            </div>
                                            
                                            <p className="text-xs text-slate-500 leading-relaxed mb-6">
                                                No specific account? Use any international money transfer website to pay directly to our IBAN using your card.
                                            </p>

                                            <div className="space-y-4">
                                                <div className="p-4 bg-white rounded-2xl border border-slate-200 flex justify-between items-center group">
                                                    <div>
                                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">International IBAN</p>
                                                        <p className="text-[11px] font-mono font-bold text-slate-700">{bankDetails.iban}</p>
                                                    </div>
                                                    <button onClick={() => handleCopy(bankDetails.iban, "IBAN")} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                                        {copiedField === "IBAN" ? <CheckIcon className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-400" />}
                                                    </button>
                                                </div>
                                                
                                                <div className="p-4 bg-white rounded-2xl border border-slate-200 flex justify-between items-center group">
                                                    <div>
                                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">SWIFT / BIC Code</p>
                                                        <p className="text-[11px] font-mono font-bold text-slate-700">{bankDetails.swift || "N/A"}</p>
                                                    </div>
                                                    <button onClick={() => handleCopy(bankDetails.swift, "SWIFT")} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                                        {copiedField === "SWIFT" ? <CheckIcon className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-400" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                                {["Wise", "Remitly", "WorldRemit", "Revolut"].map(p => (
                                                    <div key={p} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 whitespace-nowrap">
                                                        {p}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-8 flex items-center justify-center gap-2">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Need help paying?</p>
                                        <a href={`https://wa.me/${settings?.academy_whatsapp?.replace('+','')}`} target="_blank" className="text-[10px] text-blue-600 font-black uppercase tracking-widest hover:underline">Contact Support</a>
                                    </div>
                                </div>
                            </div>
                        </div>
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

function ShieldCheck({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}
