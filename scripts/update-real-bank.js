const { sql } = require("@vercel/postgres");
require("dotenv").config({ path: ".env.local" });

async function updateBankDetails() {
    try {
        const bankDetails = JSON.stringify({
            bank: "Meezan Bank",
            account_name: "Usama Aimen",
            account_number: "00300112681190",
            iban: "PK02MEZN0000300112681190",
            swift: "MEZN PK KA"
        });

        console.log("Updating bank details in SystemSettings...");
        await sql`
            INSERT INTO SystemSettings (key, value, updated_at)
            VALUES ('bank_details', ${bankDetails}, NOW())
            ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
        `;

        console.log("✅ Bank details updated successfully!");
    } catch (error) {
        console.error("Error updating bank details:", error);
    }
}

updateBankDetails();
