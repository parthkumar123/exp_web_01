/**
 * One-off backfill: stamp createdBy/updatedBy on products that predate
 * attribution tracking. New writes are stamped automatically by the API
 * routes; this only fills history so the console never shows blanks.
 *
 * Usage:
 *   BACKFILL_NAME="Parth Shiyani" BACKFILL_EMAIL="you@gmail.com" npm run backfill-authors
 *
 * Re-running is safe — only documents missing attribution are touched.
 */

import mongoose from "mongoose";
import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(process.cwd(), ".env.local") });
config({ path: path.resolve(process.cwd(), ".env") });

async function backfill() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error("MONGODB_URI not found in environment variables");

    const name = (process.env.BACKFILL_NAME || "").trim();
    const email = (process.env.BACKFILL_EMAIL || "").trim().toLowerCase();
    if (!name || !email) {
      throw new Error(
        'Set BACKFILL_NAME="Your Name" and BACKFILL_EMAIL="you@x.com" before running.'
      );
    }

    console.log("📡 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected");

    const actor = { name, email };
    const products = mongoose.connection.collection("products");

    const created = await products.updateMany(
      { "createdBy.email": { $exists: false } },
      { $set: { createdBy: actor } }
    );
    const updated = await products.updateMany(
      { "updatedBy.email": { $exists: false } },
      { $set: { updatedBy: actor } }
    );

    console.log(`✅ createdBy backfilled on ${created.modifiedCount} product(s)`);
    console.log(`✅ updatedBy backfilled on ${updated.modifiedCount} product(s)`);
  } catch (error) {
    console.error("❌ Backfill failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("👋 Disconnected");
  }
}

backfill();
