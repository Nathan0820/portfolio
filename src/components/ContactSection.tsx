"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  {
    href: "https://github.com/Nathan0820",
    label: "GitHub",
    icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />,
  },
  {
    href: "https://linkedin.com/in/nathan-wong-540188313",
    label: "LinkedIn",
    icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
  },
  {
    href: "mailto:nathanwyj0629@gmail.com",
    label: "Email",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    stroke: true,
  },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="contact" className="section-shell pb-16" ref={sectionRef}>
        <div className="section-inner">
          <div
            className={`glass-panel relative overflow-hidden rounded-lg p-8 transition-all duration-700 md:p-12 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500" />
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <span className="eyebrow">Contact</span>
                <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight tracking-normal text-slate-950 md:text-6xl">
                  Have a project, internship, or collaboration in mind?
                </h2>
                <p className="section-copy mt-5 max-w-xl">
                  Send me a note and I&apos;ll get back to you. I&apos;m especially interested in AI products, frontend engineering, and practical ML work.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <a href="mailto:nathanwyj0629@gmail.com" className="btn-primary w-full">
                  Say hello
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>

                <div className="mt-4 grid gap-3">
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-bold text-slate-700 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:text-blue-700 hover:shadow-md"
                    >
                      <span className="flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm">
                          <svg
                            className="h-5 w-5"
                            fill={link.stroke ? "none" : "currentColor"}
                            stroke={link.stroke ? "currentColor" : undefined}
                            viewBox="0 0 24 24"
                          >
                            {link.icon}
                          </svg>
                        </span>
                        {link.label}
                      </span>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8m9 0v9" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 pb-8">
        <div className="section-inner flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm font-semibold text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} Nathan Wong</span>
          <span>Built with Next.js and Tailwind CSS</span>
        </div>
      </footer>
    </>
  );
}
