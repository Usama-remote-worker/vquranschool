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

export default function RegisterStudentPage() {
    const router = useRouter();
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        data.role = 'student';

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || 'Registration failed');

            addToast("Account created successfully! Please login to access your dashboard.", "success");
            router.push("/login");
        } catch (error: any) {
            addToast(error.message || "Registration failed. Please try again.", "error");
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

            <Card className="w-full max-w-xl shadow-2xl shadow-blue-900/10 border border-slate-200 bg-white/90 backdrop-blur-md relative z-10 overflow-hidden rounded-3xl">
                <div className="absolute top-[0px] left-1/2 -translate-x-1/2 w-[80%] h-[5px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

                <CardHeader className="space-y-3 text-center pb-8 border-b border-slate-100 bg-slate-50/50 mb-8 pt-10 px-8">
                    <CardTitle className="text-3xl font-extrabold text-blue-950 tracking-tight font-serif">Create Student Account</CardTitle>
                    <CardDescription className="text-base font-light text-slate-500">Join thousands of students learning Quran online</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 px-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-slate-700 text-sm font-medium">Full Name</Label>
                                <Input id="name" name="name" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="John Doe" />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-slate-700 text-sm font-medium">Email Address</Label>
                                <Input id="email" name="email" type="email" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="name@example.com" />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="password" className="text-slate-700 text-sm font-medium">Password</Label>
                                <Input id="password" name="password" type="password" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="Create a strong password" />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="age" className="text-slate-700 text-sm font-medium">Age</Label>
                                <Input id="age" name="age" type="number" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="Example: 12" />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="country" className="text-slate-700 text-sm font-medium">Country</Label>
                                <Input id="country" name="country" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="United States, UK, etc." />
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="whatsapp" className="text-slate-700 text-sm font-medium">WhatsApp Number</Label>
                                <Input id="whatsapp" name="whatsapp" required className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4" placeholder="+1 (234) 567-890" />
                            </div>
                            <div className="space-y-3 md:col-span-2">
                                <Label htmlFor="course" className="text-slate-700 text-sm font-medium">Course Interested In</Label>
                                <Select id="course" name="course" required className="h-12 bg-white border-slate-200 text-slate-900 focus:ring-blue-500/50 rounded-xl px-4 appearance-none">
                                    <option value="" disabled defaultValue="" className="text-slate-500">Select a course</option>
                                    <option value="Nazra">Quran Reading (Nazra)</option>
                                    <option value="Tajweed">Tajweed Rules</option>
                                    <option value="Hifz">Quran Memorization (Hifz)</option>
                                    <option value="Qaida">Noorani Qaida for Kids</option>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-8 pb-10 px-8 border-t border-slate-100 mt-6 relative z-10">
                        <Button
                            type="submit"
                            className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 disabled:opacity-70 transition-all hover:scale-[1.02]"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Create Account"}
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
