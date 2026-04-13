"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, CreditCard, ShieldCheck, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function PublicPricing() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <div className="container mx-auto px-4 py-24 md:py-32">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Visual Icon */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-blue-600 text-white shadow-2xl shadow-blue-600/20 mb-4"
                    >
                        <CreditCard className="w-12 h-12" />
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold text-blue-950 font-serif leading-tight"
                    >
                        Premium Quran Learning <br /> 
                        <span className="text-blue-600">Tailored to You</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        To maintain our high standards of personalized 1-on-1 education and expert teacher matching, 
                        our detailed course plans and pricing are exclusively available to our registered students.
                    </motion.p>

                    {/* Features Grill */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left"
                    >
                        {[
                            { title: "Personalized Plans", desc: "Pricing varies based on session frequency and duration.", icon: ShieldCheck },
                            { title: "No Hidden Fees", desc: "Transparent, month-to-month billing with no long-term contracts.", icon: Check },
                            { title: "Free Trial Included", desc: "Experience your first class for free before you subscribe.", icon: Check }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
                                <item.icon className="w-8 h-8 text-blue-600 mb-4" />
                                <h3 className="font-bold text-blue-950 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-500 font-light">{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center pt-12"
                    >
                        <Link href="/register-student">
                            <Button className="h-16 px-10 text-xl font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-600/30 transition-all hover:scale-105 w-full sm:w-auto">
                                <UserPlus className="w-6 h-6 mr-3" />
                                Create Student Account
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" className="h-16 px-10 text-xl font-bold border-slate-300 text-slate-700 hover:bg-slate-50 rounded-2xl transition-all w-full sm:w-auto">
                                Already a Member? Login
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm text-slate-400 font-light"
                    >
                        It only takes 60 seconds to join our academy.
                    </motion.p>
                </div>
            </div>
        </div>
    );
}
