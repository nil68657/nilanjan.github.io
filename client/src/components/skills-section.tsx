export function SkillsSection() {
  const skillCategories = [
    {
      id: 'cloud',
      icon: '☁️',
      title: 'Cloud Platforms',
      color: 'fractal-cyan',
      skills: ['AWS', 'Google Cloud', 'Azure']
    },
    {
      id: 'languages',
      icon: '💻',
      title: 'Languages',
      color: 'fractal-purple',
      skills: ['Python', 'Scala', 'Java', 'C++', 'Rust']
    },
    {
      id: 'databases',
      icon: '🗄️',
      title: 'Databases',
      color: 'fractal-orange',
      skills: ['BigQuery', 'Redis', 'MongoDB', 'Aerospike', 'DynamoDB']
    },
    {
      id: 'ml-ai',
      icon: '🤖',
      title: 'ML/AI',
      color: 'fractal-cyan',
      skills: ['GenAI', 'RAG', 'MLOps', 'Feature Stores', 'A/B Testing']
    },
    {
      id: 'data-engineering',
      icon: '⚙️',
      title: 'Data Engineering',
      color: 'fractal-purple',
      skills: ['Kafka', 'Spark', 'Airflow', 'Flink', 'dbt']
    },
    {
      id: 'visualization',
      icon: '📊',
      title: 'Visualization',
      color: 'fractal-orange',
      skills: ['Tableau', 'Superset', 'Grafana', 'Power BI']
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8" data-testid="skills-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-shadow-strong" data-testid="skills-title">
            Technical Expertise
          </h2>
          <p className="text-lg text-foreground/80 text-shadow-strong" data-testid="skills-subtitle">
            Comprehensive skillset across modern data and ML engineering stack
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div key={category.id} className="glass-morphism rounded-2xl p-6 hover:bg-white/5 transition-all duration-300" data-testid={`skill-category-${category.id}`}>
              <div className={`text-[hsl(var(--${category.color}))] text-2xl mb-4`} data-testid={`skill-icon-${category.id}`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 text-shadow-strong" data-testid={`skill-title-${category.id}`}>
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-block bg-foreground/10 text-foreground px-3 py-1 rounded-full text-sm mr-2 mb-2"
                    data-testid={`skill-tag-${category.id}-${index}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
