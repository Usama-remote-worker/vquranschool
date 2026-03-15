"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError("Invalid email or password");
            setLoading(false);
        } else {
            router.push("/dashboard");
            router.refresh();
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

            <Card className="w-full max-w-md shadow-2xl shadow-blue-900/10 border border-slate-200 bg-white/90 backdrop-blur-md relative z-10 overflow-hidden rounded-3xl">
                <div className="absolute top-[0px] left-1/2 -translate-x-1/2 w-[80%] h-[5px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

                <CardHeader className="space-y-3 text-center pb-8 border-b border-slate-100 bg-slate-50/50 mb-8 pt-10 px-8">
                    <CardTitle className="text-3xl font-extrabold text-blue-950 tracking-tight font-serif">Welcome Back</CardTitle>
                    <CardDescription className="text-base font-light text-slate-500">Login to your vquranschool account</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 px-8 relative z-10">
                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg font-medium text-center border border-red-100">
                                {error}
                            </div>
                        )}
                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-slate-700 text-sm font-medium">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4"
                            />
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-slate-700 text-sm font-medium">Password</Label>
                                <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12 bg-white border-slate-200 text-slate-900 focus-visible:ring-blue-500/50 rounded-xl px-4"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-8 px-8 pb-10 relative z-10">
                        <Button
                            type="submit"
                            className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 disabled:opacity-70 transition-all hover:scale-[1.02]"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                        <div className="text-center text-sm text-slate-500 pt-6 flex flex-col gap-3 border-t border-slate-100 w-full mt-4">
                            <div>
                                Don't have an account?{" "}
                                <Link href="/register-student" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                                    Register as Student
                                </Link>
                            </div>
                            <div>
                                Want to teach?{" "}
                                <Link href="/register-teacher" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                                    Apply as Teacher
                                </Link>
                            </div>
                        </div>

                        <div className="mt-8 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="font-semibold mb-3 text-slate-700">Demo Accounts:</p>
                            <ul className="space-y-2">
                                <li className="flex flex-wrap items-center gap-2">
                                    <span className="w-16">Admin:</span>
                                    <code className="bg-white px-2 py-1 rounded-md text-slate-700 border border-slate-200">admin@quranacademy.com</code>
                                    <code className="bg-white px-2 py-1 rounded-md text-slate-700 border border-slate-200">admin123</code>
                                </li>
                                <li className="flex flex-wrap items-center gap-2">
                                    <span className="w-16">Teacher:</span>
                                    <code className="bg-white px-2 py-1 rounded-md text-slate-700 border border-slate-200">teacher@quranacademy.com</code>
                                    <code className="bg-white px-2 py-1 rounded-md text-slate-700 border border-slate-200">teacher123</code>
                                </li>
                                <li className="flex flex-wrap items-center gap-2">
                                    <span className="w-16">Student:</span>
                                    <code className="bg-white px-2 py-1 rounded-md text-slate-700 border border-slate-200">student@quranacademy.com</code>
                                    <code className="bg-white px-2 py-1 rounded-md text-slate-700 border border-slate-200">student123</code>
                                </li>
                            </ul>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
