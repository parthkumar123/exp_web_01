"use client";

import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader, ButtonLink } from "@/components/admin/ui";
import { FormSkeleton } from "@/components/admin/Skeleton";
import {
  ProductForm,
  emptyProductForm,
  type ProductFormValues,
} from "@/components/admin/ProductForm";

interface LoadedProduct {
  values: ProductFormValues;
  slug: string;
  name: string;
}

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [product, setProduct] = useState<LoadedProduct | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (cancelled) return;

        if (!data.success) {
          setError(data.error || "Product not found");
          return;
        }

        const p = data.data;
        setProduct({
          slug: p.slug,
          name: p.name,
          values: {
            ...emptyProductForm,
            name: p.name ?? "",
            productType: p.productType ?? "formulation",
            category: p.category ?? "Insecticides",
            image: p.image ?? "",
            description: p.description ?? "",
            aboutProduct: p.aboutProduct ?? "",
            activeIngredient: p.activeIngredient ?? "",
            targetPestsLabelType: p.targetPestsLabelType ?? "target_pests",
            targetPests: p.targetPests ?? [],
            applicableCrops: p.applicableCrops ?? [],
            dosage: p.dosage ?? "",
            applicationMethod: p.applicationMethod ?? "",
            packSizes: p.packSizes ?? [],
            keyFeatures: p.keyFeatures ?? [],
            benefits: p.benefits ?? [],
            safetyInformation: p.safetyInformation ?? [],
            safetyNote: p.safetyNote ?? emptyProductForm.safetyNote,
            casNumber: p.casNumber ?? "",
            purity: p.purity ?? "",
            appearance: p.appearance ?? "",
            molecularFormula: p.molecularFormula ?? "",
            hsnCode: p.hsnCode ?? "",
            moq: p.moq ?? "",
            packing: p.packing ?? [],
            applications: p.applications ?? [],
            priceMin: p.priceMin != null ? String(p.priceMin) : "",
            priceMax: p.priceMax != null ? String(p.priceMax) : "",
            currency: p.currency ?? "INR",
            isActive: p.isActive ?? true,
            isFeatured: p.isFeatured ?? false,
          },
        });
      } catch {
        if (!cancelled) {
          setError("Failed to load product");
          toast.error("Failed to load product");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <div className="max-w-6xl">
        <PageHeader
          title="Edit product"
          actions={
            <ButtonLink variant="secondary" href="/admin/dashboard/products">
              Back to products
            </ButtonLink>
          }
        />
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl">
        <PageHeader title="Edit product" />
        <FormSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <PageHeader title={`Edit: ${product.name}`} />
      <ProductForm productId={id} slug={product.slug} initialValues={product.values} />
    </div>
  );
}
