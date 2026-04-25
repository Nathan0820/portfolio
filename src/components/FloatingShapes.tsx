"use client";

const nodes = [
  { left: "8%", top: "18%", delay: "0s" },
  { left: "18%", top: "72%", delay: "-1.5s" },
  { left: "76%", top: "16%", delay: "-3s" },
  { left: "88%", top: "58%", delay: "-2s" },
  { left: "48%", top: "84%", delay: "-4s" },
  { left: "58%", top: "34%", delay: "-2.7s" },
];

const traces = [
  { top: "24%", delay: "0s", color: "bg-blue-500/16" },
  { top: "46%", delay: "-2s", color: "bg-cyan-500/14" },
  { top: "68%", delay: "-4s", color: "bg-indigo-500/12" },
];

export function FloatingShapes() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full opacity-[0.18]" viewBox="0 0 1200 900" preserveAspectRatio="none">
        <path
          d="M80 180 C 270 90, 370 310, 560 230 S 830 170, 1120 280"
          fill="none"
          stroke="#2563eb"
          strokeWidth="1.4"
          strokeDasharray="520"
          strokeDashoffset="520"
          style={{ animation: "draw-line 4.5s ease forwards" }}
        />
        <path
          d="M40 720 C 250 640, 420 790, 640 680 S 910 520, 1160 620"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1.2"
          strokeDasharray="520"
          strokeDashoffset="520"
          style={{ animation: "draw-line 5.5s 0.6s ease forwards" }}
        />
        <path
          d="M140 420 C 300 360, 420 470, 560 420 S 820 320, 1040 430"
          fill="none"
          stroke="#6366f1"
          strokeWidth="1"
          strokeDasharray="12 16"
          className="animate-data-flow"
        />
      </svg>

      {traces.map((trace) => (
        <span
          key={trace.top}
          className={`absolute left-[-20%] h-px w-1/3 ${trace.color} animate-scan`}
          style={{ top: trace.top, animationDelay: trace.delay, animationDuration: "9s" }}
        />
      ))}

      {nodes.map((node, index) => (
        <span
          key={`${node.left}-${node.top}`}
          className="absolute h-2 w-2 rounded-full border border-slate-400/50 bg-white/80 shadow-sm animate-float"
          style={{
            left: node.left,
            top: node.top,
            animationDelay: node.delay,
            animationDuration: `${7 + index}s`,
          }}
        />
      ))}
    </div>
  );
}
