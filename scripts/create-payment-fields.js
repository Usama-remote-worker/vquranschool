const { sql } = require('@vercel/postgres');

async function migrate() {
    try {
        require('dotenv').config({ path: '.env.local' });
        console.log("Connecting to Vercel Postgres...");
        
        await sql`ALTER TABLE Students ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'unpaid';`;
        console.log("Added payment_status");
        
        await sql`ALTER TABLE Students ADD COLUMN IF NOT EXISTS payment_receipt TEXT;`;
        console.log("Added payment_receipt");

        await sql`ALTER TABLE Students ADD COLUMN IF NOT EXISTS access_expires_at TIMESTAMP WITH TIME ZONE;`;
        console.log("Added access_expires_at");

        console.log("Migration completed.");
    } catch (e) {
        console.error("Migration failed:", e);
    }
}

migrate();
