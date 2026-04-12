import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { role, name, email, password, ...rest } = body;

        // Validate required fields
        if (!email || !password || !name || !role) {
            return NextResponse.json({ error: 'Missing required configuration fields' }, { status: 400 });
        }

        // Check if email already registered
        const { rows: existingUsers } = await sql`
            SELECT id FROM Users WHERE email = ${email} LIMIT 1
        `;

        if (existingUsers.length > 0) {
            return NextResponse.json({ error: 'Email is already registered' }, { status: 400 });
        }

        // Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create central user record
        const { rows: newUsers } = await sql`
            INSERT INTO Users (name, email, password, role)
            VALUES (${name}, ${email}, ${hashedPassword}, ${role})
            RETURNING id
        `;
        const user = newUsers[0];

        if (!user) {
            throw new Error('Failed to create user record');
        }

        // Process role-specific profiles
        if (role === 'student') {
            const { age, country, course, whatsapp } = rest;

            await sql`
                INSERT INTO Students (user_id, age, country, course, whatsapp, status)
                VALUES (${user.id}, ${parseInt(age) || null}, ${country}, ${course}, ${whatsapp}, 'pending')
            `;

        } else if (role === 'teacher') {
            const {
                experience,
                qualification,
                specialization,
                available_days,
                start_time,
                end_time,
                timezone,
                profile_photo
            } = rest;

            await sql`
                INSERT INTO Teachers (
                    user_id, experience, qualification, specialization, 
                    available_days, start_time, end_time, timezone, profile_photo, status
                ) VALUES (
                    ${user.id}, ${parseInt(experience) || 0}, ${qualification}, ${specialization},
                    ${available_days}, ${start_time}, ${end_time}, ${timezone}, ${profile_photo || null}, 'pending'
                )
            `;
        }

        // 3. Notify Admin
        try {
            const { sendAdminNotification } = await import('@/lib/notifications');
            await sendAdminNotification(role === 'teacher' ? 'teacher' : 'student', { name, email, ...rest });
        } catch (notifierError) {
            console.error("Admin notification failed, but registration succeeded:", notifierError);
        }

        return NextResponse.json(
            { message: 'Registration successful', userId: user.id },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Registration Exception: ", error);
        return NextResponse.json(
            { error: error.message || 'Internal server error processing registration' },
            { status: 500 }
        );
    }
}
