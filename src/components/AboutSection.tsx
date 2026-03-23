"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const socials = [
  { href: "https://github.com/Nathan0820", label: "GitHub", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
  { href: "https://linkedin.com/in/nathan-wong-540188313", label: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { href: "mailto:nathanwyj0629@gmail.com", label: "Email", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", stroke: true },
];

const techCategories = [
  {
    label: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    label: "Frameworks",
    items: ["React", "React Native", "Next.js"],
  },
  {
    label: "AI / ML",
    items: ["TensorFlow", "Scikit-Learn"],
  },
];

const highlights = [
  { label: "Technologies", value: 9 },
  { label: "Projects", value: 5 },
  { label: "Years Coding", value: 3 },
];

function Counter({ target, isVisible }: { target: number; isVisible: boolean }) {
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1000;
    let startTime: number | null = null;
    let frameId: number;

    function animate(now: number) {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        const speed = 1 - progress;
        const value = Math.round((progress * 30 * speed * 3) + (progress * target));
        setDisplay(Math.abs(value % 10));
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplay(target);
      }
    }

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, target]);

  return <span>{display}+</span>;
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <section id="about" className="py-24 px-6 relative" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl font-bold text-white mb-12 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            About Me
          </span>
        </h2>

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-purple-500/20 hover:border-blue-500/30 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s ease-out" : "transform 0.1s ease-out",
          }}
        >
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Profile Photo */}
            <div
              className={`shrink-0 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <div className="relative w-44 h-56 md:w-52 md:h-64 group rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-[length:200%_auto] animate-gradient opacity-75 group-hover:opacity-100 transition-opacity">
                <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <Image src="/profile.jpg" alt="Nathan Wong" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-6 text-center md:text-left flex-1">
              <p
                className={`text-slate-300 text-lg leading-relaxed transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                I&apos;m a Year 2 Computer Science undergraduate at the National University of Singapore (NUS), with a strong passion for Machine Learning 
                and Artificial Intelligence, particularly in the areas of Deep Learning and Natural Language Processing. I am drawn to the challenge of 
                building systems that can understand, learn, and reason from data.
              </p>

              {/* Stats */}
              <div
                className={`flex justify-center md:justify-start gap-8 transition-all duration-700 delay-[400ms] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {highlights.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      <Counter target={stat.value} isVisible={isVisible} />
                    </div>
                    <div className="text-xs md:text-sm text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div
                className={`transition-all duration-700 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <h3 className="text-white font-semibold mb-3">Technologies I work with:</h3>

                {/* Category tabs */}
                <div className="flex gap-2 mb-4 justify-center md:justify-start">
                  {techCategories.map((cat, i) => (
                    <button
                      key={cat.label}
                      onClick={() => setActiveCategory(i)}
                      className={`px-3 py-1 text-sm rounded-full border transition-all duration-300 ${
                        activeCategory === i
                          ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                          : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start min-h-[40px]">
                  {techCategories[activeCategory].items.map((tech, i) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 bg-slate-800/80 border border-purple-500/20 text-blue-300 rounded-full text-sm font-medium hover:border-blue-500/40 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Social links */}
                <div className="flex gap-4 justify-center md:justify-start pt-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative p-3 rounded-full bg-slate-800/50 border border-purple-500/20 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
                      aria-label={social.label}
                    >
                      <svg
                        className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors"
                        fill={social.stroke ? "none" : "currentColor"}
                        stroke={social.stroke ? "currentColor" : undefined}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={social.stroke ? 2 : undefined} d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
