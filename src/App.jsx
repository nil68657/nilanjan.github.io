import { useEffect, useRef, useState } from 'react'
import { Navigation } from './components/Navigation'
import { ProjectsSection } from './components/ProjectsSection'
import { TechStackSection } from './components/TechStackSection'

const SITE_URL = 'https://nil68657.github.io/nilanjan.github.io/'

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
      <div className="bg-mesh bg-mesh--subtle" aria-hidden>
        <div className="bg-orb" />
      </div>
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <div className="page" ref={pageRef}>
        <header id="top" className="profile-page">
          <div className="section-inner readme-inner">
            <div className="github-readme-card fade-up">
              <div className="profile-header">
                <div className="profile-avatar" aria-hidden>
                  <span>NC</span>
                </div>
                <div className="profile-header__text">
                  <h1 className="profile-name">Nilanjan Chatterjee</h1>
                  <p className="profile-handle">
                    <a
                      href="https://github.com/nil68657"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="readme-link"
                    >
                      nil68657
                    </a>
                  </p>
                  <p className="profile-tagline">
                    Senior Engineering Manager @ AMD · Data &amp; ML platforms · AWS &amp; GCP certified
                  </p>
                  <ul className="profile-meta" aria-label="Profile details">
                    <li>United States</li>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/nil68657/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="readme-link"
                      >
                        in/nil68657
                      </a>
                    </li>
                    <li>12+ years · leadership + hands-on architecture</li>
                  </ul>
                </div>
              </div>

              <h2 className="readme-h2 readme-h2--first">Hi there</h2>
              <p className="readme-intro">
                I build and lead teams around <strong>data platforms</strong>, <strong>MLOps</strong>, and{' '}
                <strong>GenAI</strong> systems — shipping reliable pipelines, inference stacks, and the
                culture that keeps them healthy.
              </p>
              <div className="profile-actions">
                <a className="btn-github btn-github--primary" href="#contact">
                  Social links
                </a>
                <a className="btn-github" href="#projects">
                  Pinned work
                </a>
                <a className="btn-github" href={SITE_URL}>
                  This site URL
                </a>
              </div>
            </div>
          </div>
        </header>

        <section id="experience" aria-labelledby="exp-heading">
          <div className="section-inner readme-inner">
            <h2 id="exp-heading" className="readme-h2 fade-up">
              Experience
            </h2>
            <p className="readme-lead fade-up">
              Condensed highlights — same spirit as a README &ldquo;about me&rdquo; section.
            </p>

            <div className="exp-timeline">
              <article className="github-readme-card exp-card fade-up">
                <div className="exp-header">
                  <span className="exp-company">AMD</span>
                  <span className="exp-role">Senior Engineering Manager — Data &amp; ML</span>
                  <div className="exp-meta">
                    <span className="exp-period cyan">Current</span>
                    <span className="exp-location">United States</span>
                  </div>
                </div>
                <ul className="exp-achievements cyan">
                  <li>
                    Roadmaps for analytics, experimentation, and model lifecycle platforms at scale.
                  </li>
                  <li>Partnered on reliability, cost, and velocity for critical data/ML paths.</li>
                  <li>Built engineering culture through charters, standards, and balanced delivery.</li>
                </ul>
              </article>

              <article className="github-readme-card exp-card fade-up">
                <div className="exp-header">
                  <span className="exp-company">Earlier roles</span>
                  <span className="exp-role">Data platforms · cloud architecture · ML engineering</span>
                  <div className="exp-meta">
                    <span className="exp-period violet">Prior</span>
                  </div>
                </div>
                <ul className="exp-achievements violet">
                  <li>Lakehouse-style storage, ingestion, and governance on major clouds.</li>
                  <li>Batch and streaming pipelines with testing, monitoring, and SLOs.</li>
                  <li>Mentored polyglot teams (Python, JVM, SQL) on pragmatic abstractions.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <ProjectsSection />
        <TechStackSection />

        <section id="contact" aria-labelledby="contact-heading">
          <div className="section-inner readme-inner">
            <h2 id="contact-heading" className="readme-h2 fade-up">
              Social
            </h2>
            <p className="readme-lead fade-up">
              Where to find me online (mirrors the link blocks many developers put in a profile README).
            </p>
            <div className="github-readme-card contact-readme fade-up">
              <div className="social-row">
                <a
                  className="social-chip"
                  href="https://www.linkedin.com/in/nil68657/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="social-chip__icon" aria-hidden>
                    in
                  </span>
                  LinkedIn
                </a>
                <a
                  className="social-chip"
                  href="https://github.com/nil68657"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="social-chip__icon" aria-hidden>
                    ⎇
                  </span>
                  GitHub
                </a>
                <a className="social-chip social-chip--muted" href={SITE_URL}>
                  <span className="social-chip__icon" aria-hidden>
                    ↗
                  </span>
                  This portfolio
                </a>
              </div>
              <p className="site-url-hint">
                <strong>Public URL for visitors:</strong>{' '}
                <a href={SITE_URL} className="readme-link">
                  {SITE_URL}
                </a>
              </p>
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
            <p className="footer-copy">
              © {new Date().getFullYear()} Nilanjan Chatterjee · Hosted on GitHub Pages ·{' '}
              <a href={SITE_URL} className="readme-link readme-link--on-dark">
                {SITE_URL}
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
