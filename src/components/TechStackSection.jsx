const BLOCKS = [
  {
    title: 'Languages',
    emoji: '👩‍💻',
    items: ['Python', 'SQL', 'Scala', 'Java', 'TypeScript', 'Bash'],
  },
  {
    title: 'Data & ML',
    emoji: '📊',
    items: ['Spark', 'Kafka', 'Airflow', 'PyTorch', 'Triton', 'RAG', 'Vector DBs'],
  },
  {
    title: 'Cloud & platform',
    emoji: '☁️',
    items: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'CI/CD', 'Observability'],
  },
  {
    title: 'Leadership',
    emoji: '🧭',
    items: ['Roadmaps', 'Hiring', 'Coaching', 'Stakeholders', 'SLOs', 'Cost'],
  },
]

export function TechStackSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="section-inner readme-inner">
        <h2 id="skills-heading" className="readme-h2 fade-up">
          Tech stack
        </h2>
        <p className="readme-lead fade-up">
          Grouped like a profile README &mdash; tools I use for data platforms, ML, and org execution.
        </p>
        <div className="tech-blocks">
          {BLOCKS.map((b) => (
            <div key={b.title} className="tech-block fade-up">
              <h3 className="tech-block__title">
                <span aria-hidden>{b.emoji}</span> {b.title}
              </h3>
              <div className="tech-block__tags">
                {b.items.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
