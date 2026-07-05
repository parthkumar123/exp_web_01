"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductDetailStickyBar({
  productName,
  price,
}: {
  productName: string;
  price?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Signal fixed-bottom elements (the floating WhatsApp button) to move up
  // out of the bar's way — see the body.has-sticky-bar rule in globals.css.
  useEffect(() => {
    document.body.classList.toggle("has-sticky-bar", visible);
    return () => document.body.classList.remove("has-sticky-bar");
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-between gap-4 px-6 py-4 bg-slate-900 border-t border-slate-600 shadow-lg">
      <div className="min-w-0">
        <p className="text-slate-200 text-sm truncate">{productName}</p>
        {price && (
          <p className="text-white font-semibold text-sm">{price}</p>
        )}
      </div>
      <Link
        href="/contact"
        className="shrink-0 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25"
      >
        Get Quote
      </Link>
    </div>
  );
}
