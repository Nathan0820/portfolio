"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Education {
  degree: string;
  school: string;
  shortSchool: string;
  logo?: string;
  period: string;
  status: string;
  description: string;
  focus: string;
  yearOfProgram: number;
  totalYears: number;
  courses: string[];
}

const education: Education[] = [
  {
    degree: "Bachelor of Computing in Computer Science",
    school: "National University of Singapore (NUS)",
    shortSchool: "NUS",
    logo: "/nus-logo.png",
    period: "2024 - 2028",
    status: "In Progress",
    description:
      "Specializing in Artificial Intelligence and Machine Learning, with coursework spanning algorithms, systems, databases, and software engineering.",
    focus: "AI & Machine Learning, Software Engineering",
    yearOfProgram: 2,
    totalYears: 4,
    courses: [
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "Machine Learning",
      "Software Engineering",
      "Database Systems",
      "Linear Algebra",
      "Operating Systems",
      "Artificial Intelligence",
    ],
  },
];

type ActivityGroup = "Tech" | "Creative" | "Community";

interface Activity {
  label: string;
  time: string;
  group: ActivityGroup;
  description: string;
  highlights: string[];
}

const activities: Activity[] = [
  {
    label: "Raffles Hall Developers",
    time: "25/26",
    group: "Tech",
    description:
      "Build and maintain internal web tools for residents — from event sign-ups to hall-wide dashboards, shipping features with a small student dev team.",
    highlights: ["Next.js", "Supabase", "Agile sprints"],
  },
  {
    label: "Raffles Hall Musical Production (Sets)",
    time: "24/25, 25/26",
    group: "Creative",
    description:
      "Design and construct physical stage sets for the annual hall musical — from sketching concepts to sourcing materials and assembling backdrops.",
    highlights: ["Set design", "Fabrication", "Team of 12+"],
  },
  {
    label: "Raffles Hall Tech Crew",
    time: "24/25, 25/26",
    group: "Community",
    description:
      "Run audio, lighting, and AV for hall productions and events — rigging gear, programming cues, and operating live during shows.",
    highlights: ["Lighting", "Audio mixing", "Live ops"],
  },
  {
    label: "Raffles Hall Phoenix Press",
    time: "24/25, 25/26",
    group: "Creative",
    description:
      "Write, edit, and design layouts for the hall's publication — covering events, interviews, and long-form features for each issue.",
    highlights: ["Editorial", "Layout design", "Photography"],
  },
  {
    label: "Raffles Hall Welfare Committee",
    time: "24/25",
    group: "Community",
    description:
      "Plan welfare initiatives and check-ins for residents — from exam care packs to hall-wide wellbeing events that keep the community tight.",
    highlights: ["Event planning", "Outreach", "Logistics"],
  },
];

const groupStyle: Record<ActivityGroup, { dot: string; chip: string }> = {
  Tech: { dot: "bg-blue-500", chip: "bg-blue-50 text-blue-700 ring-blue-100" },
  Creative: { dot: "bg-cyan-500", chip: "bg-cyan-50 text-cyan-700 ring-cyan-100" },
  Community: { dot: "bg-indigo-500", chip: "bg-indigo-50 text-indigo-700 ring-indigo-100" },
};

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openRole, setOpenRole] = useState<string | null>(null);

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
    <section id="education" className="section-shell" ref={sectionRef}>
      <div className="section-inner">
        <div
          className={`mb-12 max-w-3xl transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="eyebrow">Education</span>
          <h2 className="section-title">Academic track and campus work.</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {education.map((edu) => {
            const progress = Math.round((edu.yearOfProgram / edu.totalYears) * 100);
            return (
              <article
                key={edu.school}
                className={`interactive-card relative overflow-hidden rounded-lg p-6 transition-all duration-700 md:p-8 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-500/80 via-cyan-500/80 to-indigo-500/80" />

                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    {edu.logo ? (
                      <div className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
                        <Image
                          src={edu.logo}
                          alt={`${edu.shortSchool} logo`}
                          fill
                          className="object-contain p-2"
                          sizes="56px"
                        />
                      </div>
                    ) : (
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-black uppercase tracking-[0.12em] text-white shadow-md shadow-blue-600/20 ring-1 ring-blue-500/30">
                        {edu.shortSchool}
                      </div>
                    )}
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-700 ring-1 ring-emerald-200">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                          {edu.status}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-600">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {edu.period}
                        </span>
                      </div>
                      <h3 className="mt-4 text-2xl font-black text-slate-950">{edu.degree}</h3>
                      <p className="mt-1 font-bold text-slate-600">{edu.school}</p>
                    </div>
                  </div>
                </div>

                <p className="section-copy mt-6">{edu.description}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Focus</div>
                    <div className="mt-1 flex items-center gap-2 text-sm font-black text-slate-950">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {edu.focus}
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Progress</div>
                      <div className="text-[10px] font-black text-slate-500">
                        Year {edu.yearOfProgram} of {edu.totalYears}
                      </div>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500"
                        style={{
                          width: `${progress}%`,
                          animation: `fade-in-up 0.8s 0.1s both`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-7">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">Relevant coursework</h4>
                    <span className="text-[11px] font-bold text-slate-400">{edu.courses.length} modules</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course, index) => (
                      <span
                        key={course}
                        className={`chip ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                        style={{ animationDelay: `${index * 55}ms` }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}

          <aside
            className={`interactive-card rounded-lg p-6 transition-all delay-150 duration-700 md:p-8 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black text-slate-950">Campus roles</h3>
                <p className="mt-1 text-xs font-bold text-slate-500">
                  Residential life at Raffles Hall, NUS.
                </p>
              </div>
              <div className="flex flex-col items-end">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-xs font-black text-white">
                  {activities.length}
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">roles</div>
              </div>
            </div>

            <div className="mb-5 flex flex-wrap gap-1.5">
              {(Object.keys(groupStyle) as ActivityGroup[]).map((group) => {
                const count = activities.filter((a) => a.group === group).length;
                const style = groupStyle[group];
                return (
                  <span
                    key={group}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] ring-1 ${style.chip}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                    {group}
                    <span className="ml-0.5 rounded-full bg-white/70 px-1 text-[10px] font-black">{count}</span>
                  </span>
                );
              })}
            </div>

            <ol className="space-y-2">
              {activities.map((activity, index) => {
                const style = groupStyle[activity.group];
                const isOpen = openRole === activity.label;
                return (
                  <li
                    key={activity.label}
                    className={`group overflow-hidden rounded-lg border bg-white/70 transition ${
                      isOpen
                        ? "border-blue-200 shadow-md"
                        : "border-slate-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                    }`}
                    style={{ transitionDelay: `${index * 30}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenRole(isOpen ? null : activity.label)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-3 p-3.5 text-left"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-md text-[10px] font-black transition ${
                            isOpen
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-700"
                          }`}
                        >
                          0{index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold leading-snug text-slate-800">{activity.label}</div>
                          <div className="mt-1 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.12em]">
                            <span className={`h-1 w-1 rounded-full ${style.dot}`} />
                            <span className="text-slate-500">{activity.group}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-black text-slate-500">
                          {activity.time}
                        </span>
                        <svg
                          className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-blue-600" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="border-t border-slate-200 bg-slate-50/70 px-4 pb-4 pt-3.5">
                          <p className="text-sm leading-6 text-slate-600">{activity.description}</p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {activity.highlights.map((highlight) => (
                              <span
                                key={highlight}
                                className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200"
                              >
                                <span className={`h-1 w-1 rounded-full ${style.dot}`} />
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}
