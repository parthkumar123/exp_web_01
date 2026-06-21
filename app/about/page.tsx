import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageBackgroundImage from "@/components/PageBackgroundImage";
import { SITE_NAME, DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/seo";

const DESCRIPTION =
  "Senso Agrotech Private Limited is one of India's leading manufacturers of crop protection products — Insecticides, Fungicides, Herbicides, PGRs and fertilizers — with over a decade of ISO 9001:2015 certified manufacturing excellence.";

export const metadata: Metadata = {
  title: "About Us | Senso Agrotech",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/about"),
    title: "About Us | Senso Agrotech",
    description: DESCRIPTION,
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Senso Agrotech",
    description: DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function AboutPage() {
  const values = [
    {
      title: "Our Mission",
      icon: "🎯",
      description:
        "We help in improving of life for the world's population by supplying quality products that helps our farmers increasing yields and crop quality to satisfy global demand for food, feed, fibers and energy.",
      bgColor: "from-emerald-600/20 to-emerald-800/20",
    },
    {
      title: "Values",
      icon: "🤝",
      description:
        "Integrity in all our thoughts and actions Equality in our dealings with customers, employees and Collaboration with clients, vendors and partners.",
      bgColor: "from-amber-600/20 to-amber-800/20",
    },
    {
      title: "Farmer First",
      icon: "👨‍🌾",
      description:
        "Building lasting relationships with farmers through comprehensive support, training, and accessible pricing.",
      bgColor: "from-blue-600/20 to-blue-800/20",
    },
    {
      title: "Vision",
      icon: "⚡",
      description:
        "We create results for our customers supplying broad range of quality crop protection products. We strongly believe in 'Farmer First' & Harvesting happiness.",
      bgColor: "from-emerald-700/20 to-emerald-900/20",
    },
  ];

  return (
    <div className="min-h-screen relative">
      <PageBackgroundImage src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80" imageOpacity={0.18} />
      <div className="relative z-10">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 mb-8 backdrop-blur-xl bg-emerald-500/20 border border-emerald-500/40 rounded-full">
              <span className="text-sm font-medium text-emerald-300 tracking-[0.2em] uppercase">
                About Us
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extralight text-white mb-6 tracking-tight">
              Why Choose
              <br />
              <span className="font-light bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
                Senso Agrotech?
              </span>
            </h1>
            <p className="text-xl text-white/80 font-light max-w-4xl mx-auto leading-relaxed">
              With over 10 years of manufacturing excellence, we are committed
              to delivering superior crop protection solutions backed by
              scientific innovation and farmer trust.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 hover:border-emerald-400/50 hover:bg-gradient-to-br hover:from-white/15 hover:to-emerald-500/15 transition-all duration-300 group flex flex-col"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${value.bgColor} backdrop-blur-xl rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                >
                  {value.icon}
                </div>
                <h3 className="text-xl font-light text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/75 leading-relaxed font-light text-sm flex-grow">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 mb-6 backdrop-blur-xl bg-emerald-500/20 border border-emerald-400/40 rounded-full">
                <span className="text-xs font-medium text-emerald-300 tracking-[0.2em] uppercase">
                  Our Story
                </span>
              </div>
              <h2 className="text-5xl font-extralight text-white mb-8 tracking-tight">
                A Decade of
                <br />
                <span className="font-light text-emerald-400">Excellence</span>
              </h2>
              <div className="space-y-6 text-white/75 leading-relaxed font-light">
                <p>
                  Senso Agrotech Private Limited had started as a small scale unit for
                  the manufacturing of crop protection chemical almost one
                  decade ago. By Acquisition, backward and forward integration,
                  Senso Agrotech Private Limited now has become one of the leading
                  manufacturers of wide range of products- Insecticides,
                  Fungicides, Herbicides, Micro Fertilizers, Plant Growth
                  Regulators and Soil Plant Health Products.
                </p>
                <p>
                  Senso Agrotech Private Limited believes in the strategy of
                  continuous expansion and development of high value and branded
                  products with thrust on registration and marketing according
                  to customer requirement.
                </p>
                <p>
                  Senso Agrotech Private Limited has manufacturing units located at
                  Ankleshwer in Gujarat. It runs on world class technologies and
                  quality services. Company focused on quality to serve its
                  customers. Each stage of production from raw material to
                  finished product is closely monitored and maintains the
                  standard. Company&apos;s unit certified with International
                  Standard under process ISO 9001:2015 for quality assurance.
                </p>
                <p>
                  R&D is Major strength for company and it continues to invest
                  in innovative formulation that are environmental and user
                  friendly. The company is fully committed to maintain and
                  expand its portfolio.
                </p>
                <p>
                  Beyond finished formulations, Senso Agrotech supplies{" "}
                  <span className="text-white/90">
                    technical grade active ingredients
                  </span>{" "}
                  and{" "}
                  <span className="text-white/90">
                    industrial &amp; agro solvents
                  </span>{" "}
                  in bulk — serving formulators and export buyers across the
                  value chain, from raw material to finished product.
                </p>
                <p>
                  The aim of Senso Agrotech Private Limited is to build strong
                  relationship with customers to understand their needs and
                  deliver real performance in term of usage.
                </p>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] backdrop-blur-2xl bg-gradient-to-br from-emerald-500/20 to-white/10 border border-emerald-500/30 rounded-3xl overflow-hidden hover:border-emerald-400/50 transition-all duration-300">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <svg
                      className="w-32 h-32 mx-auto text-emerald-400 mb-4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                    <p className="text-emerald-300 font-light">
                      Manufacturing Excellence
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find us on IndiaMART */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-8">
          <a
            href="https://www.indiamart.com/senso-agrotech/profile.html?srsltid=AfmBOoofd5c6NyIF93DPBfVSNpeuZK4hJfyWDkTTu9WfISTjmc7MVU2d"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-center justify-center gap-6 p-8 backdrop-blur-2xl bg-gradient-to-br from-white/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl hover:border-emerald-400/50 hover:from-white/15 hover:to-emerald-500/15 transition-all duration-300 group"
          >
            <img
              src="/indiamart.png"
              alt="IndiaMART"
              loading="lazy"
              decoding="async"
              className="h-14 w-auto object-contain"
            />
            <div className="text-center sm:text-left">
              <p className="text-white/60 text-sm font-medium tracking-[0.2em] uppercase mb-1">
                Also find us on
              </p>
              <p className="text-xl font-light text-white group-hover:text-emerald-400 transition-colors">
                IndiaMART
              </p>
            </div>
            <svg
              className="w-5 h-5 text-white/60 group-hover:text-emerald-400 transition-colors flex-shrink-0"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-light text-white mb-1">
                    Google Reviews
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-white">5.0</span>
                    <div className="flex gap-0.5" aria-hidden="true">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-white/60 text-sm">1 Google review</span>
                  </div>
                  <p className="text-white/50 text-sm mt-2">
                    Chemical manufacturer in Ankleshwar, Gujarat
                  </p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6 md:border-t-0 md:border-l md:border-white/10 md:pt-0 md:pl-8">
                <p className="text-white/70 text-sm font-light mb-2">
                  &ldquo;Highly recommended.&rdquo;
                </p>
                <p className="text-white/50 text-xs mb-4">
                  — chirag Shiyani · 5 stars
                </p>
                <a
                  href="https://www.google.com/search?q=Senso+agrotech+pvt.ltd+Ankleshwar+reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                >
                  View on Google
                  <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-radial from-emerald-500/20 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
            Ready to Transform
            <br />
            <span className="font-light bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
              Your Farming?
            </span>
          </h2>
          <p className="text-xl text-white/75 font-light mb-8 leading-relaxed">
            Join thousands of satisfied farmers who trust Senso Agrotech for
            their crop protection needs.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-full hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-500/20"
          >
            Get in Touch
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}
