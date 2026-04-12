"use client";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
    ShieldAlert, KeyRound, UserCheck, Search, 
    ShieldCheck, Users, UserCog, Loader2, Mail, 
    Lock, AlertTriangle, RefreshCw
} from "lucide-react";

type UserType = {
    id: string;
    name: string;
    email: string;
    role: "student" | "teacher" | "admin";
};

export default function SecurityPage() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
    const [activeTab, setActiveTab] = useState<"student" | "teacher">("student");

    // Loading states
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [isUpdatingUser, setIsUpdatingUser] = useState(false);
    const [isUpdatingAdmin, setIsUpdatingAdmin] = useState(false);

    // Messages
    const [adminStatus, setAdminStatus] = useState({ type: "", message: "" });
    const [userStatus, setUserStatus] = useState({ type: "", message: "" });

    // User Reset Form fields
    const [newUserPassword, setNewUserPassword] = useState("");
    const [adminAuthPassword, setAdminAuthPassword] = useState("");

    // Admin Profile Form fields
    const [newAdminEmail, setNewAdminEmail] = useState("");
    const [newAdminPassword, setNewAdminPassword] = useState("");
    const [currentAdminPassword, setCurrentAdminPassword] = useState("");

    const fetchUsers = async () => {
        setIsLoadingUsers(true);
        try {
            const res = await fetch("/api/admin/users");
            const data = await res.json();
            if (data.users) setUsers(data.users);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setIsLoadingUsers(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

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

    const handleAdminUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setAdminStatus({ type: "", message: "" });
        setIsUpdatingAdmin(true);

        try {
            const res = await fetch("/api/admin/update-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    newEmail: newAdminEmail || undefined,
                    newPassword: newAdminPassword || undefined,
                    currentPassword: currentAdminPassword
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Update failed");

            setAdminStatus({ type: "success", message: "Admin credentials updated successfully." });
            setNewAdminEmail("");
            setNewAdminPassword("");
            setCurrentAdminPassword("");
        } catch (error: any) {
            setAdminStatus({ type: "error", message: error.message });
        } finally {
            setIsUpdatingAdmin(false);
        }
    };

    const handleUserPasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        
        setUserStatus({ type: "", message: "" });
        setIsUpdatingUser(true);

        try {
            const res = await fetch("/api/admin/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: selectedUser.id,
                    newPassword: newUserPassword,
                    adminPassword: adminAuthPassword
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Reset failed");

            setUserStatus({ type: "success", message: `Password updated for ${selectedUser.name}` });
            setSelectedUser(null);
            setNewUserPassword("");
            setAdminAuthPassword("");
            setSearchQuery("");
        } catch (error: any) {
            setUserStatus({ type: "error", message: error.message });
        } finally {
            setIsUpdatingUser(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#0d1c18" }}>
                    Security & Access
                </h1>
                <p className="mt-1 text-sm" style={{ color: "#5a7068" }}>
                    Manage portal credentials and secure administrative settings.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* 1. Admin Account Control */}
                <Card className="border-0 shadow-lg shadow-emerald-900/5 overflow-hidden rounded-2xl">
                    <CardHeader className="border-b" style={{ background: "linear-gradient(135deg, #003527 0%, #004d3a 100%)" }}>
                        <CardTitle className="text-lg flex items-center gap-2 text-white">
                            <ShieldAlert className="w-5 h-5 text-amber-400" /> Admin Dashboard Settings
                        </CardTitle>
                        <CardDescription className="text-emerald-100/70">
                            Update your login email and password for this dashboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 pb-8 space-y-6 bg-white">
                        <form onSubmit={handleAdminUpdate} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="admin-email" className="text-slate-700 font-semibold">Change Login Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input 
                                        id="admin-email" 
                                        type="email" 
                                        placeholder="New email address (leave blank to keep current)"
                                        className="pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                        value={newAdminEmail}
                                        onChange={(e) => setNewAdminEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="admin-new-pass" className="text-slate-700 font-semibold">Set New Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input 
                                        id="admin-new-pass" 
                                        type="password" 
                                        placeholder="Enter new master password"
                                        className="pl-10 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                        value={newAdminPassword}
                                        onChange={(e) => setNewAdminPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-5">
                                    <div className="flex gap-3">
                                        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Authorization Required</p>
                                            <p className="text-xs text-amber-700">Enter your <strong>current</strong> password to confirm these changes.</p>
                                        </div>
                                    </div>
                                    <Input 
                                        type="password"
                                        placeholder="Confirm current password"
                                        className="mt-3 bg-white border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                                        required
                                        value={currentAdminPassword}
                                        onChange={(e) => setCurrentAdminPassword(e.target.value)}
                                    />
                                </div>

                                <Button 
                                    type="submit" 
                                    disabled={isUpdatingAdmin}
                                    className="w-full h-11 text-white font-bold rounded-xl transition-all hover:shadow-md active:scale-[0.98]"
                                    style={{ background: "#003527" }}
                                >
                                    {isUpdatingAdmin ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving Changes...</> : "Update Admin Access"}
                                </Button>
                            </div>

                            {adminStatus.message && (
                                <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium animate-in slide-in-from-top-2 ${
                                    adminStatus.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"
                                }`}>
                                    {adminStatus.type === "success" ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                                    {adminStatus.message}
                                </div>
                            )}
                        </form>
                    </CardContent>
                </Card>

                {/* 2. User Credential Management */}
                <Card className="border-0 shadow-lg shadow-emerald-900/5 overflow-hidden rounded-2xl">
                    <CardHeader className="border-b" style={{ background: "#f8faf9" }}>
                        <CardTitle className="text-lg flex items-center gap-2" style={{ color: "#0d1c18" }}>
                            <UserCheck className="w-5 h-5" style={{ color: "#003527" }} /> User Password Management
                        </CardTitle>
                        <CardDescription style={{ color: "#5a7068" }}>
                            Securely overwrite passwords for students and teachers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 pb-8 bg-white">
                        <form onSubmit={handleUserPasswordReset} className="space-y-6">
                            
                            {!selectedUser ? (
                                <div className="space-y-4">
                                    <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("student")}
                                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
                                                activeTab === 'student' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                            }`}
                                        >
                                            Students
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("teacher")}
                                            className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
                                                activeTab === 'teacher' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                            }`}
                                        >
                                            Teachers
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            type="text"
                                            className="pl-10 border-slate-200"
                                            placeholder={`Search registered ${activeTab}s...`}
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>

                                    <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100 max-h-[300px] overflow-y-auto">
                                        {isLoadingUsers ? (
                                            <div className="p-12 text-center">
                                                <Loader2 className="w-6 h-6 animate-spin text-emerald-600 mx-auto mb-2" />
                                                <p className="text-xs text-slate-500">Syncing with database...</p>
                                            </div>
                                        ) : filteredUsers.length > 0 ? (
                                            filteredUsers.map(user => (
                                                <div key={user.id} 
                                                    onClick={() => setSelectedUser(user)}
                                                    className="p-4 hover:bg-slate-50 cursor-pointer flex justify-between items-center group transition-colors">
                                                    <div>
                                                        <div className="font-bold text-sm text-slate-800">{user.name}</div>
                                                        <div className="text-xs text-slate-500">{user.email}</div>
                                                    </div>
                                                    <KeyRound className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-8 text-center text-sm text-slate-400">No matching accounts found.</div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-5 animate-in slide-in-from-right-4 duration-300">
                                    <div className="flex items-center justify-between p-4 rounded-xl border border-emerald-100 bg-emerald-50/50">
                                        <div className="min-w-0">
                                            <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-1">Resetting Password For</p>
                                            <p className="font-bold text-slate-900 truncate">{selectedUser.name}</p>
                                            <p className="text-xs text-slate-500 truncate">{selectedUser.email}</p>
                                        </div>
                                        <Button type="button" variant="ghost" size="sm" 
                                            onClick={() => setSelectedUser(null)}
                                            className="text-emerald-700 hover:bg-emerald-100">
                                            Change
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-slate-700 font-semibold">New User Password</Label>
                                        <Input 
                                            type="text" 
                                            placeholder="Enter strong new password"
                                            className="border-slate-200"
                                            required
                                            value={newUserPassword}
                                            onChange={(e) => setNewUserPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-slate-700 font-semibold">Confirm Admin Identity</Label>
                                        <Input 
                                            type="password" 
                                            placeholder="Type YOUR password to authorize"
                                            className="border-slate-200"
                                            required
                                            value={adminAuthPassword}
                                            onChange={(e) => setAdminAuthPassword(e.target.value)}
                                        />
                                    </div>

                                    <Button 
                                        disabled={isUpdatingUser}
                                        type="submit" 
                                        className="w-full h-11 text-white font-bold rounded-xl"
                                        style={{ background: "#003527" }}
                                    >
                                        {isUpdatingUser ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <KeyRound className="w-4 h-4 mr-2" />}
                                        Override User Password
                                    </Button>
                                </div>
                            )}

                            {userStatus.message && (
                                <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium animate-in slide-in-from-bottom-2 ${
                                    userStatus.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"
                                }`}>
                                    {userStatus.type === "success" ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                                    {userStatus.message}
                                </div>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
