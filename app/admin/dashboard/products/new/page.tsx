"use client";

import { PageHeader } from "@/components/admin/ui";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="max-w-6xl">
      <PageHeader
        title="New product"
        description="The slug and public URL are generated from the product name."
      />
      <ProductForm />
    </div>
  );
}
