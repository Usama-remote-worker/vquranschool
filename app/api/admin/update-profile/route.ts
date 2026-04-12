import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any)?.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await request.json();
        const { newEmail, newPassword, currentPassword } = body;

        if (!currentPassword) {
            return NextResponse.json({ error: "Current password is required." }, { status: 400 });
        }

        const adminId = (session.user as any).id;
        const currentAdminEmail = session.user?.email;

        // 1. Verify Current Password
        let isPasswordValid = false;

        // Handling the temporary dev admin
        if (adminId === "admin-temp" || currentAdminEmail === "admin@vquranschool.com") {
            if (currentPassword === "admin123") {
                isPasswordValid = true;
            }
        }

        // If not the temp admin or temp check failed, check DB
        if (!isPasswordValid && adminId !== "admin-temp") {
            const { rows } = await sql`SELECT password FROM Users WHERE id = ${adminId} LIMIT 1`;
            if (rows[0]) {
                isPasswordValid = await bcrypt.compare(currentPassword, rows[0].password);
            }
        }

        if (!isPasswordValid) {
            return NextResponse.json({ error: "Incorrect current password." }, { status: 401 });
        }

        // 2. Perform Updates
        if (newEmail) {
            // Check if email taken
            const { rows: existing } = await sql`SELECT id FROM Users WHERE email = ${newEmail} AND id != ${adminId} LIMIT 1`;
            if (existing.length > 0) {
                return NextResponse.json({ error: "Email already in use." }, { status: 400 });
            }
            
            await sql`UPDATE Users SET email = ${newEmail} WHERE id = ${adminId}`;
        }

        if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            await sql`UPDATE Users SET password = ${hashedPassword} WHERE id = ${adminId}`;
        }

        return NextResponse.json({ success: true, message: "Admin profile updated successfully." });

    } catch (error: any) {
        console.error("Admin profile update error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
