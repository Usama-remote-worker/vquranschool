"use client";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { BookOpen, GraduationCap, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Course {
    id: string;
    title: string;
    description: string;
    descriptionUrdu?: string;
    level: string;
}

export function CourseCard({ course }: { course: Course }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card className="flex flex-col h-full bg-white border border-slate-200 shadow-sm transition-all duration-300 rounded-3xl overflow-hidden group hover:border-blue-200 hover:shadow-lg">
            <CardHeader 
                className="bg-gradient-to-br from-blue-50 to-white pb-6 pt-6 px-8 border-b border-blue-100/50 relative cursor-pointer hover:bg-blue-50/80 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 blur-3xl rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-700"></div>

                <div className="flex justify-between items-start mb-2">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 transform group-hover:rotate-6 transition-transform duration-500 relative z-10">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="text-blue-500 p-2 rounded-full hover:bg-blue-100 transition-colors bg-white shadow-sm border border-blue-50 z-20">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                </div>
                
                <h3 className="text-xl font-bold text-blue-950 font-serif leading-tight relative z-10 group-hover:text-blue-700 transition-colors">{course.title}</h3>
                <div className="mt-3 relative z-10">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1 bg-white text-blue-700 rounded-full border border-blue-100 shadow-sm">
                        <GraduationCap className="w-3.5 h-3.5" /> {course.level}
                    </span>
                </div>
            </CardHeader>
            
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <CardContent className="pt-6 px-8 space-y-6 border-b border-slate-100 bg-slate-50/50">
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">Details</h4>
                                <p className="text-slate-600 text-sm leading-relaxed font-light">{course.description}</p>
                            </div>
                        </CardContent>
                    </motion.div>
                )}
            </AnimatePresence>

            <CardFooter className="mt-auto px-6 py-4 bg-white relative z-10 border-t border-slate-50">
                <Link href={`/book-trial?course=${course.id}`} className="w-full relative z-20">
                    <Button variant="ghost" className="w-full text-blue-700 hover:text-white hover:bg-blue-600 justify-between group/btn h-12 rounded-xl font-semibold text-sm transition-all duration-300 bg-white border border-blue-100 hover:border-transparent">
                        Enroll Now
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
