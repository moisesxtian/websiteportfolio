import { useEffect, useRef, type MouseEvent } from 'react';

type InteractiveNameProps = {
  text: string;
  className?: string;
};

const InteractiveName = ({ text, className = '' }: InteractiveNameProps) => {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const resetLetters = () => {
    const root = rootRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>('.hero-letter').forEach((el) => {
      el.style.transform = '';
      el.style.color = '';
    });
  };

  const handleMove = (e: MouseEvent<HTMLHeadingElement>) => {
    if (reducedMotion.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const letters = e.currentTarget.querySelectorAll<HTMLElement>('.hero-letter');
    letters.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 90;
      const force = Math.max(0, 1 - dist / radius);

      if (force > 0) {
        const lift = -14 * force;
        const scale = 1 + 0.14 * force;
        el.style.transform = `translate3d(0, ${lift}px, 0) scale(${scale})`;
        el.style.color = force > 0.2 ? '#f97316' : '';
      } else {
        el.style.transform = '';
        el.style.color = '';
      }
    });
  };

  return (
    <h1
      ref={rootRef}
      className={`hero-name mx-auto w-full text-center font-extrabold leading-[1.05] tracking-tight ${className}`}
      aria-label={text}
      onMouseMove={handleMove}
      onMouseLeave={resetLetters}
    >
      {text.split('').map((char, index) => {
        if (char === ' ') {
          return (
            <span key={`space-${index}`} className="inline-block w-[0.28em]" aria-hidden="true">
              {' '}
            </span>
          );
        }

        return (
          <span
            key={`${char}-${index}`}
            className="hero-letter inline-block will-change-transform"
            style={{ animationDelay: `${0.12 + index * 0.035}s` }}
            aria-hidden="true"
          >
            {char}
          </span>
        );
      })}
    </h1>
  );
};

export default InteractiveName;
