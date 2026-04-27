import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret });
    const { pathname } = req.nextUrl;

    // --- Route: /admin-portal (the admin login page) ---
    // If already logged in as admin, redirect directly to dashboard
    if (pathname === "/admin-portal") {
        if (token?.role === "admin") {
            return NextResponse.redirect(new URL("/dashboard/admin", req.url));
        }
        return NextResponse.next();
    }

    // --- Protected Routes: Any /dashboard/* or /api/admin/* ---
    const isProtectedRoute =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/api/admin");

    if (isProtectedRoute) {
        // Not logged in at all → redirect to login
        if (!token) {
            const loginUrl = new URL("/login", req.url);
            loginUrl.searchParams.set("callbackUrl", req.url);
            return NextResponse.redirect(loginUrl);
        }

        const role = token.role as string;

        // --- Role-based sub-route enforcement ---
        if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
            // Non-admins trying to access admin dashboard
            return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
        }

        if (pathname.startsWith("/dashboard/teacher") && role !== "teacher") {
            return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
        }

        if (pathname.startsWith("/dashboard/student") && role !== "student") {
            return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
        }

        // --- API: Admin-only endpoints ---
        if (pathname.startsWith("/api/admin") && role !== "admin") {
            return NextResponse.json(
                { error: "Forbidden: Admins only." },
                { status: 403 }
            );
        }
    }

    return NextResponse.next();
}

// Matcher: apply middleware ONLY to these routes for optimal performance
export const config = {
    matcher: [
        "/admin-portal",
        "/dashboard/:path*",
        "/api/admin/:path*",
    ],
};
