"use client";

import { useState, useEffect } from "react";
import VideoBackground from "@/components/VideoBackground";
import { DayNightToggle, DayNightProvider } from "@/components/DayNightToggle";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  description: string;
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const res = await fetch("/api/products?featured=true");
      const data = await res.json();
      if (data.success) {
        setFeaturedProducts(data.data.slice(0, 3)); // Show max 3 products
      }
    } catch (error) {
      console.error("Error fetching featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Insecticides: "emerald",
      Fungicides: "blue",
      Herbicides: "amber",
      PGR: "green",
      Fertilizers: "purple",
      Biological: "teal",
    };
    return colors[category] || "emerald";
  };

  return (
    <DayNightProvider>
      <div className="relative bg-gradient-to-br from-zinc-950 via-emerald-950/20 to-zinc-950">
        {/* Navigation */}
        <Navigation />

        {/* Custom cursor removed */}

        {/* Video Background Layer - Fixed */}
        <VideoBackground />

        {/* Scrollable Content - 4 Frame Story */}
        <div className="relative z-10 pointer-events-auto">
          {/* FRAME 01: HERO - Bio-Sphere */}
          <section
            id="frame-01"
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-radial from-emerald-500/5 via-transparent to-transparent" />

            <div className="text-center relative z-10 px-4 max-w-5xl mx-auto">
              <div className="inline-block px-6 py-2 mb-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full">
                <span className="text-sm font-medium text-white/70 tracking-[0.2em] uppercase">
                  Biotech Innovation
                </span>
              </div>

              <h1 className="text-7xl md:text-9xl font-extralight text-white mb-6 tracking-tight leading-[0.9]">
                Harvesting
                <br />
                <span className="font-light bg-gradient-to-r from-emerald-400 via-emerald-300 to-white bg-clip-text text-transparent">
                  Happiness
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/50 font-light max-w-3xl mx-auto">
                One of India's leading formulators of agrochemicals
              </p>

              <div className="flex flex-col items-center gap-8 mt-16">
                <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
                <div className="animate-bounce">
                  <svg
                    className="w-6 h-6 text-white/40"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* FRAME 02: HERITAGE - Manufacturing Unit */}
          <section
            id="frame-02"
            className="min-h-screen flex items-center justify-start relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/30 to-transparent" />

            <div className="relative z-10 px-8 md:px-16 max-w-2xl">
              <div className="inline-block px-4 py-1.5 mb-6 backdrop-blur-xl bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="text-xs font-medium text-emerald-300 tracking-[0.2em] uppercase">
                  Heritage
                </span>
              </div>

              <h2 className="text-6xl md:text-7xl font-extralight text-white mb-6 tracking-tight leading-[0.95]">
                A Decade of
                <br />
                <span className="font-light text-emerald-400">Protection</span>
              </h2>

              <div className="space-y-4 text-white/60 text-lg font-light leading-relaxed">
                <p>
                  From a small-scale unit to an{" "}
                  <span className="text-white/90 font-normal">
                    ISO 9001:2015 certified leader
                  </span>{" "}
                  in crop protection.
                </p>
                <p>
                  Our journey is defined by relentless innovation and an
                  unwavering commitment to quality.
                </p>
              </div>
            </div>
          </section>

          {/* FRAME 03: SOLUTIONS - Product Icons */}
          <section
            id="frame-03"
            className="min-h-screen flex items-center justify-end relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-zinc-950/50 to-transparent" />

            <div className="relative z-10 px-8 md:px-16 max-w-2xl text-right">
              <div className="inline-block px-4 py-1.5 mb-6 backdrop-blur-xl bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="text-xs font-medium text-emerald-300 tracking-[0.2em] uppercase">
                  Solutions
                </span>
              </div>

              <h2 className="text-6xl md:text-7xl font-extralight text-white mb-6 tracking-tight leading-[0.95]">
                Full-Spectrum
                <br />
                <span className="font-light text-emerald-400">Growth</span>
              </h2>

              <div className="space-y-4 text-white/60 text-lg font-light leading-relaxed">
                <p>
                  Supplying quality{" "}
                  <span className="text-white/90 font-normal">
                    Insecticides, Fungicides, and Herbicides
                  </span>{" "}
                  that help farmers increase yields.
                </p>
                <p>
                  Meeting global demand with precision-engineered crop
                  protection solutions.
                </p>
              </div>

              {/* Product badges */}
              <div className="flex flex-wrap gap-3 justify-end mt-8">
                <div className="px-4 py-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg">
                  <span className="text-sm text-white/80">Insecticides</span>
                </div>
                <div className="px-4 py-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg">
                  <span className="text-sm text-white/80">Fungicides</span>
                </div>
                <div className="px-4 py-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg">
                  <span className="text-sm text-white/80">Herbicides</span>
                </div>
                <div className="px-4 py-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg">
                  <span className="text-sm text-white/80">
                    Plant Growth Promoter
                  </span>
                </div>
                <div className="px-4 py-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg">
                  <span className="text-sm text-white/80">Biologicals</span>
                </div>
                <div className="px-4 py-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg">
                  <span className="text-sm text-white/80">Fertilizers</span>
                </div>
              </div>
            </div>
          </section>

          {/* FRAME 04: QUALITY - Microscopic View */}
          <section
            id="frame-04"
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 via-transparent to-transparent" />

            <div className="text-center relative z-10 px-4 max-w-4xl mx-auto">
              <div className="inline-block px-4 py-1.5 mb-6 backdrop-blur-xl bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="text-xs font-medium text-emerald-300 tracking-[0.2em] uppercase">
                  Quality Excellence
                </span>
              </div>

              <h2 className="text-6xl md:text-8xl font-extralight text-white mb-6 tracking-tight leading-[0.95]">
                Quality
                <br />
                <span className="font-light bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
                  Excellence
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto leading-relaxed">
                Focused on quality at every stage, from{" "}
                <span className="text-white/90">
                  raw material to finished product
                </span>
                .
              </p>

              <div className="mt-12 flex flex-col md:flex-row gap-8 justify-center items-center">
                <div className="text-center">
                  <div className="text-4xl font-light text-emerald-400 mb-2">
                    100%
                  </div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">
                    Quality Tested
                  </div>
                </div>
                <div className="hidden md:block w-px h-12 bg-white/10" />
                <div className="text-center">
                  <div className="text-4xl font-light text-emerald-400 mb-2">
                    ISO
                  </div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">
                    Certified
                  </div>
                </div>
                <div className="hidden md:block w-px h-12 bg-white/10" />
                <div className="text-center">
                  <div className="text-4xl font-light text-emerald-400 mb-2">
                    10+
                  </div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">
                    Years Excellence
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FRAME 05: VALUES - Mission & Vision (Predictive Cursor Target) */}
          <section
            id="frame-values"
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent" />

            <div className="relative z-10 px-8 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-1.5 mb-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full">
                  <span className="text-xs font-medium text-white/70 tracking-[0.2em] uppercase">
                    Our Values
                  </span>
                </div>

                <h2 className="text-6xl md:text-7xl font-extralight text-white mb-4 tracking-tight">
                  Guiding
                  <br />
                  <span className="font-light bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
                    Principles
                  </span>
                </h2>
              </div>

              {/* Values Grid - Heavy sections for haptic scroll */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Mission - Integrity */}
                <div
                  data-heavy="true"
                  className="group backdrop-blur-2xl bg-gradient-to-br from-emerald-500/5 to-white/5 border border-white/10 rounded-3xl p-8 md:p-12 hover:border-emerald-500/30 transition-all duration-500"
                >
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-3 px-4 py-2 backdrop-blur-xl bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="text-sm font-medium text-emerald-300 tracking-wider uppercase">
                        Mission
                      </span>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-light text-white mb-2">
                      Integrity
                    </h3>
                  </div>

                  <div className="space-y-4 text-white/60 text-base md:text-lg font-light leading-relaxed">
                    <p>
                      Our{" "}
                      <span className="text-white/90 font-normal">
                        Farmer First
                      </span>{" "}
                      strategy places agricultural communities at the heart of
                      everything we do.
                    </p>
                    <p>
                      We believe in building trust through transparent
                      practices, quality assurance, and genuine partnerships
                      that empower farmers to thrive.
                    </p>
                    <p className="text-emerald-400/80 font-normal">
                      Committed to delivering solutions with unwavering
                      integrity.
                    </p>
                  </div>
                </div>

                {/* Vision - Equality */}
                <div
                  data-heavy="true"
                  className="group backdrop-blur-2xl bg-gradient-to-br from-white/5 to-emerald-500/5 border border-white/10 rounded-3xl p-8 md:p-12 hover:border-emerald-500/30 transition-all duration-500"
                >
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-3 px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full mb-4">
                      <svg
                        className="w-4 h-4 text-white/80"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      <span className="text-sm font-medium text-white/70 tracking-wider uppercase">
                        Vision
                      </span>
                    </div>

                    <h3 className="text-4xl md:text-5xl font-light text-white mb-2">
                      Equality
                    </h3>
                  </div>

                  <div className="space-y-4 text-white/60 text-base md:text-lg font-light leading-relaxed">
                    <p>
                      Environmental protection is not optional—it's our{" "}
                      <span className="text-white/90 font-normal">
                        core responsibility
                      </span>
                      .
                    </p>
                    <p>
                      We envision a future where sustainable agrochemical
                      solutions create equality across ecosystems, ensuring that
                      progress never comes at the cost of our planet.
                    </p>
                    <p className="text-emerald-400/80 font-normal">
                      Balancing innovation with ecological harmony.
                    </p>
                  </div>
                </div>
              </div>

              {/* Environmental Commitment Badge */}
              <div className="mt-16 text-center">
                <div className="inline-flex items-center gap-4 px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full">
                  <svg
                    className="w-5 h-5 text-emerald-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-sm font-medium text-white/70">
                    Committed to Environmental Protection
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* FRAME 06: STATS & IMPACT */}
          <section
            id="frame-stats"
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-radial from-emerald-500/5 via-transparent to-transparent" />

            <div className="relative z-10 px-8 max-w-7xl mx-auto w-full">
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-1.5 mb-6 backdrop-blur-xl bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                  <span className="text-xs font-medium text-emerald-300 tracking-[0.2em] uppercase">
                    Our Impact
                  </span>
                </div>

                <h2 className="text-6xl md:text-7xl font-extralight text-white mb-4 tracking-tight">
                  Trusted by
                  <br />
                  <span className="font-light bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
                    Thousands
                  </span>
                </h2>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {/* Stat 1 */}
                <div className="backdrop-blur-2xl bg-gradient-to-br from-emerald-500/10 to-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-emerald-500/30 transition-all duration-500">
                  <div className="text-6xl md:text-7xl font-extralight text-emerald-400 mb-3">
                    110+
                  </div>
                  <div className="text-sm text-white/70 uppercase tracking-wider">
                    Products
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                    Premium crop protection solutions
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="backdrop-blur-2xl bg-gradient-to-br from-white/5 to-emerald-500/10 border border-white/10 rounded-3xl p-8 text-center hover:border-emerald-500/30 transition-all duration-500">
                  <div className="text-6xl md:text-7xl font-extralight text-emerald-400 mb-3">
                    10+
                  </div>
                  <div className="text-sm text-white/70 uppercase tracking-wider">
                    Years Experience
                  </div>
                  <p className="text-xs text-white/50 mt-2">
                    Manufacturing excellence
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="backdrop-blur-2xl bg-gradient-to-br from-emerald-500/10 to-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-emerald-500/30 transition-all duration-500">
                  <div className="text-6xl md:text-7xl font-extralight text-emerald-400 mb-3">
                    15K+
                  </div>
                  <div className="text-sm text-white/70 uppercase tracking-wider">
                    Happy Farmers
                  </div>
                  <p className="text-xs text-white/50 mt-2">Nationwide trust</p>
                </div>
              </div>

              {/* Growth Metrics */}
              <div className="backdrop-blur-2xl bg-gradient-to-br from-white/5 to-emerald-500/5 border border-white/10 rounded-3xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Growth Rate */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                        <svg
                          className="w-7 h-7 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-white/50 uppercase tracking-wider">
                          Growth Rate
                        </p>
                        <p className="text-3xl font-light text-white">
                          +35% YoY
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="space-y-4">
                    {/* Customer Satisfaction */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white/70">
                          Customer Satisfaction
                        </span>
                        <span className="text-sm text-emerald-400 font-medium">
                          98%
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                          style={{ width: "98%" }}
                        />
                      </div>
                    </div>

                    {/* Product Quality */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white/70">
                          Product Quality
                        </span>
                        <span className="text-sm text-emerald-400 font-medium">
                          99%
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                          style={{ width: "99%" }}
                        />
                      </div>
                    </div>

                    {/* Market Reach */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-white/70">
                          Market Reach
                        </span>
                        <span className="text-sm text-emerald-400 font-medium">
                          95%
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                          style={{ width: "95%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FRAME 07: FEATURED PRODUCTS */}
          <section
            id="frame-products"
            className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
          >
            <div className="relative z-10 px-8 max-w-7xl mx-auto w-full">
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-1.5 mb-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full">
                  <span className="text-xs font-medium text-white/70 tracking-[0.2em] uppercase">
                    Featured Products
                  </span>
                </div>

                <h2 className="text-6xl md:text-7xl font-extralight text-white mb-4 tracking-tight">
                  Premium Range
                </h2>
                <p className="text-lg text-white/60 font-light max-w-2xl mx-auto">
                  Discover our premium range of crop protection solutions,
                  engineered for maximum efficacy
                </p>
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                  <p className="mt-4 text-white/60">
                    Loading featured products...
                  </p>
                </div>
              ) : featuredProducts.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-8">
                  {featuredProducts.map((product) => {
                    const color = getCategoryColor(product.category);
                    return (
                      <Link
                        key={product._id}
                        href={`/products/${product.slug}`}
                        className="group backdrop-blur-2xl bg-gradient-to-br from-white/5 to-emerald-500/5 border border-white/10 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500 hover:scale-105"
                      >
                        <div
                          className={`h-48 bg-gradient-to-br from-${color}-600/20 to-${color}-800/20 flex items-center justify-center relative overflow-hidden`}
                        >
                          <div
                            className={`absolute top-4 right-4 px-3 py-1 bg-${color}-500/20 backdrop-blur-xl border border-${color}-500/30 rounded-full`}
                          >
                            <span
                              className={`text-xs text-${color}-300 font-medium`}
                            >
                              {product.category}
                            </span>
                          </div>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-6"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder-product.png";
                            }}
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-light text-white mb-2">
                            {product.name}
                          </h3>
                          <p className="text-sm text-white/60 leading-relaxed line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-white/60 text-lg">
                    No featured products available at the moment.
                  </p>
                  <Link
                    href="/products"
                    className="inline-block mt-6 px-6 py-3 bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 text-emerald-300 font-medium rounded-lg hover:bg-emerald-500/30 transition-colors"
                  >
                    View All Products
                  </Link>
                </div>
              )}

              {/* View All Products Button */}
              {featuredProducts.length > 0 && (
                <div className="text-center mt-12">
                  <Link
                    href="/products"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-xl border border-emerald-500/30 text-white font-medium rounded-xl hover:from-emerald-500/30 hover:to-blue-500/30 transition-all duration-300"
                  >
                    View All Products →
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section
            id="frame-cta"
            className="min-h-[60vh] flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-emerald-950/50 to-emerald-950/30" />

            <div className="relative z-10 px-8 max-w-4xl mx-auto text-center">
              <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
                Ready to Transform
                <br />
                <span className="font-light bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
                  Your Farming?
                </span>
              </h2>

              <p className="text-lg text-white/60 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
                Join thousands of satisfied farmers who trust Senso Agrotech for
                their crop protection needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 flex items-center gap-2"
                >
                  Get in Touch
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="/products"
                  className="px-8 py-4 backdrop-blur-xl bg-white/5 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                >
                  View Catalogue
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </DayNightProvider>
  );
}
