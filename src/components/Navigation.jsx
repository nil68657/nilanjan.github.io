import { useCallback, useEffect } from 'react'

const LINKS = [
  { href: '#impact', label: 'Impact' },
  { href: '#experience', label: 'Experience' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden>
      <path d="M4 12 12 4M5 4h7v7" />
    </svg>
  )
}

export function Navigation({ menuOpen, setMenuOpen, resumeUrl }) {
  const close = useCallback(() => setMenuOpen(false), [setMenuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [close, menuOpen])

  return (
    <>
      <nav className="site-nav" aria-label="Primary navigation">
        <div className="nav-shell">
          <a className="brand" href="#top" onClick={close} aria-label="Nilanjan Chatterjee, home">
            <span className="brand-mark" aria-hidden>
              NC
            </span>
            <span className="brand-copy">
              <strong>Nilanjan Chatterjee</strong>
              <small>Principal Data Architect</small>
            </span>
          </a>

          <ul className="desktop-nav">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <a className="nav-resume" href={resumeUrl} download>
              Résumé
              <ArrowUpRight />
            </a>
            <button
              type="button"
              className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-drawer${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <button className="mobile-backdrop" type="button" aria-label="Close navigation" onClick={close} />
        <div id="mobile-nav" className="mobile-panel">
          <p className="mobile-panel-label">Navigate</p>
          <div className="mobile-links">
            {LINKS.map(({ href, label }, index) => (
              <a key={href} href={href} onClick={close}>
                <span>0{index + 1}</span>
                {label}
              </a>
            ))}
          </div>
          <a className="mobile-resume" href={resumeUrl} download onClick={close}>
            Download résumé
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </>
  )
}
