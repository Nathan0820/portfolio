"use client";

import { useEffect, useRef, useState } from "react";

const education = [
  {
    degree: "Bachelor of Computing in Computer Science",
    school: "National University of Singapore (NUS)",
    period: "2024 – 2028",
    status: "In Progress",
    description:
      "Specializing in Artificial Intelligence and Machine Learning. Coursework includes Data Structures & Algorithms, Machine Learning, Software Engineering, and Database Systems.",
    courses: [
      "Data Structures & Algorithms",
      "Machine Learning",
      "Software Engineering",
      "Database Systems",
      "Computer Networks",
      "Linear Algebra",
    ],
    color: "#8b5cf6",
  },
];

const activities = [
  { label: "Raffles Hall Developers", time: "25/26" },
  { label: "Raffles Hall Musical Production (Sets)", time: "24/25, 25/26" },
  { label: "Raffles Hall Tech Crew", time: "24/25, 25/26" },
  { label: "Raffles Hall Phoenix Press", time: "24/25, 25/26" },
  { label: "Raffles Hall Welfare Committee", time: "24/25" },
];

export function EducationSection() {
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
    <section id="education" className="py-24 px-6 relative" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl font-bold text-white mb-12 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Education
          </span>
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className={`absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/60 via-blue-500/40 to-transparent transition-all duration-1000 origin-top ${
              isVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`}
          />

          {education.map((edu, i) => (
            <div
              key={edu.school}
              className={`relative pl-16 md:pl-20 mb-12 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-[17px] md:left-[23px] top-1 w-4 h-4 rounded-full border-[3px] border-purple-500 bg-slate-950 shadow-[0_0_10px_rgba(139,92,246,0.4)]" />

              {/* Card */}
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-purple-500/20 hover:border-blue-500/30 shadow-xl shadow-purple-500/5 transition-all duration-500 group">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <svg className="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="text-purple-400 font-medium text-sm">{edu.school}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      {edu.status}
                    </span>
                    <span className="text-slate-500 text-sm">{edu.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {edu.description}
                </p>

                {/* Relevant Coursework */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Relevant Coursework
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course, ci) => (
                      <span
                        key={course}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full bg-slate-800/80 border border-purple-500/20 text-blue-300 hover:border-blue-500/40 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 ${
                          isVisible ? "animate-fade-in" : "opacity-0"
                        }`}
                        style={{ animationDelay: `${400 + ci * 80}ms` }}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Activities */}
          <div
            className={`relative pl-16 md:pl-20 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            {/* Timeline dot */}
            <div className="absolute left-[17px] md:left-[23px] top-1 w-4 h-4 rounded-full border-[3px] border-blue-500 bg-slate-950 shadow-[0_0_10px_rgba(59,130,246,0.4)]" />

            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-blue-500/20 hover:border-purple-500/30 shadow-xl shadow-blue-500/5 transition-all duration-500">
              <h3 className="text-lg font-bold text-white mb-4">Activities & Clubs</h3>
              <div className="space-y-3">
                {activities.map((act) => (
                  <div key={act.label} className="flex items-center justify-between group/act">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400/60 group-hover/act:bg-blue-400 transition-colors" />
                      <span className="text-slate-300 text-sm group-hover/act:text-white transition-colors">
                        {act.label}
                      </span>
                    </div>
                    <span className="text-slate-500 text-xs font-medium">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
