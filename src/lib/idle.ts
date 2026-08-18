/** Run after the browser is idle so first paint is not competing with extra work. */
export function runWhenIdle(fn: () => void): () => void {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(() => fn(), { timeout: 1500 });
    return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(fn, 400);
  return () => window.clearTimeout(id);
}
