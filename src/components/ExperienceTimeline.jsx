import { useRef, useState } from 'react'
import { CERTIFICATIONS, EDUCATION, EXPERIENCES } from '../data/portfolio'

export function ExperienceTimeline() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const tabRefs = useRef([])
  const selected = EXPERIENCES[selectedIndex]

  const selectTab = (index, moveFocus = false) => {
    const nextIndex = (index + EXPERIENCES.length) % EXPERIENCES.length
    setSelectedIndex(nextIndex)
    if (moveFocus) requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus())
  }

  const handleKeyDown = (event, index) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      selectTab(index + 1, true)
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
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
        <div className="career-tabs" role="tablist" aria-label="Professional experience">
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
                  →
                </span>
              </button>
            )
          })}
        </div>

        <article
          id="career-panel"
          className="career-panel"
          role="tabpanel"
          aria-labelledby={`career-tab-${selected.id}`}
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
