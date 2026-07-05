import { revalidatePath } from "next/cache";

/**
 * Refresh every cached page that renders product data, after a product is
 * created, updated or deleted in the admin. Server-only (uses next/cache);
 * call from Route Handlers / Server Actions.
 */
export function revalidateProductPaths(slug?: string) {
  revalidatePath("/"); // homepage featured products
  revalidatePath("/products"); // formulations listing
  revalidatePath("/technicals"); // technicals listing
  revalidatePath("/solvents"); // solvents listing
  revalidatePath("/sitemap.xml"); // XML sitemap
  revalidatePath("/site-map"); // HTML sitemap (links every product)
  if (slug) {
    // Slugs are globally unique, so only one of these detail pages actually
    // exists; revalidating the others is a harmless no-op. This keeps the API
    // route from needing to know the product's type.
    revalidatePath(`/products/${slug}`);
    revalidatePath(`/technicals/${slug}`);
    revalidatePath(`/solvents/${slug}`);
  }
}
