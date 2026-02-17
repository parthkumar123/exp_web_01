/**
 * Full-page background image with dark overlay for readability.
 * Uses royalty-free images from Unsplash (agriculture/farming theme).
 */
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1920&q=80";

export default function PageBackgroundImage({
  src = DEFAULT_IMAGE,
  imageOpacity = 0.2,
}: {
  src?: string;
  imageOpacity?: number;
}) {
  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      {/* Background photo - subtle so theme stays dark */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${src})`,
          opacity: imageOpacity,
        }}
      />
      {/* Dark gradient overlay for contrast and readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f0d] via-emerald-950/30 to-[#0a0f0d]" />
    </div>
  );
}
