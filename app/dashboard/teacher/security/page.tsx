"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, Lock } from "lucide-react";

export default function TeacherSecurityPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");
        const formData = new FormData(e.currentTarget);
        const newPwd = formData.get("new_pwd") as string;
        const confirmPwd = formData.get("confirm_pwd") as string;
        if (newPwd !== confirmPwd) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }
        // Placeholder - connect to API when ready
        setTimeout(() => {
            setSuccess("Password updated successfully.");
            setLoading(false);
            (e.target as HTMLFormElement).reset();
        }, 800);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Security</h1>
                    <p className="text-slate-500 text-sm">Manage your account password and security settings.</p>
                </div>
            </div>

            <Card className="border-slate-200 shadow-sm max-w-xl">
                <CardHeader className="bg-slate-50 border-b border-slate-100 rounded-t-xl">
                    <CardTitle className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-blue-600" />
                        Change Password
                    </CardTitle>
                    <CardDescription>Choose a strong password to keep your account secure.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    {success && (
                        <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm font-medium">
                            {success}
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current_pwd">Current Password</Label>
                            <Input id="current_pwd" name="current_pwd" type="password" required placeholder="Enter current password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new_pwd">New Password</Label>
                            <Input id="new_pwd" name="new_pwd" type="password" required placeholder="Min 8 characters" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm_pwd">Confirm New Password</Label>
                            <Input id="confirm_pwd" name="confirm_pwd" type="password" required placeholder="Repeat new password" />
                        </div>
                        <div className="flex justify-end pt-2">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                            >
                                {loading ? "Updating..." : "Update Password"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
