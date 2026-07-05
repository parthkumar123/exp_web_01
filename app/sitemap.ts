import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getProductSlugs, getProductSlugsByType } from "@/lib/products";

// ISR: regenerated hourly and on product create/delete via on-demand revalidation.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes deliberately omit lastModified: stamping "now" on every
  // hourly regeneration marks them as always-just-changed, which erodes
  // Google's trust in the sitemap's dates. Product URLs use their real
  // updatedAt below, so those dates stay meaningful.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/products`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/technicals`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/solvents`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/site-map`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // These helpers already swallow errors and return [] so the build never
  // fails if the database is unreachable at build time.
  const [products, technicals, solvents] = await Promise.all([
    getProductSlugs(),
    getProductSlugsByType("technical"),
    getProductSlugsByType("solvent"),
  ]);

  const mk = (
    base: string,
    list: { slug: string; updatedAt: Date | null }[]
  ): MetadataRoute.Sitemap =>
    list.map((p) => ({
      url: `${SITE_URL}/${base}/${p.slug}`,
      ...(p.updatedAt ? { lastModified: p.updatedAt } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    ...staticRoutes,
    ...mk("products", products),
    ...mk("technicals", technicals),
    ...mk("solvents", solvents),
  ];
}
