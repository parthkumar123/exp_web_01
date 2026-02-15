import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sitemap | Senso Agrotech",
  description:
    "Sitemap of Senso Agrotech website. Find all main pages and product categories.",
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

const productCategories = [
  { name: "Insecticides", href: "/products?category=Insecticides" },
  { name: "Fungicides", href: "/products?category=Fungicides" },
  { name: "Herbicides", href: "/products?category=Herbicides" },
  { name: "Plant Growth Regulators (PGR)", href: "/products?category=PGR" },
  { name: "Fertilizers", href: "/products?category=Fertilizers" },
  { name: "Biological", href: "/products?category=Biological" },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-emerald-900/30 to-zinc-900">
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
            All main pages and sections of our website
          </p>
        </div>
      </section>

      <section className="pb-20 relative">
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Main pages */}
            <div className="backdrop-blur-2xl bg-white/5 border border-emerald-500/20 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 border-b border-emerald-500/30 pb-2">
                Main
              </h2>
              <ul className="space-y-2">
                {mainPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="text-white/70 hover:text-emerald-400 transition-colors text-sm"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product categories */}
            <div className="backdrop-blur-2xl bg-white/5 border border-emerald-500/20 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 border-b border-emerald-500/30 pb-2">
                Product Categories
              </h2>
              <ul className="space-y-2">
                {productCategories.map((cat) => (
                  <li key={cat.href}>
                    <Link
                      href={cat.href}
                      className="text-white/70 hover:text-emerald-400 transition-colors text-sm"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="backdrop-blur-2xl bg-white/5 border border-emerald-500/20 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 border-b border-emerald-500/30 pb-2">
                Legal &amp; Info
              </h2>
              <ul className="space-y-2">
                {legalPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="text-white/70 hover:text-emerald-400 transition-colors text-sm"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

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
  );
}
