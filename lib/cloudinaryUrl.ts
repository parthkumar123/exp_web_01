/**
 * Insert Cloudinary delivery transformations into an image URL so browsers
 * receive smaller, modern-format images:
 *   - f_auto  → best format the browser supports (AVIF/WebP/…)
 *   - q_auto  → automatic quality
 *   - w_<n>,c_limit → cap the width (never upscales, keeps aspect ratio)
 *
 * Non-Cloudinary URLs and URLs that already carry a transformation are returned
 * unchanged. Pure function — safe in both Server and Client Components.
 */
export function cloudinaryAuto(url?: string, width?: number): string {
  if (!url) return "";
  const marker = "/upload/";
  if (!url.includes("res.cloudinary.com") || !url.includes(marker)) return url;

  const insertAt = url.indexOf(marker) + marker.length;
  const after = url.slice(insertAt);
  const firstSegment = after.split("/")[0];

  // Leave already-transformed URLs alone (e.g. "f_auto,q_auto" or "w_500,c_fill").
  const isVersion = /^v\d+$/.test(firstSegment);
  const hasTransform =
    !isVersion && !firstSegment.includes(".") && /[a-z]_[^/]/.test(firstSegment);
  if (hasTransform) return url;

  const transform = width ? `f_auto,q_auto,w_${width},c_limit` : "f_auto,q_auto";
  return `${url.slice(0, insertAt)}${transform}/${after}`;
}
