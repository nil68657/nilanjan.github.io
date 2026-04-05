import { useEffect, useRef, useState } from 'react'
import { ExperienceTimeline } from './components/ExperienceTimeline'
import { Navigation } from './components/Navigation'
import { LeetCodeStats, LEETCODE_PROFILE_URL } from './components/LeetCodeStats'
import { ProjectsSection } from './components/ProjectsSection'
import { TechStackSection } from './components/TechStackSection'

const EMAIL = 'nilanjan.9325@gmail.com'
const MAILTO = `mailto:${EMAIL}`

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
        <header className="profile-page">
          <div className="section-inner readme-inner">
            <div className="github-readme-card fade-up">
              <div className="profile-header">
                <div className="profile-avatar" aria-hidden>
                  <span>NC</span>
                </div>
                <div className="profile-header__text">
                  <h1 className="profile-name">Nilanjan Chatterjee</h1>
                  <p className="profile-tagline">
                    Data engineering leader &amp; architect · Advanced Micro Devices (AMD) · AWS &amp; GCP
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
                        LinkedIn
                      </a>
                    </li>
                    <li>12+ years</li>
                    <li>
                      <a href={LEETCODE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="readme-link">
                        LeetCode
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="readme-h2 readme-h2--first">Hi there!</h2>

              <h3 id="intro" className="readme-h3 readme-h3--tight">
                Intro
              </h3>
              <p className="readme-body fade-up">
                A seasoned Data Engineering leader and architect working for Advanced Micro Devices (AMD) with
                12 years of extensive experience in rolling out 0–1 turn-key products and features across
                Fintech, Semiconductor, and Telecom domains.
              </p>

              <h3 id="about" className="readme-h3">
                About me
              </h3>
              <p className="readme-body fade-up">
                I am Nilanjan Chatterjee, a seasoned Data Engineering leader and architect working for Advanced
                Micro Devices (AMD) with 12 years of extensive experience in rolling out 0–1 turn-key
                products and features across Fintech, Semiconductor, and Telecom domains. With over 12 years
                of experience across Data Engineering, Data Science, and Gen AI pipeline and MLOps, I assist
                business operationalise their data and ML strategy and find data driven solutions to problems.
              </p>

              <div className="profile-actions">
                <a className="btn-github btn-github--primary" href="#contact">
                  Social
                </a>
                <a className="btn-github" href="#projects">
                  Pinned
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

            <ExperienceTimeline />
          </div>
        </section>

        <TechStackSection />

        <section id="contact" aria-labelledby="contact-heading">
          <div className="section-inner readme-inner">
            <h2 id="contact-heading" className="readme-h2 fade-up">
              Social
            </h2>
            <div className="github-readme-card contact-readme fade-up">
              <h3 className="readme-h3 readme-h3--in-card">👨👩 Social</h3>
              <div className="social-row">
                <a
                  className="social-chip"
                  href="https://www.linkedin.com/in/nil68657/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="social-chip"
                  href="https://github.com/nil68657"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  className="social-chip"
                  href={LEETCODE_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LeetCode
                </a>
              </div>
              <LeetCodeStats />
              <p className="contact-email-row">
                <a
                  href={MAILTO}
                  className="btn-github btn-github--primary"
                  title={EMAIL}
                  aria-label={`Email ${EMAIL}`}
                >
                  Email me
                </a>
              </p>
            </div>
          </div>
        </section>

        <ProjectsSection />

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
              <a
                className="footer-link"
                href={LEETCODE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode (opens in new tab)"
              >
                LeetCode
              </a>
            </div>
            <p className="footer-email">
              <a href={MAILTO} className="footer-link" title={EMAIL} aria-label={`Email ${EMAIL}`}>
                Email me
              </a>
            </p>
            <p className="footer-copy">© {new Date().getFullYear()} Nilanjan Chatterjee</p>
          </div>
        </footer>
      </div>
    </>
  )
}
