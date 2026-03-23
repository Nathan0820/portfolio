"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { TypingAnimation } from "@/components/TypingAnimation";

const badges = ["CS Student", "Developer", "AI Enthusiast"];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleId = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    if (Math.random() > 0.85) {
      const id = particleId.current++;
      setParticles((prev) => [
        ...prev.slice(-15),
        { id, x: e.clientX - rect.left, y: e.clientY - rect.top, size: Math.random() * 4 + 2 },
      ]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== id));
      }, 1000);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      {/* Mouse-tracking spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139,92,246,0.08), rgba(59,130,246,0.04) 40%, transparent 70%)`,
        }}
      />

      {/* Cursor particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none absolute rounded-full bg-purple-400/60 animate-particle"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
        />
      ))}

      <div className="max-w-3xl mx-auto">
        {/* Tagline */}
        <p
          className={`text-sm md:text-base font-mono tracking-widest uppercase text-purple-400 mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          &lt;Hello there! /&gt;
        </p>

        {/* Name */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Welcome to 
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient whitespace-nowrap">
            Nathan&apos;s Portfolio
          </span>
        </h1>

        {/* Typing animation */}
        <p
          className={`text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-6 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Passionate about{" "}
          <TypingAnimation />
        </p>

        {/* Badges */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-8 transition-all duration-700 delay-[450ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {badges.map((badge, i) => (
            <span
              key={badge}
              className="px-4 py-1.5 text-sm bg-slate-800/80 text-slate-300 border border-purple-500/30 rounded-full hover:border-blue-500/50 hover:text-blue-300 hover:bg-slate-800 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-0.5 cursor-default"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-[600ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link
            href="#projects"
            className="relative group px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/25"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-[length:200%_auto] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center gap-2">
              View Projects
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
          <Link
            href="#contact"
            className="relative group px-8 py-3.5 border border-purple-500/30 text-white font-medium rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative">Contact Me</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Link href="#about" className="flex flex-col items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors">
          <span className="text-sm">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
