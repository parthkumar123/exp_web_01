import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";
import JsonLd from "@/components/JsonLd";
import { getAllProducts } from "@/lib/products";
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

const DESCRIPTION =
  "Browse Senso Agrotech's crop protection catalogue — Insecticides, Fungicides, Herbicides, Plant Growth Regulators, Fertilizers and Biologicals for higher yields.";

export const metadata: Metadata = {
  title: "Products | Senso Agrotech",
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Products", item: absoluteUrl("/products") },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ProductsClient products={products} />
    </>
  );
}
