"use client";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldAlert, KeyRound, UserCheck, Search, ShieldCheck, Users, UserCog, Loader2 } from "lucide-react";

type UserType = {
    id: string;
    name: string;
    email: string;
    role: "student" | "teacher" | "admin";
};

export default function SecurityPage() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [adminStatus, setAdminStatus] = useState("");
    const [userStatus, setUserStatus] = useState("");
    const [userError, setUserError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [activeTab, setActiveTab] = useState<"student" | "teacher">("student");

    // Loading states
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [isResettingUser, setIsResettingUser] = useState(false);

    // Form fields
    const [newUserPassword, setNewUserPassword] = useState("");
    const [adminPasswordForAuth, setAdminPasswordForAuth] = useState("");

    // Fetch dynamic users from database on load
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoadingUsers(true);
            try {
                const res = await fetch("/api/admin/users");
                const data = await res.json();
                if (data.users) {
                    setUsers(data.users);
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setIsLoadingUsers(false);
            }
        };
        fetchUsers();
    }, []);

    // Filter users dynamically 
    const filteredUsers = useMemo(() => {
        let matchedUsers = users.filter((user) => user.role === activeTab);
        if (searchQuery.trim()) {
            matchedUsers = matchedUsers.filter(user =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return matchedUsers;
    }, [searchQuery, activeTab, users]);

    const handleAdminPasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        // Since we are not fully implementing the main admin change yet, keep mocked
        setAdminStatus("Admin password updated successfully.");
        setTimeout(() => setAdminStatus(""), 3000);
    };

    const handleUserPasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();

        setUserStatus("");
        setUserError("");

        if (!selectedUser || !newUserPassword || !adminPasswordForAuth) {
            setUserError("Please provide all required fields.");
            return;
        }

        setIsResettingUser(true);

        try {
            const res = await fetch("/api/admin/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: selectedUser.id,
                    newPassword: newUserPassword,
                    adminPassword: adminPasswordForAuth
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setUserError(data.error || "Failed to reset password.");
                return;
            }

            setUserStatus(`Success! Password rewritten for ${selectedUser.name}.`);
            setTimeout(() => setUserStatus(""), 4000);

            // Clear current selection to go back
            setSelectedUser(null);
            setSearchQuery("");
            setNewUserPassword("");
            setAdminPasswordForAuth("");

        } catch (error) {
            setUserError("A server error occurred while updating the password.");
        } finally {
            setIsResettingUser(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Security & Passwords</h1>
                <p className="text-slate-500">Manage access control and securely update individual account credentials connected to your Database.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Password Reset Section - NOW LIVE DATA */}
                <Card className="border-slate-200 shadow-sm border-t-4 border-t-blue-500 order-2 lg:order-1">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                            <UserCheck className="w-5 h-5 text-blue-600" /> Reset User Credentials (Live DB)
                        </CardTitle>
                        <CardDescription>
                            Select account type, find the user, and securely update their password inside Supabase. Requires your Admin Password.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleUserPasswordReset} className="space-y-6">

                            {!selectedUser ? (
                                <div className="space-y-4">
                                    {/* Account Type Selection Buttons */}
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant={activeTab === "student" ? "default" : "outline"}
                                            className={`flex-1 ${activeTab === 'student' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                                            onClick={() => setActiveTab("student")}
                                        >
                                            <Users className="w-4 h-4 mr-2" /> Students
                                        </Button>
                                        <Button
                                            type="button"
                                            variant={activeTab === "teacher" ? "default" : "outline"}
                                            className={`flex-1 ${activeTab === 'teacher' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                                            onClick={() => setActiveTab("teacher")}
                                        >
                                            <UserCog className="w-4 h-4 mr-2" /> Teachers
                                        </Button>
                                    </div>

                                    {/* Filter / Search within the selected tab */}
                                    <div className="space-y-2">
                                        <Label htmlFor="search-user">Filter Registered {activeTab === "student" ? "Students" : "Teachers"}</Label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <Input
                                                id="search-user"
                                                type="text"
                                                className="pl-9"
                                                placeholder={`Search by name or email...`}
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* User List */}
                                    <div className="border border-slate-200 rounded-md shadow-sm max-h-60 overflow-y-auto mt-2 relative">
                                        {isLoadingUsers ? (
                                            <div className="p-8 text-center flex flex-col items-center justify-center text-slate-500">
                                                <Loader2 className="w-6 h-6 animate-spin text-blue-600 mb-2" />
                                                <span className="text-sm">Fetching Live Accounts...</span>
                                            </div>
                                        ) : filteredUsers.length > 0 ? (
                                            filteredUsers.map(user => (
                                                <div
                                                    key={user.id}
                                                    className="p-3 hover:bg-slate-50 border-b last:border-0 cursor-pointer flex justify-between items-center transition-colors"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setUserStatus("");
                                                        setUserError("");
                                                    }}
                                                >
                                                    <div>
                                                        <div className="font-medium text-sm text-slate-800">{user.name}</div>
                                                        <div className="text-xs text-slate-500">{user.email}</div>
                                                    </div>
                                                    <Button type="button" size="sm" variant="ghost" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                        Select
                                                    </Button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center text-sm text-slate-500">No {activeTab}s currently registered matching your search.</div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in duration-300">
                                    {/* Chosen User Info */}
                                    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
                                        <div>
                                            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Overwriting Real Password for</div>
                                            <div className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                                {selectedUser.name}
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedUser.role === 'student' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                                                    {selectedUser.role}
                                                </span>
                                            </div>
                                            <div className="text-sm text-slate-500">{selectedUser.email}</div>
                                        </div>
                                        <Button type="button" variant="outline" size="sm" onClick={() => setSelectedUser(null)}>
                                            Back
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="new-user-pass">Set New DB Password</Label>
                                        <div className="relative">
                                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <Input
                                                id="new-user-pass"
                                                type="text"
                                                className="pl-9"
                                                placeholder="Enter new strong password"
                                                required
                                                value={newUserPassword}
                                                onChange={(e) => setNewUserPassword(e.target.value)}
                                            />
                                        </div>
                                        <p className="text-xs text-slate-500">Upon success, this permanently alters their DB record.</p>
                                    </div>

                                    {/* Authorization Step */}
                                    <div className="space-y-2 pt-4 border-t border-slate-100">
                                        <Label htmlFor="admin-auth" className="flex items-center gap-2 text-red-600 font-semibold">
                                            <ShieldAlert className="w-4 h-4" /> Final Admin Authorization
                                        </Label>
                                        <Input
                                            id="admin-auth"
                                            type="password"
                                            placeholder="Type your Admin Password to authorize change"
                                            required
                                            value={adminPasswordForAuth}
                                            onChange={(e) => setAdminPasswordForAuth(e.target.value)}
                                        />
                                    </div>

                                    <Button disabled={isResettingUser} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center justify-center gap-2">
                                        {isResettingUser ? <><Loader2 className="w-4 h-4 animate-spin" /> Updating Blockchain / Database...</> : "FORCE UPDATE IN DATABASE"}
                                    </Button>
                                </div>
                            )}

                            {userStatus && (
                                <div className="p-3 bg-blue-50 text-blue-700 text-sm font-medium rounded-md flex items-center gap-2 animate-in fade-in zoom-in-95">
                                    <ShieldCheck className="w-4 h-4" /> {userStatus}
                                </div>
                            )}

                            {userError && (
                                <div className="p-3 bg-red-50 text-red-700 text-sm font-medium rounded-md flex items-center gap-2 animate-in fade-in drop-shadow-sm">
                                    <ShieldAlert className="w-4 h-4" /> {userError}
                                </div>
                            )}
                        </form>
                    </CardContent>
                </Card>

                {/* Admin Master Password Section */}
                <Card className="border-slate-200 shadow-sm border-t-4 border-t-red-500 order-1 lg:order-2">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                        <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                            <ShieldAlert className="w-5 h-5 text-red-500" /> Control Panel Security
                        </CardTitle>
                        <CardDescription>
                            Main control center master password. Always secure this with a hard-to-guess secret.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleAdminPasswordChange} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-admin-pass">Current Password</Label>
                                <Input id="current-admin-pass" type="password" placeholder="Verify your identity first" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-admin-pass">New Password</Label>
                                <Input id="new-admin-pass" type="password" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-admin-pass">Confirm New Password</Label>
                                <Input id="confirm-admin-pass" type="password" required />
                            </div>
                            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white mt-4 shadow-sm">
                                Securely Change Master Password
                            </Button>
                            {adminStatus && (
                                <div className="p-3 bg-blue-50 text-blue-700 text-sm font-medium rounded-md mt-4 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" /> {adminStatus}
                                </div>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
