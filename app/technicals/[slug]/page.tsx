import { notFound } from "next/navigation";
import { cache } from "react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import B2BProductDetail, { type B2BProductDetailData } from "@/components/B2BProductDetail";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  absoluteUrl,
  buildProductSchema,
} from "@/lib/seo";
import {
  fetchB2BProductBySlug,
  getProductSlugsByType,
  getProductsByType,
} from "@/lib/products";

const LINE_LABEL = "Technicals";
const BASE_PATH = "/technicals";
const PRODUCT_TYPE = "technical" as const;

export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await getProductSlugsByType(PRODUCT_TYPE);
  return products.map((p) => ({ slug: p.slug }));
}

const getProduct = cache(
  async (slug: string): Promise<B2BProductDetailData | null> => {
    const product = await fetchB2BProductBySlug(slug, PRODUCT_TYPE);
    return product ? (product as B2BProductDetailData) : null;
  }
);

function truncate(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: `Not found | ${SITE_NAME}`,
      robots: { index: false, follow: true },
    };
  }

  const title = `${product.name} Technical | ${SITE_NAME}`;
  const description = truncate(
    product.description || product.aboutProduct || SITE_DESCRIPTION
  );
  const canonical = `${BASE_PATH}/${product.slug}`;
  const images = product.image ? [{ url: product.image, alt: product.name }] : undefined;

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

export default async function TechnicalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const canonical = absoluteUrl(`${BASE_PATH}/${product.slug}`);
  const related = (await getProductsByType(PRODUCT_TYPE))
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  // Product structured data with offers — only when a price is set (else null).
  const productSchema = buildProductSchema(product, canonical);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: LINE_LABEL, item: absoluteUrl(BASE_PATH) },
      { "@type": "ListItem", position: 3, name: product.name, item: canonical },
    ],
  };

  return (
    <>
      <JsonLd data={[productSchema, breadcrumbSchema].filter(Boolean) as object[]} />
      <B2BProductDetail
        product={product}
        lineLabel={LINE_LABEL}
        basePath={BASE_PATH}
        relatedProducts={related}
      />
    </>
  );
}
