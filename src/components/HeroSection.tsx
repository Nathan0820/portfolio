"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TypingAnimation } from "@/components/TypingAnimation";

const badges = ["NUS Computer Science", "AI / ML", "Full-stack"];
const metrics = [
  { label: "Projects", value: "3+" },
  { label: "Years coding", value: "3" },
  { label: "Focus", value: "AI" },
];
const marquee = ["Python", "React", "Next.js", "TypeScript", "TensorFlow", "Supabase", "PostgreSQL", "AI", "ML", "Full-stack"];

const nowItems = [
  {
    kind: "Building",
    title: "Portfolio v2",
    detail: "Next.js · Tailwind",
    tone: "blue",
  },
  {
    kind: "Learning",
    title: "Software Engineering",
    detail: "Focusing on building full-stack applications.",
    tone: "cyan",
  },
  {
    kind: "Learning",
    title: "AI & ML",
    detail: "Focusing on building AI & ML models.",
    tone: "indigo",
  },
];

const availability = [
  {
    label: "Open to",
    value: "Summer '26 internships, Full-time internships",
    dot: "bg-emerald-400",
  },
  {
    label: "Based in",
    value: "Singapore · GMT+8",
    dot: "bg-blue-400",
  },
  {
    label: "Replies",
    value: "Usually within a day",
    dot: "bg-cyan-300",
  },
];

