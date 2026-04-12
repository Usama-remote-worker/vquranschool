import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";

// ONE-TIME USE: Creates the initial admin account.
// DELETE or DISABLE this route after first use for security.
export async function GET() {
    const name = "Admin";
    const email = "admin@vquranschool.com";
    const password = "Admin@vqs2024!";
    const role = "admin";

    try {
        // Check if already exists
        const { rows: existing } = await sql`
            SELECT id FROM Users WHERE LOWER(email) = ${email.toLowerCase()} LIMIT 1
        `;

        if (existing.length > 0) {
            return NextResponse.json({
                message: "Admin account already exists.",
                email,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await sql`
            INSERT INTO Users (name, email, password, role)
            VALUES (${name}, ${email}, ${hashedPassword}, ${role})
        `;

        return NextResponse.json({
            success: true,
            message: "✅ Admin account created successfully! Delete this route now.",
            credentials: {
                email,
                password,
            },
        });
    } catch (error: any) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
