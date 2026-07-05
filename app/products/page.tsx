import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";
import JsonLd from "@/components/JsonLd";
import { getAllProducts } from "@/lib/products";
import {
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildItemListSchema,
} from "@/lib/seo";

// ISR: cached and regenerated hourly; product mutations trigger on-demand
// revalidation (see lib/revalidate.ts) so the catalogue stays fresh.
export const revalidate = 3600;

const DESCRIPTION =
  "Browse Senso Agrotech's crop protection catalogue — Insecticides, Fungicides, Herbicides, Plant Growth Regulators, Fertilizers and Biologicals for higher yields.";

export const metadata: Metadata = {
  title: "Products",
  description: DESCRIPTION,
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/products"),
    title: "Products | Senso Agrotech",
    description: DESCRIPTION,
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | Senso Agrotech",
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Products", path: "/products" },
  ]);
  const itemListSchema = buildItemListSchema(products, "/products");

  return (
    <>
      <JsonLd data={[breadcrumbSchema, itemListSchema]} />
      <ProductsClient products={products} />
    </>
  );
}
