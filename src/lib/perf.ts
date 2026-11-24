/**
 * Decides whether the page should run in "lite" mode: no per-frame decorative
 * loops, no theme wipe, fewer repaints. Lite mode is on when the browser is
 * rendering without a GPU (hardware acceleration off, software WebGL), on very
 * low-end devices, or when the user asked for reduced motion.
 *
 * The check runs once and is cached. `markLite()` lets a running animation
 * switch the page to lite mode if it measures slow frames anyway.
 */

const LITE_CLASS = 'perf-lite';

let cached: boolean | null = null;

function hasSoftwareRendering(): boolean {
  try {
    const canvas = document.createElement('canvas');
    // Fails when the only WebGL available is a slow software fallback
    // (SwiftShader, llvmpipe, Microsoft Basic Render Driver) or none at all.
    const gl = canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true }) as
      | WebGLRenderingContext
      | null;
    if (!gl) return true;

    // Some setups hand out a software context without flagging the caveat.
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = String(
      gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER) ?? ''
    );
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer);
  } catch {
    return true;
  }
}

function detect(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;

  const nav = navigator as Navigator & { deviceMemory?: number };
  if ((nav.hardwareConcurrency ?? 8) <= 2) return true;
  if ((nav.deviceMemory ?? 8) <= 2) return true;

  return hasSoftwareRendering();
}

export function isLiteMode(): boolean {
  if (cached !== null) return cached;
  if (typeof window === 'undefined') return false;

  cached = detect();
  if (cached) document.documentElement.classList.add(LITE_CLASS);
  return cached;
}

export function markLite() {
  if (cached) return;
  cached = true;
  document.documentElement.classList.add(LITE_CLASS);
  window.dispatchEvent(new Event('perf-lite'));
}

/**
 * Watches frame times for a running animation and calls `markLite()` when the
 * median frame is slower than ~30fps. Feed it every rAF timestamp; it stops
 * judging after one sample window.
 */
export function createFrameProbe(sampleSize = 60, slowMs = 33) {
  const deltas: number[] = [];
  let last = 0;
  let done = false;

  return (now: number): boolean => {
    if (done) return cached === true;
    if (last) deltas.push(now - last);
    last = now;
    if (deltas.length < sampleSize) return false;

    done = true;
    deltas.sort((a, b) => a - b);
    const median = deltas[Math.floor(deltas.length / 2)];
    if (median > slowMs) markLite();
    return cached === true;
  };
}
