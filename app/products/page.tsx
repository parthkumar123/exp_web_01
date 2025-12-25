"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { id: "All", name: "All", icon: "🌿" },
    { id: "Insecticides", name: "Insecticides", icon: "🛡️" },
    { id: "Fungicides", name: "Fungicides", icon: "🍄" },
    { id: "Herbicides", name: "Herbicides", icon: "🌾" },
    { id: "PGR", name: "Plant Growth Regulators", icon: "🌱" },
    { id: "Bio", name: "Bio Fertilizers", icon: "♻️" },
  ];

  const products = [
    {
      id: 1,
      name: "BioShield Pro",
      category: "Insecticides",
      image: "/images/product-1.jpg",
      description:
        "Advanced protection against sucking and chewing pests with extended residual action.",
      active: "Imidacloprid 17.8% SL",
      target: "Aphids, Whiteflies, Jassids",
    },
    {
      id: 2,
      name: "AgriGuard Elite",
      category: "Insecticides",
      image: "/images/product-2.jpg",
      description:
        "Broad-spectrum insecticide for effective control of lepidopteran pests.",
      active: "Chlorantraniliprole 18.5% SC",
      target: "Bollworms, Stem Borers, Fruit Borers",
    },
    {
      id: 3,
      name: "CropSafe Max",
      category: "Insecticides",
      image: "/images/product-3.jpg",
      description:
        "Systemic insecticide with translaminar activity for complete pest management.",
      active: "Thiamethoxam 25% WG",
      target: "Thrips, Hoppers, Bugs",
    },
    {
      id: 4,
      name: "FungiGuard Elite",
      category: "Fungicides",
      image: "/images/product-4.jpg",
      description:
        "Systemic fungicide for comprehensive disease management in all crops.",
      active: "Tebuconazole 25.9% EC",
      target: "Rust, Blight, Mildew",
    },
    {
      id: 5,
      name: "CropCure Plus",
      category: "Fungicides",
      image: "/images/product-5.jpg",
      description:
        "Broad-spectrum fungicide with protective and curative action.",
      active: "Mancozeb 75% WP",
      target: "Various Fungal Diseases",
    },
    {
      id: 6,
      name: "WeedFree Max",
      category: "Herbicides",
      image: "/images/product-6.jpg",
      description:
        "Selective herbicide with pre and post-emergence activity for major crops.",
      active: "Pendimethalin 30% EC",
      target: "Grassy & Broadleaf Weeds",
    },
    {
      id: 7,
      name: "HerbStop Pro",
      category: "Herbicides",
      image: "/images/product-7.jpg",
      description:
        "Post-emergence herbicide for effective control of annual weeds.",
      active: "2,4-D Ethyl Ester 38% EC",
      target: "Broadleaf Weeds",
    },
    {
      id: 8,
      name: "GrowthPlus",
      category: "PGR",
      image: "/images/product-8.jpg",
      description:
        "Enhances flowering, fruit setting and overall plant vigor naturally.",
      active: "Gibberellic Acid 0.001% L",
      target: "All Crops",
    },
    {
      id: 9,
      name: "BloomBoost",
      category: "PGR",
      image: "/images/product-9.jpg",
      description:
        "Promotes cell division and improves crop yield significantly.",
      active: "Cytokinin 0.09% L",
      target: "Fruits & Vegetables",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-emerald-950/20 to-zinc-950">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
          <div className="inline-block px-6 py-2 mb-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full">
            <span className="text-sm font-medium text-white/70 tracking-[0.2em] uppercase">
              Our Products
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extralight text-white mb-6 tracking-tight">
            Product Range
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto font-light">
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
                className="w-full pl-12 pr-4 py-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-white/40"
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
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-white/5 text-white/70 border border-white/10 hover:border-emerald-500/30 hover:text-white"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="backdrop-blur-2xl bg-gradient-to-br from-white/5 to-emerald-500/5 border border-white/10 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="h-64 bg-gradient-to-br from-emerald-900/20 to-emerald-800/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                    {product.category}
                  </div>
                  {/* Placeholder Icon */}
                  <div className="w-32 h-32 bg-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-20 h-20 text-emerald-400"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="text-2xl font-light text-white mb-3">
                    {product.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 leading-relaxed font-light">
                    {product.description}
                  </p>

                  {/* Active Ingredient */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-white/50 mb-1">
                      Active:
                    </p>
                    <p className="text-sm text-white/80">{product.active}</p>
                  </div>

                  {/* Target */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-white/50 mb-1">
                      Target:
                    </p>
                    <p className="text-sm text-white/80">{product.target}</p>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full py-3 bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 text-emerald-300 font-medium rounded-lg hover:bg-emerald-500/30 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/50 text-lg">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
