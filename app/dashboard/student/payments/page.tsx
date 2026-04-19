"use client";

import { useEffect, useState } from "react";
import { Copy, UploadCloud, CheckCircle2, AlertCircle, Clock, CheckIcon } from "lucide-react";
import Image from "next/image";

import { Student } from "@/types";

export default function PaymentsPage() {
    const [profile, setProfile] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState("");
    const [copiedField, setCopiedField] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/students/profile");
            const data = await res.json();
            if (res.ok) {
                setProfile(data.student);
            }
        } catch (err: unknown) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text: string, fieldName: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);
        setTimeout(() => setCopiedField(""), 2000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            // 5MB limit
            if (file.size > 5 * 1024 * 1024) {
                setError("File is too large. Maximum size is 5MB.");
                setSelectedFile(null);
                return;
            }
            setSelectedFile(file);
            setError("");
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            setError("Please select a file to upload.");
            return;
        }

        setUploading(true);
        setError("");

        try {
            // Convert file to base64
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = async () => {
                const base64 = reader.result;

                const res = await fetch("/api/students/payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ receiptBase64: base64 }),
                });

                if (res.ok) {
                    // Update local state to pending
                    setProfile({ ...profile, payment_status: "pending" });
                } else {
                    const data = await res.json();
                    setError(data.error || "Failed to submit payment proof.");
                }
                setUploading(false);
            };
            reader.onerror = () => {
                setError("Failed to read the file.");
                setUploading(false);
            };
        } catch (err) {
            setError("An error occurred during submission.");
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const status = profile?.payment_status || "unpaid";
    const expiresAt = profile?.access_expires_at ? new Date(profile.access_expires_at).toLocaleDateString() : "N/A";

    return (
        <div className="max-w-4xl max-w-full">
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Payments & Subscription</h1>

            {status === "active" && (
                <div className="bg-white rounded-xl shadow-sm border border-emerald-200 p-8 text-center max-w-xl mx-auto">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-slate-800 mb-2">Subscription Active</h2>
                    <p className="text-slate-600 mb-6">
                        Your current access expires on <span className="font-bold text-slate-800">{expiresAt}</span>
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-sm transition-colors">
                        Renew Subscription
                    </button>
                </div>
            )}

            {status === "pending" && (
                <div className="bg-white rounded-xl shadow-sm border border-amber-200 p-8 text-center max-w-xl mx-auto">
                    <Clock className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-slate-800 mb-2">Payment Verification in Progress</h2>
                    <p className="text-slate-600">
                        We have received your proof of payment. Our team will verify it shortly and activate your access.
                    </p>
                </div>
            )}

            {status === "unpaid" && (
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Bank Details Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-blue-600 p-6 text-white text-center">
                            <h2 className="text-xl font-bold">Bank Transfer</h2>
                            <p className="text-blue-100 mt-1">Send your payment to the details below</p>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bank Name</label>
                                <p className="text-lg font-medium text-slate-800">Meezan Bank</p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Account Title</label>
                                <p className="text-lg font-medium text-slate-800">Usama Aimen</p>
                            </div>
                            
                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Account Number</label>
                                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100 mt-1">
                                    <span className="font-mono text-lg text-slate-800">0030 0112681190</span>
                                    <button 
                                        onClick={() => handleCopy("0030 0112681190", "account")}
                                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                        title="Copy Account Number"
                                    >
                                        {copiedField === "account" ? <CheckIcon className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">IBAN</label>
                                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100 mt-1">
                                    <span className="font-mono text-sm sm:text-base text-slate-800">PK02MEZN0000300112681190</span>
                                    <button 
                                        onClick={() => handleCopy("PK02MEZN0000300112681190", "iban")}
                                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                        title="Copy IBAN"
                                    >
                                        {copiedField === "iban" ? <CheckIcon className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* QR Code Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Scan to Pay via App</h3>
                            <div className="flex justify-center bg-slate-50 p-4 rounded-lg inline-block mx-auto border border-slate-100">
                                {/* Next Image or regular img for QR */}
                                <img 
                                    src="/payments/meezan-qr.png" 
                                    alt="Meezan Bank QR Code" 
                                    className="w-48 h-auto object-contain sm:w-64"
                                />
                            </div>
                        </div>

                        {/* Upload Proof Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="text-lg font-bold text-slate-800 mb-4">Submit Proof of Payment</h3>
                            
                            <div className="space-y-4">
                                <label className="block w-full border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer group">
                                    <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-blue-500 mx-auto mb-2" />
                                    <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600">
                                        {selectedFile ? selectedFile.name : "Click to upload transfer receipt"}
                                    </span>
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*,.pdf" 
                                        onChange={handleFileChange}
                                    />
                                </label>

                                {error && (
                                    <div className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-md">
                                        <AlertCircle className="w-4 h-4 mr-2" />
                                        {error}
                                    </div>
                                )}

                                <button 
                                    onClick={handleSubmit}
                                    disabled={!selectedFile || uploading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-3 rounded-lg shadow-sm transition-colors flex justify-center items-center"
                                >
                                    {uploading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit Payment Proof"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
