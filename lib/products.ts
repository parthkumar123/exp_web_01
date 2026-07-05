/**
 * Server-side product data access.
 * Returns plain, serialisable objects so the data can be passed straight into
 * Client Components (Mongo ObjectId / Date are converted to primitives) and be
 * rendered in the initial HTML for SEO.
 */
import connectDB from "@/lib/mongodb";
import ProductModel, { type ProductType } from "@/models/Product";

/**
 * Formulations = everything that is NOT a technical or solvent. Using `$nin`
 * (rather than `productType: "formulation"`) is migration-safe: legacy docs that
 * predate the `productType` field still match, so `/products` never breaks even
 * before any backfill.
 */
const FORMULATION_FILTER = { productType: { $nin: ["technical", "solvent"] } };

export interface ProductListItem {
  _id: string;
  slug: string;
  name: string;
  productType: ProductType;
  category: string;
  image: string;
  description: string;
  activeIngredient: string;
  targetPests: string[];
  // B2B + price fields (optional; present for cards that show them)
  casNumber?: string;
  purity?: string;
  priceMin?: number | null;
  priceMax?: number | null;
  currency?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toListItem(p: any): ProductListItem {
  return {
    _id: String(p._id),
    slug: p.slug,
    name: p.name,
    productType: p.productType ?? "formulation",
    category: p.category ?? "",
    image: p.image,
    description: p.description ?? "",
    activeIngredient: p.activeIngredient ?? "",
    targetPests: Array.isArray(p.targetPests) ? p.targetPests : [],
    casNumber: p.casNumber ?? "",
    purity: p.purity ?? "",
    priceMin: p.priceMin ?? null,
    priceMax: p.priceMax ?? null,
    currency: p.currency ?? "INR",
  };
}

/** All active formulations, newest first. Returns [] on any error so callers/builds never crash. */
export async function getAllProducts(): Promise<ProductListItem[]> {
  try {
    await connectDB();
    const products = await ProductModel.find({ isActive: true, ...FORMULATION_FILTER })
      .sort({ createdAt: -1 })
      .lean();
    return products.map(toListItem);
  } catch (error) {
    console.error("getAllProducts failed:", error);
    return [];
  }
}

/** Active products of a single line (technical | solvent | formulation), newest first. */
export async function getProductsByType(
  type: ProductType
): Promise<ProductListItem[]> {
  try {
    await connectDB();
    const products = await ProductModel.find({ isActive: true, productType: type })
      .sort({ createdAt: -1 })
      .lean();
    return products.map(toListItem);
  } catch (error) {
    console.error(`getProductsByType(${type}) failed:`, error);
    return [];
  }
}

/** Full active product of a given line, by slug — for the B2B (technical/solvent) detail pages. */
export async function fetchB2BProductBySlug(
  slug: string,
  type: ProductType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any | null> {
  try {
    await connectDB();
    const product = await ProductModel.findOne({
      slug,
      isActive: true,
      productType: type,
    }).lean();
    return product ?? null;
  } catch (error) {
    console.error("fetchB2BProductBySlug failed:", error);
    return null;
  }
}

/** Featured active formulations (max `limit`), newest first. */
export async function getFeaturedProducts(limit = 3): Promise<ProductListItem[]> {
  try {
    await connectDB();
    const products = await ProductModel.find({
      isFeatured: true,
      isActive: true,
      ...FORMULATION_FILTER,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return products.map(toListItem);
  } catch (error) {
    console.error("getFeaturedProducts failed:", error);
    return [];
  }
}

export interface ProductLink {
  slug: string;
  name: string;
  category: string;
  updatedAt: Date | null;
}

/** Slug/name/category + last-modified for active formulations — used by the XML sitemap, static params and the HTML site-map. */
export async function getProductSlugs(): Promise<ProductLink[]> {
  return getSlugsForFilter({ isActive: true, ...FORMULATION_FILTER });
}

/** Slug/name/category + last-modified for a single line — used by the /technicals & /solvents routes and the HTML site-map. */
export async function getProductSlugsByType(
  type: ProductType
): Promise<ProductLink[]> {
  return getSlugsForFilter({ isActive: true, productType: type });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getSlugsForFilter(filter: any): Promise<ProductLink[]> {
  try {
    await connectDB();
    const products = await ProductModel.find(filter)
      .select("slug name category updatedAt")
      .sort({ name: 1 })
      .lean();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return products.map((p: any) => ({
      slug: p.slug,
      name: p.name ?? p.slug,
      category: p.category ?? "",
      updatedAt: p.updatedAt ? new Date(p.updatedAt) : null,
    }));
  } catch (error) {
    console.error("getSlugsForFilter failed:", error);
    return [];
  }
}
