import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageBackgroundImage from "@/components/PageBackgroundImage";
import ProductDetailStickyBar from "@/components/ProductDetailStickyBar";
import { ProductBadge, parseBadgeItems } from "@/components/ProductBadge";
import { cloudinaryAuto } from "@/lib/cloudinaryUrl";
import { formatPrice } from "@/lib/price";
import type { ProductListItem } from "@/lib/products";

/** Full product shape needed to render a B2B (technical/solvent) detail page. */
export interface B2BProductDetailData {
  _id: string;
  slug: string;
  name: string;
  category?: string;
  image: string;
  description: string;
  activeIngredient?: string;
  casNumber?: string;
  purity?: string;
  appearance?: string;
  molecularFormula?: string;
  hsnCode?: string;
  packing?: string[];
  applications?: string[];
  moq?: string;
  aboutProduct?: string;
  safetyInformation?: string[];
  safetyNote?: string;
  priceMin?: number | null;
  priceMax?: number | null;
  currency?: string;
}

export default function B2BProductDetail({
  product,
  lineLabel,
  basePath,
  relatedProducts,
}: {
  product: B2BProductDetailData;
  lineLabel: string;
  basePath: string;
  relatedProducts: ProductListItem[];
}) {
  const price = formatPrice(product);

  // Spec sheet — only rows with a value are rendered.
  const specRows: { label: string; value?: string }[] = [
    { label: "CAS Number", value: product.casNumber },
    { label: "Purity / Assay", value: product.purity },
    { label: "Appearance", value: product.appearance },
    { label: "Molecular Formula", value: product.molecularFormula },
    { label: "HSN Code", value: product.hsnCode },
    { label: "Min. Order Qty", value: product.moq },
  ].filter((r) => r.value && r.value.trim().length > 0);

  const packing = parseBadgeItems(product.packing);
  const applications = parseBadgeItems(product.applications);

  return (
    <div className="min-h-screen relative">
      <PageBackgroundImage />
      <div className="relative z-10">
        <Navigation />
        <ProductDetailStickyBar productName={product.name} price={price ?? undefined} />

        <main className="pt-24 pb-32 max-w-6xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-slate-400 flex-wrap">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={basePath} className="hover:text-white transition-colors">{lineLabel}</Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-slate-200 truncate max-w-[200px]" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          {/* Hero */}
          <section className="grid lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
            <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 flex items-center justify-center min-h-[320px] p-8">
              <img
                src={cloudinaryAuto(product.image, 1200)}
                alt={product.name}
                fetchPriority="high"
                decoding="async"
                className="max-h-[340px] w-auto object-contain"
              />
            </div>
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <ProductBadge variant="ingredient">{lineLabel}</ProductBadge>
                {product.category && (
                  <ProductBadge variant="category">{product.category}</ProductBadge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
                {product.name}
              </h1>
              <p className="text-slate-200 leading-relaxed mb-6">{product.description}</p>

              <div className="mb-6">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Price
                </p>
                {price ? (
                  <p className="text-2xl font-semibold text-white">{price}</p>
                ) : (
                  <p className="text-slate-300">Price on request</p>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25"
                >
                  Request quote / COA
                </Link>
                <Link
                  href={basePath}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 text-white font-medium border border-white/20 hover:bg-white/15 transition-colors"
                >
                  All {lineLabel.toLowerCase()}
                </Link>
              </div>
            </div>
          </section>

          {/* Specifications */}
          {specRows.length > 0 && (
            <section className="mb-12">
              <h2 className="text-lg font-semibold text-white mb-4">Specifications</h2>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                  {specRows.map((row) => (
                    <div key={row.label} className="flex flex-col">
                      <dt className="text-sm font-medium text-slate-400 mb-1">{row.label}</dt>
                      <dd className="text-slate-100">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          )}

          {/* Packing & applications */}
          {(packing.length > 0 || applications.length > 0) && (
            <section className="mb-12">
              <h2 className="text-lg font-semibold text-white mb-4">Packing &amp; applications</h2>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <div className="grid sm:grid-cols-2 gap-8">
                  {packing.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-400 mb-3">Packing options</h3>
                      <div className="flex flex-wrap gap-2">
                        {packing.map((item, i) => (
                          <ProductBadge key={i} variant="target">{item}</ProductBadge>
                        ))}
                      </div>
                    </div>
                  )}
                  {applications.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-400 mb-3">Applications</h3>
                      <div className="flex flex-wrap gap-2">
                        {applications.map((item, i) => (
                          <ProductBadge key={i} variant="crop">{item}</ProductBadge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* About */}
          {product.aboutProduct && (
            <section className="mb-12">
              <h2 className="text-lg font-semibold text-white mb-4">About this product</h2>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-slate-200 leading-relaxed">{product.aboutProduct}</p>
              </div>
            </section>
          )}

          {/* Safety */}
          {product.safetyInformation && product.safetyInformation.length > 0 && (
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
                {product.safetyNote && (
                  <p className="text-amber-200/90 text-sm italic">{product.safetyNote}</p>
                )}
              </div>
            </section>
          )}

          {/* Related */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-white mb-6">More {lineLabel.toLowerCase()}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <Link
                    key={p._id}
                    href={`${basePath}/${p.slug}`}
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
