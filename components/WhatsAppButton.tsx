"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "923044296295"; // Without + prefix for wa.me links
const WHATSAPP_MESSAGE = encodeURIComponent("Hello! I'm interested in learning Quran at vquranschool. Could you tell me more about your courses and pricing?");

export function WhatsAppButton() {
    const pathname = usePathname();

    // Only show on public pages, not dashboard
    if (pathname.startsWith("/dashboard")) return null;

    return (
        <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-50 group flex items-center gap-3 bg-[#25D366] hover:bg-[#22c55e] text-white rounded-full shadow-2xl shadow-green-600/30 transition-all duration-300 hover:scale-105 hover:shadow-green-600/40"
            aria-label="Chat on WhatsApp"
        >
            {/* Expanded label on hover */}
            <span className="hidden sm:block overflow-hidden max-w-0 group-hover:max-w-[200px] transition-all duration-500 whitespace-nowrap pl-4 text-sm font-semibold">
                Chat with Us
            </span>
            <div className="w-14 h-14 flex items-center justify-center rounded-full shrink-0">
                <MessageCircle className="w-7 h-7 fill-white stroke-none" />
            </div>
        </a>
    );
}
