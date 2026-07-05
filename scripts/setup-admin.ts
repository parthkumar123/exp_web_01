/**
 * Bootstrap the admin allowlist (one-time / occasional use).
 *
 * Auth is Google OAuth (Auth.js). The `Admin` collection IS the allowlist:
 * a Google account can sign in only if a document with its email exists here.
 * Day-to-day admin management happens in the UI at /admin/admins — this
 * script only exists to seed the FIRST superadmin.
 *
 * Usage:
 *   ADMIN_EMAILS="you@gmail.com" ADMIN_SUPERADMIN_EMAIL="you@gmail.com" npm run setup-admin
 *
 * Re-running is safe — existing entries are left in place (upsert).
 */

import mongoose from "mongoose";
import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(process.cwd(), ".env.local") });
config({ path: path.resolve(process.cwd(), ".env") });

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: { type: String, enum: ["admin", "superadmin"], default: "admin" },
    name: String,
    image: String,
    lastLogin: Date,
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function setupAdmin() {
  try {
    console.log("🚀 Seeding admin allowlist...");

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI not found in environment variables");
    }

    const emails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    if (emails.length === 0) {
      throw new Error(
        'No emails provided. Set ADMIN_EMAILS="a@x.com,b@x.com" before running.'
      );
    }

    const superadmin = (process.env.ADMIN_SUPERADMIN_EMAIL || "")
      .trim()
      .toLowerCase();

    console.log("📡 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    for (const email of emails) {
      const role = email === superadmin ? "superadmin" : "admin";
      const result = await Admin.updateOne(
        { email },
        { $setOnInsert: { email, role } },
        { upsert: true }
      );
      const action = result.upsertedCount ? "added" : "already present";
      console.log(`   • ${email} (${role}) — ${action}`);
    }

    console.log("\n✅ Allowlist updated. These emails can now sign in with Google.");
    console.log("   Login URL: /admin/login");
  } catch (error) {
    console.error("❌ Setup failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\n👋 Disconnected from MongoDB");
  }
}

setupAdmin();
