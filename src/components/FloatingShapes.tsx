"use client";

import { useEffect, useState } from "react";

interface Shape {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
  type: "circle" | "square" | "triangle";
}

function generateShapes(count: number): Shape[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * -20,
    opacity: Math.random() * 0.08 + 0.02,
    type: (["circle", "square", "triangle"] as const)[i % 3],
  }));
}

export function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    setShapes(generateShapes(12));
  }, []);

  if (shapes.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute animate-float"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            opacity: shape.opacity,
            animationDuration: `${shape.duration}s`,
            animationDelay: `${shape.delay}s`,
          }}
        >
          {shape.type === "circle" && (
            <div className="w-full h-full rounded-full border border-purple-500/40" />
          )}
          {shape.type === "square" && (
            <div className="w-full h-full rotate-45 border border-blue-500/40" />
          )}
          {shape.type === "triangle" && (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,10 90,90 10,90"
                fill="none"
                stroke="rgba(168,85,247,0.4)"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
