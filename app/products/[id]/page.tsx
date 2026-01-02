import { notFound } from "next/navigation";
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
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products?slug=${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

async function getRelatedProducts(
  category: string,
  currentId: string
): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/products?category=${category}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return (data.data || [])
      .filter((p: Product) => p._id !== currentId)
      .slice(0, 3);
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.category,
    product._id
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-emerald-900/30 to-zinc-900">
      <Navigation />

      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2940"
          alt="Agriculture background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-blue-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <ol className="flex items-center space-x-2 text-white/60">
              <li>
                <Link href="/" className="hover:text-emerald-400">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/products" className="hover:text-emerald-400">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li className="text-emerald-400 font-medium">{product.name}</li>
            </ol>
          </nav>

          {/* Product Details */}
          <div className="bg-gradient-to-br from-white/10 to-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 rounded-2xl shadow-xl overflow-hidden mb-12">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <div className="flex items-center justify-center bg-white/5 rounded-xl p-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-96 object-contain"
                />
              </div>

              {/* Product Info */}
              <div>
                <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-semibold mb-4">
                  {product.category}
                </span>
                <h1 className="text-4xl font-bold text-white mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-white/70 mb-6">
                  {product.description}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-white/90 mb-1">
                      Active Ingredient
                    </h3>
                    <p className="text-white">{product.activeIngredient}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white/90 mb-1">
                      Pack Sizes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.packSizes.map((size, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Target Pests */}
            <div className="bg-gradient-to-br from-white/10 to-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">
                Target Pests
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.targetPests.map((pest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm"
                  >
                    {pest}
                  </span>
                ))}
              </div>
            </div>

            {/* Applicable Crops */}
            <div className="bg-gradient-to-br from-white/10 to-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">
                Applicable Crops
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.applicableCrops.map((crop, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>

            {/* Dosage */}
            <div className="bg-gradient-to-br from-white/10 to-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Dosage</h2>
              <p className="text-white/80">{product.dosage}</p>
            </div>

            {/* Application Method */}
            <div className="bg-gradient-to-br from-white/10 to-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">
                Application Method
              </h2>
              <p className="text-white/80">{product.applicationMethod}</p>
            </div>
          </div>

          {/* Key Features */}
          {product.keyFeatures.length > 0 && (
            <div className="bg-gradient-to-br from-white/10 to-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Key Features
              </h2>
              <ul className="space-y-2">
                {product.keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-emerald-400 mr-2">✓</span>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {product.benefits.length > 0 && (
            <div className="bg-gradient-to-br from-white/10 to-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Benefits</h2>
              <ul className="space-y-2">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span className="text-white/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* About Product */}
          <div className="bg-gradient-to-br from-white/10 to-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              About This Product
            </h2>
            <p className="text-white/80 leading-relaxed">
              {product.aboutProduct}
            </p>
          </div>

          {/* Safety Information */}
          {product.safetyInformation.length > 0 && (
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-500/30 rounded-xl p-8 shadow-lg mb-12">
              <h2 className="text-2xl font-bold text-orange-300 mb-4">
                Safety Information
              </h2>
              <ul className="space-y-2 mb-4">
                {product.safetyInformation.map((info, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-orange-400 mr-2">⚠</span>
                    <span className="text-orange-200">{info}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-orange-300/80 italic">
                {product.safetyNote}
              </p>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Related Products
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct._id}
                    href={`/products/${relatedProduct.slug}`}
                    className="bg-gradient-to-br from-white/10 to-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="h-48 bg-white/5 flex items-center justify-center p-4">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-white/70 mb-3">
                        {relatedProduct.description}
                      </p>
                      <span className="text-emerald-400 font-semibold group-hover:text-emerald-300">
                        View Details →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
