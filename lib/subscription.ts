import { sql } from "@vercel/postgres";

export async function checkClassLimit(studentId: string) {
  try {
    // Get student's subscription and attendance for the current week
    const { rows: subRows } = await sql`
      SELECT classes_per_week, status, access_expires_at
      FROM Subscriptions
      WHERE student_id = ${studentId} AND status = 'active'
      LIMIT 1
    `;

    if (subRows.length === 0) {
      return { allowed: false, reason: "No active subscription found. Please subscribe to a plan to start classes." };
    }

    const sub = subRows[0];
    
    // Check if access has expired
    if (sub.access_expires_at && new Date(sub.access_expires_at) < new Date()) {
      return { allowed: false, reason: "Your access has expired. Please renew your subscription." };
    }

    // Get attendance count for current week (starting Monday)
    const { rows: attRows } = await sql`
      SELECT count(*) as count
      FROM Attendance
      WHERE student_id = ${studentId} 
      AND class_date >= date_trunc('week', now())
      AND status = 'completed'
    `;

    const completedCount = parseInt(attRows[0].count);
    const limit = sub.classes_per_week;

    if (completedCount >= limit) {
      return { 
        allowed: false, 
        reason: `You have reached your weekly limit of ${limit} classes. Please upgrade your plan for more classes.`,
        limitReached: true
      };
    }

    return { allowed: true, completedCount, limit };
  } catch (error) {
    console.error("Error checking class limit:", error);
    return { allowed: false, reason: "An error occurred while checking your class limit." };
  }
}
