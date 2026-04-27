const { sql } = require("@vercel/postgres");

async function setupSystemSettings() {
    try {
        console.log("Creating SystemSettings table...");
        await sql`
            CREATE TABLE IF NOT EXISTS SystemSettings (
                key VARCHAR(50) PRIMARY KEY,
                value TEXT,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `;

        console.log("Seeding initial settings...");
        
        // Initial SadaBiz Link (Placeholder - User should update in Admin)
        await sql`
            INSERT INTO SystemSettings (key, value)
            VALUES ('sadabiz_link', 'https://sadapay.pk/u/usama')
            ON CONFLICT (key) DO NOTHING;
        `;

        // Initial Bank Details
        const bankDetails = JSON.stringify({
            bank: "Meezan Bank",
            account_name: "Usama Aimen",
            account_number: "00300112681190",
            iban: "PK02MEZN0000300112681190",
            swift: "MEZN PK KA"
        });
        await sql`
            INSERT INTO SystemSettings (key, value)
            VALUES ('bank_details', ${bankDetails})
            ON CONFLICT (key) DO NOTHING;
        `;

        // Initial Academy WhatsApp
        await sql`
            INSERT INTO SystemSettings (key, value)
            VALUES ('academy_whatsapp', '+923044296295')
            ON CONFLICT (key) DO NOTHING;
        `;

        console.log("✅ SystemSettings setup complete!");
    } catch (error) {
        console.error("Error setting up system settings:", error);
    }
}

setupSystemSettings();
