import { useCallback } from 'react'

const LINKS = [
  { href: '#top', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export function Navigation({ menuOpen, setMenuOpen }) {
  const close = useCallback(() => setMenuOpen(false), [setMenuOpen])

  return (
    <>
      <nav className="nav" aria-label="Primary">
        <div className="nav-inner">
          <a href="#top" className="nav-brand" onClick={close}>
            NC
          </a>
          <ul className="nav-links">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="hamburger"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <div
        id="mobile-nav"
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {LINKS.map(({ href, label }) => (
          <a key={href} href={href} onClick={close}>
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
