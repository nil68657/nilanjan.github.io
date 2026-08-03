import { PROFILE, PROJECTS } from '../data/portfolio'

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden>
      <path d="M4 12 12 4M5 4h7v7" />
    </svg>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="section projects-section" aria-labelledby="projects-heading">
      <div className="section-shell">
        <div className="section-heading section-heading-split fade-up">
          <div>
            <p className="section-kicker">Selected builds / Applied research</p>
            <h2 id="projects-heading">Ideas made executable.</h2>
          </div>
          <a className="text-link" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            Explore GitHub
            <ArrowUpRight />
          </a>
        </div>

        <div className="project-list">
          {PROJECTS.map((project) => (
            <article className="project-row fade-up" key={project.title}>
              <span className="project-index">{project.index}</span>
              <div className="project-copy">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul aria-label={`${project.title} technologies`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              {project.href ? (
                <a
                  className="project-action"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <ArrowUpRight />
                </a>
              ) : (
                <span className="project-action project-action-muted" aria-hidden>
                  —
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
