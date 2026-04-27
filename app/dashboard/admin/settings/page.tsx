"use client";
import { useState, useEffect } from "react";
import { 
    Settings, Link as LinkIcon, Building, 
    Phone, Save, Loader2, Globe, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<any>({
        sadabiz_link: "",
        academy_whatsapp: "",
        bank_details: "{}"
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const { addToast } = useToast();

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/admin/settings");
            const data = await res.json();
            if (data.settings) setSettings(data.settings);
        } catch (error) {
            addToast("Failed to load settings", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (key: string, value: string) => {
        setSaving(key);
        try {
            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key, value }),
            });
            if (res.ok) {
                addToast(`${key.replace('_', ' ')} updated`, "success");
            }
        } catch (error) {
            addToast("Save failed", "error");
        } finally {
            setSaving(null);
        }
    };

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

    const bankObj = JSON.parse(settings.bank_details || "{}");

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                    <Settings className="w-8 h-8 text-blue-600" /> Academy Settings
                </h1>
                <p className="text-slate-500 mt-1">Configure global payment links and contact information.</p>
            </div>

            <div className="grid gap-8">
                {/* SadaBiz & International Links */}
                <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 rounded-xl">
                            <Globe className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Global Payment Links</h2>
                    </div>
                    <p className="text-sm text-slate-500">Provide links for students to pay via card. If SadaBiz is unavailable, use Payoneer or Wise links.</p>
                    
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input 
                                    value={settings.sadabiz_link || ""}
                                    onChange={(e) => setSettings({...settings, sadabiz_link: e.target.value})}
                                    placeholder="SadaBiz Link (Optional)"
                                    className="pl-10 h-12 rounded-xl border-slate-200"
                                />
                            </div>
                            <Button 
                                onClick={() => handleSave("sadabiz_link", settings.sadabiz_link)}
                                disabled={saving === "sadabiz_link"}
                                className="bg-blue-600 hover:bg-blue-700 h-12 px-6 rounded-xl font-bold"
                            >
                                {saving === "sadabiz_link" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save SadaBiz"}
                            </Button>
                        </div>

                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input 
                                    value={settings.payoneer_link || ""}
                                    onChange={(e) => setSettings({...settings, payoneer_link: e.target.value})}
                                    placeholder="Payoneer Payment Request Link"
                                    className="pl-10 h-12 rounded-xl border-slate-200"
                                />
                            </div>
                            <Button 
                                onClick={() => handleSave("payoneer_link", settings.payoneer_link)}
                                disabled={saving === "payoneer_link"}
                                className="bg-slate-800 hover:bg-slate-900 h-12 px-6 rounded-xl font-bold"
                            >
                                {saving === "payoneer_link" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Payoneer"}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bank Details Section */}
                <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-50 rounded-xl">
                            <Building className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Universal Banking Details (Local & Int'l)</h2>
                    </div>
                    <p className="text-sm text-slate-500">These details are shown for local bank transfers and international wire transfers (Wise/Remitly).</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Bank Name</Label>
                            <Input 
                                value={bankObj.bank || ""}
                                onChange={(e) => {
                                    const newBank = {...bankObj, bank: e.target.value};
                                    setSettings({...settings, bank_details: JSON.stringify(newBank)});
                                }}
                                className="h-12 rounded-xl border-slate-200"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Account Name</Label>
                            <Input 
                                value={bankObj.account_name || ""}
                                onChange={(e) => {
                                    const newBank = {...bankObj, account_name: e.target.value};
                                    setSettings({...settings, bank_details: JSON.stringify(newBank)});
                                }}
                                className="h-12 rounded-xl border-slate-200"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Account Number</Label>
                            <Input 
                                value={bankObj.account_number || ""}
                                onChange={(e) => {
                                    const newBank = {...bankObj, account_number: e.target.value};
                                    setSettings({...settings, bank_details: JSON.stringify(newBank)});
                                }}
                                className="h-12 rounded-xl border-slate-200"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">IBAN (International)</Label>
                            <Input 
                                value={bankObj.iban || ""}
                                onChange={(e) => {
                                    const newBank = {...bankObj, iban: e.target.value};
                                    setSettings({...settings, bank_details: JSON.stringify(newBank)});
                                }}
                                className="h-12 rounded-xl border-slate-200"
                            />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">SWIFT / BIC Code (Required for International)</Label>
                            <Input 
                                value={bankObj.swift || ""}
                                onChange={(e) => {
                                    const newBank = {...bankObj, swift: e.target.value};
                                    setSettings({...settings, bank_details: JSON.stringify(newBank)});
                                }}
                                className="h-12 rounded-xl border-slate-200"
                                placeholder="e.g. MEZN PK KA"
                            />
                        </div>
                    </div>
                    <Button 
                        onClick={() => handleSave("bank_details", settings.bank_details)}
                        disabled={saving === "bank_details"}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 rounded-xl font-bold"
                    >
                        {saving === "bank_details" ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Banking Info"}
                    </Button>
                </div>

                {/* Support Contact */}
                <div className="bg-slate-900 p-8 rounded-[32px] text-white space-y-6 shadow-xl shadow-slate-900/20">
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-blue-400" />
                        <h2 className="text-xl font-bold">Academy WhatsApp Support</h2>
                    </div>
                    <div className="flex gap-3">
                        <Input 
                            value={settings.academy_whatsapp || ""}
                            onChange={(e) => setSettings({...settings, academy_whatsapp: e.target.value})}
                            className="bg-white/10 border-white/10 text-white h-12 rounded-xl"
                        />
                        <Button 
                            onClick={() => handleSave("academy_whatsapp", settings.academy_whatsapp)}
                            disabled={saving === "academy_whatsapp"}
                            className="bg-white text-slate-900 hover:bg-white/90 h-12 px-8 rounded-xl font-bold"
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-blue-50 border border-blue-100 rounded-[32px] flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
                <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Changes here reflect instantly on the student checkout page. Make sure your SadaBiz link is active to avoid failed international payments.
                </p>
            </div>
        </div>
    );
}
