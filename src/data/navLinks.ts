import { scroller } from 'react-scroll';

/** Sections linked from the top navbar and from the contact panel at the end of the page */
export const navLinks = [
  { label: 'Home', target: 'Home', id: 'Home' },
  { label: 'Projects', target: 'Projects', id: 'Projects' },
  { label: 'Experience', target: 'Experience', id: 'Experience' },
  { label: 'Contact', target: 'Contact', id: 'Contact' },
];

const NAVBAR_HEIGHT_OFFSET = -56;

/**
 * Hide-on-scroll nav: going down, the bar leaves, so do not reserve its height
 * or the section lands one bar-height too high. Going up, the bar comes back.
 */
export function getSectionScrollOffset(targetId: string): number {
  if (targetId === 'Home') return 0;

  const section = document.getElementById(targetId);
  if (!section) return 0;

  if (section.getBoundingClientRect().top > 0) return 0;
  return NAVBAR_HEIGHT_OFFSET;
}

export function scrollToSection(targetId: string) {
  scroller.scrollTo(targetId, {
    smooth: 'easeOutCubic',
    duration: 450,
    offset: getSectionScrollOffset(targetId),
  });
}
