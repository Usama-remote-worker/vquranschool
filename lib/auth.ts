import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const email = credentials.email.toLowerCase().trim();
                    const password = credentials.password.trim();

                    // Check for mock accounts first (useful for development/testing/demo)
                    if (email === "admin@quranacademy.com" && password === "admin123") {
                        return { id: "admin-1", name: "Admin User", email: "admin@quranacademy.com", role: "admin" };
                    }
                    if (email === "student@quranacademy.com" && password === "student123") {
                        return { id: "student-1", name: "Student User", email: "student@quranacademy.com", role: "student" };
                    }
                    if (email === "teacher@quranacademy.com" && password === "teacher123") {
                        return { id: "teacher-1", name: "Teacher User", email: "teacher@quranacademy.com", role: "teacher" };
                    }

                    // Fetch the user from Vercel Postgres if not a mock account
                    const { rows } = await sql`
                        SELECT * FROM Users WHERE LOWER(email) = ${email} LIMIT 1
                    `;
                    const user = rows[0];

                    if (!user) {
                        return null;
                    }

                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                    if (!isPasswordValid) {
                        return null;
                    }

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    };
                } catch (error) {
                    console.error("Auth DB Error:", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development",
};
