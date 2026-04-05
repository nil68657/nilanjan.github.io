const PROJECTS = [
  {
    title: 'MLOps serving infrastructure',
    description:
      'Production inference stacks with autoscaling, model versioning, and observability—reducing latency and operational toil for ML services at scale.',
    tags: ['Kubernetes', 'Triton', 'Python', 'Prometheus'],
    href: null,
    linkAccent: 'cyan',
  },
  {
    title: 'Indian language NLP',
    description:
      'Tokenization, tagging, and lightweight translation workflows for low-resource Indic scripts—built for accuracy and fast iteration on real text.',
    tags: ['Python', 'spaCy', 'NLP', 'Transformers'],
    href: 'https://github.com/nil68657/Advanced_NLP_Spacy',
    linkAccent: 'violet',
  },
  {
    title: 'HPC multi-node clusters',
    description:
      'Distributed training and batch analytics on shared clusters—job scheduling, data locality, and resilient pipelines across many nodes.',
    tags: ['Slurm', 'MPI', 'Linux', 'CUDA'],
    href: null,
    linkAccent: 'amber',
  },
  {
    title: 'Character-level RNN',
    description:
      'Educational sequence model for text generation—illustrates RNN fundamentals and training loops in a compact, hackable codebase.',
    tags: ['PyTorch', 'RNN', 'Python'],
    href: 'https://github.com/nil68657/char-rnn',
    linkAccent: 'cyan',
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="section-projects" aria-labelledby="projects-heading">
      <div className="section-inner section-header-center">
        <p className="section-label">Portfolio</p>
        <h2 id="projects-heading" className="section-title">
          Key projects
        </h2>
        <p className="section-subtitle">
          A mix of production-scale systems and open experiments. Swap in your own repos and copy anytime.
        </p>
        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <article key={p.title} className="card project-card fade-up">
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.description}</p>
              <div className="tags" role="list">
                {p.tags.map((t) => (
                  <span key={t} className="tag" role="listitem">
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-footer">
                {p.href ? (
                  <a
                    className={`project-link project-link--${p.linkAccent}`}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repository
                    <span aria-hidden> →</span>
                  </a>
                ) : (
                  <span className="project-nda">Internal / NDA</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
