import { useEffect, useState } from 'react';

/**
 * Walks through a list of step durations, then starts over from the top.
 * The hero uses this to read out "Christian is a <role>" on repeat.
 *
 * @param active   the loop only runs while this is true
 * @param stepsMs  how long each step stays on screen, in milliseconds
 * @param delayMs  wait before the very first step
 * @returns the step being shown, or -1 before the loop has started
 */
export function useLoopedSteps(active: boolean, stepsMs: number[], delayMs = 0): number {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!active || stepsMs.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer = 0;
    let current = -1;

    const playNextStep = () => {
      // Past the end of the list, so start the next pass
      current = current + 1 >= stepsMs.length ? 0 : current + 1;

      setStep(current);
      timer = window.setTimeout(playNextStep, stepsMs[current]);
    };

    timer = window.setTimeout(playNextStep, delayMs);

    return () => {
      window.clearTimeout(timer);
      setStep(-1);
    };
  }, [active, stepsMs, delayMs]);

  return step;
}
