import { useCallback, useEffect, useRef, useState } from 'react'
import { CERTIFICATIONS, EDUCATION, EXPERIENCES } from '../data/portfolio'

// The rail stacks vertically on desktop and scrolls horizontally below this width,
// so the keyboard model and the arrow glyphs have to follow the rendered axis.
const HORIZONTAL_RAIL_QUERY = '(max-width: 860px)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const LAST_INDEX = EXPERIENCES.length - 1

function matchesQuery(query) {
  return typeof window !== 'undefined' && window.matchMedia?.(query).matches === true
}

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden>
      <path d="m6 3 5 5-5 5" />
    </svg>
  )
}

function useHorizontalRail() {
  const [isHorizontal, setIsHorizontal] = useState(() => matchesQuery(HORIZONTAL_RAIL_QUERY))

  useEffect(() => {
    const query = window.matchMedia?.(HORIZONTAL_RAIL_QUERY)
    if (!query) return undefined

    const sync = () => setIsHorizontal(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return isHorizontal
}

function label(index) {
  const experience = EXPERIENCES[index]
  return `${experience.company}, ${experience.period}`
}

export function ExperienceTimeline() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const tabRefs = useRef([])
  const isHorizontal = useHorizontalRail()

  const selected = EXPERIENCES[selectedIndex]
  const newerIndex = selectedIndex - 1
  const olderIndex = selectedIndex + 1
  const hasNewer = newerIndex >= 0
  const hasOlder = olderIndex <= LAST_INDEX

  // Roles are listed newest first, so a lower index is always more recent. Clamping
  // instead of wrapping keeps the controls honest about where the timeline ends.
  const select = useCallback((index, moveFocus = false) => {
    const nextIndex = Math.min(Math.max(index, 0), LAST_INDEX)
    setSelectedIndex(nextIndex)
    setHasInteracted(true)
    if (moveFocus) requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus())
  }, [])

  const handleKeyDown = (event) => {
    let nextIndex = null
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = selectedIndex + 1
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = selectedIndex - 1
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = LAST_INDEX
    if (nextIndex === null) return

    event.preventDefault()
    select(nextIndex, true)
  }

  useEffect(() => {
    if (!hasInteracted) return
    const node = tabRefs.current[selectedIndex]
    if (!node?.scrollIntoView) return

    node.scrollIntoView({
      behavior: matchesQuery(REDUCED_MOTION_QUERY) ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })
  }, [hasInteracted, selectedIndex])

  return (
    <>
      <div className="career-layout fade-up">
        <div className="career-rail">
          <div className="career-rail-head">
            <p className="career-rail-label">Timeline · newest first</p>
            <div className="career-controls">
              <p className="career-position" aria-hidden>
                <strong>{String(selectedIndex + 1).padStart(2, '0')}</strong> /{' '}
                {String(EXPERIENCES.length).padStart(2, '0')}
              </p>
              <div className="career-steps">
                <button
                  type="button"
                  className="career-step career-step-newer"
                  onClick={() => select(newerIndex)}
                  disabled={!hasNewer}
                  aria-label={
                    hasNewer
                      ? `Newer role: ${label(newerIndex)}`
                      : 'Newer role unavailable, already showing the most recent'
                  }
                >
                  <Chevron />
                  <span>Newer</span>
                </button>
                <button
                  type="button"
                  className="career-step career-step-older"
                  onClick={() => select(olderIndex)}
                  disabled={!hasOlder}
                  aria-label={
                    hasOlder
                      ? `Older role: ${label(olderIndex)}`
                      : 'Older role unavailable, already showing the earliest'
                  }
                >
                  <span>Older</span>
                  <Chevron />
                </button>
              </div>
            </div>
          </div>

          <div
            className="career-tabs"
            role="tablist"
            aria-label="Professional experience, newest first"
            aria-orientation={isHorizontal ? 'horizontal' : 'vertical'}
          >
            {EXPERIENCES.map((experience, index) => {
              const isSelected = index === selectedIndex
              return (
                <button
                  ref={(node) => {
                    tabRefs.current[index] = node
                  }}
                  key={experience.id}
                  id={`career-tab-${experience.id}`}
                  className={`career-tab${isSelected ? ' is-active' : ''}`}
                  type="button"
                  role="tab"
                  tabIndex={isSelected ? 0 : -1}
                  aria-selected={isSelected}
                  aria-controls="career-panel"
                  onClick={() => select(index)}
                  onKeyDown={handleKeyDown}
                >
                  <span className="career-tab-year">{experience.period}</span>
                  <span className="career-tab-company">{experience.company}</span>
                  <span className="career-tab-role">{experience.title}</span>
                  <span className="career-tab-marker" aria-hidden>
                    <Chevron />
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <article
          id="career-panel"
          className="career-panel"
          role="tabpanel"
          aria-labelledby={`career-tab-${selected.id}`}
          tabIndex={0}
        >
          <div className="career-panel-inner" key={selected.id}>
            <div className="career-panel-topline">
              <span>Selected role</span>
              <span>{selected.location}</span>
            </div>
            <p className="career-panel-period">{selected.period}</p>
            <h3>{selected.title}</h3>
            <p className="career-panel-company">{selected.company}</p>
            <ul className="career-highlights">
              {selected.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </article>

        <p className="visually-hidden" role="status">
          {hasInteracted ? `Showing ${selected.title} at ${selected.company}, ${selected.period}.` : ''}
        </p>
      </div>

      <div className="credentials-grid">
        <article className="credential-card fade-up">
          <p className="credential-label">Education</p>
          {EDUCATION.map((item) => (
            <div className="education-row" key={item.degree}>
              <h3>{item.degree}</h3>
              <p>{item.school}</p>
              <span>{item.meta}</span>
            </div>
          ))}
        </article>

        <article className="credential-card fade-up">
          <p className="credential-label">Certifications</p>
          <ul className="certification-list">
            {CERTIFICATIONS.map((certification) => (
              <li key={certification}>
                <span aria-hidden>✓</span>
                {certification}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </>
  )
}
