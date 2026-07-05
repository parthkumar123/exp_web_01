/**
 * Inline brand logos for the Apps section. Inline SVG keeps the strict CSP
 * happy (no external image hosts) and lets them scale crisply.
 */

/** Cloudinary cloud mark in the brand blue (#3448C5). */
export function CloudinaryLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 512" className={className} aria-hidden="true">
      <path
        fill="#3448C5"
        d="M0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4 4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336z"
      />
    </svg>
  );
}

/** Compact connection indicator: green dot = connected, red = not configured. */
export function StatusDot({
  connected,
  label,
}: {
  connected: boolean;
  label?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5"
      title={label ?? (connected ? "Connected" : "Not configured")}
    >
      <span
        className={`h-2 w-2 flex-shrink-0 rounded-full ${
          connected ? "bg-emerald-500" : "bg-red-500"
        }`}
      />
      {label && <span className="text-xs text-admin-muted">{label}</span>}
    </span>
  );
}
