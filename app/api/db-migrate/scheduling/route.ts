import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
    try {
        // 1. Update Students table to include plan_frequency
        await sql`ALTER TABLE Students ADD COLUMN IF NOT EXISTS plan_frequency VARCHAR(10);`;
        
        // 2. Create ClassSchedules table
        await sql`
            CREATE TABLE IF NOT EXISTS ClassSchedules (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                student_id UUID NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
                day_of_week INTEGER NOT NULL, -- 0 (Sunday) to 6 (Saturday)
                start_time TIME NOT NULL,
                timezone VARCHAR(50) DEFAULT 'UTC',
                duration_minutes INTEGER DEFAULT 30,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `;
        
        return NextResponse.json({ 
            success: true, 
            message: "Scheduling tables created and Students table updated successfully." 
        });
    } catch (error: any) {
        console.error("Migration error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
