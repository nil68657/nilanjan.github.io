import { useEffect, useRef } from 'react'

const DPR_CAP = 1.5
const MAX_WEBGL_PIXELS = 1_250_000
const MAX_FALLBACK_PIXELS = 120_000
const FALLBACK_FRAME_INTERVAL = 100

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_position;

  void main() {
    v_position = a_position;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
  #else
    precision mediump float;
  #endif

  varying vec2 v_position;
  uniform vec2 u_resolution;
  uniform float u_progress;

  void main() {
    float progress = smoothstep(0.0, 1.0, u_progress);
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);
    vec2 plane = vec2(v_position.x * aspect, v_position.y);

    float zoom = mix(0.78, 4.1, progress);
    vec2 center = mix(vec2(-0.52, 0.0), vec2(-0.735, 0.115), progress);
    center += vec2(
      sin(progress * 6.2831853) * 0.028,
      sin(progress * 3.1415926) * 0.018
    );

    vec2 c = center + plane * (1.28 / zoom);
    vec2 z = vec2(0.0);
    float iteration = 0.0;
    float escaped = 0.0;

    for (int i = 0; i < 72; i++) {
      float x = z.x * z.x - z.y * z.y + c.x;
      float y = 2.0 * z.x * z.y + c.y;
      z = vec2(x, y);

      if (dot(z, z) > 16.0) {
        iteration = float(i);
        escaped = 1.0;
        break;
      }
    }

    float smoothIteration = iteration;
    if (escaped > 0.5) {
      smoothIteration -= log2(max(log2(length(z)), 0.0001));
    }

    float normalized = clamp(smoothIteration / 72.0, 0.0, 1.0);
    float contour = 0.5 + 0.5 * cos(0.92 * smoothIteration + progress * 2.4);
    float edgeLight = pow(normalized, 0.52);

    vec3 deepNavy = vec3(0.008, 0.022, 0.038);
    vec3 slateBlue = vec3(0.085, 0.205, 0.355);
    vec3 mineralBlue = vec3(0.19, 0.39, 0.58);
    vec3 restrainedTeal = vec3(0.12, 0.34, 0.37);

    vec3 color = mix(deepNavy, slateBlue, edgeLight);
    color = mix(color, mineralBlue, contour * edgeLight * 0.38);
    color = mix(color, restrainedTeal, (1.0 - contour) * edgeLight * 0.24);

    if (escaped < 0.5) {
      color = deepNavy * 0.62;
    }

    float vignette = 1.0 - smoothstep(0.48, 1.75, length(plane));
    color *= mix(0.48, 1.0, vignette);
    gl_FragColor = vec4(color, 1.0);
  }
