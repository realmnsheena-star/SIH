import { useEffect, useRef } from 'react';

export interface VelarisProps {
  bg?: string;
  colors?: string[];
  speed?: number;
  grain?: number;
  height?: string;
}

const VERT_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG_SHADER = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_colors[4];
uniform vec3 u_bg;
uniform float u_grain;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv;
  p.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.15;

  vec2 q = vec2(fbm(p + t), fbm(p - t + vec2(5.2, 1.3)));
  vec2 r = vec2(fbm(p + q + vec2(1.7, 9.2) + t * 0.5), fbm(p + q + vec2(8.3, 2.8) - t * 0.3));
  float f = fbm(p + r);

  vec3 col = mix(u_colors[0], u_colors[1], smoothstep(0.0, 0.5, f));
  col = mix(col, u_colors[2], smoothstep(0.3, 0.7, length(r) * 0.6));
  col = mix(col, u_colors[3], smoothstep(0.5, 1.0, dot(q, q) * 0.5));
  col = mix(u_bg, col, 0.55);

  float vignette = smoothstep(1.3, 0.5, length(uv - 0.5) * 1.4);
  col *= vignette;

  float g = hash(gl_FragCoord.xy + u_time) - 0.5;
  col += g * u_grain;

  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  return [r, g, b];
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram | null {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vs);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fs);
  if (!vertexShader || !fragmentShader) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export default function Velaris({
  bg = '#020617',
  colors = ['#0f172a', '#1d4ed8', '#2563eb', '#06b6d4'],
  speed = 0.7,
  grain = 0.15,
  height = '100vh',
}: VelarisProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;

    const program = createProgram(gl, VERT_SHADER, FRAG_SHADER);
    if (!program) return;

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uColors = gl.getUniformLocation(program, 'u_colors');
    const uBg = gl.getUniformLocation(program, 'u_bg');
    const uGrain = gl.getUniformLocation(program, 'u_grain');

    const bgColor = hexToRgb(bg);
    gl.uniform3f(uBg, bgColor[0], bgColor[1], bgColor[2]);
    gl.uniform1f(uGrain, grain);

    const colorUniforms = new Float32Array(12);
    for (let i = 0; i < 4 && i < colors.length; i++) {
      const c = hexToRgb(colors[i]);
      colorUniforms[i * 3] = c[0];
      colorUniforms[i * 3 + 1] = c[1];
      colorUniforms[i * 3 + 2] = c[2];
    }
    gl.uniform3fv(uColors, colorUniforms);

    let animationFrameId: number = 0;
    let startTime = performance.now();

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);
    handleResize();

    const effectiveSpeed = reducedMotionRef.current ? speed * 0.15 : speed;

    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      gl.uniform1f(uTime, elapsed * effectiveSpeed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!reducedMotionRef.current) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, [bg, colors, speed, grain]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height, display: 'block' }}
    />
  );
}
