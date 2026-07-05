import type { Metadata } from "next";
import B2BProductsClient from "@/components/B2BProductsClient";
import JsonLd from "@/components/JsonLd";
import { getProductsByType } from "@/lib/products";
import {
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildItemListSchema,
} from "@/lib/seo";

// ISR: regenerated hourly; product mutations trigger on-demand revalidation.
export const revalidate = 3600;

const DESCRIPTION =
  "Technical grade active ingredients (raw AI) from Senso Agrotech — high-purity insecticide, fungicide and herbicide technicals for formulators and bulk / export buyers.";

export const metadata: Metadata = {
  title: "Technicals (Raw Active Ingredients)",
  description: DESCRIPTION,
  alternates: { canonical: "/technicals" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/technicals"),
    title: "Technicals (Raw Active Ingredients) | Senso Agrotech",
    description: DESCRIPTION,
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technicals | Senso Agrotech",
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default async function TechnicalsPage() {
  const products = await getProductsByType("technical");

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Technicals", path: "/technicals" },
  ]);
  const itemListSchema = buildItemListSchema(products, "/technicals");

  return (
    <>
      <JsonLd data={[breadcrumbSchema, itemListSchema]} />
      <B2BProductsClient
        products={products}
        lineLabel="Technicals"
        lineDescription="High-purity technical grade active ingredients (raw AI) for formulators and bulk / export buyers. Specs, packing and COA available on request."
        basePath="/technicals"
      />
    </>
  );
}
