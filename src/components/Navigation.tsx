"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isNavigatingRef = useRef(false);
  const navigateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateIndicator = useCallback((section: string) => {
    const activeIndex = navLinks.findIndex((l) => l.href === `#${section}`);
    if (activeIndex === -1) return;

    const navContainer = document.getElementById("nav-links-container");
    if (!navContainer) return;

    const links = navContainer.querySelectorAll("a");
    const activeLink = links[activeIndex];

    if (activeLink) {
      const containerRect = navContainer.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      setIndicatorStyle({
        width: linkRect.width,
        left: linkRect.left - containerRect.left,
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (isNavigatingRef.current) return;

      const sections = ["about", "projects", "education", "contact"];
      const viewportCenter = window.innerHeight / 2;

      let closestSection = "";
      let closestDistance = Infinity;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = id;
          }
        }
      }

      if (closestSection) {
        setActiveSection(closestSection);
      }
    };

    const initTimer = setTimeout(() => {
      handleScroll();
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(initTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (activeSection) {
      const timer = requestAnimationFrame(() => {
        updateIndicator(activeSection);
      });
      return () => cancelAnimationFrame(timer);
    }
  }, [activeSection, updateIndicator]);

  useEffect(() => {
    const handleResize = () => {
      if (activeSection) {
        updateIndicator(activeSection);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSection, updateIndicator]);

  useEffect(() => {
    return () => {
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
      }
    };
  }, []);

  const handleNavClick = (section: string) => {
    isNavigatingRef.current = true;
    setActiveSection(section);
    setIsMobileMenuOpen(false);

    if (navigateTimeoutRef.current) {
      clearTimeout(navigateTimeoutRef.current);
    }

    navigateTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 800);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <nav
        className={`mx-auto w-fit px-2 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-2xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] shadow-purple-500/5"
            : "bg-transparent"
        }`}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center py-2">
          <div className="relative flex items-center" id="nav-links-container">
            {/* Active indicator */}
            <div
              className="absolute inset-y-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-white/10 transition-all duration-300 ease-out"
              style={{
                width: indicatorStyle.width > 0 ? `${indicatorStyle.width}px` : "0px",
                left: `${indicatorStyle.left}px`,
                opacity: indicatorStyle.width > 0 ? 1 : 0,
              }}
            />

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative z-10 px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
                onClick={() => handleNavClick(link.href.slice(1))}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile: hamburger button */}
        <div className="flex md:hidden items-center justify-end py-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-10 p-2 text-white"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? "rotate-45 translate-x-0.5" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "scale-x-0 opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? "-rotate-45 translate-x-0.5" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMobileMenuOpen ? "max-h-80 opacity-100 mt-3 pb-3" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="bg-white/[0.03] backdrop-blur-2xl rounded-2xl border border-white/10 p-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
                onClick={() => handleNavClick(link.href.slice(1))}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                className="block text-center px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
