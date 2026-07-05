import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

export const dynamic = "force-dynamic";

// The signed-in admin's own record. The DB is the source of truth for the
// display name (editable below); the Google-token session only seeds it.
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const admin = await Admin.findOne({ email: session.email })
    .select("email role name image lastLogin createdAt")
    .lean();

  if (!admin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, admin });
}

// Update your own display name (used in the console and product attribution).
export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const name = String(body?.name ?? "").trim();
  if (!name || name.length > 80) {
    return NextResponse.json(
      { error: "Name must be between 1 and 80 characters" },
      { status: 422 }
    );
  }

  await connectDB();
  const admin = await Admin.findOneAndUpdate(
    { email: session.email },
    { name },
    { new: true }
  )
    .select("email role name image lastLogin createdAt")
    .lean();

  if (!admin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, admin });
}
