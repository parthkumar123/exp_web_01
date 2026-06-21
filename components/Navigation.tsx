"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  name: string;
  href: string;
  submenu?: { name: string; href: string }[];
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    {
      name: "Products",
      href: "/products",
      submenu: [
        { name: "Formulations", href: "/products" },
        { name: "Technicals", href: "/technicals" },
        { name: "Solvents", href: "/solvents" },
      ],
    },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const isParentActive = (link: NavLink) =>
    link.submenu?.some((s) => isActive(s.href)) ?? false;

  return (
    <>
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          isScrolled
            ? "bg-black/40 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center group relative z-[10001]"
            >
              <Image
                src="/logo.png"
                alt="Senso Agrotech"
                width={125}
                height={73}
                priority
                className="h-[73px] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.submenu ? (
                  <div key={link.name} className="relative group">
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${
                        isParentActive(link)
                          ? "text-emerald-400"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.name}
                      <svg
                        className="w-3.5 h-3.5 mt-0.5 transition-transform duration-300 group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    {/* Dropdown (CSS hover/focus, no JS state) */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                      <div className="min-w-[220px] rounded-2xl bg-gradient-to-b from-emerald-900/90 to-emerald-950/95 backdrop-blur-2xl border border-emerald-400/20 ring-1 ring-white/5 shadow-2xl shadow-emerald-950/50 p-2">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                              isActive(sub.href)
                                ? "text-emerald-300 bg-emerald-500/15"
                                : "text-white/80 hover:text-white hover:bg-white/10"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors duration-300 relative group ${
                      isActive(link.href)
                        ? "text-emerald-400"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-400 transition-all duration-300 ${
                        isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                )
              )}

              {/* Get Quote Button */}
              <Link
                href="/contact"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-emerald-400 transition-all duration-300 relative z-[10001]"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute left-0 top-1 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : "rotate-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-1 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : "rotate-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Full Screen Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[9998]">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu content */}
          <div className="relative h-full flex flex-col pt-24 px-6">
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col space-y-3 pb-8">
                {navLinks.map((link, index) =>
                  link.submenu ? (
                    <div
                      key={link.name}
                      style={{ animation: `slideIn 0.3s ease-out ${index * 0.1}s both` }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-2xl font-light py-5 px-6 rounded-xl transition-all duration-300 ${
                          isParentActive(link)
                            ? "text-emerald-300 bg-emerald-500/25 border border-emerald-400/60"
                            : "text-white/95 hover:text-white bg-white/5 border border-white/10"
                        }`}
                      >
                        {link.name}
                      </Link>
                      <div className="mt-2 ml-4 flex flex-col gap-2">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-lg font-light py-3 px-6 rounded-xl transition-all duration-300 ${
                              isActive(sub.href)
                                ? "text-emerald-300 bg-emerald-500/20 border border-emerald-400/50"
                                : "text-white/80 hover:text-white bg-white/5 border border-white/10"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-2xl font-light py-5 px-6 rounded-xl transition-all duration-300 transform ${
                        isActive(link.href)
                          ? "text-emerald-300 bg-emerald-500/25 border border-emerald-400/60 shadow-lg shadow-emerald-500/20"
                          : "text-white/95 hover:text-white bg-white/5 hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/40"
                      }`}
                      style={{
                        animation: `slideIn 0.3s ease-out ${index * 0.1}s both`,
                      }}
                    >
                      {link.name}
                    </Link>
                  )
                )}

                {/* Get Quote Button */}
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-6 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center text-xl font-medium rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-xl shadow-blue-500/50"
                  style={{
                    animation: `slideIn 0.3s ease-out ${
                      navLinks.length * 0.1
                    }s both`,
                  }}
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
