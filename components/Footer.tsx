"use client";

import { useState } from "react";

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <img src="/facebook.png" alt="Facebook" className="w-5 h-5 object-contain" />
      ),
      url: "https://www.facebook.com/p/Senso-Agrotech-Pvt-Ltd-100068228083425/",
    },
    {
      name: "Instagram",
      icon: (
        <img src="/instagram.png" alt="Instagram" className="w-5 h-5 object-contain" />
      ),
      url: "https://www.instagram.com/senso_agrotech_pvt.ltd_?igsh=MW94dGoyZDZxeDN2cQ==",
    },
    {
      name: "IndiaMART",
      icon: (
        <img src="/indiamart.png" alt="IndiaMART" className="w-5 h-5 object-contain" />
      ),
      url: "https://www.indiamart.com/senso-agrotech/profile.html?srsltid=AfmBOoofd5c6NyIF93DPBfVSNpeuZK4hJfyWDkTTu9WfISTjmc7MVU2d",
    },
  ];

  const quickLinks = [
    { name: "About Us", url: "/about" },
    { name: "Our Products", url: "/products" },
    { name: "Contact Us", url: "/contact" },
    { name: "Find us on IndiaMART", url: "https://www.indiamart.com/senso-agrotech/profile.html?srsltid=AfmBOoofd5c6NyIF93DPBfVSNpeuZK4hJfyWDkTTu9WfISTjmc7MVU2d", external: true },
  ];

  const productCategories = [
    { name: "Insecticides", url: "/products" },
    { name: "Fungicides", url: "/products" },
    { name: "Herbicides", url: "/products" },
    { name: "Plant Growth Regulators", url: "/products" },
    { name: "Biological", url: "/products" },
    { name: "Fertilizers", url: "/products" },
  ];

  return (
    <footer className="relative z-10 bg-gradient-to-b from-emerald-950/40 via-emerald-950/60 to-emerald-950/80 backdrop-blur-xl border-t border-emerald-500/10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Senso Agrotech"
                className="h-[77px] w-auto object-contain"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Manufacturing excellence in crop protection solutions. Registered
              with CIB&RC, committed to sustainable agriculture.
            </p>
            <div className="flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-emerald-500/10 border border-emerald-500/20 rounded-full inline-flex">
              <svg
                className="w-4 h-4 text-emerald-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-emerald-300 font-medium">
                Registered with CIB&RC
              </span>
            </div>
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/30 flex items-center justify-center text-white/60 hover:text-emerald-400 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="text-white/60 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span
                      className={`w-1 h-1 rounded-full bg-emerald-400 transition-all duration-300 ${
                        hoveredLink === link.name ? "w-6" : "group-hover:w-3"
                      }`}
                    />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Product Categories
            </h4>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.url}
                    onMouseEnter={() => setHoveredLink(category.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="text-white/60 hover:text-emerald-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span
                      className={`w-1 h-1 rounded-full bg-emerald-400 transition-all duration-300 ${
                        hoveredLink === category.name
                          ? "w-6"
                          : "group-hover:w-3"
                      }`}
                    />
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <svg
                  className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5"
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
                <div className="text-white/60">
                  <p>Plot No. J-7832, GIDC Ind. Estate</p>
                  <p>Ankleshwar, Gujarat 393002</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <svg
                  className="w-5 h-5 text-emerald-400 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href="tel:+916354914468"
                  className="text-white/60 hover:text-emerald-400 transition-colors duration-300"
                >
                  +91 63549 14468
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <svg
                  className="w-5 h-5 text-emerald-400 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:sensoagrotech2909@gmail.com"
                  className="text-white/60 hover:text-emerald-400 transition-colors duration-300"
                >
                  sensoagrotech2909@gmail.com
                </a>
              </li>
            </ul>

            {/* GSTIN Badge */}
            <div className="mt-6 space-y-2">
              <div className="px-3 py-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg inline-block">
                <p className="text-xs text-white/50 mb-1">GSTIN:</p>
                <p className="text-xs text-white/80 font-mono">
                  24AAVCS6963J1ZI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              © {currentYear} Senso Agrotech Private Limited. All rights
              reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/50">
              <a
                href="/privacy"
                className="hover:text-emerald-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:text-emerald-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="/site-map"
                className="hover:text-emerald-400 transition-colors duration-300"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      </div>
    </footer>
  );
}