`

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  if (!shader) return null

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader

  gl.deleteShader(shader)
  return null
}

function createWebGLRenderer(canvas) {
  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: 'low-power',
    preserveDrawingBuffer: false,
    stencil: false,
  })

  if (!gl) return null

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  if (!vertexShader || !fragmentShader) {
    if (vertexShader) gl.deleteShader(vertexShader)
    if (fragmentShader) gl.deleteShader(fragmentShader)
    return null
  }

  const program = gl.createProgram()
  if (!program) {
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    return null
  }

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    return null
  }

  const buffer = gl.createBuffer()
  if (!buffer) {
    gl.deleteProgram(program)
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    return null
  }

  const positionLocation = gl.getAttribLocation(program, 'a_position')
  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
  const progressLocation = gl.getUniformLocation(program, 'u_progress')

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  )
  gl.useProgram(program)
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

  return {
    type: 'webgl',
    resize(cssWidth, cssHeight) {
      const cappedDpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
      const pixelBudgetRatio = Math.sqrt(MAX_WEBGL_PIXELS / (cssWidth * cssHeight))
      const renderRatio = Math.max(0.18, Math.min(cappedDpr * 0.72, pixelBudgetRatio))
      const width = Math.max(1, Math.round(cssWidth * renderRatio))
      const height = Math.max(1, Math.round(cssHeight * renderRatio))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
        gl.uniform2f(resolutionLocation, width, height)
      }
    },
    draw(progress) {
      gl.uniform1f(progressLocation, progress)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    },
    destroy() {
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    },
  }
}

function createCanvasRenderer(canvas) {
  const context = canvas.getContext('2d', { alpha: false })
  if (!context) return null

  let imageData = null
  let pixels = null
  let width = 0
  let height = 0

  return {
    type: 'canvas',
    resize(cssWidth, cssHeight) {
      const pixelBudgetRatio = Math.sqrt(MAX_FALLBACK_PIXELS / (cssWidth * cssHeight))
      const renderRatio = Math.max(0.1, Math.min(0.42, pixelBudgetRatio))
      const nextWidth = Math.max(1, Math.round(cssWidth * renderRatio))
      const nextHeight = Math.max(1, Math.round(cssHeight * renderRatio))

      if (nextWidth === width && nextHeight === height) return

      width = nextWidth
      height = nextHeight
      canvas.width = width
      canvas.height = height
      imageData = context.createImageData(width, height)
      pixels = imageData.data
    },
    draw(progress) {
      if (!imageData || !pixels) return

      const easedProgress = progress * progress * (3 - 2 * progress)
      const aspect = width / height
      const zoom = 0.78 + (4.1 - 0.78) * easedProgress
      const centerX =
        -0.52 + (-0.735 + 0.52) * easedProgress + Math.sin(easedProgress * Math.PI * 2) * 0.028
      const centerY = 0.115 * easedProgress + Math.sin(easedProgress * Math.PI) * 0.018
      const scale = 1.28 / zoom
      const maxIterations = 38
      let offset = 0

      for (let y = 0; y < height; y += 1) {
        const planeY = ((y / height) * 2 - 1) * scale

        for (let x = 0; x < width; x += 1) {
          const planeX = ((x / width) * 2 - 1) * aspect * scale
          const cX = centerX + planeX
          const cY = centerY + planeY
          let zX = 0
          let zY = 0
          let iteration = 0

          while (zX * zX + zY * zY <= 16 && iteration < maxIterations) {
            const nextX = zX * zX - zY * zY + cX
            zY = 2 * zX * zY + cY
            zX = nextX
            iteration += 1
          }

          if (iteration === maxIterations) {
            pixels[offset] = 2
            pixels[offset + 1] = 6
            pixels[offset + 2] = 10
          } else {
            const normalized = iteration / maxIterations
            const contour = 0.72 + Math.sin(iteration * 0.92 + easedProgress * 2.4) * 0.28
            pixels[offset] = 5 + normalized * 42 * contour
            pixels[offset + 1] = 14 + normalized * 83
            pixels[offset + 2] = 24 + normalized * 132 * contour
          }

          pixels[offset + 3] = 255
          offset += 4
        }
      }

      context.putImageData(imageData, 0, 0)
    },
    destroy() {
      imageData = null
      pixels = null
    },
  }
}

function getScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  if (scrollable <= 0) return 0
  return Math.max(0, Math.min(1, window.scrollY / scrollable))
}

export function MandelbrotUnderlay() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const renderer = createWebGLRenderer(canvas) || createCanvasRenderer(canvas)
    if (!renderer) return undefined

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = motionQuery.matches
    let documentVisible = !document.hidden
    let resizePending = true
    let frameId = 0
    let delayTimer = 0
    let lastDrawTime = -Infinity

    canvas.dataset.renderer = renderer.type

    const draw = (time) => {
      frameId = 0
      if (!documentVisible) return

      if (resizePending) {
        renderer.resize(Math.max(window.innerWidth, 1), Math.max(window.innerHeight, 1))
        resizePending = false
      }

      renderer.draw(reducedMotion ? 0.08 : getScrollProgress())
      lastDrawTime = time
    }

    const scheduleRender = () => {
      if (!documentVisible || frameId) return

      if (renderer.type === 'canvas') {
        const elapsed = performance.now() - lastDrawTime
        if (elapsed < FALLBACK_FRAME_INTERVAL) {
          if (!delayTimer) {
            delayTimer = window.setTimeout(() => {
              delayTimer = 0
              scheduleRender()
            }, FALLBACK_FRAME_INTERVAL - elapsed)
          }
          return
        }
      }

      frameId = window.requestAnimationFrame(draw)
    }

    const handleScroll = () => {
      if (!reducedMotion) scheduleRender()
    }

    const handleResize = () => {
      resizePending = true
      scheduleRender()
    }

    const handleVisibilityChange = () => {
      documentVisible = !document.hidden

      if (!documentVisible) {
        if (frameId) window.cancelAnimationFrame(frameId)
        if (delayTimer) window.clearTimeout(delayTimer)
        frameId = 0
        delayTimer = 0
        return
      }

      resizePending = true
      scheduleRender()
    }

    const handleMotionChange = (event) => {
      reducedMotion = event.matches
      scheduleRender()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    motionQuery.addEventListener('change', handleMotionChange)
    scheduleRender()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      motionQuery.removeEventListener('change', handleMotionChange)
      if (frameId) window.cancelAnimationFrame(frameId)
      if (delayTimer) window.clearTimeout(delayTimer)
      renderer.destroy()
      delete canvas.dataset.renderer
    }
  }, [])

  return <canvas ref={canvasRef} className="mandelbrot-underlay" aria-hidden="true" />
}
