import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageBackgroundImage from "@/components/PageBackgroundImage";

const EXPLORE = [
  {
    name: "Product Catalogue",
    href: "/products",
    icon: "🌿",
    description: "Insecticides, Fungicides, Herbicides, PGR & more",
  },
  {
    name: "Technicals",
    href: "/technicals",
    icon: "🧪",
    description: "Raw active ingredients for formulators & export",
  },
  {
    name: "Solvents",
    href: "/solvents",
    icon: "🛢️",
    description: "Bulk industrial & agrochemical carrier solvents",
  },
  {
    name: "Contact Us",
    href: "/contact",
    icon: "📞",
    description: "Quotes, dealership & bulk supply enquiries",
  },
];

export default function NotFound() {
  return (
    <div className="min-h-screen relative">
      <PageBackgroundImage imageOpacity={0.18} />
      <div className="relative z-10">
        <Navigation />

        <section className="pt-36 pb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-emerald-500/20 via-transparent to-transparent" />
          <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
            <div className="inline-block px-6 py-2 mb-8 backdrop-blur-xl bg-emerald-500/20 border border-emerald-500/40 rounded-full">
              <span className="text-sm font-medium text-emerald-300 tracking-[0.2em] uppercase">
                Error 404
              </span>
            </div>

            <p
              aria-hidden
              className="text-[7rem] md:text-[10rem] font-extralight leading-none tracking-tight bg-gradient-to-b from-white via-emerald-200 to-emerald-500/40 bg-clip-text text-transparent select-none"
            >
              404
            </p>

            <h1 className="text-4xl md:text-5xl font-extralight text-white mt-2 mb-5 tracking-tight">
              This field is empty
            </h1>
            <p className="text-lg text-white/70 max-w-xl mx-auto font-light mb-10">
              The page you&apos;re looking for doesn&apos;t exist or may have
              been moved — but the harvest is just a click away.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/25"
              >
                Go to homepage
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 text-white font-medium border border-white/20 hover:bg-white/15 transition-colors backdrop-blur-xl"
              >
                Browse products
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-24 relative">
          <div className="max-w-4xl mx-auto px-8">
            <p className="text-center text-white/50 text-xs uppercase tracking-[0.2em] mb-6">
              Or explore
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {EXPLORE.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:border-emerald-500/30 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <span
                    aria-hidden
                    className="w-11 h-11 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-xl"
                  >
                    {item.icon}
                  </span>
                  <span>
                    <span className="block font-medium text-white group-hover:text-emerald-300 transition-colors">
                      {item.name}
                    </span>
                    <span className="block text-sm text-slate-300 font-light mt-0.5">
                      {item.description}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
