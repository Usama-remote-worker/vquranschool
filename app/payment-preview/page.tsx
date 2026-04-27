"use client";

import { useState } from "react";
import {
    CreditCard,
    Building,
    Copy,
    CheckIcon,
    Globe,
    Phone,
    ExternalLink,
    Zap,
    Calendar,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MOCK_PLANS = {
    tajweed: { name: "Tajweed Essentials", price_usd: 35, classes_per_week: 3, billing: "Monthly" },
};

export default function PaymentPreview() {
    const [copiedField, setCopiedField] = useState("");
    const selectedPlan = "tajweed";
    
    const mockSettings = {
        sadabiz_link: "https://sadapay.pk/u/academy",
        payoneer_link: "https://payoneer.com/request/123",
        academy_whatsapp: "+923044296295",
        bank_details: JSON.stringify({
            bank: "Meezan Bank",
            account_name: "Usama Aimen",
            account_number: "00300112681190",
            iban: "PK02MEZN0000300112681190",
            swift: "MEZN PK KA"
        })
    };

    const bankDetails = JSON.parse(mockSettings.bank_details);

    const handleCopy = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(""), 2000);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-100 py-6 px-4 mb-10">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                            <ArrowLeft className="w-5 h-5 text-slate-400" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 font-serif">Payment Preview</h1>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Universal Global Checkout</p>
                        </div>
                    </div>
                    <div className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-100">
                        Demo Mode
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-white rounded-[48px] border border-slate-200 shadow-2xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                        {/* Left Side: Summary */}
                        <div className="lg:col-span-2 bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Zap className="w-40 h-40" />
                            </div>
                            
                            <div className="relative z-10">
                                <h2 className="text-3xl font-black font-serif mb-2 leading-tight">Secure Checkout</h2>
                                <p className="text-slate-400 text-sm font-medium">Complete your enrollment in seconds</p>
                                
                                <div className="mt-12 space-y-6">
                                    <div className="p-8 bg-white/5 rounded-[32px] border border-white/10 backdrop-blur-sm">
                                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">Selected Program</p>
                                        <h3 className="text-2xl font-bold">{MOCK_PLANS.tajweed.name}</h3>
                                        <div className="flex items-center gap-2 text-slate-400 text-xs mt-2 font-bold">
                                            <Calendar className="w-4 h-4 text-blue-400" /> 
                                            {MOCK_PLANS.tajweed.classes_per_week} Classes per week
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-end px-4">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Amount</p>
                                            <p className="text-5xl font-black text-white leading-none">${MOCK_PLANS.tajweed.price_usd}</p>
                                        </div>
                                        <p className="text-blue-400 text-sm font-black mb-1">USD</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 mt-12 p-6 bg-blue-600/10 rounded-[24px] border border-blue-500/20">
                                <div className="flex items-center gap-3 text-blue-400 mb-2">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span className="text-xs font-black uppercase tracking-widest">End-to-End Encrypted</span>
                                </div>
                                <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                                    Your security is our priority. We use industry-standard encryption for all international transactions.
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Methods */}
                        <div className="lg:col-span-3 p-10 bg-white space-y-10">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 mb-8 font-serif">Choose Payment Method</h3>
                                
                                <div className="space-y-6">
                                    {/* Method 1: Card via Link (SadaBiz or Payoneer) */}
                                    <div className="p-1 rounded-[40px] bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 shadow-xl shadow-blue-600/20 group hover:scale-[1.02] transition-transform duration-500">
                                        <div className="bg-white rounded-[38px] p-8 space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                                                        <CreditCard className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-slate-900">Debit / Credit Card</h4>
                                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Fastest Activation</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1.5 opacity-40">
                                                    <div className="w-10 h-6 bg-slate-100 rounded-lg"></div>
                                                    <div className="w-10 h-6 bg-slate-100 rounded-lg"></div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <Button 
                                                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 font-black text-lg transition-all shadow-lg active:scale-95"
                                                >
                                                    Pay via SadaBiz <ExternalLink className="w-5 h-5" />
                                                </Button>
                                                <Button 
                                                    className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-2xl flex items-center justify-center gap-3 font-black text-lg transition-all shadow-lg active:scale-95"
                                                >
                                                    Pay via Payoneer <ExternalLink className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Method 2: Universal Card to Bank (Wise / Remitly) */}
                                    <div className="bg-[#F8FAFC] rounded-[40px] p-8 border border-slate-100 relative overflow-hidden group">
                                        <div className="flex items-center gap-4 mb-6 relative z-10">
                                            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                                                <Globe className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-slate-900">Universal Card-to-Bank</h4>
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Global Money Transfer</p>
                                            </div>
                                        </div>
                                        
                                        <p className="text-sm text-slate-500 leading-relaxed mb-8 relative z-10 font-medium">
                                            No account? Use any international money transfer tool to pay directly to our IBAN with your card.
                                        </p>

                                        <div className="space-y-4 relative z-10">
                                            <div className="p-5 bg-white rounded-3xl border border-slate-100 flex justify-between items-center group/field hover:border-blue-400 transition-colors shadow-sm">
                                                <div>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">International IBAN</p>
                                                    <p className="text-xs font-mono font-black text-slate-800">{bankDetails.iban}</p>
                                                </div>
                                                <button onClick={() => handleCopy(bankDetails.iban, "IBAN")} className="p-3 hover:bg-slate-50 rounded-2xl transition-all">
                                                    {copiedField === "IBAN" ? <CheckIcon className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-300" />}
                                                </button>
                                            </div>
                                            
                                            <div className="p-5 bg-white rounded-3xl border border-slate-100 flex justify-between items-center group/field hover:border-blue-400 transition-colors shadow-sm">
                                                <div>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">SWIFT / BIC Code</p>
                                                    <p className="text-xs font-mono font-black text-slate-800">{bankDetails.swift}</p>
                                                </div>
                                                <button onClick={() => handleCopy(bankDetails.swift, "SWIFT")} className="p-3 hover:bg-slate-50 rounded-2xl transition-all">
                                                    {copiedField === "SWIFT" ? <CheckIcon className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-300" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide relative z-10">
                                            {["Wise", "Remitly", "WorldRemit", "Revolut", "Taptap Send"].map(p => (
                                                <div key={p} className="px-4 py-2 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 whitespace-nowrap shadow-sm uppercase tracking-widest">
                                                    {p}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-12 flex flex-col items-center gap-4">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Need expert assistance?</p>
                                    <Button className="rounded-2xl h-14 px-8 bg-slate-50 text-slate-900 border border-slate-100 hover:bg-slate-100 gap-3 font-black text-sm transition-all shadow-sm">
                                        <Phone className="w-5 h-5 text-blue-500" /> WhatsApp Support
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <p className="text-center text-[10px] text-slate-400 mt-10 font-black uppercase tracking-[0.3em] opacity-50">
                    Trusted by 500+ Families across UK, USA & Canada
                </p>
            </div>
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
