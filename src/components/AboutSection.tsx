"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const socials = [
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

const techCategories = [
  { label: "Languages", items: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "HTML/CSS"] },
  { label: "Frontend", items: ["React", "React Native", "Next.js", "Tailwind CSS"] },
  { label: "AI / ML", items: ["TensorFlow", "PyTorch", "Scikit-Learn", "NLP"] },
  { label: "Tools", items: ["Git", "Docker", "PostgreSQL", "Supabase"] },
];

const capabilityLevels = [
  [
    { label: "Problem solving", value: 88 },
    { label: "Data structures", value: 82 },
    { label: "Scripting speed", value: 90 },
  ],
  [
    { label: "Interfaces", value: 88 },
    { label: "Responsiveness", value: 84 },
    { label: "Component design", value: 80 },
  ],
  [
    { label: "Model pipelines", value: 84 },
    { label: "NLP", value: 78 },
    { label: "Experimentation", value: 86 },
  ],
  [
    { label: "Backend setup", value: 76 },
    { label: "Data persistence", value: 80 },
    { label: "Developer workflow", value: 86 },
  ],
];

const highlights = [
  { label: "Technologies", value: 10, suffix: "+" },
  { label: "Projects", value: 3, suffix: "+" },
  { label: "Years coding", value: 3, suffix: "" },
];

const stackPipelines = [
  ["Parse", "Model", "Automate"],
  ["Design", "Build", "Polish"],
  ["Clean", "Train", "Evaluate"],
  ["Store", "Deploy", "Monitor"],
];

