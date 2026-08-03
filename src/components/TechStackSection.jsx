import { CAPABILITIES } from '../data/portfolio'

export function TechStackSection() {
  return (
    <section id="expertise" className="section expertise-section" aria-labelledby="expertise-heading">
      <div className="section-shell">
        <div className="section-heading fade-up">
          <p className="section-kicker">Expertise / Systems thinking</p>
          <h2 id="expertise-heading">Strategy that survives contact with production.</h2>
          <p>
            I work across the full architecture surface—product intent, platform design, governance,
            delivery, and the operating model that keeps it all healthy.
          </p>
        </div>

        <div className="capability-grid">
          {CAPABILITIES.map((capability) => (
            <article className="capability-card fade-up" key={capability.title}>
              <div className="capability-card-head">
                <span>{capability.number}</span>
                <span className="capability-line" aria-hidden />
              </div>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <ul>
                {capability.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
