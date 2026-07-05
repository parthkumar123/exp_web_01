import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

// Verify the effective Cloudinary credentials (console or env fallback) by
// pinging the Cloudinary Admin API.
export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cloudinary = await getCloudinary();
    await cloudinary.api.ping();
    return NextResponse.json({ success: true });
  } catch (error) {
    // Cloudinary SDK failures are plain objects ({ error: { message } }),
    // not Error instances — handle both shapes.
    const message =
      (error as { error?: { message?: string } })?.error?.message ??
      (error instanceof Error ? error.message : "Connection test failed");
    return NextResponse.json({ success: false, error: message }, { status: 502 });
  }
}
