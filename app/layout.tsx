import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CookieConsent from "@/components/CookieConsent";
import { SITE_URL } from "@/lib/seo";

// Google Search Console verification token — injected only when the env var
// is set, so local/dev builds stay clean. See .env.example. Analytics (GA4 +
// Clarity) live in <CookieConsent /> behind a GDPR consent gate.
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Child pages set bare titles ("Products", product names, …); the template
  // appends the brand once. Never hardcode "| Senso Agrotech" in a page title.
  title: {
    default: "Senso Agrotech - Protecting Crops, Empowering Farmers",
    template: "%s | Senso Agrotech",
  },
  description:
    "Manufacturing excellence in crop protection solutions. Premium Insecticides, Fungicides, Herbicides & Plant Growth Regulators. Registered with CIB&RC, committed to sustainable agriculture.",
  authors: [{ name: "Senso Agrotech Private Limited" }],
  creator: "Senso Agrotech Private Limited",
  publisher: "Senso Agrotech Private Limited",
  // Favicon / app icons are provided by the file-based app/favicon.ico,
  // app/icon.png and app/apple-icon.png (proper square assets).
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    title: "Senso Agrotech - Protecting Crops, Empowering Farmers",
    description:
      "Manufacturing excellence in crop protection solutions. Trusted by 25,000+ farmers nationwide.",
    siteName: "Senso Agrotech",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Senso Agrotech — Protecting Crops, Empowering Farmers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senso Agrotech - Protecting Crops, Empowering Farmers",
    description:
      "Premium crop protection solutions. 150+ Products. 10+ Years Excellence.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
};

export const viewport: Viewport = {
  // emerald-950 — matches the site's dark theme (browser UI / PWA chrome).
  themeColor: "#022c22",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <FloatingWhatsApp />
        <CookieConsent />
      </body>
    </html>
  );
}
