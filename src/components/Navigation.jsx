import { useCallback } from 'react'

const LINKS = [
  { href: '#top', label: 'Top' },
  { href: '#intro', label: 'Intro' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Stack' },
  { href: '#contact', label: 'Social' },
  { href: '#projects', label: 'Pinned' },
]

export function Navigation({ menuOpen, setMenuOpen }) {
  const close = useCallback(() => setMenuOpen(false), [setMenuOpen])

  return (
    <>
      <nav className="nav" aria-label="Primary">
        <div className="nav-inner">
          <a href="#top" className="nav-brand nav-brand--mono" onClick={close}>
            @nil68657
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
