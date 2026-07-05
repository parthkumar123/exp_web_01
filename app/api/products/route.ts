import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Admin from "@/models/Admin";
import { revalidateProductPaths } from "@/lib/revalidate";
import { submitProductToIndexNow } from "@/lib/indexnow";
import { getSession } from "@/lib/auth";

// GET products. Without `page`/`limit` this returns the full (filtered) list —
// the shape public consumers rely on. With `page` and/or `limit` it returns a
// paginated slice plus a `pagination` block (used by the admin console, which
// must never fetch the whole catalog). Extra filters: `search` (name/slug/
// ingredient/CAS/category), `type`, and admin-only `status`.
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const slug = searchParams.get("slug");
    const featured = searchParams.get("featured");
    const includeInactive = searchParams.get("includeInactive");
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    const query: Record<string, unknown> = {};

    // Inactive (unpublished) products are admin-only — never leak them to
    // unauthenticated callers.
    let isAdmin = false;
    if (includeInactive === "true") {
      isAdmin = Boolean(await getSession());
    }
    if (!isAdmin) {
      query.isActive = true;
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (featured === "true") {
      query.isFeatured = true;
    }

    if (type && ["formulation", "technical", "solvent"].includes(type)) {
      // Legacy docs predate productType; they are formulations.
      query.productType = type === "formulation" ? { $in: ["formulation", null] } : type;
    }

    // Status filter (admin console): active | inactive | featured.
    if (isAdmin && status) {
      if (status === "active") query.isActive = true;
      else if (status === "inactive") query.isActive = false;
      else if (status === "featured") query.isFeatured = true;
    }

    if (search?.trim()) {
      const rx = new RegExp(
        search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );
      query.$or = [
        { name: rx },
        { slug: rx },
        { activeIngredient: rx },
        { casNumber: rx },
        { category: rx },
      ];
    }

    if (slug) {
      const product = await Product.findOne({ slug, isActive: true });
      if (!product) {
        return NextResponse.json(
          { success: false, error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: product });
    }

    const sortParam = searchParams.get("sort") ?? "";
    const sortField = ["name", "updatedAt", "createdAt"].includes(sortParam)
      ? sortParam
      : "createdAt";
    const sortDir = searchParams.get("dir") === "asc" ? 1 : -1;
    const sort: Record<string, 1 | -1> = { [sortField]: sortDir as 1 | -1 };

    // Paginated mode — opt-in via page/limit so existing callers are unchanged.
    if (pageParam !== null || limitParam !== null) {
      const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(limitParam ?? "10", 10) || 10));

      const [products, total] = await Promise.all([
        Product.find(query)
          .sort(sort)
          .skip((page - 1) * limit)
          .limit(limit),
        Product.countDocuments(query),
      ]);

      return NextResponse.json({
        success: true,
        data: products,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.max(1, Math.ceil(total / limit)),
        },
      });
    }

    const products = await Product.find(query).sort(sort);

    return NextResponse.json({ success: true, data: products });
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}

// POST - Create new product (authenticated admins only)
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();

    // Generate slug from name if not provided
    if (!body.slug && body.name) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    // Attribution is stamped server-side — client-sent values are ignored.
    // Prefer the editable console display name over the Google-token name.
    const adminDoc = await Admin.findOne({ email: session.email })
      .select("name")
      .lean();
    const actor = {
      name: adminDoc?.name || session.name || undefined,
      email: session.email,
    };
    body.createdBy = actor;
    body.updatedBy = actor;

    const product = await Product.create(body);

    revalidateProductPaths(product.slug);
    // Ping IndexNow so Bing/Yandex/etc. crawl the new page quickly. Fails soft.
    await submitProductToIndexNow(product.slug, product.productType);

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating product:", error);

    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { success: false, error: "Product with this slug already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create product",
      },
      { status: 500 }
    );
  }
}