function Counter({ target, isVisible, suffix }: { target: number; isVisible: boolean; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1200;
    const steps = 42;
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      const progress = currentStep / steps;
      setDisplay(Math.round(target * (1 - Math.pow(1 - progress, 3))));

      if (currentStep >= steps) {
        clearInterval(interval);
        setDisplay(target);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isVisible, target]);

  return <span>{display}{suffix}</span>;
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-shell" ref={sectionRef}>
      <div className="section-inner">
        <div
          className={`mb-12 max-w-3xl transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="eyebrow">About</span>
          <h2 className="section-title">A practical builder with an AI focus.</h2>
          <p className="section-copy mt-5">
            I like making complex ideas feel usable: clear interfaces, useful data flows, and products that are easy to test and improve.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <div
              className={`interactive-card overflow-hidden rounded-lg p-3 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-slate-100">
                <Image
                  src="/profile.jpg"
                  alt="Nathan Wong"
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/15 bg-white/90 p-4 shadow-lg backdrop-blur-md">
                  <div className="text-sm font-black text-slate-950">Nathan Wong</div>
                  <div className="mt-1 text-sm font-medium text-slate-600">Computer Science at NUS</div>
                </div>
              </div>
            </div>

            <div
              className={`interactive-card relative overflow-hidden rounded-lg p-5 transition-all delay-150 duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px),radial-gradient(circle_at_82%_18%,rgba(34,211,238,0.18),transparent_38%)] bg-[length:28px_28px,28px_28px,100%_100%]" />

              <div className="relative z-10 flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 items-center gap-1.5 rounded-full bg-emerald-50 px-2 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-700 ring-1 ring-emerald-200">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                        Live
                      </span>
                      <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Stack telemetry</span>
                    </div>
                    <div className="mt-2 text-xl font-black text-slate-950">{techCategories[activeCategory].label}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-xs font-black text-white">
                      {techCategories[activeCategory].items.length}
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">tools</div>
                  </div>
                </div>

                <div className="relative h-16 overflow-hidden rounded-md border border-slate-200 bg-white/70 px-3 backdrop-blur">
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 64" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="telemetryFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(37,99,235,0.22)" />
                        <stop offset="100%" stopColor="rgba(37,99,235,0)" />
                      </linearGradient>
                    </defs>
                    <path d="M0 44 C 40 20, 80 58, 130 36 S 220 14, 260 34 S 330 54, 360 32 L 360 64 L 0 64 Z" fill="url(#telemetryFill)" />
                    <path d="M0 44 C 40 20, 80 58, 130 36 S 220 14, 260 34 S 330 54, 360 32" fill="none" stroke="#2563eb" strokeWidth="1.8" />
                    <path d="M0 52 C 50 38, 110 60, 170 46 S 260 28, 360 46" fill="none" stroke="#06b6d4" strokeWidth="1.4" strokeDasharray="4 6" className="animate-data-flow" />
                  </svg>
                  <div className="relative z-10 flex h-full items-center justify-between text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    <span>Throughput</span>
                    <span className="text-slate-700">{72 + activeCategory * 4}%</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {techCategories[activeCategory].items.slice(0, 5).map((item, index) => (
                    <span
                      key={item}
                      className="animate-fade-in-up rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-sm"
                      style={{ animationDelay: `${index * 60}ms` }}
                    >
                      {item}
                    </span>
                  ))}
                  {techCategories[activeCategory].items.length > 5 && (
                    <span className="rounded-full bg-slate-900/90 px-2.5 py-1 text-[11px] font-bold text-white">
                      +{techCategories[activeCategory].items.length - 5}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {stackPipelines[activeCategory].map((stage, index) => (
                    <div
                      key={stage}
                      className="animate-fade-in-up rounded-lg border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur"
                      style={{ animationDelay: `${index * 110}ms` }}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">0{index + 1}</span>
                        <span className="signal-dot h-1.5 w-1.5 rounded-full bg-blue-600" />
                      </div>
                      <div className="text-sm font-black text-slate-950">{stage}</div>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                          style={{
                            width: `${72 + index * 9}%`,
                            animation: `fade-in-up 0.7s ${index * 130}ms both`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div
              className={`interactive-card rounded-lg p-6 transition-all delay-100 duration-700 md:p-8 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="mb-6 grid gap-3 sm:grid-cols-3">
                {["Learn", "Prototype", "Ship"].map((step, index) => (
                  <div key={step} className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div
                      className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-600 to-cyan-500"
                      style={{ animation: `fade-in-up 0.7s ${index * 120}ms both` }}
                    />
                    <div className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">0{index + 1}</div>
                    <div className="mt-2 font-black text-slate-950">{step}</div>
                  </div>
                ))}
              </div>

              <p className="text-lg leading-8 text-slate-600">
                I&apos;m a Year 2 Computer Science student at <span className="font-bold text-slate-950">NUS</span>, interested in
                machine learning, deep learning, NLP, and software engineering. I enjoy turning experiments into interfaces that people can actually use.
              </p>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {highlights.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
                    <div className="text-2xl font-black text-slate-950">
                      <Counter target={stat.value} isVisible={isVisible} suffix={stat.suffix} />
                    </div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`interactive-card rounded-lg p-6 transition-all delay-200 duration-700 md:p-8 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-lg font-black text-slate-950">Tech stack</h3>
                    <p className="text-xs font-bold text-slate-500">Tools I reach for, grouped by focus area.</p>
                  </div>
                </div>
                <div className="hidden flex-col items-end sm:flex">
                  <div className="text-2xl font-black leading-none text-slate-950">{techCategories[activeCategory].items.length}</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">active</div>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {techCategories.map((cat, index) => {
                  const active = activeCategory === index;
                  return (
                    <button
                      type="button"
                      key={cat.label}
                      onClick={() => setActiveCategory(index)}
                      className={`group inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-bold transition-all ${
                        active
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                          : "border border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-blue-200 hover:text-slate-950"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition ${
                          active ? "bg-white" : "bg-blue-500 group-hover:bg-blue-600"
                        }`}
                      />
                      {cat.label}
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-black leading-none ${
                          active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {cat.items.length}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex min-h-24 flex-wrap content-start gap-2">
                {techCategories[activeCategory].items.map((tech, index) => (
                  <span
                    key={tech}
                    className="chip animate-fade-in-up transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-slate-950"
                    style={{ animationDelay: `${index * 45}ms` }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-7 border-t border-slate-200 pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">Proficiency</h4>
                  <span className="text-[11px] font-bold text-slate-400">Self-rated</span>
                </div>

                <div className="grid gap-3">
                  {capabilityLevels[activeCategory].map((capability, index) => {
                    const tier = capability.value >= 85 ? "Advanced" : capability.value >= 75 ? "Proficient" : "Working";
                    return (
                      <div key={capability.label} className="rounded-lg border border-slate-200 bg-slate-50/80 p-3">
                        <div className="mb-2 flex items-center justify-between text-sm font-bold">
                          <span className="flex items-center gap-2 text-slate-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            {capability.label}
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500 ring-1 ring-slate-200">
                              {tier}
                            </span>
                            <span className="text-slate-500">{capability.value}%</span>
                          </span>
                        </div>
                        <div className="relative h-2 overflow-hidden rounded-full bg-white ring-1 ring-slate-200/80">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500"
                            style={{
                              width: `${capability.value}%`,
                              animation: `fade-in-up 0.75s ${index * 110}ms both`,
                            }}
                          />
                          <div className="pointer-events-none absolute inset-0 flex justify-between px-[25%]">
                            <span className="h-full w-px bg-slate-200" />
                            <span className="h-full w-px bg-slate-200" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:-translate-y-1 hover:border-blue-200 hover:text-blue-700 hover:shadow-md"
                      aria-label={social.label}
                    >
                      <svg
                        className="h-5 w-5"
                        fill={social.stroke ? "none" : "currentColor"}
                        stroke={social.stroke ? "currentColor" : undefined}
                        viewBox="0 0 24 24"
                      >
                        {social.icon}
                      </svg>
                    </a>
                  ))}
                </div>
                <Link href="/nathanResume.pdf" download="nathanwongresume.pdf" className="btn-secondary text-sm">
                  Download resume
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
