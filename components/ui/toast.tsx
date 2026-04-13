"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { CheckCircle2, XCircle, X, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType = "success") => {
        const id = Math.random().toString(36).slice(2);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4500);
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-6 right-4 z-[200] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-sm animate-in slide-in-from-right-4 fade-in duration-300 ${
                            toast.type === "success"
                                ? "bg-white border-emerald-200 text-slate-800"
                                : toast.type === "error"
                                ? "bg-white border-red-200 text-slate-800"
                                : "bg-white border-blue-200 text-slate-800"
                        }`}
                    >
                        <div className={`shrink-0 mt-0.5 ${toast.type === "success" ? "text-emerald-500" : toast.type === "error" ? "text-red-500" : "text-blue-500"}`}>
                            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : toast.type === "error" ? <XCircle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                        </div>
                        <p className="text-sm font-medium leading-relaxed flex-1">{toast.message}</p>
                        <button
                            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                            className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors mt-0.5"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used inside ToastProvider");
    return ctx;
}
