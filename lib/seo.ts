/**
 * Centralised SEO constants and structured-data helpers.
 * Real company NAP data mirrors what is shown in the site footer / contact page
 * so that on-page content and structured data stay consistent (good for local SEO).
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_BASE_URL || "https://sensoagrotech.com"
).replace(/\/$/, "");

export const SITE_NAME = "Senso Agrotech";
export const COMPANY_LEGAL_NAME = "Senso Agrotech Private Limited";
export const SITE_DESCRIPTION =
  "Manufacturing excellence in crop protection solutions. Premium Insecticides, Fungicides, Herbicides & Plant Growth Regulators. Registered with CIB&RC, committed to sustainable agriculture.";

/** Default Open Graph / Twitter share image — 1200x630 banner (resolved against metadataBase). */
export const DEFAULT_OG_IMAGE = "/og-image.png";

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = ""): string {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

const SOCIAL_PROFILES = [
  "https://www.facebook.com/p/Senso-Agrotech-Pvt-Ltd-100068228083425/",
  "https://www.instagram.com/senso_agrotech_pvt.ltd_",
  "https://www.indiamart.com/senso-agrotech/profile.html",
];

/** Organization schema — emitted on the homepage. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_LEGAL_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/logo.png"),
  image: absoluteUrl("/logo.png"),
  description: SITE_DESCRIPTION,
  email: "sensoagrotech2909@gmail.com",
  telephone: "+91-63549-14468",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot No. J-7832, GIDC Ind. Estate",
    addressLocality: "Ankleshwar",
    addressRegion: "Gujarat",
    postalCode: "393002",
    addressCountry: "IN",
  },
  sameAs: SOCIAL_PROFILES,
} as const;

/** WebSite schema — helps search engines understand the site name. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
} as const;
