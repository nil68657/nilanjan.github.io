export function HeroSection() {
  const scrollToExperience = () => {
    const element = document.getElementById('experience');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" data-testid="hero-section">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-morphism rounded-3xl p-8 md:p-12 animate-float">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-glow" data-testid="hero-title">
            Nilanjan Chatterjee
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground mb-8" data-testid="hero-subtitle">
            Senior Engineering Manager
          </h2>
          <p className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed" data-testid="hero-description">
            AWS | GCP certified polyglot architect with 12+ years of experience in Data and ML Engineering leadership with problem-solving acumen and proven ability in leading GTM strategy of turn-key solutions and 0-1 products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToExperience}
              className="px-8 py-4 bg-[hsl(var(--fractal-cyan))] text-primary-foreground font-semibold rounded-full hover:bg-[hsl(var(--fractal-purple))] transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              data-testid="button-view-experience"
            >
              View Experience
            </button>
            <a 
              href="https://github.com/nil68657" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 glass-morphism text-foreground font-semibold rounded-full hover:bg-foreground/10 transition-colors shadow-lg"
              data-testid="link-github"
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
