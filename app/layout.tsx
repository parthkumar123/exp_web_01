import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Senso Agrotech - Protecting Crops, Empowering Farmers",
  description:
    "Manufacturing excellence in crop protection solutions. Premium Insecticides, Fungicides, Herbicides & Plant Growth Regulators. Registered with CIB&RC, committed to sustainable agriculture.",
  keywords: [
    "Senso Agrotech",
    "agrochemicals",
    "crop protection",
    "fungicides",
    "insecticides",
    "herbicides",
    "plant growth regulators",
    "agriculture India",
    "CIB&RC registered",
  ],
  authors: [{ name: "Senso Agrotech Private Limited" }],
  creator: "Senso Agrotech Private Limited",
  publisher: "Senso Agrotech Private Limited",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sensoagrotech.com",
    title: "Senso Agrotech - Protecting Crops, Empowering Farmers",
    description:
      "Manufacturing excellence in crop protection solutions. Trusted by 10K+ farmers nationwide.",
    siteName: "Senso Agrotech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Senso Agrotech - Protecting Crops, Empowering Farmers",
    description:
      "Premium crop protection solutions. 50+ Products. 10+ Years Excellence.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
