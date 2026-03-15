"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function StudentProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Profile Settings</h1>
                <p className="text-slate-500">Manage your personal information and account details.</p>
            </div>

            <Card className="border-blue-100 shadow-sm max-w-3xl">
                <CardHeader className="bg-slate-50 border-b border-slate-100 rounded-t-xl">
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your contact details and timezone.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" defaultValue="Student User" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue="student@quranacademy.com" disabled />
                                <p className="text-xs text-slate-400">Email cannot be changed directly.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="age">Age</Label>
                                <Input id="age" type="number" defaultValue="20" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                                <Input id="whatsapp" defaultValue="+1 (234) 567-890" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Input id="country" defaultValue="United Kingdom" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <Input id="timezone" defaultValue="GMT (London)" />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-slate-100">
                            <Button type="button" className="bg-blue-600 hover:bg-blue-700 px-8">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm max-w-3xl">
                <CardHeader className="bg-slate-50 border-b border-slate-100 rounded-t-xl">
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Update your password.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current_pwd">Current Password</Label>
                            <Input id="current_pwd" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new_pwd">New Password</Label>
                            <Input id="new_pwd" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm_pwd">Confirm New Password</Label>
                            <Input id="confirm_pwd" type="password" />
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button type="button" variant="outline">
                                Update Password
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
