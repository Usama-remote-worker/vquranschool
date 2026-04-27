import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkClassLimit } from "@/lib/subscription";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "student") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await checkClassLimit(session.user.id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in class-check API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
