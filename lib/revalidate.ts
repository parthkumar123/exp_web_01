import { revalidatePath } from "next/cache";

/**
 * Refresh every cached page that renders product data, after a product is
 * created, updated or deleted in the admin. Server-only (uses next/cache);
 * call from Route Handlers / Server Actions.
 */
export function revalidateProductPaths(slug?: string) {
  revalidatePath("/"); // homepage featured products
  revalidatePath("/products"); // catalogue listing
  revalidatePath("/sitemap.xml"); // XML sitemap
  if (slug) revalidatePath(`/products/${slug}`); // the product detail page
}
