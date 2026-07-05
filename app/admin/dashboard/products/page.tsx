"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { PageHeader, ButtonLink } from "@/components/admin/ui";
import { TableSkeleton } from "@/components/admin/Skeleton";
import { ProductsTable } from "@/components/admin/ProductsTable";

const TYPES = ["formulation", "technical", "solvent"];
const STATUSES = ["active", "inactive", "featured"];

function ProductsContent() {
  const searchParams = useSearchParams();

  // Deep-link filters from dashboard cards: ?status=active, ?type=technical, ?category=…
  const typeParam = searchParams.get("type") ?? undefined;
  const statusParam = searchParams.get("status") ?? undefined;
  const categoryParam = searchParams.get("category") ?? undefined;
  const initialFilters = {
    type: typeParam && TYPES.includes(typeParam) ? typeParam : undefined,
    status: statusParam && STATUSES.includes(statusParam) ? statusParam : undefined,
    category: categoryParam ?? undefined,
  };

  return (
    // Viewport-fit column (100vh − 3.5rem topbar − 3rem main padding): the
    // table card stretches to fill the remaining height exactly, so there is
    // neither a root-level scrollbar nor dead space below the card.
    <div className="flex h-[calc(100vh-6.5rem)] flex-col">
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

      {/* Data fetching lives inside the table — server-side pagination,
          search and filters; the console never loads the whole catalog. */}
      <ProductsTable
        key={`${initialFilters.type}-${initialFilters.status}-${initialFilters.category}`}
        initialFilters={initialFilters}
      />
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
