import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageBackgroundImage from "@/components/PageBackgroundImage";
import JsonLd from "@/components/JsonLd";
import {
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
  localBusinessSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/seo";

const DESCRIPTION =
  "Contact Senso Agrotech Private Limited — crop protection manufacturer in Ankleshwar, Gujarat. Call, email or message us on WhatsApp for product enquiries and quotes.";

export const metadata: Metadata = {
  title: "Contact Us",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/contact"),
    title: "Contact Us | Senso Agrotech",
    description: DESCRIPTION,
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Senso Agrotech",
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

// Rendered verbatim in the FAQ section below AND emitted as FAQPage JSON-LD —
// the two must stay identical (Google requires schema to mirror visible text).
const FAQS = [
  {
    question: "What products does Senso Agrotech manufacture?",
    answer:
      "We manufacture crop protection formulations — Insecticides, Fungicides, Herbicides, Plant Growth Regulators, Fertilizers and Biologicals — and also supply technical grade active ingredients (raw AI) and industrial solvents in bulk.",
  },
  {
    question: "Do you supply in bulk or for export?",
    answer:
      "Yes. Bulk and export supply is a core part of our business. Technicals and solvents are supplied in drums and IBCs to formulators and international buyers. Contact us with your requirement and destination for a quote.",
  },
  {
    question: "Can you provide a COA and product specifications?",
    answer:
      "Yes. A Certificate of Analysis (COA), specifications and packing details are available on request for all technicals, solvents and formulations.",
  },
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer:
      "MOQ depends on the product and packing. Retail-pack formulations and bulk supplies have different minimums — share your requirement by phone, email or WhatsApp and we will confirm MOQ and lead time.",
  },
  {
    question: "How do I become a dealer or distributor?",
    answer:
      "We welcome dealership and distributor enquiries across India. Call us on +91 63549 14468 or email sales@sensoagrotech.com with your name, firm, and the districts you cover, and our sales team will get in touch.",
  },
  {
    question: "Is Senso Agrotech a registered manufacturer?",
    answer:
      "Yes. Senso Agrotech Private Limited is registered with CIB&RC and operates an ISO 9001:2015 certified manufacturing facility at GIDC Industrial Estate, Ankleshwar, Gujarat.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen relative">
      <JsonLd
        data={[
          localBusinessSchema,
          buildBreadcrumbSchema([{ name: "Contact Us", path: "/contact" }]),
          buildFaqSchema(FAQS),
        ]}
      />
      <PageBackgroundImage src="https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1920&q=80" imageOpacity={0.18} />
      <div className="relative z-10">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-radial from-emerald-500/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-8 text-center relative z-10">
          <div className="inline-block px-6 py-2 mb-8 backdrop-blur-xl bg-emerald-500/20 border border-emerald-500/40 rounded-full">
            <span className="text-sm font-medium text-emerald-300 tracking-[0.2em] uppercase">
              Contact Us
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extralight text-white mb-6 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-light">
            We&apos;re here to help. Reach out to us through any of the
            following channels
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards - min-w-0 prevents truncation, flex for consistent height */}

            {/* Visit Us */}
            <div className="min-w-0 flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 hover:border-white/20 hover:bg-white/[0.06] transition-all">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center mb-6 shrink-0">
                <svg
                  className="w-7 h-7 text-emerald-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-4">Visit Us</h3>
              <p className="text-slate-200 leading-relaxed font-light">
                Plot No. J-7832, GIDC Ind. Estate, Ankleshwar,
                <br />
                Gujarat, India - 393002
              </p>
            </div>

            {/* Call Us */}
            <div className="min-w-0 flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 hover:border-white/20 hover:bg-white/[0.06] transition-all">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center mb-6 shrink-0">
                <svg
                  className="w-7 h-7 text-amber-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-4">Call Us</h3>
              <p className="text-slate-200 font-light">
                <a
                  href="tel:+916354914468"
                  className="hover:text-emerald-400 transition-colors"
                >
                  +91 63549 14468
                </a>
              </p>
            </div>

            {/* Email Us */}
            <div className="min-w-0 flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 hover:border-white/20 hover:bg-white/[0.06] transition-all">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center mb-6 shrink-0">
                <svg
                  className="w-7 h-7 text-blue-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-4">Email Us</h3>
              <p className="text-slate-200 font-light break-words">
                <a
                  href="mailto:sales@sensoagrotech.com"
                  className="hover:text-emerald-400 transition-colors break-all"
                >
                  sales@sensoagrotech.com
                </a>
              </p>
            </div>

            {/* WhatsApp */}
            <div className="min-w-0 flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 hover:border-white/20 hover:bg-white/[0.06] transition-all">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center mb-6 shrink-0">
                <svg
                  className="w-7 h-7 text-green-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-4">WhatsApp</h3>
              <p className="text-slate-200 font-light mb-4 flex-1">
                Message us directly on WhatsApp
              </p>
              <a
                href="https://wa.me/916354914468?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-600/20 border border-green-500/40 text-green-300 font-medium rounded-xl hover:bg-green-500/30 hover:border-green-400/50 transition-colors duration-300 w-fit"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            {/* Business Hours */}
            <div className="min-w-0 flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 hover:border-white/20 hover:bg-white/[0.06] transition-all">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center mb-6 shrink-0">
                <svg
                  className="w-7 h-7 text-emerald-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light text-white mb-4">
                Business Hours
              </h3>
              <div className="space-y-1.5 text-slate-200 font-light">
                <p>Monday – Saturday</p>
                <p className="font-normal text-white/90">9:00 AM – 6:00 PM</p>
                <p className="text-amber-400/90 font-normal pt-1">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-6">
            <div className="inline-block px-4 py-1.5 mb-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full">
              <span className="text-xs font-medium text-white/70 tracking-[0.2em] uppercase">
                Location
              </span>
            </div>
            <h2 className="text-4xl font-extralight text-white mb-2 tracking-tight">
              Find Us on Map
            </h2>
            <p className="text-white/60 font-light text-sm">
              Visit our office and manufacturing facility
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden max-w-2xl mx-auto">
            <div className="flex items-center justify-center py-8 px-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7 text-emerald-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                {/* <h3 className="text-lg font-medium text-white mb-1">
                  Google Maps Integration
                </h3> */}
                <p className="text-white/60 text-sm font-light mb-4">
                  Plot No. J-7832, GIDC Ind. Estate Ankleshwar, Gujarat 393002
                </p>
                <a
                  href="https://maps.app.goo.gl/nyyQ5grTsXvgb4bT7?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2.5 text-sm bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 text-emerald-300 font-medium rounded-lg hover:bg-emerald-500/30 transition-colors duration-300"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — visible copy must stay identical to the FAQS constant / JSON-LD */}
      <section className="py-16 relative">
        <div className="max-w-3xl mx-auto px-8">
          <div className="text-center mb-10">
            <div className="inline-block px-4 py-1.5 mb-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full">
              <span className="text-xs font-medium text-white/70 tracking-[0.2em] uppercase">
                FAQ
              </span>
            </div>
            <h2 className="text-4xl font-extralight text-white mb-2 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-white/60 font-light text-sm">
              Quick answers about products, bulk supply and dealership
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] open:bg-white/[0.06] transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 text-white font-light">
                  <h3 className="text-base font-normal">{faq.question}</h3>
                  <span
                    aria-hidden
                    className="shrink-0 text-emerald-400 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-5 text-slate-200 font-light leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}
