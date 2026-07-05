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
  "Industrial and agrochemical solvents from Senso Agrotech — high-purity carrier solvents supplied in bulk (drums, IBCs) to formulators and export buyers. CAS, specs and COA on request.";

export const metadata: Metadata = {
  title: "Solvents (Bulk Industrial & Agro)",
  description: DESCRIPTION,
  alternates: { canonical: "/solvents" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/solvents"),
    title: "Solvents (Bulk Industrial & Agro) | Senso Agrotech",
    description: DESCRIPTION,
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solvents | Senso Agrotech",
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default async function SolventsPage() {
  const products = await getProductsByType("solvent");

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Solvents", path: "/solvents" },
  ]);
  const itemListSchema = buildItemListSchema(products, "/solvents");

  return (
    <>
      <JsonLd data={[breadcrumbSchema, itemListSchema]} />
      <B2BProductsClient
        products={products}
        lineLabel="Solvents"
        lineDescription="High-purity industrial and agrochemical carrier solvents supplied in bulk (drums, IBCs, tankers) to formulators and export buyers."
        basePath="/solvents"
      />
    </>
  );
}
