import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { revalidateProductPaths } from "@/lib/revalidate";
import { submitProductToIndexNow } from "@/lib/indexnow";
import { getSession } from "@/lib/auth";

// GET single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: unknown) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch product",
      },
      { status: 500 }
    );
  }
}

// PUT - Update product (authenticated admins only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { id } = await params;

    const product = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    revalidateProductPaths(product.slug);
    // Ping IndexNow so the edited page is recrawled quickly. Fails soft.
    await submitProductToIndexNow(product.slug, product.productType);

    return NextResponse.json({ success: true, data: product });
  } catch (error: unknown) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to update product",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete product (authenticated admins only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    revalidateProductPaths(product.slug);
    // Submitting the now-deleted URL prompts a recrawl that de-indexes it
    // (engines hit a 404 and drop the page), and refreshes the listings.
    await submitProductToIndexNow(product.slug, product.productType);

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete product",
      },
      { status: 500 }
    );
  }
}
