import { useEffect, useRef, useState } from 'react'
import { CERTIFICATIONS, EDUCATION, EXPERIENCES } from '../data/portfolio'

function useHorizontalTimeline() {
  const [isHorizontal, setIsHorizontal] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 860px)')
    const updateOrientation = () => setIsHorizontal(mediaQuery.matches)

    updateOrientation()
    mediaQuery.addEventListener('change', updateOrientation)
    return () => mediaQuery.removeEventListener('change', updateOrientation)
  }, [])

  return isHorizontal
}

export function ExperienceTimeline() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const tabRefs = useRef([])
  const isHorizontal = useHorizontalTimeline()
  const selected = EXPERIENCES[selectedIndex]
  const newerExperience = EXPERIENCES[selectedIndex - 1]
  const earlierExperience = EXPERIENCES[selectedIndex + 1]

  const selectTab = (index, moveFocus = false) => {
    const nextIndex = Math.max(0, Math.min(index, EXPERIENCES.length - 1))
    setSelectedIndex(nextIndex)
    if (moveFocus) requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus())
  }

  const handleKeyDown = (event, index) => {
    const forwardKey = isHorizontal ? 'ArrowRight' : 'ArrowDown'
    const backwardKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp'

    if (event.key === forwardKey) {
      event.preventDefault()
      selectTab(index + 1, true)
    }
    if (event.key === backwardKey) {
      event.preventDefault()
      selectTab(index - 1, true)
    }
    if (event.key === 'Home') {
      event.preventDefault()
      selectTab(0, true)
    }
    if (event.key === 'End') {
      event.preventDefault()
      selectTab(EXPERIENCES.length - 1, true)
    }
  }

  return (
    <>
      <div className="career-layout fade-up">
        <div className="career-index">
          <div className="career-index-heading">
            <p>
              Roles
              <span>
                Newest <i aria-hidden>{isHorizontal ? '→' : '↓'}</i> earliest
              </span>
            </p>
            <span id="career-keyboard-hint">
              {isHorizontal ? 'Use Left and Right arrow keys' : 'Use Up and Down arrow keys'}
            </span>
          </div>

          <div
            className="career-tabs"
            role="tablist"
            aria-label="Professional experience, newest to earliest"
            aria-describedby="career-keyboard-hint"
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
                  onClick={() => selectTab(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  <span className="career-tab-year">{experience.period}</span>
                  <span className="career-tab-company">{experience.company}</span>
                  <span className="career-tab-role">{experience.title}</span>
                  <span className="career-tab-arrow" aria-hidden>
                    {isHorizontal ? '↓' : '→'}
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
          key={selected.id}
        >
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

          <div className="career-panel-navigation" aria-label="Browse roles chronologically">
            <button
              type="button"
              disabled={!newerExperience}
              onClick={() => selectTab(selectedIndex - 1, true)}
              aria-label={newerExperience ? `Show newer role at ${newerExperience.company}` : 'This is the newest role'}
            >
              <span aria-hidden>{isHorizontal ? '←' : '↑'}</span>
              Newer role
            </button>
            <p aria-label={`Role ${selectedIndex + 1} of ${EXPERIENCES.length}`}>
              <strong>{String(selectedIndex + 1).padStart(2, '0')}</strong>
              <span>/ {String(EXPERIENCES.length).padStart(2, '0')}</span>
            </p>
            <button
              type="button"
              disabled={!earlierExperience}
              onClick={() => selectTab(selectedIndex + 1, true)}
              aria-label={
                earlierExperience ? `Show earlier role at ${earlierExperience.company}` : 'This is the earliest role'
              }
            >
              Earlier role
              <span aria-hidden>{isHorizontal ? '→' : '↓'}</span>
            </button>
          </div>
        </article>
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
