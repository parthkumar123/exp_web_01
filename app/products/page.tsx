"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Product {
  _id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  activeIngredient: string;
  targetPests: string[];
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [activeCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url =
        activeCategory === "All"
          ? "/api/products"
          : `/api/products?category=${activeCategory}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "All", name: "All", icon: "🌿" },
    { id: "Insecticides", name: "Insecticides", icon: "🛡️" },
    { id: "Fungicides", name: "Fungicides", icon: "🍄" },
    { id: "Herbicides", name: "Herbicides", icon: "🌾" },
    { id: "PGR", name: "Plant Growth Regulators", icon: "🌱" },
    { id: "Fertilizers", name: "Fertilizers", icon: "♻️" },
    { id: "Biological", name: "Biological", icon: "🌱" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-emerald-900/30 to-zinc-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-radial from-emerald-500/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
          <div className="inline-block px-6 py-2 mb-8 backdrop-blur-xl bg-emerald-500/20 border border-emerald-500/40 rounded-full">
            <span className="text-sm font-medium text-emerald-300 tracking-[0.2em] uppercase">
              Our Products
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extralight text-white mb-6 tracking-tight">
            Product Range
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-light">
            Explore our comprehensive range of crop protection solutions,
            scientifically formulated for maximum efficacy
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 backdrop-blur-xl bg-white/10 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-white/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-xl ${
                  activeCategory === category.id
                    ? "bg-emerald-500/30 text-emerald-300 border border-emerald-400/50"
                    : "bg-white/10 text-white/75 border border-emerald-500/20 hover:border-emerald-400/40 hover:text-white hover:bg-white/15"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-8">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-white/50 text-lg">Loading products...</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product.slug}`}
                    className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-emerald-500/10 border border-emerald-500/30 rounded-3xl overflow-hidden hover:border-emerald-400/50 hover:bg-gradient-to-br hover:from-white/15 hover:to-emerald-500/15 transition-all duration-300 group cursor-pointer"
                  >
                    {/* Product Image */}
                    <div className="h-64 bg-gradient-to-br from-emerald-900/20 to-emerald-800/20 flex items-center justify-center relative overflow-hidden p-6">
                      <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                        {product.category}
                      </div>
                      {/* Product Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="p-6">
                      <h3 className="text-2xl font-light text-white mb-3">
                        {product.name}
                      </h3>
                      <p className="text-white/75 text-sm mb-4 leading-relaxed font-light">
                        {product.description}
                      </p>

                      {/* Active Ingredient */}
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-white/50 mb-1">
                          Active:
                        </p>
                        <p className="text-sm text-white/80">
                          {product.activeIngredient}
                        </p>
                      </div>

                      {/* Target */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-white/50 mb-1">
                          Target:
                        </p>
                        <p className="text-sm text-white/80">
                          {product.targetPests.join(", ")}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <div className="w-full py-3 bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 text-emerald-300 font-medium rounded-lg group-hover:bg-emerald-500/30 transition-colors duration-300 text-center">
                        View Details
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredProducts.length === 0 && !loading && (
                <div className="text-center py-16">
                  <p className="text-white/50 text-lg">
                    No products found matching your criteria.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
