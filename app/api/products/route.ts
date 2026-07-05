import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { revalidateProductPaths } from "@/lib/revalidate";
import { submitProductToIndexNow } from "@/lib/indexnow";
import { getSession } from "@/lib/auth";

// GET all products or filter by category
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const slug = searchParams.get("slug");
    const featured = searchParams.get("featured");
    const includeInactive = searchParams.get("includeInactive");

    const query: Record<string, string | boolean> = {};

    // Only filter by isActive if not explicitly requesting inactive products.
    // Inactive (unpublished) products are admin-only — never leak them to
    // unauthenticated callers.
    if (includeInactive === "true") {
      const session = await getSession();
      if (!session) {
        query.isActive = true;
      }
    } else {
      query.isActive = true;
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (featured === "true") {
      query.isFeatured = true;
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

    const products = await Product.find(query).sort({ createdAt: -1 });

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
