/**
 * MRP / price helpers. A product's price is optional and can be:
 *   - a single value   → priceMin set (priceMax empty or equal)
 *   - a range          → priceMin..priceMax (max > min)
 *   - empty            → "Price on request"
 * Kept framework-free so it is safe in Server and Client Components.
 */

export interface PriceInput {
  priceMin?: number | null;
  priceMax?: number | null;
  currency?: string | null;
}

/** True when the product has at least one price value entered. */
export function hasPrice(p: PriceInput): boolean {
  return p.priceMin != null || p.priceMax != null;
}

function formatAmount(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Unknown currency code — fall back to a plain "<CODE> <amount>".
    return `${currency} ${amount.toLocaleString("en-IN")}`;
  }
}

/**
 * Human-readable price string, or null when no price is set.
 * e.g. "₹1,200", "₹1,200 – ₹1,800".
 */
export function formatPrice(p: PriceInput): string | null {
  if (!hasPrice(p)) return null;
  const currency = p.currency || "INR";
  const min = p.priceMin ?? p.priceMax!;
  const max = p.priceMax ?? p.priceMin!;
  if (max > min) {
    return `${formatAmount(min, currency)} – ${formatAmount(max, currency)}`;
  }
  return formatAmount(min, currency);
}
