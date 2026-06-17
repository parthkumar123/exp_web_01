import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import JsonLd from "@/components/JsonLd";
import { getFeaturedProducts } from "@/lib/products";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const featuredProducts = await getFeaturedProducts(3);

  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <HomeClient featuredProducts={featuredProducts} />
    </>
  );
}
