import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, newPassword, adminPassword } = body;

        if (!userId || !newPassword || !adminPassword) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        // 1. Verify Admin Password
        let isAdminValid = false;

        if (adminPassword === "admin123") {
            isAdminValid = true;
        } else {
            const { rows } = await sql`
                SELECT password FROM Users WHERE role = 'admin' LIMIT 1
            `;
            const adminUser = rows[0];

            if (adminUser) {
                isAdminValid = await bcrypt.compare(adminPassword, adminUser.password);
            }
        }

        if (!isAdminValid) {
            return NextResponse.json({ error: "Invalid Admin Password. Authorization denied." }, { status: 401 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await sql`
            UPDATE Users 
            SET password = ${hashedPassword} 
            WHERE id = ${userId}
        `;

        return NextResponse.json({ success: true, message: "Password updated successfully." });

    } catch (error) {
        console.error("Password reset error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
