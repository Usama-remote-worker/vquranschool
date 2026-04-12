import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const proxy = withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // 0. Convenience Redirects
    if (path === "/admin") {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }
    
    if (path === "/dashboard") {
      const role = (token?.role as string) || "student";
      return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
    }

    // 1. If trying to access admin dashboard but not an admin
    if (path.startsWith("/dashboard/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/student", req.url));
    }

    // 2. If trying to access teacher dashboard but not a teacher
    if (path.startsWith("/dashboard/teacher") && token?.role !== "teacher") {
      return NextResponse.redirect(new URL("/dashboard/student", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default proxy;

export const config = {
  matcher: [
    "/admin",
    "/dashboard/:path*",
    // Add other protected routes here
  ],
};
