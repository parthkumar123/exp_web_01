"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-emerald-900/30 to-zinc-900">
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
                  Senso Agrotech Pvt. Ltd. had started as a small scale unit for
                  the manufacturing of crop protection chemical almost one
                  decade ago. By Acquisition, backward and forward integration,
                  Senso Agrotech Pvt. Ltd. now has become one of the leading
                  manufacturers of wide range of products- Insecticides,
                  Fungicides, Herbicides, Micro Fertilizers, Plant Growth
                  Regulators and Soil Plant Health Products.
                </p>
                <p>
                  Senso Agrotech Pvt. Ltd. believes in the strategy of
                  continuous expansion and development of high value and branded
                  products with thrust on registration and marketing according
                  to customer requirement.
                </p>
                <p>
                  Senso Agrotech Pvt. Ltd. has manufacturing units located at
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
                  The aim of Senso Agrotech Pvt. Ltd. is to build strong
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
  );
}
