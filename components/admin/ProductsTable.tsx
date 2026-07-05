"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  Package,
  Pencil,
  RefreshCw,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/price";
import { cn } from "@/lib/cn";
import { useConfirm } from "./ConfirmDialog";
import { Badge, Button, EmptyState, Input, Select } from "./ui";
import { Skeleton } from "./Skeleton";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_TYPE_LABELS,
  productPublicPath,
  type AdminProduct,
} from "./types";

const columnHelper = createColumnHelper<AdminProduct>();

export function ProductsTable({
  products,
  onChanged,
  initialFilters,
  refreshing = false,
}: {
  products: AdminProduct[];
  /** Called after any mutation (and by the refresh button) so the page can refetch. */
  onChanged: () => void;
  /** Preset filters, e.g. from dashboard stat-card deep links (?status=active). */
  initialFilters?: { type?: string; category?: string; status?: string };
  /** True while the page is refetching — rows swap to skeletons, filters stay. */
  refreshing?: boolean;
}) {
  const router = useRouter();
  const confirm = useConfirm();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState(initialFilters?.type ?? "all");
  const [categoryFilter, setCategoryFilter] = useState(initialFilters?.category ?? "all");
  const [statusFilter, setStatusFilter] = useState(initialFilters?.status ?? "all");
  const [rowSelection, setRowSelection] = useState({});
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (typeFilter !== "all" && p.productType !== typeFilter) return false;
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
      if (statusFilter === "active" && !p.isActive) return false;
      if (statusFilter === "inactive" && p.isActive) return false;
      if (statusFilter === "featured" && !p.isFeatured) return false;
      return true;
    });
  }, [products, typeFilter, categoryFilter, statusFilter]);

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer rounded border-admin-border accent-[#065f46]"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            aria-label="Select all rows on this page"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer rounded border-admin-border accent-[#065f46]"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            aria-label="Select row"
          />
        ),
        size: 32,
      }),
      columnHelper.accessor("name", {
        header: "Product",
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="flex min-w-0 items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt=""
                className="h-10 w-10 flex-shrink-0 rounded-md border border-admin-border bg-admin-hover object-contain"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-admin-ink">{p.name}</p>
                <p className="truncate text-xs text-admin-faint">
                  {p.activeIngredient || p.casNumber || p.slug}
                </p>
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor("productType", {
        header: "Type",
        cell: ({ getValue }) => {
          const t = getValue();
          return (
            <Badge tone={t === "formulation" ? "green" : t === "technical" ? "blue" : "slate"}>
              {PRODUCT_TYPE_LABELS[t]}
            </Badge>
          );
        },
      }),
      columnHelper.accessor((p) => p.category ?? "", {
        id: "category",
        header: "Category",
        cell: ({ getValue }) => (
          <span className="text-sm text-admin-body">{getValue() || "—"}</span>
        ),
      }),
      columnHelper.accessor((p) => p.priceMin ?? null, {
        id: "price",
        header: "Price",
        cell: ({ row }) => (
          <span className="text-sm text-admin-body">
            {formatPrice(row.original) ?? "On request"}
          </span>
        ),
      }),
      columnHelper.accessor((p) => p.updatedAt ?? "", {
        id: "updated",
        header: "Updated",
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="text-sm leading-tight">
              <p className="text-admin-body">
                {p.updatedAt
                  ? new Date(p.updatedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })
                  : "—"}
              </p>
              {p.updatedBy?.name && (
                <p className="text-xs text-admin-faint" title={p.updatedBy.email}>
                  by {p.updatedBy.name}
                </p>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor("isActive", {
        header: "Status",
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="flex items-center gap-1.5">
              {p.isActive ? <Badge tone="green">Active</Badge> : <Badge tone="red">Inactive</Badge>}
              {p.isFeatured && (
                <Badge tone="amber">
                  <Star className="mr-1 h-3 w-3 fill-current" />
                  Featured
                </Badge>
              )}
            </div>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="flex items-center justify-end gap-1">
              {p.isActive && (
                <Link
                  href={productPublicPath(p)}
                  target="_blank"
                  className="rounded-md p-1.5 text-admin-muted transition-colors hover:bg-admin-hover hover:text-admin-ink"
                  title="View live page"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              )}
              <Link
                href={`/admin/dashboard/products/edit/${p._id}`}
                className="rounded-md p-1.5 text-admin-muted transition-colors hover:bg-admin-hover hover:text-admin-ink"
                title="Edit"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <button
                onClick={() => deleteOne(p)}
                className="rounded-md p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        },
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting, globalFilter, rowSelection },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: (row, _columnId, value) => {
      const q = String(value).toLowerCase();
      const p = row.original;
      return [p.name, p.slug, p.activeIngredient, p.casNumber, p.category]
        .filter(Boolean)
        .some((f) => String(f).toLowerCase().includes(q));
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
    getRowId: (row) => row._id,
  });

  const selected = table.getSelectedRowModel().rows.map((r) => r.original);

  async function deleteOne(p: AdminProduct) {
    const ok = await confirm({
      title: `Delete “${p.name}”?`,
      description:
        "The product is removed permanently and its public page will stop resolving. This cannot be undone.",
      confirmText: "Delete",
      destructive: true,
    });
    if (!ok) return;

    const res = await fetch(`/api/products/${p._id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      toast.success("Product deleted");
      onChanged();
    } else {
      toast.error(data.error || "Failed to delete product");
    }
  }

  async function bulkSetActive(isActive: boolean) {
    const ok = await confirm({
      title: `${isActive ? "Activate" : "Deactivate"} ${selected.length} product(s)?`,
      description: isActive
        ? "They will become visible in the public catalog immediately."
        : "They will be hidden from the public catalog immediately.",
      confirmText: isActive ? "Activate" : "Deactivate",
    });
    if (!ok) return;

    setBusy(true);
    try {
      const results = await Promise.all(
        selected.map((p) =>
          fetch(`/api/products/${p._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isActive }),
          }).then((r) => r.ok)
        )
      );
      const failed = results.filter((r) => !r).length;
      if (failed) toast.error(`${failed} product(s) failed to update`);
      else toast.success(`${results.length} product(s) ${isActive ? "activated" : "deactivated"}`);
      setRowSelection({});
      onChanged();
    } finally {
      setBusy(false);
    }
  }

  async function bulkDelete() {
    const ok = await confirm({
      title: `Delete ${selected.length} product(s)?`,
      description: "All selected products are removed permanently. This cannot be undone.",
      confirmText: "Delete all",
      destructive: true,
    });
    if (!ok) return;

    setBusy(true);
    try {
      const results = await Promise.all(
        selected.map((p) =>
          fetch(`/api/products/${p._id}`, { method: "DELETE" }).then((r) => r.ok)
        )
      );
      const failed = results.filter((r) => !r).length;
      if (failed) toast.error(`${failed} product(s) failed to delete`);
      else toast.success(`${results.length} product(s) deleted`);
      setRowSelection({});
      onChanged();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-52 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-admin-faint" />
          <Input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search name, slug, ingredient, CAS…"
            className="pl-9"
          />
        </div>
        <Select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-auto"
          aria-label="Filter by type"
        >
          <option value="all">All types</option>
          <option value="formulation">Formulations</option>
          <option value="technical">Technicals</option>
          <option value="solvent">Solvents</option>
        </Select>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-auto"
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {PRODUCT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-auto"
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="featured">Featured</option>
        </Select>
        <Button
          variant="secondary"
          onClick={onChanged}
          disabled={refreshing}
          title="Refresh"
          aria-label="Refresh products"
          className="px-2.5"
        >
          <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
        </Button>
      </div>

      {/* Bulk action bar */}
      {selected.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-admin-border bg-admin-surface px-3 py-2">
          <span className="text-sm font-medium text-admin-ink">{selected.length} selected</span>
          <span className="mx-1 h-4 w-px bg-admin-border" />
          <Button variant="secondary" disabled={busy} onClick={() => bulkSetActive(true)}>
            Activate
          </Button>
          <Button variant="secondary" disabled={busy} onClick={() => bulkSetActive(false)}>
            Deactivate
          </Button>
          <Button variant="danger" disabled={busy} onClick={bulkDelete}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-admin-border bg-admin-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-admin-border bg-admin-bg/60">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => {
                    const canSort = header.column.getCanSort();
                    const dir = header.column.getIsSorted();
                    return (
                      <th
                        key={header.id}
                        className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-admin-muted"
                      >
                        {header.isPlaceholder ? null : canSort ? (
                          <button
                            className="flex items-center gap-1 hover:text-admin-ink"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {dir === "asc" ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : dir === "desc" ? (
                              <ChevronDown className="h-3.5 w-3.5" />
                            ) : (
                              <ArrowUpDown className="h-3 w-3 opacity-50" />
                            )}
                          </button>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-admin-border">
              {refreshing &&
                Array.from({ length: Math.min(Math.max(filtered.length, 3), 10) }).map((_, i) => (
                  <tr key={`skeleton-${i}`}>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-4" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 flex-shrink-0 rounded-md" />
                        <div className="flex-1 space-y-1.5">
                          <Skeleton className="h-3.5 w-2/3" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-3.5 w-20" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-3.5 w-16" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-3.5 w-20" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="ml-auto h-4 w-20" />
                    </td>
                  </tr>
                ))}
              {!refreshing &&
                table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "transition-colors hover:bg-admin-hover/50",
                    row.getIsSelected() && "bg-admin-primary/5"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!refreshing && table.getRowModel().rows.length === 0 && (
          <EmptyState
            icon={Package}
            title={
              globalFilter || typeFilter !== "all" || categoryFilter !== "all" || statusFilter !== "all"
                ? "No products match your filters"
                : "No products yet"
            }
            description={
              globalFilter || typeFilter !== "all" || categoryFilter !== "all" || statusFilter !== "all"
                ? "Try changing or clearing the search and filters."
                : "Create your first product to see it listed here."
            }
            action={
              globalFilter || typeFilter !== "all" || categoryFilter !== "all" || statusFilter !== "all" ? (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setGlobalFilter("");
                    setTypeFilter("all");
                    setCategoryFilter("all");
                    setStatusFilter("all");
                  }}
                >
                  Clear filters
                </Button>
              ) : (
                <Button onClick={() => router.push("/admin/dashboard/products/new")}>
                  New product
                </Button>
              )
            }
          />
        )}

        {/* Pagination */}
        {!refreshing && table.getPageCount() > 1 && (
          <div className="flex items-center justify-between border-t border-admin-border px-4 py-2.5">
            <p className="text-xs text-admin-muted">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} ·{" "}
              {filtered.length} products
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="rounded-md p-1.5 text-admin-muted hover:bg-admin-hover disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="rounded-md p-1.5 text-admin-muted hover:bg-admin-hover disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
