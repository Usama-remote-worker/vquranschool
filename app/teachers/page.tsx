import { TeacherCard } from "@/components/TeacherCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function TeachersPage() {
    const teachers: any[] = [];

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900">
            <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32 flex items-center justify-center border-b border-slate-200 bg-white">
                {/* Visual Background */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    <Image
                        src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2000&auto=format&fit=crop"
                        alt="Mosque Interior"
                        fill
                        className="object-cover mix-blend-multiply"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white"></div>
                </div>

                <div className="container px-4 md:px-6 relative z-10 mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-blue-950 mb-6 font-serif">
                        Meet Our Academy Teachers
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                        Our verified tutors have years of experience, holding certifications in Tajweed and Hifz.
                    </p>
                </div>
            </section>

            <section className="py-24 relative overflow-hidden bg-slate-50">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-blue-950 font-serif">
                            All Approved Teachers
                        </h2>
                        <div className="relative w-full md:w-96 shadow-sm rounded-full overflow-hidden border border-slate-200 focus-within:ring-2 ring-blue-500/50">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                            <Input
                                placeholder="Search by name or specialization..."
                                className="pl-12 h-14 bg-white border-0 text-slate-900 placeholder:text-slate-400 rounded-full"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teachers.map(teacher => (
                            <TeacherCard key={teacher.id} teacher={teacher} />
                        ))}
                    </div>

                    <div className="mt-24 relative overflow-hidden rounded-3xl p-10 md:p-14 border border-blue-900 bg-blue-950 shadow-2xl flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-8">
                        <div className="absolute top-0 right-0 w-[50%] h-[150%] bg-blue-400/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen -translate-y-1/4 translate-x-1/4"></div>

                        <div className="relative z-10 flex-1">
                            <h3 className="text-3xl font-bold text-white mb-4 font-serif">Want to teach with us?</h3>
                            <p className="text-blue-200 text-lg font-light">Join our growing team of expert instructors worldwide.</p>
                        </div>
                        <div className="relative z-10">
                            <Link href="/register-teacher">
                                <Button size="lg" className="bg-white hover:bg-slate-100 text-blue-900 h-14 px-10 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-[1.02]">
                                    Apply as Teacher
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
