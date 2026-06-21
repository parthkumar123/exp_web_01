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

/** Public Google Maps link for the manufacturing facility. */
export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/nyyQ5grTsXvgb4bT7";

/** Single source of truth for NAP — shared by Organization + LocalBusiness. */
const TELEPHONE = "+91-63549-14468";
const EMAIL = "sensoagrotech2909@gmail.com";
const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Plot No. J-7832, GIDC Ind. Estate",
  addressLocality: "Ankleshwar",
  addressRegion: "Gujarat",
  postalCode: "393002",
  addressCountry: "IN",
} as const;

/** Organization schema — emitted on the homepage. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_LEGAL_NAME,
  legalName: COMPANY_LEGAL_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/logo.png"),
  image: absoluteUrl("/logo.png"),
  description: SITE_DESCRIPTION,
  email: EMAIL,
  telephone: TELEPHONE,
  address: POSTAL_ADDRESS,
  sameAs: SOCIAL_PROFILES,
} as const;

/**
 * LocalBusiness schema — emitted on the contact page. Strengthens local SEO
 * ("agrochemical manufacturer in Ankleshwar / Gujarat") and feeds the Google
 * knowledge panel. NAP matches the footer/contact page exactly.
 * NOTE: no `geo` lat/long is included to avoid guessing coordinates — add the
 * facility's exact lat/long here when known for an extra local-SEO signal.
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: COMPANY_LEGAL_NAME,
  legalName: COMPANY_LEGAL_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/logo.png"),
  image: absoluteUrl(DEFAULT_OG_IMAGE),
  description: SITE_DESCRIPTION,
  email: EMAIL,
  telephone: TELEPHONE,
  address: POSTAL_ADDRESS,
  hasMap: GOOGLE_MAPS_URL,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: SOCIAL_PROFILES,
} as const;

/** WebSite schema — helps search engines understand the site name. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
} as const;

/**
 * Minimal product shape needed to build Product + Offer structured data.
 * Works for all three lines (formulation / technical / solvent).
 */
export interface ProductSchemaInput {
  name: string;
  slug: string;
  image?: string;
  description?: string;
  aboutProduct?: string;
  category?: string;
  activeIngredient?: string;
  applicableCrops?: string[];
  packSizes?: string[];
  casNumber?: string;
  purity?: string;
  packing?: string[];
  priceMin?: number | null;
  priceMax?: number | null;
  currency?: string | null;
}

/**
 * Build a schema.org Offer / AggregateOffer from a product's price, or null
 * when no price is set. The value emitted here MUST match a price shown on the
 * page (Google requires structured-data prices to be visible).
 */
export function buildOffers(p: ProductSchemaInput, url: string) {
  if (p.priceMin == null && p.priceMax == null) return null;
  const priceCurrency = p.currency || "INR";
  const min = p.priceMin ?? p.priceMax!;
  const max = p.priceMax ?? p.priceMin!;
  const availability = "https://schema.org/InStock";
  if (max > min) {
    return {
      "@type": "AggregateOffer",
      priceCurrency,
      lowPrice: min,
      highPrice: max,
      availability,
      url,
    };
  }
  return {
    "@type": "Offer",
    priceCurrency,
    price: min,
    availability,
    url,
  };
}

/**
 * Build Product structured data WITH offers, or return null when the product
 * has no price. Returning null is intentional: a Product node without
 * offers/review/aggregateRating is flagged "invalid" in Search Console, so we
 * simply omit the Product markup for price-less items (they leave the report)
 * rather than fabricate reviews/ratings (a Google policy violation).
 */
export function buildProductSchema(p: ProductSchemaInput, canonical: string) {
  const offers = buildOffers(p, canonical);
  if (!offers) return null;

  const candidateProps: { name: string; value?: string }[] = [
    { name: "Active Ingredient", value: p.activeIngredient },
    { name: "CAS Number", value: p.casNumber },
    { name: "Purity", value: p.purity },
    { name: "Applicable Crops", value: p.applicableCrops?.join(", ") },
    { name: "Pack Sizes", value: p.packSizes?.join(", ") },
    { name: "Packing", value: p.packing?.join(", ") },
  ];
  const additionalProperty = candidateProps
    .filter((x) => x.value && x.value.length > 0)
    .map((x) => ({ "@type": "PropertyValue", name: x.name, value: x.value }));

  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: p.name,
    sku: p.slug,
    image: p.image ? [p.image] : undefined,
    description: p.description || p.aboutProduct || undefined,
    category: p.category || undefined,
    url: canonical,
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@type": "Organization", name: COMPANY_LEGAL_NAME },
    offers,
    ...(additionalProperty.length > 0 ? { additionalProperty } : {}),
  };
}
