"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRedirect() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated" && session?.user) {
            const role = (session.user as any).role;
            if (role === "admin") router.push("/dashboard/admin");
            else if (role === "teacher") router.push("/dashboard/teacher");
            else router.push("/dashboard/student");
        }
    }, [session, status, router]);

    return (
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );
}
