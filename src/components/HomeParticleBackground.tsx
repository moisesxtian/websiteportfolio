import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  driftX: number;
  driftY: number;
  speed: number;
  phase: number;
};

type HomeParticleBackgroundProps = {
  containerRef: RefObject<HTMLElement | null>;
};

const COLS = 12;
const ROWS = 8;

function buildParticles(): Particle[] {
  const list: Particle[] = [];
  let id = 0;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if ((row + col) % 3 === 0) continue;

      list.push({
        id: id++,
        x: (col + 0.5) / COLS + (((id * 17) % 7) - 3) * 0.005,
        y: (row + 0.5) / ROWS + (((id * 13) % 7) - 3) * 0.005,
        size: 2.6 + (id % 4) * 0.9,
        opacity: 0.28 + (id % 5) * 0.06,
        driftX: 6 + (id % 3) * 4,
        driftY: 8 + (id % 4) * 5,
        speed: 0.28 + (id % 6) * 0.09,
        phase: id * 0.55,
      });
    }
  }

  return list;
}

const PARTICLES = buildParticles();

const HomeParticleBackground = ({ containerRef }: HomeParticleBackgroundProps) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReduced || isCoarse) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = (e.clientY - rect.top) / rect.height;
      mouse.current.active = true;
    };

    const onLeave = () => {
      mouse.current.active = false;
    };

    container.addEventListener('mousemove', onMove, { passive: true });
    container.addEventListener('mouseleave', onLeave);

    let frame = 0;
    let visible = false;
    const startedAt = performance.now();
    let influenceX = 0.5;
    let influenceY = 0.5;
    let influenceStrength = 0;

    // Rewriting the mask and glow gradients repaints the whole background, so
    // they are only touched once the cursor has actually moved somewhere new.
    let paintedX = -1;
    let paintedY = -1;
    let paintedStrength = -1;

    const animate = (now: number) => {
      if (!visible) {
        frame = 0;
        return;
      }

      const t = (now - startedAt) / 1000;

      const targetStrength = mouse.current.active ? 1 : 0;
      influenceStrength += (targetStrength - influenceStrength) * 0.1;
      influenceX += (mouse.current.x - influenceX) * 0.14;
      influenceY += (mouse.current.y - influenceY) * 0.14;

      const px = influenceX * 100;
      const py = influenceY * 100;

      const needsRepaint =
        Math.abs(px - paintedX) > 0.2 ||
        Math.abs(py - paintedY) > 0.2 ||
        Math.abs(influenceStrength - paintedStrength) > 0.004;

      if (needsRepaint) {
        paintedX = px;
        paintedY = py;
        paintedStrength = influenceStrength;

        // Pattern parallax + cursor spotlight
        const pattern = patternRef.current;
        if (pattern) {
          const shiftX = (influenceX - 0.5) * -28 * influenceStrength;
          const shiftY = (influenceY - 0.5) * -28 * influenceStrength;
          const scale = 1 + influenceStrength * 0.04;
          const mask = `radial-gradient(circle 220px at ${px}% ${py}%, black 0%, black 35%, transparent 75%)`;
          pattern.style.backgroundPosition = `${shiftX}px ${shiftY}px`;
          pattern.style.transform = `scale(${scale})`;
          pattern.style.opacity = String(0.35 + influenceStrength * 0.25);
          pattern.style.maskImage = mask;
          pattern.style.webkitMaskImage = mask;
        }

        // Soft glow that follows cursor over the pattern
        const spotlight = spotlightRef.current;
        if (spotlight) {
          spotlight.style.opacity = String(0.15 + influenceStrength * 0.45);
          spotlight.style.background = `radial-gradient(circle 180px at ${px}% ${py}%, rgba(249,115,22,0.22) 0%, rgba(249,115,22,0.06) 40%, transparent 70%)`;
        }
      }

      const layer = layerRef.current;
      if (layer) {
        const dots = layer.children;
        for (let i = 0; i < dots.length; i++) {
          const p = PARTICLES[i];
          const ox = Math.sin(t * p.speed + p.phase) * p.driftX;
          const oy = Math.cos(t * p.speed * 0.85 + p.phase) * p.driftY;
          const pulse = 0.8 + Math.sin(t * p.speed * 1.1 + p.phase) * 0.2;

          const dx = p.x - influenceX;
          const dy = p.y - influenceY;
          const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
          const radius = 0.34;
          const falloff = Math.max(0, 1 - dist / radius);
          const push = falloff * falloff * influenceStrength * 48;
          const pushX = (dx / dist) * push;
          const pushY = (dy / dist) * push;
          const nearGlow = 1 + falloff * influenceStrength * 0.9;

          const el = dots[i] as HTMLElement;
          el.style.transform = `translate3d(${ox + pushX}px, ${oy + pushY}px, 0) translate(-50%, -50%)`;
          el.style.opacity = String(Math.min(0.75, p.opacity * pulse * nearGlow));
        }
      }

      frame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible && frame === 0) {
          frame = requestAnimationFrame(animate);
        }
      },
      { rootMargin: '80px' }
    );
    observer.observe(container);

    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [containerRef]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Oversized so the ellipse never meets a hard box edge. Fade to the
          same orange at 0 alpha — `transparent` is black and leaves a brown rim. */}
      <div className="absolute -inset-[30%] bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.07),rgba(249,115,22,0)_70%),radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.05),rgba(249,115,22,0)_65%)]" />

      <div
        ref={spotlightRef}
        className="absolute inset-0 will-change-[opacity,background] transition-opacity"
        style={{ opacity: 0.15 }}
      />

      <div
        ref={patternRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(249,115,22,0.38) 1.2px, transparent 1.4px)',
          backgroundSize: '26px 26px',
          opacity: 0.35,
          transformOrigin: 'center center',
        }}
      />

      <div ref={layerRef} className="absolute inset-0">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-main-color will-change-transform"
            style={{
              left: `${p.x * 100}%`,
              top: `${p.y * 100}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              boxShadow: '0 0 8px rgba(249,115,22,0.3)',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeParticleBackground;
