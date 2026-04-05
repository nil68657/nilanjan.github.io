const PINNED = [
  {
    name: 'Advanced_NLP_Spacy',
    description: 'spaCy: POS, intent, NER.',
    language: 'Python',
    langColor: '#3572A5',
    href: 'https://github.com/nil68657/Advanced_NLP_Spacy',
    visibility: 'Public',
  },
  {
    name: 'char-rnn',
    description: 'Small RNN for text generation.',
    language: 'Python',
    langColor: '#3572A5',
    href: 'https://github.com/nil68657/char-rnn',
    visibility: 'Public',
  },
  {
    name: 'codecrafters-sqlite-python',
    description: 'SQLite from scratch (learning exercise).',
    language: 'Python',
    langColor: '#3572A5',
    href: 'https://github.com/nil68657/codecrafters-sqlite-python',
    visibility: 'Public',
  },
  {
    name: 'Analytics_Vidhya',
    description: 'Competition / practice notebooks.',
    language: 'Jupyter Notebook',
    langColor: '#DA5B0B',
    href: 'https://github.com/nil68657/Analytics_Vidhya',
    visibility: 'Public',
  },
  {
    name: 'ml-serving-platform',
    description: 'Inference, scaling, and monitoring. Not public.',
    language: 'Internal',
    langColor: '#8b949e',
    href: null,
    visibility: 'Private',
  },
  {
    name: 'hpc-training-pipelines',
    description: 'Cluster jobs, Slurm, GPUs. Not public.',
    language: 'Internal',
    langColor: '#8b949e',
    href: null,
    visibility: 'Private',
  },
]

function RepoIcon() {
  return (
    <svg className="pin-repo-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
    </svg>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="section-projects" aria-labelledby="projects-heading">
      <div className="section-inner readme-inner">
        <h2 id="projects-heading" className="readme-h2 fade-up">
          Pinned
        </h2>
        <div className="pins-grid">
          {PINNED.map((p) => (
            <article key={p.name} className="github-pin fade-up">
              <div className="github-pin__head">
                <RepoIcon />
                {p.href ? (
                  <a className="github-pin__title" href={p.href} target="_blank" rel="noopener noreferrer">
                    {p.name}
                  </a>
                ) : (
                  <span className="github-pin__title github-pin__title--static">{p.name}</span>
                )}
                <span className={`github-pin__badge github-pin__badge--${p.visibility.toLowerCase()}`}>
                  {p.visibility}
                </span>
              </div>
              <p className="github-pin__desc">{p.description}</p>
              <div className="github-pin__foot">
                <span className="github-pin__lang">
                  <span className="github-pin__dot" style={{ background: p.langColor }} aria-hidden />
                  {p.language}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
