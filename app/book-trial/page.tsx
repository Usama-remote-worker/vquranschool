"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { CalendarRange } from "lucide-react";
import Image from "next/image";

export default function BookTrialPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const formData = new FormData(e.currentTarget);
            const data = {
                name: formData.get("name"),
                email: formData.get("email"),
                country: formData.get("country"),
                whatsapp: formData.get("whatsapp"),
                course: formData.get("course"),
                teacher: formData.get("teacher"),
                time: formData.get("time"),
            };

            const res = await fetch("/api/trial", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                alert("Trial request submitted! We will contact you via WhatsApp shortly to confirm the scheduled time.");
                router.push("/");
            } else {
                const errorData = await res.json();
                alert(`Error: ${errorData.error || "Failed to submit request"}`);
            }
        } catch (error) {
            console.error("Error submitting trial form:", error);
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 py-12 bg-slate-50 text-slate-900 relative overflow-hidden">
            {/* Visual Background */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <Image
                    src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2000&auto=format&fit=crop"
                    alt="Mosque Interior Background"
                    fill
                    className="object-cover mix-blend-multiply"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50/40 via-slate-50/80 to-slate-50"></div>
            </div>

            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-blue-100 blur-[120px] rounded-full pointer-events-none mix-blend-multiply -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-blue-50 blur-[120px] rounded-full pointer-events-none mix-blend-multiply translate-y-1/2"></div>

            <Card className="w-full max-w-xl shadow-2xl shadow-blue-900/10 border border-slate-200 bg-white/90 backdrop-blur-md relative z-10 overflow-hidden rounded-3xl">
                <div className="absolute top-[0px] left-1/2 -translate-x-1/2 w-[80%] h-[5px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

                <CardHeader className="space-y-3 text-center pb-8 border-b border-slate-100 bg-slate-50/50 mb-8 pt-10 px-8 flex flex-col items-center">
                    <div className="w-16 h-16 bg-white border border-slate-200 text-blue-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        <CalendarRange className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-3xl font-extrabold text-blue-950 tracking-tight font-serif">Book Free Trial Class</CardTitle>
                    <CardDescription className="text-base font-light text-slate-500">Experience our interactive platform with no obligation</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 px-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-slate-700 text-sm font-medium">Student Name</Label>
                                <Input id="name" name="name" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="John Doe" />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-slate-700 text-sm font-medium">Email Address</Label>
                                <Input id="email" name="email" type="email" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="name@example.com" />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="country" className="text-slate-700 text-sm font-medium">Country</Label>
                                <Input id="country" name="country" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="United States, UK, etc." />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="whatsapp" className="text-slate-700 text-sm font-medium">WhatsApp Number</Label>
                                <Input id="whatsapp" name="whatsapp" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="+1 (234) 567-890" />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="age" className="text-slate-700 text-sm font-medium">Student Age</Label>
                                <Input id="age" name="age" type="number" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="e.g. 10" />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="course" className="text-slate-700 text-sm font-medium">Preferred Course</Label>
                                <Select id="course" name="course" required className="h-12 bg-white border-slate-200 text-slate-900 focus:ring-blue-500/50 rounded-xl px-4 appearance-none">
                                    <option value="" disabled selected className="text-slate-500">Select a course</option>
                                    <option value="Nazra">Quran Reading (Nazra)</option>
                                    <option value="Tajweed">Tajweed Rules</option>
                                    <option value="Hifz">Quran Memorization (Hifz)</option>
                                    <option value="Qaida">Noorani Qaida for Kids</option>
                                </Select>
                            </div>
                            <div className="space-y-3 md:col-span-2">
                                <Label htmlFor="teacher" className="text-slate-700 text-sm font-medium">Preferred Teacher (Optional)</Label>
                                <Select id="teacher" name="teacher" className="h-12 bg-white border-slate-200 text-slate-900 focus:ring-blue-500/50 rounded-xl px-4 appearance-none">
                                    <option value="" selected>Any available teacher</option>
                                    <option value="Ahmed">Ahmed Raza</option>
                                    <option value="Aisha">Aisha Fatima</option>
                                    <option value="Ali">Muhammad Ali</option>
                                </Select>
                            </div>
                            <div className="space-y-3 md:col-span-2">
                                <Label htmlFor="time" className="text-slate-700 text-sm font-medium">Preferred Time & Days</Label>
                                <Input id="time" name="time" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="e.g. Evenings, weekends" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="pt-8 pb-10 px-8 border-t border-slate-100 mt-6 relative z-10">
                        <Button
                            type="submit"
                            className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 disabled:opacity-70 transition-all hover:scale-[1.02]"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Schedule Trial"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
