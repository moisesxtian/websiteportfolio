import { useEffect, useRef, useState, type RefObject } from 'react';
import { isLiteMode } from '../lib/perf';

const TRAIL_COUNT = 8;

type CursorAuraProps = {
  containerRef: RefObject<HTMLElement | null>;
};

const CursorAura = ({ containerRef }: CursorAuraProps) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer || isLiteMode()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const mouse = { x: 0, y: 0, inside: false };
    const trail = Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }));
    let frame = 0;

    const animate = () => {
      frame = 0;
      if (!mouse.inside) return;

      trail[0].x += (mouse.x - trail[0].x) * 0.35;
      trail[0].y += (mouse.y - trail[0].y) * 0.35;

      for (let i = 1; i < TRAIL_COUNT; i++) {
        const ease = 0.24 - i * 0.012;
        trail[i].x += (trail[i - 1].x - trail[i].x) * ease;
        trail[i].y += (trail[i - 1].y - trail[i].y) * ease;
      }

      const dots = dotsRef.current?.children;
      if (dots) {
        for (let i = 0; i < TRAIL_COUNT; i++) {
          (dots[i] as HTMLElement).style.transform =
            `translate3d(${trail[i].x}px, ${trail[i].y}px, 0) translate(-50%, -50%)`;
        }
      }

      // Stop the loop once the trail has caught up; the next move restarts it.
      const tail = trail[TRAIL_COUNT - 1];
      if (Math.abs(tail.x - mouse.x) + Math.abs(tail.y - mouse.y) > 0.5) {
        frame = requestAnimationFrame(animate);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      if (!mouse.inside) {
        trail.forEach((point) => {
          point.x = mouse.x;
          point.y = mouse.y;
        });
        mouse.inside = true;
        if (layerRef.current) layerRef.current.style.opacity = '1';
      }

      if (!frame) frame = requestAnimationFrame(animate);
    };

    const onLeave = () => {
      mouse.inside = false;
      if (layerRef.current) layerRef.current.style.opacity = '0';
    };

    container.addEventListener('mousemove', onMove, { passive: true });
    container.addEventListener('mouseleave', onLeave);

    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [containerRef, enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={layerRef}
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden transition-opacity duration-200"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      <div ref={dotsRef} className="absolute inset-0">
        {Array.from({ length: TRAIL_COUNT }, (_, i) => {
          const progress = i / (TRAIL_COUNT - 1);
          return (
            <span
              key={i}
              className="absolute left-0 top-0 rounded-full bg-main-color"
              style={{
                width: 5 - progress * 3,
                height: 5 - progress * 3,
                opacity: Math.max(0.06, 0.45 - progress * 0.36),
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
