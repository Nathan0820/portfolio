"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const techIcons: Record<string, { svg: string; color: string; viewBox?: string; paths?: Array<{ d: string; color: string }> }> = {
  Python: {
    svg: "",
    color: "#4B8BBE",
    paths: [
      { d: "M12.044 0C5.415 0 5.708 2.916 5.708 2.916l.007 3.02h6.425v.907H3.832S0 6.377 0 12.044c0 5.667 3.345 5.465 3.345 5.465h1.997v-2.63s-.108-3.345 3.29-3.345h5.668s3.183.052 3.183-3.077V3.33S17.943 0 12.044 0zm-3.147 1.96a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z", color: "#4B8BBE" },
      { d: "M11.956 24c6.629 0 6.336-2.916 6.336-2.916l-.007-3.02h-6.425v-.907h8.308S24 17.623 24 11.956c0-5.667-3.345-5.465-3.345-5.465h-1.997v2.63s.108 3.345-3.29 3.345H9.7s-3.183-.052-3.183 3.077v5.127S6.057 24 11.956 24zm3.147-1.96a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z", color: "#FFD43B" },
    ],
  },
  Pandas: { svg: "M16.922 0h2.623v18.104h-2.623zm-4.126 12.94h2.623v2.623h-2.623zm0-7.037h2.623v5.73h-2.623zm0 11.197h2.623v5.73h-2.623zM4.456 5.903h2.623v5.73H4.456zm0 7.036h2.623v2.624H4.456zm0 4.163h2.623v5.73H4.456zM8.79 0h2.623v18.104H8.79zM4.456.767h2.623v3.396H4.456zm12.466 0h2.623v3.396h-2.623z", color: "#6B5CE7" },
  NumPy: { svg: "M8.955.518a1.2 1.2 0 0 0-.555.09L4.058 2.756a1.2 1.2 0 0 0-.528.432L.482 8.079a1.2 1.2 0 0 0-.156.603v5.636a1.2 1.2 0 0 0 .156.603l3.048 4.891a1.2 1.2 0 0 0 .528.432l4.342 2.148a1.2 1.2 0 0 0 1.11 0l4.342-2.148a1.2 1.2 0 0 0 .528-.432l3.048-4.891a1.2 1.2 0 0 0 .156-.603V8.682a1.2 1.2 0 0 0-.156-.603L14.38 3.188a1.2 1.2 0 0 0-.528-.432L9.51.608a1.2 1.2 0 0 0-.555-.09z", color: "#4DABCF" },
  NLTK: { svg: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", color: "#3F8EBC" },
  "Scikit-learn": { svg: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", color: "#F7931E" },
  Matplotlib: { svg: "", color: "#11557C", viewBox: "0 0 180 180", paths: [
    { d: "M90,2a88,88 0 1,0 0,176a88,88 0 1,0 0,-176Z", color: "#334155" },
    { d: "m90,90h18a18,18 0 0,0 0-5z", color: "#4444CC" },
    { d: "m90,90 34-43a55,55 0 0,0-15-8z", color: "#BBCC33" },
    { d: "m90,90-16-72a74,74 0 0,0-31,15z", color: "#DD9933" },
    { d: "m90,90-58-28a65,65 0 0,0-5,39z", color: "#DDBB33" },
    { d: "m90,90-33,16a37,37 0 0,0 2,5z", color: "#33BBBB" },
    { d: "m90,90-10,45a46,46 0 0,0 18,0z", color: "#33CC99" },
    { d: "m90,90 46,58a74,74 0 0,0 12-12z", color: "#DD7733" },
  ] },
  Seaborn: { svg: "", color: "#7B7EB8", viewBox: "0 0 24 24", paths: [
    { d: "M3,21V14H6V21Z", color: "#6A6EAA" },
    { d: "M7,21V9H10V21Z", color: "#7B7EB8" },
    { d: "M11,21V12H14V21Z", color: "#8B8EC8" },
    { d: "M15,21V6H18V21Z", color: "#7B7EB8" },
    { d: "M19,21V10H22V21Z", color: "#6A6EAA" },
    { d: "M2,16C5,16 7,7 9,5C10.5,3.5 11.5,3 12,3C12.5,3 13.5,3.5 15,5C17,7 19,16 22,16", color: "none" },
  ] },
  Expo: { svg: "M0 20.084c.043.53.23 1.063.718 1.778.58.849 1.576 1.315 2.303.567.49-.505 5.794-9.776 8.35-13.29a.761.761 0 011.248 0c2.556 3.514 7.86 12.785 8.35 13.29.727.748 1.723.282 2.303-.567.57-.835.728-1.42.728-2.046 0-.426-8.26-15.798-9.092-17.078-.8-1.23-1.044-1.498-2.397-1.542h-1.032c-1.353.044-1.597.311-2.398 1.542C8.267 3.991.33 18.758 0 19.77Z", color: "#AEAEB2" },
  TypeScript: { svg: "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.473.597.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-10.8.049h5.65v1.906H10.4V22h-2.24V11.705H5.688V9.799z", color: "#3178C6" },
  JavaScript: { svg: "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.405-.6-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z", color: "#F7DF1E" },
  React: { svg: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.541-2.602-4.887-2.602-.31 0-.592.06-.834.188C4.88 2.28 4.539 4.517 5.1 7.39c-.95.61-1.84 1.338-2.65 2.165C1.25 10.78.72 12.08.72 13.23c0 1.15.53 2.15 1.73 3.18.81.82 1.7 1.55 2.65 2.16-.43 2.87-.09 5.11 1.3 5.87.24.13.52.19.83.19 1.35 0 3.11-.95 4.89-2.6 1.78 1.65 3.54 2.6 4.89 2.6.31 0 .59-.06.83-.19 1.39-.76 1.73-2.99 1.17-5.87.95-.61 1.84-1.34 2.65-2.16 1.2-1.03 1.73-2.03 1.73-3.18 0-1.15-.53-2.45-1.73-3.67-.81-.83-1.7-1.56-2.65-2.17.56-2.87.22-5.11-1.17-5.87a1.68 1.68 0 0 0-.83-.19z", color: "#61DAFB" },
  "React Native": { svg: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.541-2.602-4.887-2.602-.31 0-.592.06-.834.188C4.88 2.28 4.539 4.517 5.1 7.39c-.95.61-1.84 1.338-2.65 2.165C1.25 10.78.72 12.08.72 13.23c0 1.15.53 2.15 1.73 3.18.81.82 1.7 1.55 2.65 2.16-.43 2.87-.09 5.11 1.3 5.87.24.13.52.19.83.19 1.35 0 3.11-.95 4.89-2.6 1.78 1.65 3.54 2.6 4.89 2.6.31 0 .59-.06.83-.19 1.39-.76 1.73-2.99 1.17-5.87.95-.61 1.84-1.34 2.65-2.16 1.2-1.03 1.73-2.03 1.73-3.18 0-1.15-.53-2.45-1.73-3.67-.81-.83-1.7-1.56-2.65-2.17.56-2.87.22-5.11-1.17-5.87a1.68 1.68 0 0 0-.83-.19z", color: "#61DAFB" },
  "Tailwind CSS": { svg: "M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z", color: "#06B6D4" },
  Supabase: { svg: "M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424a.396.396 0 0 0 .32.63h9.362v8.958a.396.396 0 0 0 .716.233l9.081-12.261a.396.396 0 0 0-.32-.63z", color: "#3ECF8E" },
  Geoapify: { svg: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z", color: "#4CAF50" },
  Vite: { svg: "m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.036-5.007a.306.306 0 0 0-.352-.385l-2.509.484a.306.306 0 0 1-.332-.438z", color: "#646CFF" },
};

function TechIcon({ name }: { name: string }) {
  const tech = techIcons[name];
  if (!tech) {
    return (
      <span className="text-xs px-2 py-1 bg-slate-700/50 border border-purple-500/20 text-slate-300 rounded">
        {name}
      </span>
    );
  }
  return (
    <div className="group/icon relative flex items-center justify-center w-9 h-9 rounded-lg bg-slate-700/50 border border-purple-500/20 hover:border-blue-500/40 hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
      <svg className="w-5 h-5" viewBox={tech.viewBox || "0 0 24 24"}>
        {tech.paths ? (
          tech.paths.map((p, i) => <path key={i} d={p.d} fill={p.color} />)
        ) : (
          <path d={tech.svg} fill={tech.color} />
        )}
      </svg>
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 text-xs text-white bg-slate-800 border border-slate-700 rounded whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none z-10">
        {name}
      </span>
    </div>
  );
}

interface Project {
  id: number;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  image: string;
  imageScale?: number;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Spam Message Detector",
    summary: "A spam message detector that uses machine learning to classify messages as spam or not spam.",
    description:
      "Built an NLP-based binary classifier to detect spam messages, achieving 97.8% accuracy and 0.91 F1 score using SVM on a dataset of 5,572 SMS messages. Implemented a full ML pipeline: text preprocessing (stopword removal, Porter stemming), TF-IDF vectorization with unigram/bigram features, and stratified train-test splitting. Trained and compared 5 classification models (SVM, Naive Bayes, Logistic Regression, Random Forest, Decision Tree), evaluating each on accuracy, precision, recall, and F1 score.",
    tags: ["Python", "Pandas", "NLTK", "Scikit-learn", "Matplotlib", "Seaborn"],
    github: "https://github.com/Nathan0820/SpamMessageDetector",
    image: "/projects/smd.jpg",
  },
  {
    id: 2,
    title: "SnapMap",
    summary: "A map application that allows users to upload photos of places they have visited and see them on a map.",
    description:
      "Engineered a cross-platform mobile app enabling users to pin and revisit geo-tagged memories on an interactive map, implementing custom React Native Maps markers and callouts to support rich location-based content browsing. Architected and deployed a serverless backend using Supabase, implementing RESTful APIs for secure user authentication and PostgreSQL data persistence. Integrated Geoapify API to render lightweight static map thumbnails for memory previews, reducing rendering overhead compared to loading full interactive maps in list views.",
    tags: ["Expo", "TypeScript", "JavaScript", "React", "React Native", "Tailwind CSS", "Supabase", "Geoapify"],
    github: "https://github.com/Nathan0820/SnapMap",
    image: "/projects/snapmap.png",
    imageScale: 1.3,
  },
  {
    id: 3,
    title: "VitTV",
    summary: "A retro TV web app that allows users to watch commercials from the 1980s and 1990s.",
    description:
    "Built a retro TV-themed web app featuring curated video playback and custom UI controls, leveraging Vite's fast HMR and optimized bundling to achieve sub-second load times and a smooth browsing experience. Designed a fully responsive UI with custom Tailwind CSS utility classes, structuring styles for component reusability and ensuring consistent rendering across desktop and mobile viewports.",
    tags: ["JavaScript", "React", "Tailwind CSS", "Vite"],
    github: "https://github.com/Nathan0820/VitTV",
    live: "https://vit-tv.vercel.app",
    image: "/projects/vit_tv.png",
    imageScale: 1.3,
  },
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
  return (
    <button
      onClick={onExpand}
      className={`group text-left bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 hover:border-blue-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 cursor-pointer w-full ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100 + 200}ms` }}
    >
      <div className="relative overflow-hidden">
        <Image src={project.image} alt={project.title} width={600} height={400} className="w-full h-auto block group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-blue-600/20 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        <div className="absolute bottom-3 right-3 text-xs text-slate-500 group-hover:text-blue-400 transition-colors flex items-center gap-1 bg-slate-900/60 px-2 py-1 rounded-full">
          Click to expand
          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4">{project.summary}</p>
        <div className="flex gap-2 flex-wrap">
          {project.tags.map((tag) => (
            <TechIcon key={tag} name={tag} />
          ))}
        </div>
      </div>
    </button>
  );
}

function ExpandedProject({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => setIsOpen(true));
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 transition-all duration-300 ${
        isOpen ? "bg-black/70 backdrop-blur-sm" : "bg-black/0"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={contentRef}
        className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/10 transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* Header image */}
        <div className="aspect-video relative">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-900/80 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{project.title}</h3>
            <div className="flex gap-2 flex-wrap mb-4">
              {project.tags.map((tag) => (
                <TechIcon key={tag} name={tag} />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-purple-400">About this project</h4>
            <p className="text-slate-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 border border-purple-500/30 text-white rounded-xl hover:border-blue-500/50 hover:scale-105 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="text-sm font-medium">Source Code</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="text-sm font-medium">Live Demo</span>
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const expandedProject = expandedId !== null ? projects.find((p) => p.id === expandedId) : null;

  return (
    <section id="projects" className="py-24 px-6 bg-slate-800/20 relative" ref={sectionRef}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto relative">
        <h2
          className={`text-3xl md:text-4xl font-bold text-white mb-12 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isVisible={isVisible}
              onExpand={() => setExpandedId(project.id)}
            />
          ))}
        </div>
      </div>

      {expandedProject && (
        <ExpandedProject
          project={expandedProject}
          onClose={() => setExpandedId(null)}
        />
      )}
    </section>
  );
}
