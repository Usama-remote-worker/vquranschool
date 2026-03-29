import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// PATCH - Update trial status (e.g., mark as contacted, assign teacher)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any)?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { id } = params;
        const body = await req.json();
        const { status, assigned_teacher } = body;

        const validStatuses = ['new', 'contacted', 'assigned', 'completed', 'cancelled'];
        if (status && !validStatuses.includes(status)) {
            return NextResponse.json({ error: 'Invalid status value.' }, { status: 400 });
        }

        let result;
        if (assigned_teacher !== undefined && status) {
            result = await sql`
                UPDATE TrialBookings
                SET status = ${status}, teacher = ${assigned_teacher}
                WHERE id = ${id}
                RETURNING *
            `;
        } else if (assigned_teacher !== undefined) {
            result = await sql`
                UPDATE TrialBookings
                SET teacher = ${assigned_teacher}
                WHERE id = ${id}
                RETURNING *
            `;
        } else if (status) {
            result = await sql`
                UPDATE TrialBookings
                SET status = ${status}
                WHERE id = ${id}
                RETURNING *
            `;
        } else {
            return NextResponse.json({ error: 'No update fields provided.' }, { status: 400 });
        }

        if (result.rows.length === 0) {
            return NextResponse.json({ error: 'Trial booking not found.' }, { status: 404 });
        }

        return NextResponse.json({ trial: result.rows[0] });
    } catch (error: any) {
        console.error('Error updating trial:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}

// DELETE - Remove a trial booking
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any)?.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { id } = params;
        const { rowCount } = await sql`DELETE FROM TrialBookings WHERE id = ${id}`;

        if (rowCount === 0) {
            return NextResponse.json({ error: 'Trial booking not found.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Trial booking deleted.' });
    } catch (error: any) {
        console.error('Error deleting trial:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
