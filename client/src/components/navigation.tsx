import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function Navigation() {
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism" data-testid="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold text-foreground text-shadow-strong">
            Nilanjan Chatterjee
          </div>
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-foreground hover:text-[hsl(var(--fractal-cyan))] transition-colors text-shadow-strong"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('experience')}
              className="text-foreground hover:text-[hsl(var(--fractal-cyan))] transition-colors text-shadow-strong"
              data-testid="nav-experience"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="text-foreground hover:text-[hsl(var(--fractal-cyan))] transition-colors text-shadow-strong"
              data-testid="nav-skills"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-[hsl(var(--fractal-cyan))] transition-colors text-shadow-strong"
              data-testid="nav-contact"
            >
              Contact
            </button>
          </div>
          <Button
            onClick={toggleTheme}
            className="p-2 rounded-lg glass-morphism hover:bg-white/10 transition-colors bg-transparent border-0"
            data-testid="theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}
