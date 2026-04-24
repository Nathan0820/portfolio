"use client";

import { type MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  category: "Machine Learning" | "Mobile" | "Web";
  summary: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  image: string;
  imageScale?: number;
  metrics: string[];
}

const filters = ["All", "Machine Learning", "Mobile", "Web"] as const;

const categoryStyle: Record<Project["category"], { dot: string; chip: string; accent: string }> = {
  "Machine Learning": {
    dot: "bg-blue-500",
    chip: "bg-blue-50 text-blue-700 ring-blue-100",
    accent: "from-blue-500/80 to-blue-500/0",
  },
  Mobile: {
    dot: "bg-cyan-500",
    chip: "bg-cyan-50 text-cyan-700 ring-cyan-100",
    accent: "from-cyan-500/80 to-cyan-500/0",
  },
  Web: {
    dot: "bg-indigo-500",
    chip: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    accent: "from-indigo-500/80 to-indigo-500/0",
  },
};

const projects: Project[] = [
  {
    id: 1,
    title: "Spam Message Detector",
    category: "Machine Learning",
    summary: "NLP classifier for detecting spam SMS messages with a complete model comparison pipeline.",
    description:
      "Built an NLP-based binary classifier to detect spam messages, achieving 97.8% accuracy and 0.91 F1 score using SVM on a dataset of 5,572 SMS messages. Implemented text preprocessing, TF-IDF vectorization, stratified splitting, and evaluation across SVM, Naive Bayes, Logistic Regression, Random Forest, and Decision Tree models.",
    tags: ["Python", "Pandas", "NLTK", "Scikit-learn", "Matplotlib", "Seaborn"],
    github: "https://github.com/Nathan0820/SpamMessageDetector",
    image: "/projects/smd.jpg",
    metrics: ["97.8% accuracy", "0.91 F1", "5 models"],
  },
  {
    id: 2,
    title: "SnapMap",
    category: "Mobile",
    summary: "Cross-platform memory map for pinning photo locations and browsing place-based moments.",
    description:
      "Engineered a cross-platform mobile app with custom map markers, rich location callouts, Supabase authentication, PostgreSQL persistence, and Geoapify static map thumbnails for lightweight memory previews.",
    tags: ["Expo", "TypeScript", "React Native", "Tailwind CSS", "Supabase", "Geoapify"],
    github: "https://github.com/Nathan0820/SnapMap",
    image: "/projects/snapmap.png",
    metrics: ["React Native", "Supabase", "Google Maps API"],
  },
  {
    id: 3,
    title: "VitTV",
    category: "Web",
    summary: "Retro TV web app with curated video playback, custom controls, and responsive styling.",
    description:
      "Built a retro TV-themed web app featuring curated video playback and custom UI controls, using Vite for fast HMR and optimized bundling with responsive Tailwind CSS styling across desktop and mobile viewports.",
    tags: ["JavaScript", "React", "Tailwind CSS", "Vite"],
    github: "https://github.com/Nathan0820/VitTV",
    live: "https://vit-tv.vercel.app",
    image: "/projects/vit_tv.png",
    imageScale: 1.15,
    metrics: ["Vite", "Video UI", "Responsive", "React"],
  },
  {
    id: 4,
    title: "BZNUS",
    category: "Mobile",
    summary: "A mobile app for browsing and sharing memes with a social media-like interface.",
    description: "BZNUS is a desktop customer management system for home-based food business owners to track customer contacts, food orders, and customer-specific preferences — all in one place.",
    tags: ["Java", "JavaFX", "CodeCov", "JUnit", "JUnit5", "Gradle"],
    github: "https://github.com/AY2526S2-CS2103T-W09-3/tp",
    image: "/projects/bznus.png",
    imageScale: 1.10,
    metrics: ["CLI Application", "Object-Oriented Programming", "Unit Testing"],
  }
];

