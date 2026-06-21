"use client";

import { useState, useMemo, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import PageBackgroundImage from "@/components/PageBackgroundImage";
import { ProductBadge, parseBadgeItems } from "@/components/ProductBadge";
import { cloudinaryAuto } from "@/lib/cloudinaryUrl";
import type { ProductListItem } from "@/lib/products";
import { formatPrice } from "@/lib/price";

const CATEGORIES = [
  { id: "All", name: "All Products", icon: "🌿" },
  { id: "Insecticides", name: "Insecticides", icon: "🛡️" },
  { id: "Fungicides", name: "Fungicides", icon: "🍄" },
  { id: "Herbicides", name: "Herbicides", icon: "🌾" },
  { id: "PGR", name: "PGR", icon: "🌱" },
  { id: "Fertilizers", name: "Fertilizers", icon: "♻️" },
  { id: "Biological", name: "Biological", icon: "🌐" },
];

export default function ProductsClient({
  products,
}: {
  products: ProductListItem[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Honor a ?category= deep link (from the footer / sitemap page). Read after
  // mount so the page stays statically rendered. Ignores unknown values.
  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get("category");
    if (cat && CATEGORIES.some((c) => c.id === cat)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: sync filter from URL once after mount, avoids a hydration mismatch on the initial render
      setActiveCategory(cat);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    const list =
      activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory);

    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.activeIngredient?.toLowerCase().includes(q) ||
        p.targetPests?.some((t) => t.toLowerCase().includes(q))
    );
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen relative">
      <PageBackgroundImage />
      <div className="relative z-10">
      <Navigation />

      {/* Hero - compact and focused */}
      <section className="relative pt-28 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_80%_80%_at_70%_20%,rgba(16,185,129,0.12),transparent)]" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Product catalogue
          </h1>
          <p className="mt-2 text-lg text-white/60 max-w-xl">
            Crop protection solutions for higher yields. Browse by category or search by name, ingredient, or target.
          </p>
        </div>
      </section>

      {/* Search + filters - inline with content, no black bar */}
      <section className="max-w-6xl mx-auto px-6 pt-4 pb-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1 sm:max-w-xs">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/50 transition-all backdrop-blur-sm"
              />
            </div>
            <p className="text-white/50 text-sm sm:ml-2">
              {searchQuery ? `${filteredProducts.length} result${filteredProducts.length !== 1 ? "s" : ""}` : `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div>
            <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Filter by category</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                      : "bg-white/10 text-white/90 border border-white/20 hover:bg-white/15 hover:border-emerald-500/30"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results count + grid */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-end mb-6">
          {filteredProducts.length > 0 ? (
            <Link
              href="/contact"
              className="text-sm font-medium text-emerald-300 hover:text-emerald-200 transition-colors"
            >
              Need help? Contact us →
            </Link>
          ) : null}
          {/* count in search section above */}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-4">
              🔍
            </div>
            <h2 className="text-xl font-medium text-white mb-2">No products found</h2>
            <p className="text-white/60 max-w-sm mx-auto mb-6">
              Try a different search term or category, or browse all products.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium hover:bg-emerald-500/30 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden hover:border-white/20 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
              >
                <div className="relative h-52 bg-white/[0.03] flex items-center justify-center p-6">
                  <img
                    src={cloudinaryAuto(product.image, 700)}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3">
                    <ProductBadge variant="category">{product.category}</ProductBadge>
                  </span>
                </div>
                <div className="p-5 bg-white/[0.04]">
                  <h3 className="font-semibold text-white text-lg leading-snug mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-slate-200 text-sm leading-relaxed line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {parseBadgeItems(product.activeIngredient).map((item, i) => (
                      <ProductBadge key={`ing-${i}`} variant="ingredient">
                        {item}
                      </ProductBadge>
                    ))}
                    {parseBadgeItems(product.targetPests).map((item, i) => (
                      <ProductBadge key={`pest-${i}`} variant="target">
                        {item}
                      </ProductBadge>
                    ))}
                  </div>
                  {formatPrice(product) && (
                    <p className="text-white font-semibold mb-3">
                      {formatPrice(product)}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    View product
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
      </div>
    </div>
  );
}
