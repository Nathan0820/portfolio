import { Navigation } from "@/components/Navigation";
import { FloatingShapes } from "@/components/FloatingShapes";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { EducationSection } from "@/components/EducationSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <FloatingShapes />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