function ProjectCard({
  project,
  onExpand,
  isVisible,
  index,
}: {
  project: Project;
  onExpand: () => void;
  isVisible: boolean;
  index: number;
}) {
  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 7;
    const rotateX = -((y / rect.height) - 0.5) * 7;

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
  };

  const resetTilt = (event: MouseEvent<HTMLButtonElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  const cat = categoryStyle[project.category];

  return (
    <button
      type="button"
      onClick={onExpand}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className={`interactive-card project-card group relative flex h-full flex-col overflow-hidden rounded-lg text-left transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${cat.accent}`} />

      <div className="relative m-3 aspect-[4/3] overflow-hidden rounded-md bg-slate-100">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          style={{ transform: project.imageScale ? `scale(${project.imageScale})` : undefined }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-slate-950/10 to-transparent opacity-70 transition group-hover:opacity-90" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-slate-950 shadow-sm backdrop-blur">
          <span className={`h-1.5 w-1.5 rounded-full ${cat.dot}`} />
          {project.category}
        </span>
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-black text-slate-950 opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100">
          Open case study
          <svg className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-black text-slate-950">{project.title}</h3>
          <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">
            0{index + 1}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{project.summary}</p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {project.metrics.map((metric) => (
            <span
              key={metric}
              className="flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-[11px] font-bold text-slate-700"
            >
              {metric}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="chip px-2.5 py-1 text-[11px]">
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="inline-flex items-center rounded-full border border-slate-900/90 bg-slate-900/90 px-2.5 py-1 text-[11px] font-black leading-none text-white">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
          <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
            {project.github && (
              <span className="inline-flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.85 1.25 1.85 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.67-.3-5.48-1.33-5.48-5.94 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.29 1.23a11.4 11.4 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.82.58A12 12 0 0012 0z" />
                </svg>
                Code
              </span>
            )}
            {project.live && (
              <span className="inline-flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7m0-7L10 14m-4 7h-.5A2.5 2.5 0 013 18.5V8a2 2 0 012-2h5" />
                </svg>
                Live
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-black text-slate-950 transition group-hover:text-blue-700">
            View
            <svg className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}

function ExpandedProject({ project, onClose }: { project: Project; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsOpen(true));
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(onClose, 240);
  }, [onClose]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "bg-slate-950/60 backdrop-blur-md" : "bg-slate-950/0"
      }`}
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div
        className={`grid max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-2xl transition-all duration-300 lg:grid-cols-[0.92fr_1.08fr] ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-5"
        }`}
      >
        <div className="relative min-h-[280px] bg-slate-100 lg:min-h-[620px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/64 to-transparent lg:bg-gradient-to-r" />
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-slate-700 shadow-lg backdrop-blur transition hover:bg-white hover:text-slate-950"
            aria-label="Close project details"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-6 md:p-9">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black ring-1 ${categoryStyle[project.category].chip}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${categoryStyle[project.category].dot}`} />
            {project.category}
          </span>
          <h3 className="mt-5 text-3xl font-black tracking-normal text-slate-950 md:text-5xl">{project.title}</h3>
          <p className="mt-5 text-base leading-8 text-slate-600">{project.description}</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {project.metrics.map((metric, index) => (
              <div key={metric} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Metric 0{index + 1}</div>
                <div className="mt-1 text-sm font-black text-slate-950">{metric}</div>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">Stack</div>
              <span className="text-[11px] font-bold text-slate-400">{project.tags.length} tools</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-200 pt-6">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                Source code
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7m0-7L10 14" />
                </svg>
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                Live demo
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7m0-7L10 14m-4 7h-.5A2.5 2.5 0 013 18.5V8a2 2 0 012-2h5" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredProjects = useMemo(
    () => projects.filter((project) => activeFilter === "All" || project.category === activeFilter),
    [activeFilter]
  );
  const expandedProject = expandedId !== null ? projects.find((project) => project.id === expandedId) : null;

  return (
    <section id="projects" className="section-shell" ref={sectionRef}>
      <div className="section-inner">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div
            className={`max-w-2xl transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="eyebrow">Projects</span>
            <h2 className="section-title">Selected work with usable details.</h2>
            <p className="section-copy mt-5">Filter by type, open a project, and scan the stack, result, and source links quickly.</p>
          </div>

          <div
            className={`flex flex-wrap gap-2 transition-all delay-100 duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {filters.map((filter) => {
              const count =
                filter === "All" ? projects.length : projects.filter((p) => p.category === filter).length;
              const active = activeFilter === filter;
              return (
                <button
                  type="button"
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition-all ${
                    active
                      ? "bg-slate-950 text-white shadow-md shadow-slate-950/15"
                      : "border border-slate-200 bg-white/70 text-slate-600 hover:-translate-y-0.5 hover:border-blue-200 hover:text-slate-950"
                  }`}
                >
                  {filter}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-black leading-none ${
                      active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between text-xs font-bold text-slate-500">
          <span>
            Showing <span className="font-black text-slate-950">{filteredProjects.length}</span>
            {activeFilter !== "All" && <> in <span className="font-black text-slate-950">{activeFilter}</span></>}
          </span>
          <span className="hidden items-center gap-2 uppercase tracking-[0.14em] sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Click a card to expand
          </span>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white/60 p-10 text-center text-sm font-bold text-slate-500">
            No projects in this category yet — check back soon.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isVisible={isVisible}
                onExpand={() => setExpandedId(project.id)}
              />
            ))}
          </div>
        )}
      </div>

      {expandedProject && <ExpandedProject project={expandedProject} onClose={() => setExpandedId(null)} />}
    </section>
  );
}
