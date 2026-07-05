"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, ButtonLink } from "@/components/admin/ui";
import { TableSkeleton } from "@/components/admin/Skeleton";
import { ProductsTable } from "@/components/admin/ProductsTable";
import type { AdminProduct } from "@/components/admin/types";

const TYPES = ["formulation", "technical", "solvent"];
const STATUSES = ["active", "inactive", "featured"];

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<AdminProduct[] | null>(null);
  // Bumped after any table mutation (or the refresh button) to refetch.
  const [refreshKey, setRefreshKey] = useState(0);
  // True while a refetch is in flight — the table swaps rows for skeletons.
  const [refreshing, setRefreshing] = useState(false);

  // Deep-link filters from dashboard cards: ?status=active, ?type=technical, ?category=…
  const typeParam = searchParams.get("type") ?? undefined;
  const statusParam = searchParams.get("status") ?? undefined;
  const categoryParam = searchParams.get("category") ?? undefined;
  const initialFilters = {
    type: typeParam && TYPES.includes(typeParam) ? typeParam : undefined,
    status: statusParam && STATUSES.includes(statusParam) ? statusParam : undefined,
    category: categoryParam ?? undefined,
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/products?includeInactive=true");
        const data = await res.json();
        if (cancelled) return;

        if (data.success) {
          setProducts(
            data.data.map((p: AdminProduct) => ({
              ...p,
              productType: p.productType ?? "formulation",
              isActive: p.isActive ?? true,
              isFeatured: p.isFeatured ?? false,
            }))
          );
        } else {
          toast.error(data.error || "Failed to load products");
          setProducts([]);
        }
      } catch {
        if (!cancelled) {
          toast.error("Failed to load products");
          setProducts([]);
        }
      } finally {
        if (!cancelled) setRefreshing(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  return (
    <div>
      <PageHeader
        title="Products"
        description="Manage the catalog across formulations, technicals and solvents."
        actions={
          <ButtonLink href="/admin/dashboard/products/new">
            <Plus className="h-4 w-4" />
            New product
          </ButtonLink>
        }
      />

      {products === null ? (
        <TableSkeleton />
      ) : (
        <ProductsTable
          key={`${initialFilters.type}-${initialFilters.status}-${initialFilters.category}`}
          products={products}
          initialFilters={initialFilters}
          refreshing={refreshing}
          onChanged={() => {
            setRefreshing(true);
            setRefreshKey((k) => k + 1);
          }}
        />
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}
