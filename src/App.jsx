import { useEffect, useRef, useState } from 'react'
import resumeUrl from '../Nilanjan_Principal_Data_Architect_Resume_v0.pdf?url'
import { ExperienceTimeline } from './components/ExperienceTimeline'
import { Navigation } from './components/Navigation'
import { ProjectsSection } from './components/ProjectsSection'
import { TechStackSection } from './components/TechStackSection'
import { IMPACT_STORIES, METRICS, PROFILE } from './data/portfolio'

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden>
      <path d="M4 12 12 4M5 4h7v7" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden>
      <path d="M9 3v12m0 0 5-5m-5 5-5-5" />
    </svg>
  )
}

function ArchitectureMap() {
  return (
    <figure className="architecture-card fade-up">
      <div className="architecture-card-head">
        <div>
          <span className="window-dot window-dot-red" />
          <span className="window-dot window-dot-amber" />
          <span className="window-dot window-dot-green" />
        </div>
        <span>enterprise_data_system</span>
        <span className="system-status">
          <i />
          online
        </span>
      </div>

      <div className="architecture-canvas" aria-hidden>
        <div className="flow-label flow-label-input">SOURCES</div>
        <div className="flow-source flow-source-one">Silicon</div>
        <div className="flow-source flow-source-two">Telemetry</div>
        <div className="flow-source flow-source-three">SaaS</div>

        <div className="flow-connector flow-connector-top" />
        <div className="flow-stream">
          <span />
          Event backbone
          <small>batch + real-time</small>
        </div>
        <div className="flow-connector flow-connector-middle" />

        <div className="flow-core">
          <div className="flow-core-orbit orbit-one" />
          <div className="flow-core-orbit orbit-two" />
          <span>UNIFIED</span>
          <strong>LAKEHOUSE</strong>
          <small>governed · observable · resilient</small>
        </div>

        <div className="flow-connector flow-connector-bottom" />
        <div className="flow-products">
          <span>DATA PRODUCTS</span>
          <span>ML + AI</span>
          <span>DECISIONS</span>
        </div>
      </div>

      <figcaption>
        <span>Target state</span>
        From raw signals to trusted decisions.
      </figcaption>
    </figure>
  )
}

function useReveal() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const elements = root.querySelectorAll('.fade-up')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return rootRef
}

