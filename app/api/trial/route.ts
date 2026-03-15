import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, country, whatsapp, course, teacher, time } = body;

        if (!name || !email || !course || !whatsapp) {
            return NextResponse.json({ error: 'Missing critical booking information fields (name, email, course, whatsapp).' }, { status: 400 });
        }

        // Insert a new TrialBooking record using Vercel Postgres
        const { rows } = await sql`
            INSERT INTO TrialBookings (name, email, country, whatsapp, course, teacher, preferred_time)
            VALUES (${name}, ${email}, ${country}, ${whatsapp}, ${course}, ${teacher}, ${time})
            RETURNING id
        `;

        if (rows.length === 0) {
            throw new Error('Failed to create trial booking');
        }

        return NextResponse.json(
            { message: 'Trial booking successfully submitted', bookingId: rows[0].id },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Trial Booking Exception: ", error);
        return NextResponse.json(
            { error: error.message || 'Internal server error processing trial request' },
            { status: 500 }
        );
    }
}
