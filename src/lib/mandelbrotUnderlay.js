/**
 * Dependency-free Mandelbrot underlay.
 *
 * `createMandelbrotUnderlay` prefers a single-pass WebGL fragment shader and falls back to a
 * tiny CPU-rasterised canvas that the browser upscales. Both renderers expose the same
 * interface so the React layer only owns scheduling, quality, and lifecycle.
 */

// Wide view of the whole set at the top of the page, easing into the seahorse valley.
const VIEW_START = { x: -0.59, y: 0, scale: 1.28 }
const VIEW_END = { x: -0.743643887, y: 0.13182590420533936, scale: 0.0052 }

// float32 keeps ~7 significant digits, so the zoom depth stays well clear of banding artefacts.
const ITER_LIMIT = 256
const ITER_MIN = 42
const QUAD = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
const CANVAS2D_PIXEL_BUDGET = 15000
const LUT_STEPS = 192

const CONTEXT_ATTRIBUTES = {
  alpha: false,
  antialias: false,
  depth: false,
  stencil: false,
  desynchronized: true,
  powerPreference: 'low-power',
  preserveDrawingBuffer: false,
}

const VERTEX_SHADER = `
attribute vec2 aPosition;

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uResolution;
uniform vec2 uCenter;
uniform float uScale;
uniform float uPhase;
uniform float uFade;
uniform int uMaxIter;

const int ITER_LIMIT = ${ITER_LIMIT};
const float BAILOUT = 65536.0;

vec3 band(float t) {
  vec3 ink = vec3(0.016, 0.027, 0.043);
  vec3 deep = vec3(0.035, 0.118, 0.216);
  vec3 azure = vec3(0.216, 0.510, 0.851);
  vec3 ice = vec3(0.792, 0.886, 1.000);
  vec3 ember = vec3(0.925, 0.678, 0.455);
  vec3 color = mix(ink, deep, smoothstep(0.0, 0.30, t));
  color = mix(color, azure, smoothstep(0.26, 0.66, t));
  color = mix(color, ice, smoothstep(0.64, 0.90, t));
  return mix(color, ember, smoothstep(0.90, 1.0, t) * 0.5);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  vec2 c = uCenter + uv * (2.0 * uScale);
  vec2 z = vec2(0.0);
  float escape = -1.0;

  for (int i = 0; i < ITER_LIMIT; i++) {
    if (i >= uMaxIter) break;
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
    float d = dot(z, z);
    if (d > BAILOUT) {
      escape = float(i) + 1.0 - log2(0.5 * log2(d));
      break;
    }
  }

  vec3 color = vec3(0.012, 0.020, 0.033);
  if (escape >= 0.0) {
    float t = pow(clamp(escape / float(uMaxIter), 0.0, 1.0), 0.42);
    color = band(clamp(t + 0.045 * sin(uPhase), 0.0, 1.0));
  }

  // Keep the fractal strongest at the top of the viewport and quiet behind body copy.
  float depth = mix(0.34, 1.0, gl_FragCoord.y / uResolution.y);
  float vignette = smoothstep(1.45, 0.20, length(uv));
  gl_FragColor = vec4(color * uFade * depth * vignette, 1.0);
}
`

function clamp01(value) {
  return value < 0 ? 0 : value > 1 ? 1 : value
}

/**
 * Writes the view for a scroll position into `target` so the render loop stays allocation-free.
 */
export function computeView(target, progress, phase, iterScale, fade) {
  const p = clamp01(progress)
  const eased = p * (0.42 + 0.58 * p)
  const glide = eased * eased * (3 - 2 * eased)
  const scale = VIEW_START.scale * (VIEW_END.scale / VIEW_START.scale) ** eased
  const drift = scale * 0.05

  target.cx = VIEW_START.x + (VIEW_END.x - VIEW_START.x) * glide + Math.cos(phase * 0.7) * drift
  target.cy = VIEW_START.y + (VIEW_END.y - VIEW_START.y) * glide + Math.sin(phase * 0.55) * drift
  target.scale = scale
  target.maxIter = Math.max(
    ITER_MIN,
    Math.min(ITER_LIMIT, Math.round((92 + 200 * eased) * iterScale)),
  )
  target.phase = phase
  target.fade = clamp01(fade)
  return target
}

export function createViewState() {
  return { cx: VIEW_START.x, cy: VIEW_START.y, scale: VIEW_START.scale, maxIter: 96, phase: 0, fade: 1 }
}

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(gl) {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  if (!vertex || !fragment) {
    if (vertex) gl.deleteShader(vertex)
    if (fragment) gl.deleteShader(fragment)
    return null
  }

  const program = gl.createProgram()
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }
  return program
}

