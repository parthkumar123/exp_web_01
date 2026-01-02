"use client";

import { useState, useEffect, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface Product {
  _id?: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  activeIngredient: string;
  targetPests: string[];
  applicableCrops: string[];
  dosage: string;
  applicationMethod: string;
  packSizes: string[];
  keyFeatures: string[];
  benefits: string[];
  aboutProduct: string;
  safetyInformation: string[];
  safetyNote: string;
  isActive: boolean;
  isFeatured: boolean;
}

export default function AdminProductsList() {
  const { logout } = useAdminAuth(); // Protect this page
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const categories = [
    "All",
    "Insecticides",
    "Fungicides",
    "Herbicides",
    "PGR",
    "Fertilizers",
    "Biological",
  ];

  const filterProducts = useCallback(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.slug.toLowerCase().includes(query) ||
          product.activeIngredient.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products?includeInactive=true");
      const data = await res.json();
      if (data.success) {
        const productsWithDefaults = data.data.map((product: Product) => ({
          ...product,
          isActive: product.isActive ?? true,
          isFeatured: product.isFeatured ?? false,
        }));
        setProducts(productsWithDefaults);
        setFilteredProducts(productsWithDefaults);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productId: string) => {
    router.push(`/admin?edit=${productId}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: "Product deleted successfully!" });
        fetchProducts();
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to delete" });
      }
    } catch {
      setMessage({ type: "error", text: "Error deleting product" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-emerald-900/30 to-zinc-900">
      <Navigation />

      <div className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-light text-white mb-2">
                Products Management
              </h1>
              <p className="text-xl text-white/80">
                Browse and manage all products
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin"
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
              >
                + Add New Product
              </Link>
              <button
                onClick={logout}
                className="px-6 py-3 bg-red-500/20 text-red-300 font-semibold rounded-xl hover:bg-red-500/30 border border-red-500/30 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Message */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                  : "bg-red-500/20 text-red-300 border border-red-500/50"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Search and Filter Bar */}
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, slug, ingredient, or category..."
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-white/50"
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Filter by Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-zinc-800">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-white/60">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>

          {/* Products List */}
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 shadow-lg">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
                <p className="text-white/60">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between p-4 border border-emerald-500/30 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-contain rounded bg-white/10"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white">
                            {product.name}
                          </h3>
                          {product.isFeatured && (
                            <span className="px-2 py-1 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 border border-emerald-500/40 rounded text-xs text-emerald-300 font-medium">
                              ⭐ Featured
                            </span>
                          )}
                          {!product.isActive && (
                            <span className="px-2 py-1 bg-red-500/20 border border-red-500/40 rounded text-xs text-red-300 font-medium">
                              Inactive
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/70">
                          {product.category} • {product.activeIngredient}
                        </p>
                        <p className="text-xs text-white/50 mt-1">
                          Slug: {product.slug}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product._id!)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id!)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg mb-4">
                  {searchQuery || selectedCategory !== "All"
                    ? "No products found matching your search."
                    : "No products found. Add your first product!"}
                </p>
                {(searchQuery || selectedCategory !== "All") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                    }}
                    className="px-6 py-2 bg-white/10 text-white/90 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
