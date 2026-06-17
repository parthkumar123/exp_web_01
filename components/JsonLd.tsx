/**
 * Renders one or more JSON-LD structured-data blocks.
 * Server Component — outputs a <script type="application/ld+json"> tag, the
 * Google-recommended way to embed structured data in Next.js.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, build-time/server generated content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
