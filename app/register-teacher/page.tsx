"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/components/ui/toast";

export default function RegisterTeacherPage() {
    const router = useRouter();
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        data.role = 'teacher';

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || 'Registration failed');

            addToast("Application submitted! Our admin team will review and contact you shortly.", "success");
            router.push("/");
        } catch (error: any) {
            addToast(error.message || "Submission failed. Please try again.", "error");
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
            <div className="absolute top-1/2 left-1/2 w-[60%] h-[60%] bg-blue-100 blur-[150px] rounded-full pointer-events-none mix-blend-multiply -translate-x-1/2 -translate-y-1/2"></div>


            <Card className="w-full max-w-2xl shadow-2xl shadow-blue-900/10 border border-slate-200 bg-white/90 backdrop-blur-md relative z-10 overflow-hidden rounded-3xl">
                <div className="absolute top-[0px] left-1/2 -translate-x-1/2 w-[80%] h-[5px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

                <CardHeader className="space-y-3 text-center pb-8 border-b border-slate-100 bg-slate-50/50 mb-8 pt-10 px-8">
                    <CardTitle className="text-3xl font-extrabold text-blue-950 tracking-tight font-serif">Teacher Application</CardTitle>
                    <CardDescription className="text-base font-light text-slate-500">Apply to become a vquranschool tutor</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-10 px-8 relative z-10">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-blue-600 border-b border-slate-100 pb-3 font-serif">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-slate-700 text-sm font-medium">Full Name</Label>
                                    <Input name="name" id="name" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="email" className="text-slate-700 text-sm font-medium">Email Address</Label>
                                    <Input name="email" id="email" type="email" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="password" className="text-slate-700 text-sm font-medium">Password</Label>
                                    <Input name="password" id="password" type="password" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="country" className="text-slate-700 text-sm font-medium">Country</Label>
                                    <Input name="country" id="country" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="whatsapp" className="text-slate-700 text-sm font-medium">WhatsApp Number</Label>
                                    <Input name="whatsapp" id="whatsapp" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-blue-600 border-b border-slate-100 pb-3 font-serif">Professional Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="experience" className="text-slate-700 text-sm font-medium">Years of Experience</Label>
                                    <Input name="experience" id="experience" type="number" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="qualification" className="text-slate-700 text-sm font-medium">Highest Qualification</Label>
                                    <Input name="qualification" id="qualification" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="e.g. Al-Azhar Grad, Ijazah" />
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <Label htmlFor="specialization" className="text-slate-700 text-sm font-medium">Specialization</Label>
                                    <Select name="specialization" id="specialization" required className="h-12 bg-white border-slate-200 text-slate-900 focus:ring-blue-500/50 rounded-xl px-4 appearance-none">
                                        <option value="" disabled defaultValue="" className="text-slate-500">Select specialization</option>
                                        <option value="Nazra">Nazra (Reading)</option>
                                        <option value="Tajweed">Tajweed Rules</option>
                                        <option value="Hifz">Hifz (Memorization)</option>
                                        <option value="All">All of the above</option>
                                    </Select>
                                </div>
                                <div className="space-y-3 md:col-span-2">
                                    <Label htmlFor="photo" className="text-slate-700 text-sm font-medium">Profile Photo URL (Optional)</Label>
                                    <Input name="profile_photo" id="photo" type="text" className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="https://example.com/photo.jpg" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-blue-600 border-b border-slate-100 pb-3 font-serif">Availability</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="days" className="text-slate-700 text-sm font-medium">Available Days</Label>
                                    <Input name="available_days" id="days" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="e.g. Mon-Fri" />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="timezone" className="text-slate-700 text-sm font-medium">Timezone</Label>
                                    <Input name="timezone" id="timezone" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="e.g. GMT+2" />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="start_time" className="text-slate-700 text-sm font-medium">Start Time</Label>
                                    <Input name="start_time" id="start_time" type="time" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4 [color-scheme:light]" />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="end_time" className="text-slate-700 text-sm font-medium">End Time</Label>
                                    <Input name="end_time" id="end_time" type="time" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4 [color-scheme:light]" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-8 pb-10 px-8 border-t border-slate-100 mt-6 relative z-10">
                        <Button
                            type="submit"
                            className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-[0_0_30px_-5px_rgba(37,99,235,0.3)] disabled:opacity-70 transition-all hover:scale-[1.02]"
                            disabled={loading}
                        >
                            {loading ? "Submitting Application..." : "Submit Application"}
                        </Button>
                        <div className="text-center text-sm text-slate-500 w-full pt-6 border-t border-slate-100 mt-4">
                            Already have an account?{" "}
                            <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                                Login here
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