function createWebglRenderer(canvas) {
  let gl = null
  try {
    gl =
      canvas.getContext('webgl2', CONTEXT_ATTRIBUTES) ||
      canvas.getContext('webgl', CONTEXT_ATTRIBUTES)
  } catch {
    gl = null
  }
  if (!gl) return null

  const program = createProgram(gl)
  if (!program) return null

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, QUAD, gl.STATIC_DRAW)
  gl.useProgram(program)

  const position = gl.getAttribLocation(program, 'aPosition')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  const uniforms = {
    resolution: gl.getUniformLocation(program, 'uResolution'),
    center: gl.getUniformLocation(program, 'uCenter'),
    scale: gl.getUniformLocation(program, 'uScale'),
    phase: gl.getUniformLocation(program, 'uPhase'),
    fade: gl.getUniformLocation(program, 'uFade'),
    maxIter: gl.getUniformLocation(program, 'uMaxIter'),
  }

  let drawWidth = 0
  let drawHeight = 0

  return {
    mode: 'webgl',
    resize(width, height, pixelRatio) {
      drawWidth = Math.max(1, Math.round(width * pixelRatio))
      drawHeight = Math.max(1, Math.round(height * pixelRatio))
      canvas.width = drawWidth
      canvas.height = drawHeight
      gl.viewport(0, 0, drawWidth, drawHeight)
    },
    render(view) {
      if (drawWidth === 0 || gl.isContextLost()) return false
      gl.uniform2f(uniforms.resolution, drawWidth, drawHeight)
      gl.uniform2f(uniforms.center, view.cx, view.cy)
      gl.uniform1f(uniforms.scale, view.scale)
      gl.uniform1f(uniforms.phase, view.phase)
      gl.uniform1f(uniforms.fade, view.fade)
      gl.uniform1i(uniforms.maxIter, view.maxIter)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      return true
    },
    // The context itself is left alive: a canvas hands back the same context object on every
    // `getContext` call, so forcing a loss here would break re-initialisation on the same node.
    dispose() {
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    },
  }
}

const GRADIENT_STOPS = [
  [0.0, 4, 7, 11],
  [0.3, 9, 30, 55],
  [0.66, 55, 130, 217],
  [0.9, 202, 226, 255],
  [1.0, 236, 173, 116],
]

function fillLut(lut, phase) {
  const shift = 0.045 * Math.sin(phase)
  for (let step = 0; step < LUT_STEPS; step += 1) {
    const t = clamp01(step / (LUT_STEPS - 1) + shift)
    let upper = 1
    while (upper < GRADIENT_STOPS.length - 1 && GRADIENT_STOPS[upper][0] < t) upper += 1
    const from = GRADIENT_STOPS[upper - 1]
    const to = GRADIENT_STOPS[upper]
    const span = to[0] - from[0]
    const local = span > 0 ? clamp01((t - from[0]) / span) : 0
    const blend = local * local * (3 - 2 * local)
    const offset = step * 3
    lut[offset] = from[1] + (to[1] - from[1]) * blend
    lut[offset + 1] = from[2] + (to[2] - from[2]) * blend
    lut[offset + 2] = from[3] + (to[3] - from[3]) * blend
  }
}

function createCanvas2dRenderer(canvas) {
  let context = null
  try {
    context = canvas.getContext('2d', { alpha: false, desynchronized: true })
  } catch {
    context = null
  }
  if (!context) return null

  const lut = new Float32Array(LUT_STEPS * 3)
  let image = null
  let pixels = null
  let width = 0
  let height = 0

  return {
    mode: 'canvas2d',
    resize(cssWidth, cssHeight) {
      const ratio = Math.sqrt(CANVAS2D_PIXEL_BUDGET / Math.max(1, cssWidth * cssHeight))
      width = Math.max(24, Math.round(cssWidth * ratio))
      height = Math.max(24, Math.round(cssHeight * ratio))
      canvas.width = width
      canvas.height = height
      image = context.createImageData(width, height)
      pixels = image.data
      for (let i = 3; i < pixels.length; i += 4) pixels[i] = 255
    },
    render(view) {
      if (!image) return false
      fillLut(lut, view.phase)

      const aspect = width / height
      const spanY = 2 * view.scale
      const spanX = spanY * aspect
      const maxIter = view.maxIter
      let offset = 0

      for (let py = 0; py < height; py += 1) {
        const ny = (py + 0.5) / height
        const cy = view.cy + (0.5 - ny) * spanY
        const depth = 0.34 + 0.66 * (1 - ny)
        const uy = 0.5 - ny
        const uySquared = uy * uy

        for (let px = 0; px < width; px += 1) {
          const nx = (px + 0.5) / width
          const cx = view.cx + (nx - 0.5) * spanX

          let zx = 0
          let zy = 0
          let d = 0
          let iteration = 0
          while (iteration < maxIter) {
            const nextX = zx * zx - zy * zy + cx
            zy = 2 * zx * zy + cy
            zx = nextX
            d = zx * zx + zy * zy
            iteration += 1
            if (d > 65536) break
          }

          const ux = (nx - 0.5) * aspect
          const radius = Math.sqrt(ux * ux + uySquared)
          const vignette = clamp01((1.45 - radius) / 1.25)
          const shade = view.fade * depth * vignette * vignette * (3 - 2 * vignette)

          if (d <= 65536) {
            pixels[offset] = 3 * shade
            pixels[offset + 1] = 5 * shade
            pixels[offset + 2] = 8 * shade
          } else {
            const smooth = iteration - Math.log2(0.5 * Math.log2(d))
            const t = clamp01(smooth / maxIter) ** 0.42
            const entry = Math.min(LUT_STEPS - 1, (t * (LUT_STEPS - 1)) | 0) * 3
            pixels[offset] = lut[entry] * shade
            pixels[offset + 1] = lut[entry + 1] * shade
            pixels[offset + 2] = lut[entry + 2] * shade
          }
          offset += 4
        }
      }

      context.putImageData(image, 0, 0)
      return true
    },
    dispose() {
      image = null
      pixels = null
    },
  }
}

export function createMandelbrotUnderlay(canvas) {
  return createWebglRenderer(canvas) || createCanvas2dRenderer(canvas)
}
