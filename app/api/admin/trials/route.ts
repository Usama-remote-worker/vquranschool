import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET - Fetch all trial bookings
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any)?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { rows: trials } = await sql`
            SELECT
                id,
                name,
                email,
                country,
                whatsapp,
                course,
                teacher,
                preferred_time,
                status,
                created_at
            FROM TrialBookings
            ORDER BY created_at DESC
        `;

        return NextResponse.json({ trials });
    } catch (error: any) {
        console.error('Error fetching trials:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
