const BLOCKS = [
  {
    title: 'Analytics',
    emoji: '⚙️',
    items: ['Metrics', 'Experimentation', 'Model lifecycle', 'Cost', 'Reliability'],
  },
  {
    title: 'Languages',
    emoji: '👩‍💻',
    items: ['Python', 'SQL', 'Scala', 'Java', 'TypeScript', 'Bash'],
  },
  {
    title: 'Database',
    emoji: '⚡',
    items: ['Postgres', 'MySQL', 'Iceberg', 'Delta', 'Warehouse SQL'],
  },
  {
    title: 'Frameworks & libraries',
    emoji: '🚀',
    items: ['Spark', 'Kafka', 'Airflow', 'dbt', 'PyTorch', 'Kubernetes', 'REST', 'gRPC'],
  },
  {
    title: 'IDE & tools',
    emoji: '🧰',
    items: ['VS Code', 'IntelliJ', 'Git', 'Jira', 'Terraform', 'CI'],
  },
  {
    title: 'Cloud',
    emoji: '☁️',
    items: ['AWS', 'GCP', 'Kubernetes', 'Logging / metrics'],
  },
]

export function TechStackSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="section-inner readme-inner">
        <h2 id="skills-heading" className="readme-h2 fade-up">
          Languages &amp; tools
        </h2>
        <div className="tech-blocks">
          {BLOCKS.map((b) => (
            <div key={b.title} className="tech-block fade-up">
              <h3 className="readme-h3">
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
