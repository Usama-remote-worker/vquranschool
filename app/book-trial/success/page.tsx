import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageSquare, Clock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Trial Booked! — vquranschool",
    description: "Your free trial class has been submitted. We will contact you shortly via WhatsApp.",
};

const WHATSAPP_NUMBER = "923044296295";
const WHATSAPP_MESSAGE = encodeURIComponent("Assalamu Alaikum! I just submitted a free trial request on your website. Could you confirm and help me get started?");

export default function TrialSuccessPage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-5rem)] items-center justify-center bg-slate-50 px-4 py-16">
            <div className="w-full max-w-xl text-center space-y-8">

                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="w-28 h-28 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center shadow-xl shadow-emerald-600/10">
                            <CheckCircle2 className="w-14 h-14 text-emerald-500" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg">
                            🎉
                        </div>
                    </div>
                </div>

                {/* Heading */}
                <div className="space-y-3">
                    <h1 className="text-4xl font-extrabold tracking-tight text-blue-950 font-serif">
                        Trial Booked Successfully!
                    </h1>
                    <p className="text-lg text-slate-500 font-light leading-relaxed">
                        Alhamdulillah! Your free trial class has been submitted. Our team will reach out to you <strong className="text-slate-700 font-semibold">within 24 hours</strong> via WhatsApp to confirm your schedule.
                    </p>
                </div>

                {/* What Happens Next */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm text-left space-y-5">
                    <h2 className="font-bold text-blue-950 text-lg font-serif">What happens next?</h2>
                    <div className="space-y-4">
                        {[
                            { step: "1", title: "We review your request", desc: "Our admin team will check your preferred course and time.", icon: Clock, color: "bg-blue-50 text-blue-600" },
                            { step: "2", title: "WhatsApp confirmation", desc: "We'll message you to confirm the exact date and time of your trial.", icon: MessageSquare, color: "bg-green-50 text-green-600" },
                            { step: "3", title: "Attend your free class!", desc: "Join via Zoom link we send you. No payment needed for the trial.", icon: CheckCircle2, color: "bg-amber-50 text-amber-600" },
                        ].map((item) => (
                            <div key={item.step} className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color} border border-current/20`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800">{item.title}</p>
                                    <p className="text-sm text-slate-500 font-light mt-0.5">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                    >
                        <Button className="w-full h-14 text-base font-bold bg-[#25D366] hover:bg-[#22c55e] text-white rounded-2xl shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                            <MessageSquare className="w-5 h-5" />
                            Chat with Us on WhatsApp
                        </Button>
                    </a>
                    <Link href="/" className="flex-1">
                        <Button variant="outline" className="w-full h-14 text-base font-bold border-slate-200 text-slate-700 rounded-2xl hover:bg-slate-50 flex items-center justify-center gap-2">
                            Back to Home
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <p className="text-sm text-slate-400 font-light">
                    Any questions? Email us at{" "}
                    <a href="mailto:support@vquranschool.com" className="text-blue-600 hover:underline font-medium">
                        support@vquranschool.com
                    </a>
                </p>
            </div>
        </div>
    );
}
