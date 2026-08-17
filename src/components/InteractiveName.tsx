import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react';

type InteractiveNameProps = {
  text: string;
  className?: string;
  /** Seconds between each letter starting its pop-in */
  letterStagger?: number;
  /** Misspelled name shown first, e.g. "Christain Moises" */
  teaseText?: string;
  /** Letters in the misspelled name to highlight, e.g. "ai" */
  highlight?: string;
  /** Set once the name is on screen, to start the swap sequence */
  revealed?: boolean;
};

/** misspelled + highlighted -> correct name, with the letters animating across */
type SwapPhase = 'tease' | 'final';

const SWAP_AFTER_MS = 1000;
/** How long the two letters take to trade places */
const SWAP_MS = 350;

const InteractiveName = ({
  text,
  className = '',
  letterStagger = 0.045,
  teaseText = '',
  highlight = '',
  revealed = false,
}: InteractiveNameProps) => {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useRef(false);
  const [phase, setPhase] = useState<SwapPhase>('tease');
  const [swapping, setSwapping] = useState(false);
  /** Where each swapped letter sat before the name was corrected */
  const startLeft = useRef<Map<string, number> | null>(null);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const recordLetterPositions = () => {
    const root = rootRef.current;
    if (!root) return;

    const positions = new Map<string, number>();
    root.querySelectorAll<HTMLElement>('.hero-letter.is-swap').forEach((el) => {
      positions.set(el.textContent || '', el.getBoundingClientRect().left);
    });

    startLeft.current = positions;
  };

  useEffect(() => {
    if (!revealed || !teaseText || !highlight) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('final');
      return;
    }

    const swapTimer = window.setTimeout(() => {
      recordLetterPositions();
      setPhase('final');
    }, SWAP_AFTER_MS);

    return () => window.clearTimeout(swapTimer);
  }, [revealed, teaseText, highlight]);

  /**
   * The corrected name is already in place here, so each swapped letter is
   * offset back to where it used to be and animated to zero. Ending on the
   * letter's natural position means nothing can jump when the animation ends.
   *
   * These run through element.animate with plain pixel values so the browser
   * can hand them to the compositor instead of the busy main thread.
   */
  useLayoutEffect(() => {
    if (phase !== 'final') return;

    const positions = startLeft.current;
    const root = rootRef.current;
    startLeft.current = null;
    if (!positions || !root) return;

    const letters = Array.from(root.querySelectorAll<HTMLElement>('.hero-letter.is-swap'));
    const running: Animation[] = [];

    letters.forEach((el) => {
      const from = positions.get(el.textContent || '');
      if (from === undefined) return;

      const shift = from - el.getBoundingClientRect().left;
      if (Math.abs(shift) < 0.5) return;

      // Whichever letter travels right arcs over the other one
      const fontSize = Number.parseFloat(window.getComputedStyle(el).fontSize) || 16;
      const lift = (shift < 0 ? -0.14 : 0.14) * fontSize;

      el.style.willChange = 'transform';

      running.push(
        el.animate(
          [
            { transform: `translate3d(${shift}px, 0, 0)` },
            { transform: `translate3d(${shift / 2}px, ${lift}px, 0)`, offset: 0.5 },
            { transform: 'translate3d(0, 0, 0)' },
          ],
          { duration: SWAP_MS, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'both' }
        )
      );
    });

    if (running.length === 0) return;

    setSwapping(true);

    const finish = () => {
      running.forEach((animation) => animation.cancel());
      letters.forEach((el) => {
        el.style.willChange = '';
      });
    };

    // Cancelling drops back to the letter's real position, which is exactly
    // where the animation ended, so this cannot cause a visible jump.
    Promise.all(running.map((animation) => animation.finished))
      .then(() => {
        finish();
        setSwapping(false);
      })
      .catch(() => {
        // animation was cancelled on unmount
      });

    return finish;
  }, [phase]);

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
    if (window.scrollY > 24) return;

    const letters = e.currentTarget.querySelectorAll<HTMLElement>('.hero-letter');
    letters.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 70;
      const force = Math.max(0, 1 - dist / radius);

      if (force > 0) {
        const lift = -4 * force;
        el.style.transform = `translate3d(0, ${lift}px, 0)`;
        el.style.color = force > 0.2 ? '#f97316' : '';
      } else {
        el.style.transform = '';
        el.style.color = '';
      }
    });
  };

  const shownText = phase === 'final' || !teaseText ? text : teaseText;

  // The swapped pair keeps the same two slots in both spellings
  const swapStart = teaseText && highlight ? teaseText.indexOf(highlight) : -1;
  const isSwapLetter = (index: number) =>
    swapStart >= 0 && index >= swapStart && index < swapStart + highlight.length;

  let letterIndex = 0;

  return (
    <h1
      ref={rootRef}
      className={`hero-name ai-${phase} ${
        swapping ? 'is-swapping' : ''
      } mx-auto w-full text-center font-extrabold leading-[1.05] tracking-tight ${className}`}
      aria-label={text}
      onMouseMove={handleMove}
      onMouseLeave={resetLetters}
    >
      {shownText.split('').map((char, index) => {
        if (char === ' ') {
          return (
            <span key={`space-${index}`} className="inline-block w-[0.28em]" aria-hidden="true">
              {' '}
            </span>
          );
        }

        const delay = letterIndex * letterStagger;
        letterIndex += 1;

        return (
          <span
            key={`${char}-${index}`}
            className={`hero-letter inline-block ${isSwapLetter(index) ? 'is-swap' : ''}`}
            style={{ animationDelay: `${delay}s` }}
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
