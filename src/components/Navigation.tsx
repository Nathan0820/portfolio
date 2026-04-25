"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);

      const sections = navLinks.map((link) => link.href.slice(1));
      const active = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 160 && rect.bottom >= 160;
      });

      if (active) setActiveSection(active);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <div className="absolute left-0 right-0 top-0 h-1 bg-slate-950/5">
        <div
          className="h-full origin-left bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 transition-transform duration-150"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 ${
          isScrolled
            ? "border-slate-200/80 bg-white/80 shadow-lg shadow-slate-900/10 backdrop-blur-xl"
            : "border-white/50 bg-white/45 backdrop-blur-md"
        }`}
      >
        <a
          href="#"
          className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-extrabold tracking-normal text-slate-950"
          onClick={() => closeMenu("")}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-xs font-black text-white">
            NW
          </span>
          <span className="hidden sm:inline">Nathan Wong</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => closeMenu(link.href.slice(1))}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                  active
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <a href="#contact" className="btn-primary hidden px-4 py-2 text-sm md:inline-flex">
          Let&apos;s talk
        </a>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-800 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform ${
                isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-5 rounded-full bg-current transition-opacity ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-4 h-0.5 w-5 rounded-full bg-current transition-transform ${
                isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`mx-auto mt-2 max-w-5xl overflow-hidden rounded-lg border border-slate-200/80 bg-white/95 shadow-xl shadow-slate-900/10 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="grid gap-1 p-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
              onClick={() => closeMenu(link.href.slice(1))}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
