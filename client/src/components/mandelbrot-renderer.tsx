import { useEffect, useRef } from "react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function MandelbrotRenderer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Setup canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Try WebGL first
    const gl = canvas.getContext('webgl', { alpha: true });
    if (gl) {
      initWebGL(gl, canvas);
    } else {
      // Fallback to 2D canvas
      console.log('WebGL not available, using 2D canvas fallback');
      init2DCanvas(canvas);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollProgress]);

  const initWebGL = (gl: WebGLRenderingContext, canvas: HTMLCanvasElement) => {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0, 1);
      }
    `);

    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_scroll;
      
      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }
      
      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
        
        float zoom = 0.8 + u_scroll * 2.0;
        vec2 c = vec2(-0.5, 0.0) + uv / zoom;
        
        vec2 z = vec2(0.0);
        float iter = 0.0;
        
        for (int i = 0; i < 100; i++) {
          if (dot(z, z) > 4.0) break;
          z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
          iter += 1.0;
        }
        
        float t = iter / 100.0;
        
        // Black and purple color scheme
        vec3 black = vec3(0.0, 0.0, 0.0);
        vec3 darkPurple = vec3(0.3, 0.0, 0.5);
        vec3 purple = vec3(0.6, 0.2, 0.8);
        vec3 lightPurple = vec3(0.8, 0.4, 1.0);
        
        vec3 color;
        if (t < 0.3) {
          color = mix(black, darkPurple, t / 0.3);
        } else if (t < 0.6) {
          color = mix(darkPurple, purple, (t - 0.3) / 0.3);
        } else {
          color = mix(purple, lightPurple, (t - 0.6) / 0.4);
        }
        
        // Add scroll-based intensity variation
        color *= (1.0 + u_scroll * 0.5);
        
        // Add time-based shimmer
        color += vec3(0.1, 0.0, 0.2) * sin(u_time * 2.0) * (1.0 - t);
        float alpha = 0.9;
        
        gl_FragColor = vec4(color, alpha);
      }
    `);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program failed to link');
      return;
    }

    gl.useProgram(program);

    // Setup geometry
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const scrollLocation = gl.getUniformLocation(program, 'u_scroll');

    const render = (time: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform1f(scrollLocation, scrollProgress);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(render);
    };

    console.log('WebGL Mandelbrot initialized');
    animationRef.current = requestAnimationFrame(render);
  };

  const init2DCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      // Create gradient background
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      );
      
      // Black and purple gradient for 2D fallback
      gradient.addColorStop(0, `rgba(0, 0, 0, 0.9)`);
      gradient.addColorStop(0.3, `rgba(76, 0, 127, 0.8)`);
      gradient.addColorStop(0.6, `rgba(153, 51, 204, 0.7)`);
      gradient.addColorStop(1, `rgba(204, 102, 255, 0.6)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      animationRef.current = requestAnimationFrame(render);
    };

    console.log('2D Canvas fallback initialized');
    animationRef.current = requestAnimationFrame(render);
  };

  const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full"
      data-testid="mandelbrot-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}