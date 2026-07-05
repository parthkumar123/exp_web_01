import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";

// List admins (any signed-in admin). Includes the caller's role/email so the
// UI can gate superadmin-only actions without an extra session round-trip.
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const admins = await Admin.find()
    .select("email role name lastLogin createdAt")
    .sort({ createdAt: 1 })
    .lean();

  return NextResponse.json({
    admins,
    currentEmail: session.email,
    currentRole: session.role,
  });
}

// Add an admin to the allowlist (superadmin only).
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "superadmin") {
    return NextResponse.json(
      { error: "Only a superadmin can manage admins" },
      { status: 403 }
    );
  }

  const body = await request.json();
  const email = String(body?.email ?? "")
    .trim()
    .toLowerCase();
  const role = body?.role === "superadmin" ? "superadmin" : "admin";

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required" },
      { status: 422 }
    );
  }

  try {
    await connectDB();
    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "That email is already an admin" },
        { status: 409 }
      );
    }

    const admin = await Admin.create({ email, role });
    return NextResponse.json({ success: true, admin }, { status: 201 });
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      return NextResponse.json(
        { error: "That email is already an admin" },
        { status: 409 }
      );
    }
    console.error("Add admin error:", error);
    return NextResponse.json({ error: "Failed to add admin" }, { status: 500 });
  }
}

// Remove an admin (superadmin only). Cannot remove yourself.
export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "superadmin") {
    return NextResponse.json(
      { error: "Only a superadmin can manage admins" },
      { status: 403 }
    );
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing admin id" }, { status: 422 });
  }

  await connectDB();
  const target = await Admin.findById(id);
  if (!target) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }
  if (target.email === session.email) {
    return NextResponse.json(
      { error: "You can't remove your own account" },
      { status: 400 }
    );
  }

  await Admin.deleteOne({ _id: id });
  return NextResponse.json({ success: true });
}
