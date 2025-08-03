export function ContactSection() {
  const contactMethods = [
    {
      id: 'email',
      icon: '📧',
      title: 'Email',
      value: 'nilanjan.9325@gmail.com',
      href: 'mailto:nilanjan.9325@gmail.com',
      color: 'fractal-cyan'
    },
    {
      id: 'linkedin',
      icon: '💼',
      title: 'LinkedIn',
      value: '/in/nil68657',
      href: 'https://www.linkedin.com/in/nil68657',
      color: 'fractal-purple'
    },
    {
      id: 'github',
      icon: '💻',
      title: 'GitHub',
      value: '/nil68657',
      href: 'https://github.com/nil68657',
      color: 'fractal-orange'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8" data-testid="contact-section">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-morphism rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-shadow-strong" data-testid="contact-title">
            Let's Connect
          </h2>
          <p className="text-lg text-foreground/80 mb-8 text-shadow-strong" data-testid="contact-description">
            Open to leadership roles and interesting opportunities in Data & ML Engineering
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {contactMethods.map((method) => (
              <a 
                key={method.id}
                href={method.href} 
                target={method.href.startsWith('http') ? "_blank" : undefined}
                rel={method.href.startsWith('http') ? "noopener noreferrer" : undefined}
                className="glass-morphism rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group"
                data-testid={`contact-${method.id}`}
              >
                <div className={`text-[hsl(var(--${method.color}))] text-2xl mb-2`} data-testid={`contact-icon-${method.id}`}>
                  {method.icon}
                </div>
                <div className={`text-foreground font-semibold text-shadow-strong group-hover:text-[hsl(var(--${method.color}))] transition-colors`} data-testid={`contact-title-${method.id}`}>
                  {method.title}
                </div>
                <div className="text-foreground/70 text-sm text-shadow-strong" data-testid={`contact-value-${method.id}`}>
                  {method.value}
                </div>
              </a>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-foreground/60 text-sm text-shadow-strong" data-testid="contact-additional-info">
              📱 Phone: 1-704-345-9929 | 🏠 Austin, TX, USA | 🌍 Open to Relocation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
