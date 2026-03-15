import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle, Clock, Star } from "lucide-react";

interface Teacher {
    id: string;
    name: string;
    experience: string;
    specialization: string;
    available_days: string;
}

export function TeacherCard({ teacher }: { teacher: Teacher }) {
    return (
        <Card className="overflow-hidden bg-white border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full rounded-3xl group">
            <div className="h-40 bg-gradient-to-b from-blue-900 to-blue-950 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/black-scales.png')] opacity-10"></div>

                <div className="w-24 h-24 rounded-full bg-white border-4 border-blue-100 flex items-center justify-center text-4xl font-serif text-blue-900 uppercase shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-500">
                    {teacher.name.charAt(0)}
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-2.5 py-1 flex items-center gap-1.5 text-xs font-semibold text-white border border-white/30 shadow-sm">
                    <CheckCircle className="w-3.5 h-3.5 fill-white/20" />
                    Verified
                </div>
            </div>
            <CardHeader className="pb-2 pt-6 relative z-10 text-center">
                <h3 className="text-2xl font-bold text-blue-950 font-serif">{teacher.name}</h3>
                <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase mt-1">{teacher.specialization}</p>
            </CardHeader>
            <CardContent className="space-y-4 pb-6 pt-4 flex-grow px-8 text-center relative z-10">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-center text-sm text-slate-600 gap-2 bg-slate-50 py-2 px-4 rounded-xl border border-slate-100">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-slate-900">{teacher.experience} Years</span> Experience
                    </div>
                    <div className="flex items-center justify-center text-sm text-slate-600 gap-2 bg-slate-50 py-2 px-4 rounded-xl border border-slate-100">
                        <Clock className="w-4 h-4 text-blue-500" />
                        Available: <span className="font-semibold text-slate-900">{teacher.available_days}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-0 border-t border-slate-100 mt-auto px-6 pb-6 pt-6">
                <Link href={`/book-trial?teacher=${teacher.id}`} className="w-full">
                    <Button variant="outline" className="w-full bg-white border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white h-12 rounded-xl text-base transition-all duration-300 hover:shadow-md">
                        Book Trial Class
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
