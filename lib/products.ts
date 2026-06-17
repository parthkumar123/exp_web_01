/**
 * Server-side product data access.
 * Returns plain, serialisable objects so the data can be passed straight into
 * Client Components (Mongo ObjectId / Date are converted to primitives) and be
 * rendered in the initial HTML for SEO.
 */
import connectDB from "@/lib/mongodb";
import ProductModel from "@/models/Product";

export interface ProductListItem {
  _id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  activeIngredient: string;
  targetPests: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toListItem(p: any): ProductListItem {
  return {
    _id: String(p._id),
    slug: p.slug,
    name: p.name,
    category: p.category,
    image: p.image,
    description: p.description ?? "",
    activeIngredient: p.activeIngredient ?? "",
    targetPests: Array.isArray(p.targetPests) ? p.targetPests : [],
  };
}

/** All active products, newest first. Returns [] on any error so callers/builds never crash. */
export async function getAllProducts(): Promise<ProductListItem[]> {
  try {
    await connectDB();
    const products = await ProductModel.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();
    return products.map(toListItem);
  } catch (error) {
    console.error("getAllProducts failed:", error);
    return [];
  }
}

/** Featured active products (max `limit`), newest first. */
export async function getFeaturedProducts(limit = 3): Promise<ProductListItem[]> {
  try {
    await connectDB();
    const products = await ProductModel.find({ isFeatured: true, isActive: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return products.map(toListItem);
  } catch (error) {
    console.error("getFeaturedProducts failed:", error);
    return [];
  }
}

/** Slugs + last-modified for every active product — used by the XML sitemap. */
export async function getProductSlugs(): Promise<
  { slug: string; updatedAt: Date | null }[]
> {
  try {
    await connectDB();
    const products = await ProductModel.find({ isActive: true })
      .select("slug updatedAt")
      .lean();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return products.map((p: any) => ({
      slug: p.slug,
      updatedAt: p.updatedAt ? new Date(p.updatedAt) : null,
    }));
  } catch (error) {
    console.error("getProductSlugs failed:", error);
    return [];
  }
}
