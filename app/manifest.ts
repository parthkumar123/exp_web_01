import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

// Icons are served by the file-based app/icon.png (192×192) and
// app/apple-icon.png (180×180). No square 512×512 source exists yet —
// upscaling the 192px mark would look worse than omitting it; drop a real
// 512px asset into app/ (as icon2.png or similar) if PWA installability is
// ever wanted.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Senso Agrotech Private Limited",
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#022c22",
    theme_color: "#022c22",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
