"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AdminLoginPage() {
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
            setError("Invalid admin credentials");
            setLoading(false);
        } else {
            // Check session to ensure it's an admin
            const sessionRes = await fetch('/api/auth/session');
            const sessionData = await sessionRes.json();
            
            if (sessionData?.user?.role !== 'admin') {
                setError("Access Denied: You do not have administrative privileges.");
                setLoading(false);
                // Force logout
                await fetch('/api/auth/signout', { method: 'POST' });
                return;
            }

            // After login, DashboardRedirect will handle routing to /dashboard/admin
            router.push("/dashboard/admin");
            router.refresh();
        }
    };

    return (
        <div className="flex min-h-[100vh] items-center justify-center p-4 bg-slate-900 text-white relative overflow-hidden">
            {/* Dark Professional Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <Image
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
                    alt="Cyber Security Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <Card className="w-full max-w-md shadow-2xl border border-slate-700 bg-slate-800/90 backdrop-blur-xl relative z-10 overflow-hidden rounded-3xl">
                <CardHeader className="space-y-3 text-center pb-8 border-b border-slate-700 bg-slate-900/50 mb-8 pt-10 px-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-blue-600/30">
                        <span className="text-3xl font-bold">Q</span>
                    </div>
                    <CardTitle className="text-3xl font-extrabold text-white tracking-tight font-serif">Admin Portal</CardTitle>
                    <CardDescription className="text-base font-light text-slate-400 text-center w-full">Authorized Personnel Only</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 px-8 relative z-10">
                        {error && (
                            <div className="bg-red-900/40 text-red-400 text-sm p-3 rounded-lg font-medium text-center border border-red-900/50">
                                {error}
                            </div>
                        )}
                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-slate-300 text-sm font-medium">Admin Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 bg-slate-900 border-slate-700 text-white focus-visible:ring-blue-500/50 rounded-xl px-4"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="password" className="text-slate-300 text-sm font-medium">Access Key</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12 bg-slate-900 border-slate-700 text-white focus-visible:ring-blue-500/50 rounded-xl px-4"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-8 px-8 pb-10 relative z-10">
                        <Button
                            type="submit"
                            className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 disabled:opacity-70 transition-all hover:scale-[1.02]"
                            disabled={loading}
                        >
                            {loading ? "Authenticating..." : "Login to Console"}
                        </Button>
                        <div className="text-center">
                           <p className="text-xs text-slate-500">Access is monitored and logged.</p>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
