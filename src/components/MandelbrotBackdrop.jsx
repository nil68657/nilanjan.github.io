import { useEffect, useRef } from 'react'
import { computeView, createMandelbrotUnderlay, createViewState } from '../lib/mandelbrotUnderlay'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const SMALL_VIEWPORT_QUERY = '(max-width: 860px)'
const MAX_PIXEL_RATIO = 1.5
const FRAME_INTERVAL = 32
const RESIZE_DEBOUNCE = 180
const SCROLL_METRIC_INTERVAL = 600
const IDLE_FRAMES_BEFORE_SLEEP = 12
const SLOW_FRAME_THRESHOLD = 54
const SLOW_FRAMES_BEFORE_DOWNGRADE = 40

const QUALITY = {
  high: { renderScale: 0.68, iterScale: 1 },
  medium: { renderScale: 0.52, iterScale: 0.74 },
  low: { renderScale: 0.4, iterScale: 0.52 },
}

function matchesQuery(query) {
  return typeof window !== 'undefined' && window.matchMedia?.(query).matches === true
}

// Strongest at the top, gone before the closing sections so the loop can stop entirely.
function fadeForProgress(progress) {
  const t = Math.min(Math.max((progress - 0.02) / 0.74, 0), 1)
  return 1 - t * t * (3 - 2 * t)
}

export function MandelbrotBackdrop() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return undefined

    let renderer = createMandelbrotUnderlay(canvas)
    if (!renderer) return undefined
    container.dataset.mode = renderer.mode

    const view = createViewState()
    const reducedMotion = matchesQuery(REDUCED_MOTION_QUERY)
    let quality =
      renderer.mode === 'webgl'
        ? matchesQuery(SMALL_VIEWPORT_QUERY)
          ? QUALITY.medium
          : QUALITY.high
        : QUALITY.low

    let frame = 0
    let disposed = false
    let contextLost = false
    let resizeTimer = 0
    let cssWidth = 0
    let cssHeight = 0
    let scrollable = 1
    let lastMetricAt = 0
    let lastDrawAt = 0
    let previousDrawAt = 0
    let idleFrames = 0
    let slowFrames = 0

    const pixelRatio = () =>
      Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO) * quality.renderScale

    const measureScrollable = () => {
      scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    }

    const applySize = () => {
      const width = Math.max(1, Math.round(container.clientWidth))
      const height = Math.max(1, Math.round(container.clientHeight))
      if (width === cssWidth && height === cssHeight) return false
      cssWidth = width
      cssHeight = height
      renderer.resize(width, height, pixelRatio())
      measureScrollable()
      return true
    }

    const draw = (progress, phase) => {
      computeView(view, progress, phase, quality.iterScale, fadeForProgress(progress))
      renderer.render(view)
    }

    const drawStatic = () => {
      draw(window.scrollY / scrollable, 0)
    }

    const tick = (timestamp) => {
      frame = 0
      if (disposed || contextLost) return

      if (timestamp - lastMetricAt > SCROLL_METRIC_INTERVAL) {
        lastMetricAt = timestamp
        measureScrollable()
      }

      const progress = window.scrollY / scrollable
      const fade = fadeForProgress(progress)

      if (fade <= 0.002) {
        idleFrames += 1
        if (idleFrames > IDLE_FRAMES_BEFORE_SLEEP) return
      } else {
        idleFrames = 0
      }

      if (timestamp - lastDrawAt >= FRAME_INTERVAL) {
        if (previousDrawAt > 0) {
          const elapsed = timestamp - previousDrawAt
          if (elapsed > SLOW_FRAME_THRESHOLD) slowFrames += 1
          else slowFrames = Math.max(0, slowFrames - 1)

          if (slowFrames > SLOW_FRAMES_BEFORE_DOWNGRADE && quality !== QUALITY.low) {
            quality = quality === QUALITY.high ? QUALITY.medium : QUALITY.low
            slowFrames = 0
            cssWidth = 0
            applySize()
          }
        }
        previousDrawAt = timestamp
        lastDrawAt = timestamp
        draw(progress, timestamp * 0.00016)
      }

      frame = window.requestAnimationFrame(tick)
    }

    const wake = () => {
      if (disposed || contextLost || frame || document.hidden) return
      idleFrames = 0
      previousDrawAt = 0
      frame = window.requestAnimationFrame(tick)
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        if (disposed || contextLost) return
        if (applySize() && reducedMotion) drawStatic()
        else wake()
      }, RESIZE_DEBOUNCE)
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (frame) {
          window.cancelAnimationFrame(frame)
          frame = 0
        }
        return
      }
      wake()
    }

    const onContextLost = (event) => {
      event.preventDefault()
      contextLost = true
      if (frame) {
        window.cancelAnimationFrame(frame)
        frame = 0
      }
    }

    const onContextRestored = () => {
      // Shaders and buffers do not survive a context loss, so rebuild the whole renderer.
      const restored = createMandelbrotUnderlay(canvas)
      if (!restored) return
      renderer = restored
      container.dataset.mode = renderer.mode
      contextLost = false
      cssWidth = 0
      applySize()
      if (reducedMotion) drawStatic()
      else wake()
    }

    applySize()
    canvas.addEventListener('webglcontextlost', onContextLost)
    canvas.addEventListener('webglcontextrestored', onContextRestored)

    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(onResize)
    if (observer) observer.observe(container)
    else window.addEventListener('resize', onResize)

    if (reducedMotion) {
      // A single frame at the current scroll position: present, but never in motion.
      drawStatic()
    } else {
      document.addEventListener('visibilitychange', onVisibilityChange)
      window.addEventListener('scroll', wake, { passive: true })
      wake()
    }

    return () => {
      disposed = true
      window.clearTimeout(resizeTimer)
      if (frame) window.cancelAnimationFrame(frame)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      canvas.removeEventListener('webglcontextrestored', onContextRestored)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('scroll', wake)
      if (observer) observer.disconnect()
      else window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return (
    <div className="fractal-backdrop" data-mode="css" aria-hidden="true" ref={containerRef}>
      <canvas className="fractal-canvas" ref={canvasRef} />
      <div className="fractal-veil" />
    </div>
  )
}
