import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Admin from "@/models/Admin";

export const dynamic = "force-dynamic";

// Aggregate counts + recent edits for the console dashboard (admins only).
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const [total, active, featured, byType, byCategory, admins, recent] =
    await Promise.all([
      Product.countDocuments({}),
      Product.countDocuments({ isActive: true }),
      Product.countDocuments({ isFeatured: true }),
      Product.aggregate([{ $group: { _id: "$productType", count: { $sum: 1 } } }]),
      Product.aggregate([
        { $match: { category: { $exists: true, $ne: null } } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Admin.countDocuments({}),
      Product.find({})
        .sort({ updatedAt: -1 })
        .limit(6)
        .select(
          "name slug productType category image isActive isFeatured updatedAt updatedBy"
        )
        .lean(),
    ]);

  // Legacy docs may lack productType (null group) — fold them into
  // "formulation" by summing, never overwriting.
  const byTypeCounts: Record<string, number> = {};
  for (const t of byType) {
    const key = (t._id as string | null) ?? "formulation";
    byTypeCounts[key] = (byTypeCounts[key] ?? 0) + t.count;
  }

  return NextResponse.json({
    success: true,
    data: {
      products: {
        total,
        active,
        inactive: total - active,
        featured,
        byType: byTypeCounts,
        byCategory: byCategory.map((c) => ({ category: c._id, count: c.count })),
      },
      admins,
      recent,
    },
  });
}
