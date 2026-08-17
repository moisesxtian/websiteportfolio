import { useEffect, useRef, useState } from 'react';

/**
 * Tells you when an element has scrolled into view. Reveals once and stays
 * revealed, so cards do not flicker when scrolling back up.
 */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      // The bottom margin pulls the trigger line up the screen so each card
      // reveals as it reaches the middle, instead of all of them at once.
      { threshold: 0.15, rootMargin: '0px 0px -20% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
