/**
 * Seed Script: Creates the initial admin user in Vercel Postgres.
 * 
 * Usage:
 *   1. Set POSTGRES_URL in your .env.local
 *   2. Change ADMIN_EMAIL and ADMIN_PASSWORD below (use a strong password!)
 *   3. Run: npx ts-node scripts/seed-admin.ts
 */

import { createClient } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const ADMIN_EMAIL = "admin@vquranschool.com";
const ADMIN_NAME = "Academy Admin";
// ⚠️ CHANGE THIS to a strong password before running!
const ADMIN_PASSWORD = "CHANGE_ME_NOW_123!";

async function seedAdmin() {
    const client = createClient();
    await client.connect();

    try {
        // Check if admin already exists
        const { rows } = await client.query(
            "SELECT id FROM Users WHERE email = $1 AND role = 'admin' LIMIT 1",
            [ADMIN_EMAIL.toLowerCase()]
        );

        if (rows.length > 0) {
            console.log("⚠️  Admin user already exists. Skipping seed.");
            return;
        }

        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

        await client.query(
            `INSERT INTO Users (name, email, password, role)
             VALUES ($1, $2, $3, 'admin')`,
            [ADMIN_NAME, ADMIN_EMAIL.toLowerCase(), hashedPassword]
        );

        console.log("✅ Admin user created successfully!");
        console.log(`   Email: ${ADMIN_EMAIL}`);
        console.log(`   Login at: /admin-portal`);
        console.warn("⚠️  Delete this script or change the password after running!");
    } catch (error) {
        console.error("❌ Failed to seed admin:", error);
    } finally {
        await client.end();
    }
}

seedAdmin();
