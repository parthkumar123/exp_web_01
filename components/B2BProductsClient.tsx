"use client";

import { useState, useMemo, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import PageBackgroundImage from "@/components/PageBackgroundImage";
import { ProductBadge } from "@/components/ProductBadge";
import { cloudinaryAuto } from "@/lib/cloudinaryUrl";
import { formatPrice } from "@/lib/price";
import type { ProductListItem } from "@/lib/products";

/**
 * Shared listing UI for the B2B lines (Technicals & Solvents). Cards surface
 * the spec-sheet essentials buyers scan for (CAS, purity, price/quote) rather
 * than the farmer-facing fields used on the formulations catalogue.
 */
export default function B2BProductsClient({
  products,
  lineLabel,
  lineDescription,
  basePath,
}: {
  products: ProductListItem[];
  lineLabel: string;
  lineDescription: string;
  basePath: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Category filter only appears when the line actually uses categories
  // (technicals do, by AI class; solvents typically don't).
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set).sort();
  }, [products]);

  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get("category");
    if (cat && categories.includes(cat)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync filter from URL once after mount
      setActiveCategory(cat);
    }
  }, [categories]);

  const filtered = useMemo(() => {
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
        p.casNumber?.toLowerCase().includes(q) ||
        p.purity?.toLowerCase().includes(q) ||
        p.activeIngredient?.toLowerCase().includes(q)
    );
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen relative">
      <PageBackgroundImage />
      <div className="relative z-10">
        <Navigation />

        {/* Hero */}
        <section className="relative pt-28 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-transparent to-transparent" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_80%_80%_at_70%_20%,rgba(16,185,129,0.12),transparent)]" />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <p className="text-emerald-300 text-sm font-medium tracking-[0.2em] uppercase mb-2">
              Bulk &amp; Export Supply
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
              {lineLabel}
            </h1>
            <p className="mt-2 text-lg text-white/60 max-w-2xl">{lineDescription}</p>
          </div>
        </section>

        {/* Search + optional category filter */}
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
                  placeholder={`Search ${lineLabel.toLowerCase()}, CAS, purity...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/50 transition-all backdrop-blur-sm"
                />
              </div>
              <p className="text-white/50 text-sm sm:ml-2">
                {filtered.length} item{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
            {categories.length > 0 && (
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-3">
                  Filter by category
                </p>
                <div className="flex flex-wrap gap-2">
                  {["All", ...categories].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        activeCategory === cat
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                          : "bg-white/10 text-white/90 border border-white/20 hover:bg-white/15 hover:border-emerald-500/30"
                      }`}
                    >
                      {cat === "All" ? "All" : cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Grid */}
        <section className="max-w-6xl mx-auto px-6 py-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-3xl mb-4">
                🔍
              </div>
              <h2 className="text-xl font-medium text-white mb-2">Nothing found</h2>
              <p className="text-white/60 max-w-sm mx-auto mb-6">
                Try a different search term, or contact us for the full range.
              </p>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium hover:bg-emerald-500/30 transition-colors"
              >
                Request a quote
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => {
                const price = formatPrice(product);
                return (
                  <Link
                    key={product._id}
                    href={`${basePath}/${product.slug}`}
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
                      {product.category && (
                        <span className="absolute top-3 right-3">
                          <ProductBadge variant="category">{product.category}</ProductBadge>
                        </span>
                      )}
                    </div>
                    <div className="p-5 bg-white/[0.04]">
                      <h3 className="font-semibold text-white text-lg leading-snug mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-slate-200 text-sm leading-relaxed line-clamp-2 mb-4">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.casNumber && (
                          <ProductBadge variant="ingredient">CAS {product.casNumber}</ProductBadge>
                        )}
                        {product.purity && (
                          <ProductBadge variant="target">{product.purity}</ProductBadge>
                        )}
                      </div>
                      <p className="font-semibold mb-3 text-white">
                        {price ?? <span className="text-slate-300 font-medium">Price on request</span>}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                        View details
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <Footer />
      </div>
    </div>
  );
}
