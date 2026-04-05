import { useEffect, useState } from 'react'

/** Profile URL on LeetCode */
export const LEETCODE_PROFILE_URL = 'https://leetcode.com/u/hailgilfoyle/'

/**
 * Community JSON API (not official LeetCode). Docs: https://leetcode-stats.tashif.codes/
 * Sends Access-Control-Allow-Origin: * so it works from GitHub Pages.
 */
const LEETCODE_STATS_API = 'https://leetcode-stats.tashif.codes/hailgilfoyle'

export function LeetCodeStats() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(LEETCODE_STATS_API)
        if (!res.ok) throw new Error(String(res.status))
        const json = await res.json()
        if (cancelled) return
        if (json.status !== 'success') throw new Error(json.message || 'Unknown')
        setData(json)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div id="leetcode" className="leetcode-card">
      <div className="leetcode-card__head">
        <a href={LEETCODE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="leetcode-card__title">
          LeetCode
        </a>
        <span className="leetcode-card__sub">hailgilfoyle</span>
      </div>
      {error && <p className="leetcode-card__muted">Could not load stats ({error}).</p>}
      {!error && !data && <p className="leetcode-card__muted">Loading…</p>}
      {data && (
        <>
          <p className="leetcode-card__total">
            <strong>{data.totalSolved}</strong> solved
            <span className="leetcode-card__muted"> · acceptance {data.acceptanceRate}%</span>
          </p>
          <ul className="leetcode-card__grid" aria-label="Problems solved by difficulty">
            <li>
              <span className="leetcode-diff leetcode-diff--easy">Easy</span>
              <span>
                {data.easySolved} / {data.totalEasy}
              </span>
            </li>
            <li>
              <span className="leetcode-diff leetcode-diff--medium">Medium</span>
              <span>
                {data.mediumSolved} / {data.totalMedium}
              </span>
            </li>
            <li>
              <span className="leetcode-diff leetcode-diff--hard">Hard</span>
              <span>
                {data.hardSolved} / {data.totalHard}
              </span>
            </li>
          </ul>
          <p className="leetcode-card__muted leetcode-card__foot">
            Rank ~{(data.ranking != null ? data.ranking.toLocaleString() : '—')} · data from{' '}
            <a
              href="https://leetcode-stats.tashif.codes/"
              target="_blank"
              rel="noopener noreferrer"
              className="readme-link"
            >
              leetcode-stats.tashif.codes
            </a>
          </p>
        </>
      )}
    </div>
  )
}
