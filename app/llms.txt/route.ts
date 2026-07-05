import { SITE_URL, SITE_NAME, COMPANY_LEGAL_NAME, SITE_DESCRIPTION } from "@/lib/seo";
import { getProductSlugs, getProductSlugsByType, type ProductLink } from "@/lib/products";

// llms.txt (llmstxt.org convention): a plain-markdown summary of the site for
// AI crawlers. Built from the same data helpers as the XML sitemap so it can
// never drift. Speculative by design — no major AI system reads it today —
// but it costs one cached route. Never create a static public/llms.txt; it
// would shadow this route with stale content.
export const revalidate = 3600;

const STATIC_SECTIONS = `## Main pages

- [Home](${SITE_URL}/): Company overview and featured crop protection products
- [Products](${SITE_URL}/products): Full catalogue — Insecticides, Fungicides, Herbicides, PGR, Fertilizers, Biologicals
- [Technicals](${SITE_URL}/technicals): Technical grade active ingredients (raw AI) for formulators and bulk/export buyers
- [Solvents](${SITE_URL}/solvents): Industrial and agrochemical carrier solvents supplied in bulk
- [About Us](${SITE_URL}/about): Company history, mission and manufacturing capabilities
- [Contact](${SITE_URL}/contact): Address, phone, email, WhatsApp and FAQ
- [Sitemap](${SITE_URL}/site-map): Human-readable index of every page
`;

function linkList(heading: string, base: string, items: ProductLink[]): string {
  if (items.length === 0) return "";
  const lines = items.map((p) => `- [${p.name}](${SITE_URL}${base}/${p.slug})`);
  return `\n## ${heading}\n\n${lines.join("\n")}\n`;
}

export async function GET() {
  // Helpers swallow DB errors and return [] — the static sections always serve.
  const [products, technicals, solvents] = await Promise.all([
    getProductSlugs(),
    getProductSlugsByType("technical"),
    getProductSlugsByType("solvent"),
  ]);

  const body = `# ${SITE_NAME}

> ${COMPANY_LEGAL_NAME} — ${SITE_DESCRIPTION} Based at GIDC Industrial Estate, Ankleshwar, Gujarat, India. Supplies formulations across India and technicals & solvents in bulk for export.

Canonical domain: ${SITE_URL}

${STATIC_SECTIONS}${linkList("Products (formulations)", "/products", products)}${linkList("Technicals (raw active ingredients)", "/technicals", technicals)}${linkList("Solvents (bulk)", "/solvents", solvents)}`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
