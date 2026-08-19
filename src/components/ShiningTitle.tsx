import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';

export function HoverWords({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ').filter(Boolean);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="exp-word">{word}</span>
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

export default function ShiningTitle({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const [ready, setReady] = useState(false);
  let letterIndex = 0;
  const letterCount = text.replace(/ /g, '').length;

  useEffect(() => {
    const waitMs = (letterCount * 0.045 + 0.5) * 1000;
    const timer = window.setTimeout(() => setReady(true), waitMs);
    return () => window.clearTimeout(timer);
  }, [letterCount]);

  const resetLetters = () => {
    const root = rootRef.current;
    if (!root) return;

    root.querySelectorAll<HTMLElement>('.exp-title-letter').forEach((el) => {
      el.style.transform = '';
      el.style.color = '';
      el.style.webkitTextFillColor = '';
    });
  };

  const handleMove = (e: MouseEvent<HTMLHeadingElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const letters = e.currentTarget.querySelectorAll<HTMLElement>('.exp-title-letter');
    letters.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const force = Math.max(0, 1 - dist / 70);

      if (force > 0) {
        el.style.transform = `translate3d(0, ${-4 * force}px, 0)`;
        if (force > 0.2) {
          el.style.color = '#f97316';
          el.style.webkitTextFillColor = '#f97316';
        } else {
          el.style.color = '';
          el.style.webkitTextFillColor = '';
        }
      } else {
        el.style.transform = '';
        el.style.color = '';
        el.style.webkitTextFillColor = '';
      }
    });
  };

  return (
    <h2
      ref={rootRef}
      className={`exp-title ${ready ? 'is-ready' : ''} ${className}`.trim()}
      aria-label={text}
      onMouseMove={handleMove}
      onMouseLeave={resetLetters}
    >
      {text.split(' ').map((word, wordIndex, words) => (
        <span key={`word-${wordIndex}`}>
          <span className="inline-block whitespace-nowrap">
            {word.split('').map((char, charIndex) => {
              const letterI = letterIndex;
              letterIndex += 1;

              return (
                <span
                  key={`${char}-${charIndex}`}
                  className="exp-title-letter inline-block"
                  style={
                    {
                      '--letter-delay': `${letterI * 0.045}s`,
                      '--letter-i': letterI,
                    } as CSSProperties
                  }
                  aria-hidden="true"
                >
                  {char}
                </span>
              );
            })}
          </span>
          {wordIndex < words.length - 1 ? (
            <span className="inline-block w-[0.28em]" aria-hidden="true">
              {' '}
            </span>
          ) : null}
        </span>
      ))}
    </h2>
  );
}
