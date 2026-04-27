/**
 * WhatsApp Notification Utility — vQuranSchool
 *
 * Uses the CallMeBot free WhatsApp API for sending automated messages.
 * No Twilio account required for basic use.
 *
 * SETUP INSTRUCTIONS:
 * 1. Save +34 644 44 96 53 in your contacts as "CallMeBot"
 * 2. Send the message: "I allow callmebot to send me messages" to that number on WhatsApp
 * 3. You'll receive an API key — add it to your .env.local as CALLMEBOT_API_KEY
 *
 * For production/high-volume use, upgrade to Twilio WhatsApp API.
 *
 * Alternative: Use Twilio by adding:
 *   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM to .env.local
 */

const ADMIN_WHATSAPP = "923044296295"; // Admin number (receives all notifications)

/**
 * Send a WhatsApp message using CallMeBot API (free, no account required after setup)
 * Or Twilio if configured.
 */
export async function sendWhatsAppMessage(
  to: string,
  message: string
): Promise<boolean> {
  const callMeBotKey = process.env.CALLMEBOT_API_KEY;
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_WHATSAPP_FROM;

  // Option 1: Twilio (production-grade)
  if (twilioSid && twilioAuth && twilioFrom) {
    try {
      const body = new URLSearchParams({
        To: `whatsapp:+${to}`,
        From: `whatsapp:${twilioFrom}`,
        Body: message,
      });

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${Buffer.from(`${twilioSid}:${twilioAuth}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        }
      );
      return response.ok;
    } catch (error) {
      console.error("[WhatsApp] Twilio error:", error);
      return false;
    }
  }

  // Option 2: CallMeBot (free, dev/testing use)
  if (callMeBotKey) {
    try {
      const encodedMessage = encodeURIComponent(message);
      const url = `https://api.callmebot.com/whatsapp.php?phone=${to}&text=${encodedMessage}&apikey=${callMeBotKey}`;
      const response = await fetch(url);
      return response.ok;
    } catch (error) {
      console.error("[WhatsApp] CallMeBot error:", error);
      return false;
    }
  }

  // Fallback: Log the message (development mode)
  console.log(`[WhatsApp DEV] To: +${to}\nMessage: ${message}`);
  return false;
}

// ── Pre-built message templates ──────────────────────────────────────────────

export async function notifyTeacherApproved(
  teacherName: string,
  teacherWhatsapp: string
): Promise<void> {
  const message = `
🎉 *Assalamu Alaikum ${teacherName}!*

Your application at *vQuranSchool* has been *approved*! Welcome to our team of certified Quran tutors.

You can now log in to your Teacher Dashboard and start managing your student classes:
🔗 https://vquranschool.com/login

If you have any questions, please contact us anytime.

*JazakAllah Khair!*
– vQuranSchool Team
  `.trim();

  await sendWhatsAppMessage(teacherWhatsapp, message);
  // Also notify admin
  await sendWhatsAppMessage(ADMIN_WHATSAPP, `✅ Teacher *${teacherName}* has been approved and notified via WhatsApp.`);
}

export async function notifyTeacherRejected(
  teacherName: string,
  teacherWhatsapp: string
): Promise<void> {
  const message = `
Assalamu Alaikum ${teacherName},

Thank you for applying to vQuranSchool. After reviewing your application, we are unable to proceed at this time.

You are welcome to reapply in 3 months with updated credentials or experience.

For any queries, contact us at support@vquranschool.com or WhatsApp: +92 304 4296295.

JazakAllah Khair!
– vQuranSchool Team
  `.trim();

  await sendWhatsAppMessage(teacherWhatsapp, message);
}

export async function notifyStudentApproved(
  studentName: string,
  studentWhatsapp: string,
  courseEnrolled: string
): Promise<void> {
  const message = `
🎓 *Assalamu Alaikum ${studentName}!*

Great news! Your enrollment at *vQuranSchool* has been *approved*!

📚 Course: *${courseEnrolled}*

You can now log in to your Student Dashboard to:
• View your class schedule
• Connect with your assigned teacher
• Access course materials

🔗 Login: https://vquranschool.com/login

If you have any questions, WhatsApp us anytime at +92 304 4296295.

*JazakAllah Khair! May Allah bless your learning journey.* 🤲
– vQuranSchool Team
  `.trim();

  await sendWhatsAppMessage(studentWhatsapp, message);
  await sendWhatsAppMessage(ADMIN_WHATSAPP, `✅ Student *${studentName}* enrolled in *${courseEnrolled}* and notified via WhatsApp.`);
}

export async function notifyStudentRejected(
  studentName: string,
  studentWhatsapp: string
): Promise<void> {
  const message = `
Assalamu Alaikum ${studentName},

Thank you for your interest in vQuranSchool. After reviewing your application, we are unable to enroll you at this time.

Please feel free to contact us for clarification or to reapply:
📱 WhatsApp: +92 304 4296295
📧 Email: support@vquranschool.com

JazakAllah Khair!
– vQuranSchool Team
  `.trim();

  await sendWhatsAppMessage(studentWhatsapp, message);
}

export async function notifyPaymentApproved(
  studentName: string,
  studentWhatsapp: string,
  planName: string,
  expiryDate: string
): Promise<void> {
  const message = `
✅ *Payment Confirmed — vQuranSchool*

Assalamu Alaikum *${studentName}*!

Your payment has been verified and your *${planName}* subscription is now *active*.

📅 Access valid until: *${expiryDate}*

Log in to your dashboard to see your class schedule:
🔗 https://vquranschool.com/login

*JazakAllah Khair for choosing vQuranSchool!* 🎓
– vQuranSchool Team
  `.trim();

  await sendWhatsAppMessage(studentWhatsapp, message);
}

export async function notifyPaymentExpiringSoon(
  studentName: string,
  studentWhatsapp: string,
  expiryDate: string,
  paymentLink?: string
): Promise<void> {
  const link = paymentLink || "https://vquranschool.com/dashboard/student/payments";
  const message = `
⏰ *Payment Reminder — vQuranSchool*

Assalamu Alaikum *${studentName}*,

Your current subscription expires on *${expiryDate}*. Please renew to continue your Quran classes without interruption.

💳 Pay Securely via Card:
🔗 ${link}

🏦 Or view Bank Transfer details:
🔗 https://vquranschool.com/dashboard/student/payments

*JazakAllah Khair!*
– vQuranSchool Team
  `.trim();

  await sendWhatsAppMessage(studentWhatsapp, message);
}
