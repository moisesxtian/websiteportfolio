import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { createFrameProbe, isLiteMode } from '../lib/perf';

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

const COLS = 10;
const ROWS = 6;
const GRID = 26;
/** The spotlight is a fixed-size box moved by transform, so moving it never repaints the page */
const SPOT = 440;
const DOT_PATTERN = (alpha: number) =>
  `radial-gradient(circle, rgba(249,115,22,${alpha}) 1.2px, transparent 1.4px)`;

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
        size: 2.4 + (id % 4) * 0.8,
        opacity: 0.26 + (id % 5) * 0.06,
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
  const spotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse || isLiteMode()) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const onResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
    };

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
    window.addEventListener('resize', onResize, { passive: true });

    let frame = 0;
    let visible = false;
    let stopped = false;
    const startedAt = performance.now();
    const probe = createFrameProbe();
    let influenceX = 0.5;
    let influenceY = 0.5;
    let influenceStrength = 0;

    const resetDots = () => {
      const layer = layerRef.current;
      if (!layer) return;
      Array.from(layer.children).forEach((el) => {
        (el as HTMLElement).style.transform = 'translate(-50%, -50%)';
      });
      if (spotRef.current) spotRef.current.style.opacity = '0';
    };

    const animate = (now: number) => {
      if (!visible || stopped) {
        frame = 0;
        return;
      }

      // Hardware acceleration off or a slow machine: settle into the static look.
      if (probe(now)) {
        stopped = true;
        frame = 0;
        resetDots();
        return;
      }

      const t = (now - startedAt) / 1000;

      const targetStrength = mouse.current.active ? 1 : 0;
      influenceStrength += (targetStrength - influenceStrength) * 0.1;
      influenceX += (mouse.current.x - influenceX) * 0.14;
      influenceY += (mouse.current.y - influenceY) * 0.14;

      const spot = spotRef.current;
      const spotDots = spot?.firstElementChild as HTMLElement | null;
      if (spot && spotDots) {
        // The box glides with the cursor; its dot layer is pulled back by the
        // grid remainder so the brighter dots sit exactly on the base ones.
        const left = influenceX * width - SPOT / 2;
        const top = influenceY * height - SPOT / 2;
        const offX = ((left % GRID) + GRID) % GRID;
        const offY = ((top % GRID) + GRID) % GRID;
        spot.style.transform = `translate3d(${left}px, ${top}px, 0)`;
        spotDots.style.transform = `translate3d(${-offX}px, ${-offY}px, 0)`;
        spot.style.opacity = String(influenceStrength);
      }

      const layer = layerRef.current;
      if (layer) {
        const dots = layer.children;
        for (let i = 0; i < dots.length; i++) {
          const p = PARTICLES[i];
          const ox = Math.sin(t * p.speed + p.phase) * p.driftX;
          const oy = Math.cos(t * p.speed * 0.85 + p.phase) * p.driftY;

          const dx = p.x - influenceX;
          const dy = p.y - influenceY;
          const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
          const falloff = Math.max(0, 1 - dist / 0.34);
          const push = falloff * falloff * influenceStrength * 48;

          (dots[i] as HTMLElement).style.transform = `translate3d(${ox + (dx / dist) * push}px, ${
            oy + (dy / dist) * push
          }px, 0) translate(-50%, -50%)`;
        }
      }

      frame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible && frame === 0 && !stopped) {
          frame = requestAnimationFrame(animate);
        }
      },
      { rootMargin: '80px' }
    );
    observer.observe(container);

    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [containerRef]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Oversized so the ellipse never meets a hard box edge. Fade to the
          same orange at 0 alpha — `transparent` is black and leaves a brown rim. */}
      <div className="absolute -inset-[30%] bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.07),rgba(249,115,22,0)_70%),radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.05),rgba(249,115,22,0)_65%)]" />

      <div
        className="absolute inset-0"
        style={{ backgroundImage: DOT_PATTERN(0.38), backgroundSize: `${GRID}px ${GRID}px`, opacity: 0.3 }}
      />

      <div
        ref={spotRef}
        className="absolute left-0 top-0 overflow-hidden"
        style={{
          width: SPOT,
          height: SPOT,
          opacity: 0,
          backgroundImage:
            'radial-gradient(circle closest-side, rgba(249,115,22,0.16), rgba(249,115,22,0) 80%)',
          WebkitMaskImage: 'radial-gradient(circle closest-side, #000 30%, transparent 100%)',
          maskImage: 'radial-gradient(circle closest-side, #000 30%, transparent 100%)',
        }}
      >
        <div
          className="absolute left-0 top-0"
          style={{
            width: SPOT + GRID,
            height: SPOT + GRID,
            backgroundImage: DOT_PATTERN(0.55),
            backgroundSize: `${GRID}px ${GRID}px`,
          }}
        />
      </div>

      <div ref={layerRef} className="absolute inset-0">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-main-color"
            style={{
              left: `${p.x * 100}%`,
              top: `${p.y * 100}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeParticleBackground;
