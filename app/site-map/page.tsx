import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import PageBackgroundImage from "@/components/PageBackgroundImage";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/seo";
import { getProductSlugs, getProductSlugsByType, type ProductLink } from "@/lib/products";

// ISR: regenerated hourly and on product mutations (on-demand revalidation),
// same as the XML sitemap — the two stay in sync.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Sitemap of Senso Agrotech website. Find all main pages, product categories and every product, technical and solvent we offer.",
  alternates: { canonical: "/site-map" },
};

const mainPages = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

const legalPages = [
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Sitemap", href: "/site-map" },
];

const bulkLines = [
  { name: "Technicals (Raw Active Ingredients)", href: "/technicals" },
  { name: "Solvents (Bulk Industrial & Agro)", href: "/solvents" },
];

// Display order for formulation categories; unknown categories append at the end.
const CATEGORY_ORDER = [
  "Insecticides",
  "Fungicides",
  "Herbicides",
  "PGR",
  "Fertilizers",
  "Biological",
];

function groupByCategory(products: ProductLink[]): [string, ProductLink[]][] {
  const groups = new Map<string, ProductLink[]>();
  for (const p of products) {
    const key = p.category || "Other";
    const list = groups.get(key) ?? [];
    list.push(p);
    groups.set(key, list);
  }
  return [...groups.entries()].sort(([a], [b]) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    return (ia === -1 ? CATEGORY_ORDER.length : ia) - (ib === -1 ? CATEGORY_ORDER.length : ib);
  });
}

function LinkList({
  items,
  basePath,
}: {
  items: { slug: string; name: string }[];
  basePath: string;
}) {
  return (
    <ul className="space-y-2">
      {items.map((p) => (
        <li key={p.slug}>
          <Link
            href={`${basePath}/${p.slug}`}
            className="text-slate-200 hover:text-emerald-400 transition-colors text-sm"
          >
            {p.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function SitemapPage() {
  const [products, technicals, solvents] = await Promise.all([
    getProductSlugs(),
    getProductSlugsByType("technical"),
    getProductSlugsByType("solvent"),
  ]);
  const productGroups = groupByCategory(products);

  return (
    <div className="min-h-screen relative">
      <JsonLd data={buildBreadcrumbSchema([{ name: "Sitemap", path: "/site-map" }])} />
      <PageBackgroundImage imageOpacity={0.18} />
      <div className="relative z-10">
      <Navigation />

      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-radial from-emerald-500/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
          <div className="inline-block px-6 py-2 mb-8 backdrop-blur-xl bg-emerald-500/20 border border-emerald-500/40 rounded-full">
            <span className="text-sm font-medium text-emerald-300 tracking-[0.2em] uppercase">
              Navigation
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
            Sitemap
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-light">
            All pages, products and sections of our website
          </p>
        </div>
      </section>

      <section className="pb-20 relative">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Main pages */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">
                Main
              </h2>
              <ul className="space-y-2">
                {mainPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="text-slate-200 hover:text-emerald-400 transition-colors text-sm"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bulk & Export lines */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">
                Bulk &amp; Export Supply
              </h2>
              <ul className="space-y-2">
                {bulkLines.map((line) => (
                  <li key={line.href}>
                    <Link
                      href={line.href}
                      className="text-slate-200 hover:text-emerald-400 transition-colors text-sm"
                    >
                      {line.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">
                Legal &amp; Info
              </h2>
              <ul className="space-y-2">
                {legalPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="text-slate-200 hover:text-emerald-400 transition-colors text-sm"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* All products, grouped by category */}
          {productGroups.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-white mb-6">
                All Products
              </h2>
              <div className="grid md:grid-cols-3 gap-10">
                {productGroups.map(([category, items]) => (
                  <div
                    key={category}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">
                      <Link
                        href={`/products?category=${encodeURIComponent(category)}`}
                        className="hover:text-emerald-400 transition-colors"
                      >
                        {category}
                      </Link>
                    </h3>
                    <LinkList items={items} basePath="/products" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technicals & Solvents */}
          {(technicals.length > 0 || solvents.length > 0) && (
            <div className="mt-10 grid md:grid-cols-2 gap-10">
              {technicals.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">
                    <Link
                      href="/technicals"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      Technicals
                    </Link>
                  </h2>
                  <LinkList items={technicals} basePath="/technicals" />
                </div>
              )}
              {solvents.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">
                    <Link
                      href="/solvents"
                      className="hover:text-emerald-400 transition-colors"
                    >
                      Solvents
                    </Link>
                  </h2>
                  <LinkList items={solvents} basePath="/solvents" />
                </div>
              )}
            </div>
          )}

          <p className="mt-10 text-center text-white/50 text-sm">
            For an XML sitemap for search engines, visit{" "}
            <a
              href="/sitemap.xml"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              /sitemap.xml
            </a>
          </p>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}
