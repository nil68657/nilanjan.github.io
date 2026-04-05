import { useEffect, useRef, useState } from 'react'
import { Navigation } from './components/Navigation'
import { ProjectsSection } from './components/ProjectsSection'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = root.querySelectorAll('.fade-up')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.08 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pageRef = useReveal()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <div className="bg-mesh" aria-hidden>
        <div className="bg-orb" />
      </div>
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="page" ref={pageRef}>
        <header id="top" className="hero">
          <div className="hero-inner fade-up">
            <div className="hero-badge">
              <span className="dot" aria-hidden />
              Open to leadership roles
            </div>
            <h1>
              Nilanjan Chatterjee
              <br />
              <span className="gradient-text">Senior Engineering Manager</span>
            </h1>
            <h2>
              AWS &amp; GCP certified. 12+ years building data platforms, MLOps, and GenAI systems with
              high-performing teams.
            </h2>
            <div className="hero-btns">
              <a className="btn btn-primary" href="#contact">
                Get in touch
              </a>
              <a className="btn btn-ghost" href="#experience">
                View experience
              </a>
            </div>
          </div>
        </header>

        <section id="experience" aria-labelledby="exp-heading">
          <div className="section-inner">
            <p className="section-label">Career</p>
            <h2 id="exp-heading" className="section-title">
              Experience
            </h2>
            <p className="section-subtitle">
              Hands-on technical leadership across data engineering, ML platforms, and org design.
            </p>

            <div className="exp-timeline">
              <article className="card exp-card fade-up">
                <div className="exp-header">
                  <span className="exp-company">AMD</span>
                  <span className="exp-role">Senior Engineering Manager — Data &amp; ML</span>
                  <div className="exp-meta">
                    <span className="exp-period cyan">Present era</span>
                    <span className="exp-location">United States</span>
                  </div>
                </div>
                <ul className="exp-achievements cyan">
                  <li>
                    Led roadmaps for data and ML platforms serving analytics, experimentation, and model
                    lifecycle needs at scale.
                  </li>
                  <li>
                    Partnered with product and infrastructure to improve reliability, cost, and time-to-ship
                    for critical pipelines.
                  </li>
                  <li>
                    Grew engineers through clear charters, technical standards, and balanced delivery
                    against research bets.
                  </li>
                </ul>
              </article>

              <article className="card exp-card fade-up">
                <div className="exp-header">
                  <span className="exp-company">Prior leadership &amp; IC roles</span>
                  <span className="exp-role">Data platforms, cloud architecture, ML engineering</span>
                  <div className="exp-meta">
                    <span className="exp-period violet">Earlier</span>
                  </div>
                </div>
                <ul className="exp-achievements violet">
                  <li>Designed lakehouse-style storage, ingestion, and governance patterns on major clouds.</li>
                  <li>Shipped batch and streaming pipelines with strong testing, monitoring, and SLOs.</li>
                  <li>
                    Mentored teams on polyglot stacks (Python, JVM, SQL) and pragmatic platform abstractions.
                  </li>
                </ul>
              </article>
            </div>

            <p className="section-label" style={{ marginTop: '2.5rem' }}>
              Earlier stops
            </p>
            <div className="earlier-grid fade-up">
              <div className="card earlier-item">
                <div className="earlier-company">Enterprise &amp; product engineering</div>
                <div className="earlier-detail">Delivery, architecture reviews, cross-team programs</div>
              </div>
              <div className="card earlier-item">
                <div className="earlier-company">Analytics &amp; research</div>
                <div className="earlier-detail">Modeling, experimentation, stakeholder storytelling</div>
              </div>
            </div>
          </div>
        </section>

        <ProjectsSection />

        <section id="skills" aria-labelledby="skills-heading">
          <div className="section-inner section-header-center">
            <p className="section-label">Stack</p>
            <h2 id="skills-heading" className="section-title">
              Skills
            </h2>
            <p className="section-subtitle">
              Depth in data/ML with breadth across cloud, reliability, and people leadership.
            </p>
            <div className="skills-grid">
              {[
                { icon: '☁️', title: 'Cloud & infra', items: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'CI/CD'] },
                { icon: '📊', title: 'Data platforms', items: ['Spark', 'Kafka', 'Airflow', 'dbt', 'Iceberg/Delta'] },
                { icon: '🤖', title: 'ML & GenAI', items: ['PyTorch', 'Triton', 'RAG', 'Vector DBs', 'Evals'] },
                { icon: '🧭', title: 'Leadership', items: ['Roadmaps', 'Hiring', 'Coaching', 'Stakeholder mgmt'] },
                { icon: '🔐', title: 'Quality', items: ['SLOs', 'Observability', 'Security reviews', 'Cost'] },
                { icon: '⚡', title: 'Languages', items: ['Python', 'SQL', 'Scala', 'Java', 'TypeScript'] },
              ].map((s) => (
                <div key={s.title} className="card skill-card fade-up">
                  <div className="skill-icon" aria-hidden>
                    {s.icon}
                  </div>
                  <h3 className="skill-title">{s.title}</h3>
                  <div className="tags">
                    {s.items.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-heading">
          <div className="section-inner section-header-center">
            <p className="section-label">Contact</p>
            <h2 id="contact-heading" className="section-title">
              Let&apos;s connect
            </h2>
            <p className="section-subtitle">
              Best for strategic roles in data, ML platform, or applied AI leadership.
            </p>
            <div className="card contact-card fade-up">
              <div className="contact-grid contact-grid--two">
                <a
                  className="contact-item"
                  href="https://www.linkedin.com/in/nil68657/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="contact-icon" aria-hidden>
                    in
                  </div>
                  <div className="contact-label">LinkedIn</div>
                  <div className="contact-value">/in/nil68657</div>
                </a>
                <a
                  className="contact-item"
                  href="https://github.com/nil68657"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="contact-icon" aria-hidden>
                    &lt;/&gt;
                  </div>
                  <div className="contact-label">GitHub</div>
                  <div className="contact-value">@nil68657</div>
                </a>
              </div>
              <p className="contact-extra">Add your email or resume link in the source when ready.</p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-links">
              <a
                className="footer-link"
                href="https://www.linkedin.com/in/nil68657/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in new tab)"
              >
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                className="footer-link"
                href="https://github.com/nil68657"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in new tab)"
              >
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} Nilanjan Chatterjee. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
