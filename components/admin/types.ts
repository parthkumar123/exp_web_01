/** Product shape as returned by /api/products for the admin console. */
export interface AdminProduct {
  _id: string;
  name: string;
  slug: string;
  productType: "formulation" | "technical" | "solvent";
  category?: string;
  image: string;
  description: string;
  activeIngredient?: string;
  casNumber?: string;
  priceMin?: number | null;
  priceMax?: number | null;
  currency?: string;
  isActive: boolean;
  isFeatured: boolean;
  createdBy?: { name?: string; email?: string };
  updatedBy?: { name?: string; email?: string };
  createdAt?: string;
  updatedAt?: string;
}

/** Public detail path for a product — mirrors the sitemap/IndexNow routing. */
export function productPublicPath(p: Pick<AdminProduct, "slug" | "productType">): string {
  const base =
    p.productType === "technical"
      ? "/technicals"
      : p.productType === "solvent"
        ? "/solvents"
        : "/products";
  return `${base}/${p.slug}`;
}

export const PRODUCT_CATEGORIES = [
  "Insecticides",
  "Fungicides",
  "Herbicides",
  "PGR",
  "Fertilizers",
  "Biological",
] as const;

export const PRODUCT_TYPE_LABELS: Record<AdminProduct["productType"], string> = {
  formulation: "Formulation",
  technical: "Technical",
  solvent: "Solvent",
};
