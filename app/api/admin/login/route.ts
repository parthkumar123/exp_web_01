import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { success: false, error: "Admin password not configured" },
        { status: 500 }
      );
    }

    if (password === adminPassword) {
      // Generate a simple token (in production, use JWT)
      const token = crypto.randomBytes(32).toString("hex");
      
      return NextResponse.json({
        success: true,
        token,
        message: "Login successful",
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
