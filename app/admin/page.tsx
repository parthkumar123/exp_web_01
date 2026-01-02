"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
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

const initialProduct: Product = {
  name: "",
  slug: "",
  category: "Insecticides",
  image: "",
  description: "",
  activeIngredient: "",
  targetPests: [],
  applicableCrops: [],
  dosage: "",
  applicationMethod: "",
  packSizes: [],
  keyFeatures: [],
  benefits: [],
  aboutProduct: "",
  safetyInformation: [],
  safetyNote:
    "Always read the product label carefully before use. Follow all safety precautions and local regulations.",
  isActive: true,
  isFeatured: false,
};

function AdminPanelContent() {
  const { logout } = useAdminAuth(); // Protect this page
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState<Product>(initialProduct);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Temporary array inputs
  const [tempInput, setTempInput] = useState({
    targetPests: "",
    applicableCrops: "",
    packSizes: "",
    keyFeatures: "",
    benefits: "",
    safetyInformation: "",
  });

  useEffect(() => {
    const editId = searchParams.get("edit");
    if (editId) {
      fetchProductById(editId);
    }
  }, [searchParams]);

  const fetchProductById = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      if (data.success) {
        setFormData({
          ...data.data,
          isActive: data.data.isActive ?? true,
          isFeatured: data.data.isFeatured ?? false,
        });
        setIsEditing(true);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setMessage({ type: "error", text: "Failed to load product" });
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setMessage({
        type: "error",
        text: "Invalid file type. Please upload a JPEG, PNG, or WebP image.",
      });
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setMessage({
        type: "error",
        text: "File size too large. Please upload an image smaller than 5MB.",
      });
      return;
    }

    setUploadingImage(true);
    setMessage({ type: "", text: "" });

    try {
      const formDataToUpload = new FormData();
      formDataToUpload.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataToUpload,
      });

      const data = await res.json();

      if (data.success) {
        setFormData({ ...formData, image: data.data.url });
        setMessage({
          type: "success",
          text: "Image uploaded successfully!",
        });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to upload image",
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage({
        type: "error",
        text: "Failed to upload image. Please try again.",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const url = isEditing ? `/api/products/${formData._id}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({
          type: "success",
          text: isEditing
            ? "Product updated successfully!"
            : "Product created successfully!",
        });
        setFormData(initialProduct);
        setIsEditing(false);
        setImageFile(null);
        router.push("/admin/products");
      } else {
        setMessage({
          type: "error",
          text: data.error || "Something went wrong",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save product" });
    } finally {
      setLoading(false);
    }
  };

  const handleArrayAdd = (field: keyof typeof tempInput) => {
    const value = tempInput[field].trim();
    if (value) {
      setFormData({
        ...formData,
        [field]: [...(formData[field as keyof Product] as string[]), value],
      });
      setTempInput({ ...tempInput, [field]: "" });
    }
  };

  const handleArrayRemove = (field: keyof Product, index: number) => {
    const array = formData[field] as string[];
    setFormData({
      ...formData,
      [field]: array.filter((_, i) => i !== index),
    });
  };

  const categories = [
    "Insecticides",
    "Fungicides",
    "Herbicides",
    "PGR",
    "Fertilizers",
    "Biological",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-emerald-900/30 to-zinc-900">
      <Navigation />

      <div className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="text-center flex-1">
              <h1 className="text-5xl font-light text-white mb-4">
                Admin Panel
              </h1>
              <p className="text-xl text-white/80">Manage Product Catalog</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/products"
                className="px-6 py-3 bg-white/10 text-white/90 font-semibold rounded-xl hover:bg-white/20 border border-emerald-500/30 transition-all duration-300"
              >
                View All Products
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

          {/* Form */}
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 mb-12 shadow-lg">
            <h2 className="text-2xl font-light text-white mb-6">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-white/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="bg-zinc-800">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Product Image *
                  </label>

                  {/* File Upload */}
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <label className="flex-1 cursor-pointer">
                        <div className="w-full px-4 py-3 bg-white/10 border-2 border-dashed border-emerald-500/30 rounded-lg hover:border-emerald-500/50 transition-colors flex items-center justify-center gap-2">
                          <svg
                            className="w-5 h-5 text-emerald-400"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <span className="text-white/90 font-medium">
                            {uploadingImage
                              ? "Uploading..."
                              : imageFile
                              ? imageFile.name
                              : "Click to upload image"}
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={handleImageChange}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Manual URL Input (Optional) */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-white/50"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        placeholder="Or paste image URL directly"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-white/50"
                      />
                    </div>

                    {/* Image Preview */}
                    {formData.image && (
                      <div className="p-4 bg-white/5 border border-emerald-500/30 rounded-lg">
                        <p className="text-xs text-white/60 mb-3 font-medium">
                          Image Preview:
                        </p>
                        <div className="relative">
                          <img
                            src={formData.image}
                            alt="Product preview"
                            className="max-h-48 max-w-full object-contain rounded mx-auto"
                            onError={(e) => {
                              e.currentTarget.src = "";
                              e.currentTarget.alt = "Invalid image URL";
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, image: "" });
                              setImageFile(null);
                            }}
                            className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg text-white transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-white/50">
                      Supported formats: JPEG, PNG, WebP (max 5MB)
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Active Ingredient *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.activeIngredient}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        activeIngredient: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-white/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-white/50"
                />
              </div>

              {/* Array Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Target Pests */}
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Target Pests
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tempInput.targetPests}
                      onChange={(e) =>
                        setTempInput({
                          ...tempInput,
                          targetPests: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-2 bg-white/10 border border-emerald-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Add pest"
                    />
                    <button
                      type="button"
                      onClick={() => handleArrayAdd("targetPests")}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 border border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.targetPests.map((pest, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm flex items-center gap-2"
                      >
                        {pest}
                        <button
                          type="button"
                          onClick={() => handleArrayRemove("targetPests", idx)}
                          className="text-emerald-300 hover:text-emerald-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Applicable Crops */}
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Applicable Crops
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tempInput.applicableCrops}
                      onChange={(e) =>
                        setTempInput({
                          ...tempInput,
                          applicableCrops: e.target.value,
                        })
                      }
                      className="flex-1 px-4 py-2 bg-white/10 border border-emerald-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Add crop"
                    />
                    <button
                      type="button"
                      onClick={() => handleArrayAdd("applicableCrops")}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 border border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.applicableCrops.map((crop, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center gap-2"
                      >
                        {crop}
                        <button
                          type="button"
                          onClick={() =>
                            handleArrayRemove("applicableCrops", idx)
                          }
                          className="text-blue-300 hover:text-blue-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Dosage *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.dosage}
                    onChange={(e) =>
                      setFormData({ ...formData, dosage: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-white/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Application Method *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.applicationMethod}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        applicationMethod: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-white/50"
                  />
                </div>
              </div>

              {/* Pack Sizes */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Pack Sizes
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tempInput.packSizes}
                    onChange={(e) =>
                      setTempInput({ ...tempInput, packSizes: e.target.value })
                    }
                    className="flex-1 px-4 py-2 bg-white/10 border border-emerald-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., 100ml, 250ml, 500ml"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayAdd("packSizes")}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 border border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.packSizes.map((size, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/10 text-white/90 rounded-full text-sm flex items-center gap-2"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => handleArrayRemove("packSizes", idx)}
                        className="text-white/70 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Key Features
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tempInput.keyFeatures}
                    onChange={(e) =>
                      setTempInput({
                        ...tempInput,
                        keyFeatures: e.target.value,
                      })
                    }
                    className="flex-1 px-4 py-2 bg-white/10 border border-emerald-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Add feature"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayAdd("keyFeatures")}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 border border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.keyFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 bg-white/5 border border-emerald-500/30 rounded"
                    >
                      <span className="flex-1 text-sm text-white/90">
                        {feature}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleArrayRemove("keyFeatures", idx)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Benefits
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tempInput.benefits}
                    onChange={(e) =>
                      setTempInput({ ...tempInput, benefits: e.target.value })
                    }
                    className="flex-1 px-4 py-2 bg-white/10 border border-emerald-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Add benefit"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayAdd("benefits")}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 border border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 bg-white/5 border border-emerald-500/30 rounded"
                    >
                      <span className="flex-1 text-sm text-white/90">
                        {benefit}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleArrayRemove("benefits", idx)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* About Product */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  About This Product *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.aboutProduct}
                  onChange={(e) =>
                    setFormData({ ...formData, aboutProduct: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-emerald-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-white/50"
                />
              </div>

              {/* Safety Information */}
              <div>
                <label className="block text-sm font-semibold text-white/90 mb-2">
                  Safety Information
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tempInput.safetyInformation}
                    onChange={(e) =>
                      setTempInput({
                        ...tempInput,
                        safetyInformation: e.target.value,
                      })
                    }
                    className="flex-1 px-4 py-2 bg-white/10 border border-emerald-500/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Add safety info"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayAdd("safetyInformation")}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 border border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.safetyInformation.map((info, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 bg-white/5 border border-orange-500/30 rounded"
                    >
                      <span className="flex-1 text-sm text-white/90">
                        {info}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleArrayRemove("safetyInformation", idx)
                        }
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Status Toggles */}
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3 p-4 bg-white/5 border border-emerald-500/30 rounded-lg">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={!!formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-emerald-500/30 bg-white/10 text-emerald-500 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  />
                  <label
                    htmlFor="isActive"
                    className="text-white/90 font-medium cursor-pointer"
                  >
                    Active Product
                  </label>
                  <span className="ml-auto text-xs text-white/50">
                    Visible in catalog
                  </span>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-emerald-500/10 to-amber-500/10 border border-emerald-500/40 rounded-lg">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={!!formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-emerald-500/30 bg-white/10 text-emerald-500 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  />
                  <label
                    htmlFor="isFeatured"
                    className="text-white/90 font-medium cursor-pointer"
                  >
                    Featured Product
                  </label>
                  <span className="ml-auto text-xs text-emerald-300/70 font-medium">
                    ⭐ Show on homepage
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : isEditing
                    ? "Update Product"
                    : "Create Product"}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(initialProduct);
                      setIsEditing(false);
                    }}
                    className="px-8 py-3 bg-white/10 text-white/90 font-semibold rounded-xl hover:bg-white/20 border border-emerald-500/30 transition-all duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function AdminPanel() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <AdminPanelContent />
    </Suspense>
  );
}
