"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

export function MobileStickyCTA() {
  const pathname = usePathname();

  // Hide on trial page and dashboard
  if (pathname === "/book-trial" || pathname.startsWith("/dashboard")) return null;

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-3rem)] max-w-sm">
      <Link href="/book-trial">
        <button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-2xl shadow-blue-600/40 flex items-center justify-center gap-2 animate-bounce-subtle active:scale-95 transition-all border border-blue-400/30">
          <Sparkles className="w-5 h-5 fill-white" />
          Book Free Trial Now
        </button>
      </Link>
    </div>
  );
}
