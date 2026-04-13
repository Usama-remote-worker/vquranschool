import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Fetch only approved teachers from the database
        // We join Users and Teachers to get the name and profile details
        const result = await sql`
            SELECT 
                u.id, 
                u.name, 
                t.specialization, 
                t.qualification, 
                t.experience, 
                t.profile_photo, 
                t.status
            FROM Users u
            JOIN Teachers t ON u.id = t.user_id
            WHERE t.status = 'approved'
            ORDER BY u.created_at DESC;
        `;

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 });
    }
}
