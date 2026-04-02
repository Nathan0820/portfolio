"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const socials = [
  { href: "https://github.com/Nathan0820", label: "GitHub", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
  { href: "https://linkedin.com/in/nathan-wong-540188313", label: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { href: "mailto:nathanwyj0629@gmail.com", label: "Email", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", stroke: true },
];

const techCategories = [
  { label: "Languages", items: ["Python", "Java", "JavaScript", "TypeScript", "SQL", "HTML/CSS"] },
  { label: "Frameworks", items: ["React", "React Native", "Next.js"] },
  { label: "AI / ML", items: ["TensorFlow", "PyTorch", "Scikit-Learn"] },
  { label: "Tools", items: ["Git", "Docker", "PostgreSQL", "Supabase"] },
];  

const highlights = [
  { label: "Technologies", value: 7, suffix: "+" },
  { label: "Projects Completed", value: 3, suffix: "+" },
  { label: "Years Coding", value: 3, suffix: "" },
];

const cardTechs = [
  { name: "Python", color: "#4B8BBE", viewBox: "0 0 24 24", icon: "", paths: [
    { d: "M12.044 0C5.415 0 5.708 2.916 5.708 2.916l.007 3.02h6.425v.907H3.832S0 6.377 0 12.044c0 5.667 3.345 5.465 3.345 5.465h1.997v-2.63s-.108-3.345 3.29-3.345h5.668s3.183.052 3.183-3.077V3.33S17.943 0 12.044 0zm-3.147 1.96a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z", color: "#4B8BBE" },
    { d: "M11.956 24c6.629 0 6.336-2.916 6.336-2.916l-.007-3.02h-6.425v-.907h8.308S24 17.623 24 11.956c0-5.667-3.345-5.465-3.345-5.465h-1.997v2.63s.108 3.345-3.29 3.345H9.7s-3.183-.052-3.183 3.077v5.127S6.057 24 11.956 24zm3.147-1.96a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z", color: "#FFD43B" },
  ] },
  { name: "JavaScript", color: "#F7DF1E", viewBox: "0 0 24 24", icon: "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.405-.6-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" },
  { name: "TypeScript", color: "#3178C6", viewBox: "0 0 24 24", icon: "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 011.306.34v2.458a3.95 3.95 0 00-.643-.361 5.093 5.093 0 00-.717-.26 5.453 5.453 0 00-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 00-.623.242c-.17.104-.3.229-.393.374a.888.888 0 00-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 01-1.012 1.085 4.38 4.38 0 01-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 01-1.84-.164 5.544 5.544 0 01-1.512-.493v-2.63a5.033 5.033 0 003.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 00-.074-1.089 2.12 2.12 0 00-.537-.5 5.597 5.597 0 00-.807-.444 27.72 27.72 0 00-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 011.47-.629 7.536 7.536 0 011.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" },
  { name: "React", color: "#61DAFB", viewBox: "0 0 24 24", icon: "M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.068-.838.182-.854.427-1.216 1.49-1.08 3.104.045.522.144 1.094.3 1.706C3.38 7.442 2.4 8.72 2.4 10.124c0 2.064 1.878 3.39 3.598 4.138-.258.708-.417 1.392-.488 2.003-.193 1.674.151 2.808 1.033 3.25.248.124.53.184.837.184 1.346 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.31 0 .592-.068.838-.182.854-.427 1.216-1.49 1.08-3.104-.045-.522-.144-1.094-.3-1.706 2.105-1.216 3.085-2.494 3.085-3.898 0-2.064-1.878-3.39-3.598-4.138.258-.708.417-1.392.488-2.003.193-1.674-.151-2.808-1.033-3.25a1.727 1.727 0 00-.838-.184zM12 15.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z" },
  { name: "Next.js", color: "#ffffff", viewBox: "0 0 24 24", icon: "M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10513.58 10513.58 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.5-.054z" },
  { name: "TensorFlow", color: "#FF6F00", viewBox: "0 0 24 24", icon: "M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-3.079 1.791-3.074-1.79zm21.416 1.749l-7.173-4.163v14.68L11.44 21.5V24l11.268-6.538z" },
  { name: "PyTorch", color: "#EE4C2C", viewBox: "0 0 24 24", icon: "M12.005 0L4.952 7.053a9.865 9.865 0 000 14.022 9.866 9.866 0 0014.022 0c3.876-3.878 3.876-10.148 0-14.022l-1.746 1.746c2.903 2.903 2.903 7.627 0 10.53a7.442 7.442 0 01-10.53 0 7.442 7.442 0 010-10.53L12.005 0zm3.49 4.038a1.47 1.47 0 100 2.94 1.47 1.47 0 000-2.94z" },
  { name: "Docker", color: "#2496ED", viewBox: "0 0 24 24", icon: "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.186.186 0 00-.187.186v1.887c0 .103.084.185.187.185zm-2.954-5.43h2.118a.186.186 0 00.187-.185V3.575a.186.186 0 00-.187-.186h-2.118a.186.186 0 00-.187.186v1.888c0 .102.084.185.187.185zm0 2.716h2.118a.187.187 0 00.187-.186V6.29a.186.186 0 00-.187-.186h-2.118a.186.186 0 00-.187.186v1.887c0 .103.084.186.187.186zm-2.93 0h2.12a.186.186 0 00.186-.186V6.29a.186.186 0 00-.186-.186H8.1a.186.186 0 00-.185.186v1.887c0 .103.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .103.084.186.186.186zm5.893 2.715h2.118a.186.186 0 00.187-.185V9.006a.186.186 0 00-.187-.186h-2.118a.186.186 0 00-.187.186v1.887c0 .103.084.185.187.185zm-2.93 0h2.12a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.12a.186.186 0 00-.184.186v1.887c0 .103.083.185.185.185zm-2.964 0h2.119a.186.186 0 00.185-.185V9.006a.186.186 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .103.084.185.186.185zm-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.186.186 0 00-.184-.186h-2.12a.186.186 0 00-.184.186v1.887c0 .103.082.185.185.185zM23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.722 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z" },
  { name: "Git", color: "#F05032", viewBox: "0 0 24 24", icon: "M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 012.4 2.346l2.665 2.665a1.838 1.838 0 11-1.101 1.036L12.88 8.882v6.236a1.838 1.838 0 11-1.465-.052V8.69a1.838 1.838 0 01-.998-2.41L7.678 3.54.452 10.766c-.604.603-.604 1.582 0 2.186l10.48 10.48c.604.604 1.582.604 2.186 0l10.43-10.317c.604-.603.604-1.582-.002-2.186z" },
  { name: "PostgreSQL", color: "#4169E1", viewBox: "0 0 24 24", icon: "M23.557 14.945c-.186-.636-.557-.96-1.075-.96-.137 0-.283.024-.441.072-.939.283-1.665.33-2.169.147.365-.834.636-1.74.801-2.535.318-1.515.324-2.703.013-3.426-.544-1.27-1.624-2.166-2.893-2.69.063-.222.096-.453.096-.684C17.889 2.425 15.943 0 13.125 0c-.717 0-1.404.17-2.04.497a.727.727 0 00-.03.016C10.408.187 9.702 0 8.986 0 6.392 0 4.284 2.108 4.284 4.702c0 .24.021.483.063.73A4.93 4.93 0 001.89 7.504c-1.14 1.397-1.578 3.26-1.236 5.253.504 2.942 1.9 5.834 3.558 7.37a3.2 3.2 0 002.234.96c.263 0 .53-.04.79-.118a2.66 2.66 0 001.048-.576 2.42 2.42 0 001.36.409c.367 0 .72-.082 1.047-.238.5-.237.916-.618 1.209-1.093.5.106.993.159 1.464.159 1.27 0 2.334-.405 3.076-1.106.397.086.774.13 1.127.13.837 0 1.537-.27 2.025-.778.617-.642.836-1.564.618-2.597a3.418 3.418 0 00-.653-1.334z" },
  { name: "Supabase", color: "#3ECF8E", viewBox: "0 0 24 24", icon: "M21.362 9.354H12V.396a.396.396 0 00-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 00.757 1.66h9.362v8.959a.396.396 0 00.716.233l9.081-12.261.401-.562a1.04 1.04 0 00-.757-1.661z" },
];

function Counter({ target, isVisible, suffix }: { target: number; isVisible: boolean; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * easeOut));

      if (currentStep >= steps) {
        clearInterval(interval);
        setDisplay(target);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible, target]);

  return <span>{display}{suffix}</span>;
}

function LanyardCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div className="flex flex-col items-center animate-lanyard-swing" style={{ transformOrigin: "top center" }}>
      {/* Lanyard string */}
      <div className="w-[3px] h-10 bg-gradient-to-b from-purple-300 via-purple-300/80 to-blue-300 rounded-full shadow-[0_0_8px_rgba(196,181,253,0.3)]" />

      {/* Clip ring + holder */}
      <div className="flex flex-col items-center -mt-1.5 z-10">
        <div className="w-5 h-5 rounded-full border-[2.5px] border-purple-300 shadow-[0_0_8px_rgba(196,181,253,0.4)]" />
        <div className="w-9 h-2.5 bg-gradient-to-b from-purple-200 to-purple-300 rounded-sm -mt-0.5 shadow-sm" />
      </div>

      {/* Card with perspective */}
      <div style={{ perspective: "800px" }} className="mt-0.5">
        <div
          ref={cardRef}
          className="relative w-44 h-60 md:w-52 md:h-72 cursor-pointer select-none"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${tilt.x}deg) rotateY(${flipped ? 180 + tilt.y : tilt.y}deg)`,
            transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
          onClick={() => setFlipped((f) => !f)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-purple-200 via-blue-200 to-purple-200"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-full h-full bg-[#e8e8ee] rounded-2xl flex flex-col items-center justify-center gap-3 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-2 ring-purple-300 ring-offset-2 ring-offset-[#e8e8ee]">
                <Image
                  src="/profile.jpg"
                  alt="Nathan Wong"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-10 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
              <h3 className="text-slate-800 font-semibold text-base tracking-wide">Nathan Wong</h3>
              <p className="text-purple-600 text-xs font-medium">CS @ NUS</p>
              <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Singapore</span>
              </div>
              <p className="text-slate-400 text-[10px] mt-auto">Click to flip</p>
            </div>
          </div>

          {/* Back face */}
          <div
            className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-blue-200 via-purple-200 to-blue-200"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="w-full h-full bg-[#e8e8ee] rounded-2xl relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
              {cardTechs.map((tech, i) => {
                const positions = [
                  { top: "6%", left: "8%" },
                  { top: "4%", left: "55%" },
                  { top: "12%", left: "72%" },
                  { top: "24%", left: "18%" },
                  { top: "28%", left: "52%" },
                  { top: "22%", left: "80%" },
                  { top: "42%", left: "6%" },
                  { top: "44%", left: "42%" },
                  { top: "40%", left: "74%" },
                  { top: "58%", left: "22%" },
                  { top: "62%", left: "58%" },
                  { top: "76%", left: "10%" },
                ];
                const rotations = [-12, 8, -5, 15, -9, 6, -14, 10, -3, 11, -7, 13];
                const scales = [1, 0.9, 1.1, 0.85, 1.05, 0.95, 1.1, 0.9, 1, 0.95, 1.05, 0.85];
                const pos = positions[i % positions.length];
                const rot = rotations[i % rotations.length];
                const sc = scales[i % scales.length];

                return (
                  <div
                    key={tech.name}
                    className="absolute hover:scale-150 hover:z-20 hover:!rotate-0 transition-all duration-200 cursor-default"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      transform: `rotate(${rot}deg) scale(${sc})`,
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
                    }}
                  >
                    <svg viewBox={tech.viewBox} className="w-7 h-7">
                      {tech.paths ? (
                        tech.paths.map((p, j) => <path key={j} d={p.d} fill={p.color} />)
                      ) : (
                        <path d={tech.icon} fill={tech.color} />
                      )}
                    </svg>
                  </div>
                );
              })}

              <p className="absolute bottom-2 left-0 right-0 text-center text-slate-400 text-[8px]">tap to flip back</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
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
          className={`bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-purple-500/20 hover:border-blue-500/30 shadow-xl shadow-purple-500/5 transition-all duration-500 overflow-hidden ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Lanyard Card */}
            <div
              className={`shrink-0 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <LanyardCard />
            </div>

            {/* Bio */}
            <div className="space-y-6 text-center md:text-left flex-1">
              <p
                className={`text-slate-300 text-lg leading-relaxed transition-all duration-700 delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                I&apos;m a Year 2 Computer Science student at{" "}
                <span className="text-purple-400 font-medium">NUS</span>, passionate about building intelligent systems that solve real-world problems.
                My focus areas include{" "}
                <span className="text-blue-400">Machine Learning</span>,{" "}
                <span className="text-blue-400">Deep Learning</span>, and{" "}
                <span className="text-blue-400">Natural Language Processing</span>.
                I love transforming complex ideas into elegant, working solutions.
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
                      <Counter target={stat.value} isVisible={isVisible} suffix={stat.suffix} />
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
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Tech Stack
                </h3>

                {/* Category tabs */}
                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                  {techCategories.map((cat, i) => (
                    <button
                      key={cat.label}
                      onClick={() => setActiveCategory(i)}
                      className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-300 ${
                        activeCategory === i
                          ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/50 text-white shadow-lg shadow-purple-500/10"
                          : "border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-300 hover:bg-slate-800/50"
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

                {/* Social links & Resume */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4 mt-4 border-t border-slate-700/50">
                  <div className="flex gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-800 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20"
                        aria-label={social.label}
                      >
                        <svg
                          className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors"
                          fill={social.stroke ? "none" : "currentColor"}
                          stroke={social.stroke ? "currentColor" : undefined}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={social.stroke ? 2 : undefined} d={social.icon} />
                        </svg>
                      </a>
                    ))}
                  </div>
                  <a
                    href="/resume.pdf"
                    download="Resume.pdf"
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-blue-500/50 text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105"
                  >
                    <svg className="w-4 h-4 text-purple-400 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}