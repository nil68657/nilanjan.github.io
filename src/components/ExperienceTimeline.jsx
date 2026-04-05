import { useMemo, useState } from 'react'
import { CERTIFICATIONS, EDUCATION, EXPERIENCES } from '../data/experiences'

export function ExperienceTimeline() {
  const [selectedId, setSelectedId] = useState(EXPERIENCES[0].id)

  const selected = useMemo(
    () => EXPERIENCES.find((e) => e.id === selectedId) ?? EXPERIENCES[0],
    [selectedId]
  )

  return (
    <div className="experience-timeline-root fade-up">
      <p className="experience-timeline-hint">
        Click a role on the timeline to view highlights.
      </p>

      <div className="experience-chart">
        <div className="experience-rail" role="tablist" aria-label="Work history">
          {EXPERIENCES.map((exp) => {
            const isActive = exp.id === selectedId
            return (
              <button
                key={exp.id}
                type="button"
                role="tab"
                id={`exp-tab-${exp.id}`}
                aria-selected={isActive}
                aria-controls="experience-panel"
                className={`experience-rail__btn${isActive ? ' is-active' : ''}`}
                onClick={() => setSelectedId(exp.id)}
              >
                <span className="experience-rail__dot" aria-hidden />
                <span className="experience-rail__period">{exp.period}</span>
                <span className="experience-rail__company">{exp.company}</span>
                <span className="experience-rail__title">{exp.title}</span>
                <span className="experience-rail__loc">{exp.location}</span>
              </button>
            )
          })}
        </div>

        <article
          id="experience-panel"
          role="tabpanel"
          aria-labelledby={`exp-tab-${selected.id}`}
          className="github-readme-card experience-panel"
          key={selected.id}
        >
          <header className="experience-panel__head">
            <h3 className="experience-panel__company">{selected.company}</h3>
            <p className="experience-panel__role">{selected.title}</p>
            <p className="experience-panel__meta">
              <span>{selected.location}</span>
              <span className="experience-panel__sep">·</span>
              <span>{selected.period}</span>
            </p>
          </header>
          <ul className={`exp-achievements ${selected.accent}`}>
            {selected.highlights.map((text, i) => (
              <li key={`${selected.id}-${i}`}>{text}</li>
            ))}
          </ul>
        </article>
      </div>

      <h3 className="readme-h3 experience-subheading">Education</h3>
      <ul className="experience-edu-list">
        {EDUCATION.map((row) => (
          <li key={row.line}>{row.line}</li>
        ))}
      </ul>

      <h3 className="readme-h3 experience-subheading">Certifications</h3>
      <ul className="experience-cert-list">
        {CERTIFICATIONS.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  )
}