function useScrollProgress() {
  useEffect(() => {
    let frame = 0
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      document.documentElement.style.setProperty('--scroll-progress', `${progress * 100}%`)
      frame = 0
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pageRef = useReveal()
  useScrollProgress()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden />
      <div className="page-noise" aria-hidden />
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} resumeUrl={resumeUrl} />

      <div ref={pageRef}>
        <main id="main-content">
          <header id="top" className="hero">
            <div className="hero-grid" aria-hidden />
            <div className="hero-orb" aria-hidden />
            <div className="section-shell hero-layout">
              <div className="hero-copy">
                <p className="hero-kicker fade-up">
                  <span className="availability-dot" />
                  Principal Data Architect · Austin, TX
                </p>
                <h1 className="fade-up">
                  Data systems
                  <span>built to compound.</span>
                </h1>
                <p className="hero-intro fade-up">
                  I’m Nilanjan Chatterjee. I architect enterprise Lakehouse, Data Mesh, and AI platforms
                  that turn complex, high-volume data into trusted products and measurable outcomes.
                </p>
                <div className="hero-actions fade-up">
                  <a className="button button-primary" href="#impact">
                    Explore my impact
                    <ArrowDown />
                  </a>
                  <a className="button button-secondary" href={resumeUrl} download>
                    Download résumé
                    <ArrowUpRight />
                  </a>
                </div>
                <div className="hero-trust fade-up">
                  <span>Architecture leadership across</span>
                  <ul>
                    <li>Semiconductor</li>
                    <li>Financial services</li>
                    <li>Cloud</li>
                    <li>Telecom</li>
                  </ul>
                </div>
              </div>
              <ArchitectureMap />
            </div>

            <a className="hero-scroll-cue" href="#impact" aria-label="Scroll to selected impact">
              <span>Scroll to explore</span>
              <ArrowDown />
            </a>
          </header>

          <section className="metrics-band" aria-label="Career highlights">
            <div className="section-shell metrics-grid">
              {METRICS.map((metric) => (
                <div className="metric fade-up" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="impact" className="section impact-section" aria-labelledby="impact-heading">
            <div className="section-shell">
              <div className="section-heading section-heading-split fade-up">
                <div>
                  <p className="section-kicker">Selected impact / At enterprise scale</p>
                  <h2 id="impact-heading">Proof, not promises.</h2>
                </div>
                <p>
                  Platforms are only valuable when they change the numbers. These are a few of the systems
                  and outcomes I’ve helped create.
                </p>
              </div>

              <div className="impact-grid">
                {IMPACT_STORIES.map((story) => (
                  <article className={`impact-card impact-card-${story.id} fade-up`} key={story.id}>
                    <div className="impact-card-topline">
                      <span>{story.index}</span>
                      <span>{story.company}</span>
                    </div>
                    <p className="impact-eyebrow">{story.eyebrow}</p>
                    <h3>{story.title}</h3>
                    <p className="impact-description">{story.description}</p>
                    <dl className="impact-outcomes">
                      {story.outcomes.map((outcome) => (
                        <div key={outcome.label}>
                          <dt>{outcome.value}</dt>
                          <dd>{outcome.label}</dd>
                        </div>
                      ))}
                    </dl>
                    <ul className="impact-stack" aria-label={`${story.company} technologies`}>
                      {story.stack.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manifesto-section" aria-label="Architecture philosophy">
            <div className="section-shell manifesto-layout">
              <p className="section-kicker fade-up">My operating principle</p>
              <blockquote className="fade-up">
                “The best architecture makes the right path the easy path—
                <span>for data, for teams, and for the business.”</span>
              </blockquote>
              <div className="principle-list fade-up">
                <span>01 · Align on value</span>
                <span>02 · Design for change</span>
                <span>03 · Instrument everything</span>
              </div>
            </div>
          </section>

          <section id="experience" className="section experience-section" aria-labelledby="experience-heading">
            <div className="section-shell">
              <div className="section-heading section-heading-split fade-up">
                <div>
                  <p className="section-kicker">Experience / 2013—Now</p>
                  <h2 id="experience-heading">A career built across the data lifecycle.</h2>
                </div>
                <p>
                  From hands-on distributed engineering to enterprise strategy and architecture leadership.
                </p>
              </div>
              <ExperienceTimeline />
            </div>
          </section>

          <TechStackSection />
          <ProjectsSection />

          <section id="contact" className="contact-section" aria-labelledby="contact-heading">
            <div className="section-shell contact-shell">
              <div className="contact-copy fade-up">
                <p className="section-kicker">Let’s build what’s next</p>
                <h2 id="contact-heading">
                  Have a hard data problem?
                  <span>Let’s make it tractable.</span>
                </h2>
              </div>
              <div className="contact-actions fade-up">
                <a className="contact-email" href={`mailto:${PROFILE.email}`}>
                  <span>Email</span>
                  {PROFILE.email}
                  <ArrowUpRight />
                </a>
                <div className="contact-links">
                  <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                    <ArrowUpRight />
                  </a>
                  <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                    <ArrowUpRight />
                  </a>
                  <a href={resumeUrl} download>
                    Résumé
                    <ArrowUpRight />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="section-shell footer-layout">
            <a className="footer-brand" href="#top">
              NC<span>.</span>
            </a>
            <p>Principal Data Architect · Austin, Texas</p>
            <p>© {new Date().getFullYear()} Nilanjan Chatterjee</p>
          </div>
        </footer>
      </div>
    </>
  )
}
