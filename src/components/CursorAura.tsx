import { useEffect, useRef, useState, type RefObject } from 'react';

const TRAIL_COUNT = 12;

type CursorAuraProps = {
  containerRef: RefObject<HTMLElement | null>;
};

const CursorAura = ({ containerRef }: CursorAuraProps) => {
  const dotsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, inside: false });
  const trail = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -9999, y: -9999 }))
  );
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReduced || !isFinePointer) return;

    const container = containerRef.current;
    if (!container) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (!mouse.current.inside) {
        trail.current.forEach((point) => {
          point.x = x;
          point.y = y;
        });
      }

      mouse.current.x = x;
      mouse.current.y = y;
      mouse.current.inside = true;
    };

    const onLeave = () => {
      mouse.current.inside = false;
    };

    let frame = 0;

    const animate = () => {
      const points = trail.current;
      const layer = dotsRef.current?.parentElement;

      if (!mouse.current.inside) {
        if (layer) layer.style.opacity = '0';
        frame = requestAnimationFrame(animate);
        return;
      }

      if (layer) layer.style.opacity = '1';

      points[0].x += (mouse.current.x - points[0].x) * 0.35;
      points[0].y += (mouse.current.y - points[0].y) * 0.35;

      for (let i = 1; i < TRAIL_COUNT; i++) {
        const ease = 0.22 - i * 0.008;
        points[i].x += (points[i - 1].x - points[i].x) * ease;
        points[i].y += (points[i - 1].y - points[i].y) * ease;
      }

      const glow = glowRef.current;
      if (glow) {
        glow.style.transform = `translate3d(${points[0].x}px, ${points[0].y}px, 0) translate(-50%, -50%)`;
      }

      const dotsEl = dotsRef.current;
      if (dotsEl) {
        const dots = dotsEl.children;
        for (let i = 0; i < TRAIL_COUNT; i++) {
          const el = dots[i] as HTMLElement;
          // Size and opacity are fixed per dot, so only the position changes here
          el.style.transform = `translate3d(${points[i].x}px, ${points[i].y}px, 0) translate(-50%, -50%)`;
        }
      }

      frame = requestAnimationFrame(animate);
    };

    container.addEventListener('mousemove', onMove, { passive: true });
    container.addEventListener('mouseleave', onLeave);
    frame = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [containerRef]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden transition-opacity duration-200"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-16 w-16 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(249,115,22,0.14) 0%, rgba(249,115,22,0.04) 40%, transparent 70%)',
          transform: 'translate3d(-9999px, -9999px, 0)',
        }}
      />
      <div ref={dotsRef} className="absolute inset-0">
        {Array.from({ length: TRAIL_COUNT }, (_, i) => {
          const progress = i / (TRAIL_COUNT - 1);
          const size = 5 - progress * 3.5;
          const opacity = Math.max(0.04, 0.45 - progress * 0.38);

          return (
            <span
              key={i}
              className="absolute left-0 top-0 rounded-full bg-main-color will-change-transform"
              style={{
                width: size,
                height: size,
                opacity,
                boxShadow: '0 0 6px rgba(249,115,22,0.3)',
                transform: 'translate3d(-9999px, -9999px, 0)',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CursorAura;
