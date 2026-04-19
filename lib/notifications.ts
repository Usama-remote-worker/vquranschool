/**
 * Notification Service
 * This utility handles sending alerts to the Admin via Email.
 */

export async function sendAdminNotification(type: 'student' | 'teacher' | 'trial', data: Record<string, string | null | undefined>) {
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "usamaaimen95@gmail.com";
    const apiKey = process.env.RESEND_API_KEY;
    
    const subject = `New ${type.toUpperCase()} Notification - vQuranSchool`;
    
    let message = "";
    if (type === 'trial') {
        message = `New Trial Booking Request!\n\nName: ${data.name}\nEmail: ${data.email}\nCourse: ${data.course}\nWhatsApp: ${data.whatsapp}\nCountry: ${data.country || "Not specified"}`;
    } else if (type === 'teacher') {
        message = `New Teacher Application!\n\nName: ${data.name}\nEmail: ${data.email}\nQualification: ${data.qualification}\nSpecialization: ${data.specialization}`;
    } else {
        message = `New Student Registration!\n\nName: ${data.name}\nEmail: ${data.email}\nCourse: ${data.course}`;
    }

    console.log("🔔 [Notification Triggered]:", subject);

    if (apiKey) {
        try {
            const res = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    // Note: Resend requires a verified domain to use custom addresses.
                    // 'onboarding@resend.dev' works for test accounts.
                    from: 'vQuranSchool Alerts <onboarding@resend.dev>',
                    to: [adminEmail],
                    subject: subject,
                    text: message,
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Resend API Error:", errorData);
            } else {
                console.log("✅ Email notification sent successfully to", adminEmail);
            }
        } catch (e) {
            console.error("Email notification network error:", e);
        }
    } else {
        console.warn("⚠️ RESEND_API_KEY is missing. No email sent.");
    }

    return true;
}
