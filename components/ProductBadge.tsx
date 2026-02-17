import { type ReactNode } from "react";

export type ProductBadgeVariant = "ingredient" | "target" | "category" | "crop";

const variantStyles: Record<ProductBadgeVariant, string> = {
  ingredient:
    "bg-emerald-500/25 text-emerald-300 border border-emerald-500/20",
  target:
    "bg-white/10 text-slate-200 border border-white/10",
  category:
    "bg-white/10 text-white border border-white/10 backdrop-blur-sm",
  crop:
    "bg-white/10 text-slate-200 border border-white/10",
};

interface ProductBadgeProps {
  children: ReactNode;
  variant?: ProductBadgeVariant;
  className?: string;
}

export function ProductBadge({
  children,
  variant = "target",
  className = "",
}: ProductBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${variantStyles[variant]} ${className}`.trim()}
    >
      {children}
    </span>
  );
}

/**
 * Parses a string or array of strings into a flat list of non-empty trimmed values.
 * Splits on commas so "A, B, C" or ["A, B", "C"] both become ["A", "B", "C"].
 */
export function parseBadgeItems(
  value: string | string[] | undefined
): string[] {
  if (value == null) return [];
  if (Array.isArray(value)) {
    return value.flatMap((s) =>
      String(s)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    );
  }
  return String(value)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