const quickLinks = [
  {
    label: "Email",
    href: "mailto:nathanwyj0629@gmail.com",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Nathan0820",
    icon: (
      <path d="M12 .5A11.5 11.5 0 00.5 12a11.5 11.5 0 007.86 10.94c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 015.74 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.24 2.76.12 3.05.74.8 1.18 1.82 1.18 3.08 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12 11.5 11.5 0 0012 .5z" />
    ),
    fill: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nathan-wong-540188313/",
    icon: (
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.41v1.56h.05c.48-.91 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.45v6.3zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
    ),
    fill: true,
  },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 90);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center px-6 pb-20 pt-32">
      <div className="mx-auto grid w-full max-w-[1520px] items-center gap-12 lg:grid-cols-2 xl:gap-16">
        <div className="relative z-10">
          <div
            className={`mb-6 flex flex-wrap gap-2 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {badges.map((badge) => (
              <span key={badge} className="chip">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                {badge}
              </span>
            ))}
          </div>

          <h1
            className={`text-5xl font-black leading-[0.98] tracking-normal text-slate-950 transition-all delay-100 duration-700 md:text-7xl xl:text-8xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Building clean interfaces for intelligent products.
          </h1>

          <p
            className={`mt-7 max-w-2xl text-lg leading-8 text-slate-600 transition-all delay-200 duration-700 md:text-xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            I&apos;m Nathan, a Computer Science student at NUS focused on <TypingAnimation />.
          </p>

          <div
            className={`mt-9 flex flex-col gap-3 transition-all delay-300 duration-700 sm:flex-row ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <Link href="#projects" className="btn-primary">
              View projects
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/nathanResume.pdf" download="nathanwongresume.pdf" className="btn-secondary">
              Download CV
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m5 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.6L19 9.4V19a2 2 0 01-2 2z" />
              </svg>
            </Link>
          </div>

          <div
            className={`mt-12 grid max-w-xl grid-cols-3 overflow-hidden rounded-lg border border-slate-200 bg-white/70 shadow-sm backdrop-blur transition-all delay-[380ms] duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {metrics.map((metric) => (
              <div key={metric.label} className="border-r border-slate-200 px-4 py-4 last:border-r-0">
                <div className="text-2xl font-black text-slate-950">{metric.value}</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`relative w-full max-w-[980px] justify-self-center transition-all delay-200 duration-700 lg:justify-self-end ${
            isVisible ? "opacity-100 translate-y-0 lg:-translate-y-4 xl:-translate-y-5 xl:translate-x-3" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="hero-glass scan-card relative rounded-lg p-5 md:p-6">
            <div className="motion-grid relative min-h-[820px] overflow-hidden rounded-md bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/25 ring-1 ring-slate-950/10 md:min-h-[900px] xl:p-6">
              <div className="absolute inset-0 opacity-35">
                <svg className="h-full w-full" viewBox="0 0 520 620" preserveAspectRatio="none">
                  <path d="M-40 180 C 130 70, 210 240, 380 140 S 540 180, 590 80" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="8 10" />
                  <path d="M-20 470 C 130 360, 260 520, 410 390 S 530 310, 570 420" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="7 12" />
                </svg>
              </div>
              <div className="absolute right-6 top-6 h-28 w-28 rounded-full border border-white/10 opacity-80 animate-orbit">
                <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 rounded-full bg-blue-400 shadow-lg shadow-blue-400/40" />
                <span className="absolute bottom-2 right-4 h-2 w-2 rounded-full bg-cyan-300 shadow-lg shadow-cyan-300/40" />
              </div>

              <div className="relative grid min-w-0 gap-4">
                <div className="flex min-w-0 flex-col justify-between gap-4">
                  <div className="w-full rounded-lg border border-white/10 bg-white/[0.08] p-4 backdrop-blur">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-400" />
                      <span className="h-3 w-3 rounded-full bg-yellow-300" />
                      <span className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <pre className="overflow-hidden text-xs leading-6 text-slate-200">
{`const focus = [
  "Full-stack apps",
  "AI & ML models",
  "Clean frontend",
  "Clean backend"
];`}
                    </pre>
                  </div>

                  <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="min-w-0 w-full rounded-lg border border-white/10 bg-white/[0.08] p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Current</div>
                      <div className="mt-2 text-lg font-black">NUS CS</div>
                    </div>
                    <div className="min-w-0 w-full rounded-lg border border-white/10 bg-white/[0.08] p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Building</div>
                      <div className="mt-2 text-lg font-black">Full-stack apps and ML models</div>
                    </div>
                  </div>

                  <div className="w-full rounded-lg border border-white/10 bg-white/[0.08] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Now</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-300">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Live
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {nowItems.map((item) => (
                        <li key={item.title} className="flex items-start gap-3">
                          <span
                            className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                              item.tone === "blue"
                                ? "bg-blue-400"
                                : item.tone === "cyan"
                                ? "bg-cyan-400"
                                : "bg-indigo-300"
                            }`}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{item.kind}</div>
                            <div className="mt-0.5 truncate text-sm font-bold text-slate-100">{item.title}</div>
                            <div className="mt-0.5 text-xs text-slate-400">{item.detail}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex h-12 w-full items-end gap-1 rounded-lg border border-white/10 bg-white/[0.08] px-3 py-2">
                    {[32, 56, 42, 78, 48, 88, 62, 36, 70, 52, 80, 44].map((height, index) => (
                      <span
                        key={`${height}-${index}`}
                        className="animate-equalize flex-1 rounded-t bg-blue-300/80"
                        style={{
                          height: `${height}%`,
                          animationDelay: `${index * 90}ms`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="w-full rounded-lg border border-white/10 bg-white/[0.08] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Open for</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Available
                      </span>
                    </div>
                    <ul className="space-y-2.5">
                      {availability.map((item) => (
                        <li
                          key={item.label}
                          className="flex items-center justify-between gap-3 rounded-md bg-white/[0.04] px-3 py-2"
                        >
                          <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                            <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
                            {item.label}
                          </span>
                          <span className="text-xs font-bold text-slate-100">{item.value}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3">
                      {quickLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target={link.href.startsWith("mailto") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          aria-label={link.label}
                          className="group inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.05] px-2 py-2 text-[11px] font-bold text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.08] hover:text-white"
                        >
                          <svg
                            className="h-3.5 w-3.5"
                            fill={link.fill ? "currentColor" : "none"}
                            stroke={link.fill ? undefined : "currentColor"}
                            viewBox="0 0 24 24"
                          >
                            {link.icon}
                          </svg>
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-full border border-white/10 bg-white/[0.08] py-2">
                    <div className="animate-marquee flex w-max gap-3 whitespace-nowrap px-3 text-xs font-bold text-slate-200">
                      {[...marquee, ...marquee].map((item, index) => (
                        <span key={`${item}-${index}`} className="rounded-full bg-white/10 px-3 py-1">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-bold text-slate-600 shadow-sm backdrop-blur transition hover:text-slate-950 md:flex"
      >
        Scroll
        <svg className="h-4 w-4 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l-5-5m5 5l5-5" />
        </svg>
      </Link>
    </section>
  );
}
