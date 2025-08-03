import { MandelbrotRenderer } from "@/components/mandelbrot-renderer";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="overflow-x-hidden min-h-screen relative">
      <MandelbrotRenderer />
      <div className="relative z-10 bg-white/80 backdrop-blur-sm text-black">
        <Navigation />
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass-morphism rounded-2xl p-6 text-center">
            <p className="text-foreground/70 text-sm">
              © 2024 Nilanjan Chatterjee. Built with passion for data and fractals.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
