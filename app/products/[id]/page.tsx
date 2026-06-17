import { notFound } from "next/navigation";
import { cache } from "react";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import ProductModel from "@/models/Product";
import ProductDetailStickyBar from "@/components/ProductDetailStickyBar";
import PageBackgroundImage from "@/components/PageBackgroundImage";
import { ProductBadge, parseBadgeItems } from "@/components/ProductBadge";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from "@/lib/seo";
import { cloudinaryAuto } from "@/lib/cloudinaryUrl";
import { getProductSlugs } from "@/lib/products";

// Cache pages and regenerate at most hourly (on-demand revalidation on product
// create/update/delete keeps them fresh in between).
export const revalidate = 3600;

// Pre-render every active product page at build time (Vercel build has DB access).
// New products created after a build are rendered on demand and then cached.
export async function generateStaticParams() {
  const products = await getProductSlugs();
  return products.map((p) => ({ id: p.slug }));
}

interface Product {
  _id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  activeIngredient: string;
  targetPestsLabelType?: "target_pests" | "mode_of_action";
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

// Cached so generateMetadata and the page share a single DB query per request.
const getProduct = cache(async (slug: string): Promise<Product | null> => {
  try {
    await connectDB();
    const product = await ProductModel.findOne({ slug, isActive: true }).lean();
    return product ? (product as unknown as Product) : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
});

function truncate(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: `Product not found | ${SITE_NAME}`,
      robots: { index: false, follow: true },
    };
  }

  const title = `${product.name} | ${SITE_NAME}`;
  const description = truncate(
    product.description || product.aboutProduct || SITE_DESCRIPTION
  );
  const canonical = `/products/${product.slug}`;
  const images = product.image
    ? [{ url: product.image, alt: product.name }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: absoluteUrl(canonical),
      title,
      description,
      siteName: SITE_NAME,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.image ? [product.image] : undefined,
    },
  };
}

async function getRelatedProducts(
  category: string,
  currentId: string
): Promise<Product[]> {
  try {
    await connectDB();
    const products = await ProductModel.find({
      category,
      isActive: true,
      _id: { $ne: currentId },
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
    return products as unknown as Product[];
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

  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product.category, product._id);

  const canonical = absoluteUrl(`/products/${product.slug}`);
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.image ? [product.image] : undefined,
    description: product.description || product.aboutProduct || undefined,
    category: product.category,
    url: canonical,
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@type": "Organization", name: "Senso Agrotech Private Limited" },
    ...(product.activeIngredient
      ? {
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Active Ingredient",
              value: product.activeIngredient,
            },
          ],
        }
      : {}),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: absoluteUrl("/products") },
      { "@type": "ListItem", position: 3, name: product.name, item: canonical },
    ],
  };

  return (
    <div className="min-h-screen relative">
      <JsonLd data={[productSchema, breadcrumbSchema]} />
      <PageBackgroundImage />
      <div className="relative z-10">
      <Navigation />
      <ProductDetailStickyBar productName={product.name} />

      <main className="pt-24 pb-32 max-w-6xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-slate-400 flex-wrap">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/products" className="hover:text-white transition-colors">
                Products
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-slate-200 truncate max-w-[200px]" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Hero: image + key info + CTAs */}
        <section className="grid lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
          <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 flex items-center justify-center min-h-[320px] p-8">
            <img
              src={cloudinaryAuto(product.image, 1200)}
              alt={product.name}
              className="max-h-[340px] w-auto object-contain"
            />
          </div>
          <div>
            <div className="mb-4">
              <ProductBadge variant="category">{product.category}</ProductBadge>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
              {product.name}
            </h1>
            <p className="text-slate-200 leading-relaxed mb-6">
              {product.description}
            </p>
            <div className="mb-6">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Active ingredient
              </p>
              <div className="flex flex-wrap gap-2">
                {parseBadgeItems(product.activeIngredient).map((item, i) => (
                  <ProductBadge key={i} variant="ingredient">
                    {item}
                  </ProductBadge>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Pack sizes
              </p>
              <div className="flex flex-wrap gap-2">
                {parseBadgeItems(product.packSizes).map((item, i) => (
                  <ProductBadge key={i} variant="target">
                    {item}
                  </ProductBadge>
                ))}
                {parseBadgeItems(product.packSizes).length === 0 && (
                  <span className="text-slate-400 text-sm">—</span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25"
              >
                Get Quote
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 text-white font-medium border border-white/20 hover:bg-white/15 transition-colors"
              >
                All products
              </Link>
            </div>
          </div>
        </section>

        {/* At a glance: targets + crops */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">At a glance</h2>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-3">
                  {product.targetPestsLabelType === "mode_of_action"
                    ? "Mode of Action"
                    : "Target pests"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {parseBadgeItems(product.targetPests).map((item, idx) => (
                    <ProductBadge key={idx} variant="ingredient">
                      {item}
                    </ProductBadge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-400 mb-3">Applicable crops</h3>
                <div className="flex flex-wrap gap-2">
                  {parseBadgeItems(product.applicableCrops).map((item, idx) => (
                    <ProductBadge key={idx} variant="crop">
                      {item}
                    </ProductBadge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to use */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">How to use</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-sm font-medium text-slate-400 mb-2">Dosage</h3>
              <p className="text-slate-200 leading-relaxed">{product.dosage}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-sm font-medium text-slate-400 mb-2">Application method</h3>
              <p className="text-slate-200 leading-relaxed">{product.applicationMethod}</p>
            </div>
          </div>
        </section>

        {/* Key features & benefits */}
        {(product.keyFeatures?.length > 0 || product.benefits?.length > 0) && (
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-white mb-4">Features & benefits</h2>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="grid sm:grid-cols-2 gap-8">
                {product.keyFeatures?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-3">Key features</h3>
                    <ul className="space-y-2">
                      {product.keyFeatures.map((f, i) => (
                        <li key={i} className="flex gap-2 text-slate-200 text-sm">
                          <span className="text-emerald-400 shrink-0">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.benefits?.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-3">Benefits</h3>
                    <ul className="space-y-2">
                      {product.benefits.map((b, i) => (
                        <li key={i} className="flex gap-2 text-slate-200 text-sm">
                          <span className="text-emerald-400 shrink-0">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* About */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">About this product</h2>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-slate-200 leading-relaxed">{product.aboutProduct}</p>
          </div>
        </section>

        {/* Safety */}
        {product.safetyInformation?.length > 0 && (
          <section className="mb-16">
            <h2 className="text-lg font-semibold text-amber-300 mb-4 flex items-center gap-2">
              <span aria-hidden>⚠</span> Safety information
            </h2>
            <div className="rounded-2xl border border-amber-500/40 bg-amber-900/50 p-6">
              <ul className="space-y-2 mb-4">
                {product.safetyInformation.map((info, i) => (
                  <li key={i} className="flex gap-2 text-amber-100 text-sm">
                    <span className="shrink-0">•</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
              <p className="text-amber-200/90 text-sm italic">{product.safetyNote}</p>
            </div>
          </section>
        )}

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-white mb-6">You might also like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p._id}
                  href={`/products/${p.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden hover:border-white/20 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-black/20 transition-all duration-300"
                >
                  <div className="h-40 flex items-center justify-center p-4 bg-white/[0.03]">
                    <img
                      src={cloudinaryAuto(p.image, 500)}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4 bg-white/[0.04]">
                    <h3 className="font-medium text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {p.name}
                    </h3>
                    <p className="text-slate-200 text-sm mt-1 line-clamp-2">{p.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-emerald-400 font-medium mt-3">
                      View product
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      </div>
    </div>
  );
}
