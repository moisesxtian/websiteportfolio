import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-scroll';
import { IconContext } from 'react-icons';
import { socials } from '../data/socials';
import { useResume } from '../Hooks/useResume';
import { useLoopedSteps } from '../Hooks/useLoopedSteps';
import CursorAura from './CursorAura';
import HomeParticleBackground from './HomeParticleBackground';
import InteractiveName, { SWAP_TOTAL_MS } from './InteractiveName';
import NowPlaying from './NowPlaying';

const ROLES = [
  'Full Stack Developer',
  'Automation Engineer',
  'AI Developer',
];

const DISPLAY_NAME = 'Christian Moises';
/** Shown first so the "ai" reads as AI, then the two letters swap into place */
const TEASE_NAME = 'Christain Moises';
const HIGHLIGHT_LETTERS = 'ai';
const FIRST_NAME = 'Christian';

/** "christiAn" and "christiAn" plus its last letter, for "a" and "an" */
const A_IN_NAME = { start: DISPLAY_NAME.indexOf('a'), length: 1 };
const AN_IN_NAME = { start: A_IN_NAME.start, length: 2 };

/** Picks "an Automation Engineer" over "a Automation Engineer" */
function articleFor(role: string) {
  const firstLetter = role[0].toLowerCase();
  const startsWithVowel = ['a', 'e', 'i', 'o', 'u'].includes(firstLetter);
  return startsWithVowel ? AN_IN_NAME : A_IN_NAME;
}

/**
 * The hero reads "Christian is a <role>" out of letters the name already has:
 * "Christian", then the "is" in moISes, then the "a"/"an" in christiAn. The sentence
 * is only spelled out once, then each role takes its turn finishing it.
 * `role` is -1 on beats where nothing below should grow.
 */
const SENTENCE_BEATS = [
  { letters: { start: 0, length: FIRST_NAME.length }, role: -1, ms: 1150 },
  { letters: { start: DISPLAY_NAME.indexOf('is', FIRST_NAME.length), length: 2 }, role: -1, ms: 500 },
  { letters: articleFor(ROLES[0]), role: -1, ms: 850 },
  // The article holds so the phrase still reads as "a/an <role>" while each role grows
  ...ROLES.map((role, index) => ({ letters: articleFor(role), role: index, ms: 1400 })),
  // Everything sits plain for a while before the sentence starts over
  { letters: null, role: -1, ms: 10000 },
];

/** Read once at module level so the loop is never restarted by a re-render */
const BEAT_MS = SENTENCE_BEATS.map((beat) => beat.ms);
const LETTER_STAGGER = 0.045;
const ITEM_STAGGER = 0.06;
const ITEM_DURATION = 0.32;
const BOOT_MIN_MS = 2000;
const BOOT_EXPAND_MS = 560;

/**
 * Counted from the moment the hero turns ready, which is BOOT_EXPAND_MS after the
 * name (and its letter swap) starts, so the two effects never overlap.
 */
const SENTENCE_START_MS = SWAP_TOTAL_MS - BOOT_EXPAND_MS + 900;

const socialStart = BOOT_EXPAND_MS / 1000 + 0.05;
const skillsStart = socialStart + socials.length * ITEM_STAGGER + 0.06;
const cvStart = skillsStart + ROLES.length * ITEM_STAGGER;
const scrollHintStart = cvStart + ITEM_DURATION * 0.5;
const nowPlayingStart = scrollHintStart + 0.12;
const entranceTotalMs = Math.ceil((nowPlayingStart + ITEM_DURATION + 0.05) * 1000);

type BootPhase = 'loading' | 'expanding' | 'ready';

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function applyLayer(
  el: HTMLElement | null,
  progress: number,
  { y, fade, scale = 0, blur = 0 }: { y: number; fade: number; scale?: number; blur?: number }
) {
  if (!el) return;

  if (progress <= 0.001) {
    el.style.transform = '';
    el.style.opacity = '';
    el.style.filter = '';
    return;
  }

  el.style.opacity = String(Math.max(0, 1 - progress * fade));
  el.style.transform = `translate3d(0, ${progress * y}px, 0) scale(${1 - progress * scale})`;
  el.style.filter = blur > 0 ? `blur(${progress * blur}px)` : '';
}

type HomeProps = {
  onBootReady?: () => void;
};

const Home = ({ onBootReady }: HomeProps) => {
  const { resumeUrl } = useResume();
  const sectionRef = useRef<HTMLElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const nowPlayingRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useRef(false);
  const entranceDone = useRef(false);
  const [bootPhase, setBootPhase] = useState<BootPhase>('loading');

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced.current) {
      setBootPhase('ready');
      entranceDone.current = true;
      return;
    }

    let cancelled = false;
    let expandTimer = 0;
    let readyTimer = 0;
    const startedAt = performance.now();

    const beginExpand = () => {
      if (cancelled) return;
      setBootPhase('expanding');
      expandTimer = window.setTimeout(() => {
        if (cancelled) return;
        setBootPhase('ready');
      }, BOOT_EXPAND_MS);
    };

    const waitForLoad = async () => {
      try {
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }
      } catch {
        // ignore font readiness errors
      }

      if (document.readyState !== 'complete') {
        await new Promise<void>((resolve) => {
          window.addEventListener('load', () => resolve(), { once: true });
        });
      }

      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, BOOT_MIN_MS - elapsed);
      await new Promise<void>((resolve) => {
        readyTimer = window.setTimeout(resolve, wait);
      });

      beginExpand();
    };

    void waitForLoad();

    return () => {
      cancelled = true;
      window.clearTimeout(expandTimer);
      window.clearTimeout(readyTimer);
    };
  }, []);

  useEffect(() => {
    if (bootPhase === 'ready') onBootReady?.();
  }, [bootPhase, onBootReady]);

  useEffect(() => {
    if (bootPhase === 'loading') {
      entranceDone.current = false;
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const entranceTimer = window.setTimeout(() => {
      entranceDone.current = true;
    }, prefersReduced.current ? 0 : entranceTotalMs);

    let frame = 0;

    const updateScroll = () => {
      if (!entranceDone.current && !prefersReduced.current) return;

      const travel = Math.max(window.innerHeight * 0.85, 1);
      const raw = Math.min(1, Math.max(0, window.scrollY / travel));
      const progress = prefersReduced.current ? 0 : easeOutCubic(raw);

      applyLayer(socialsRef.current, progress, { y: -18, fade: 1.15, scale: 0.02, blur: 3 });
      applyLayer(nameRef.current, progress, { y: -10, fade: 1.05, scale: 0.04, blur: 3 });
      applyLayer(metaRef.current, progress, { y: 16, fade: 1.2, scale: 0.02, blur: 3 });
      applyLayer(scrollHintRef.current, progress, { y: 12, fade: 1.5, blur: 3 });
      applyLayer(nowPlayingRef.current, progress, { y: 14, fade: 1.4, blur: 3 });

      section.style.setProperty('--hero-exit', String(progress));
      section.style.pointerEvents = progress > 0.8 ? 'none' : 'auto';
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.clearTimeout(entranceTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [bootPhase === 'loading' ? 'loading' : 'active']);

  const showLoader = bootPhase === 'loading' || bootPhase === 'expanding';
  const revealName = bootPhase !== 'loading';

  const step = useLoopedSteps(bootPhase === 'ready', BEAT_MS, SENTENCE_START_MS);
  const beat = step >= 0 ? SENTENCE_BEATS[step] : null;
  const litRole = beat?.role ?? -1;

  return (
    <>
      <div id="Home" className="relative z-0 h-[100svh] w-full scroll-mt-0" aria-hidden="true" />

      <section
        ref={sectionRef}
        data-boot={bootPhase === 'ready' ? 'ready' : bootPhase}
        className="hero-section fixed inset-0 z-[1] flex flex-col overflow-hidden bg-page-bg font-poppins text-secondary-color"
        aria-label="Christian Moises"
        aria-busy={bootPhase === 'loading'}
      >
        <HomeParticleBackground containerRef={sectionRef} />
        <CursorAura containerRef={sectionRef} />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-20">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center gap-5 sm:gap-6">
            <IconContext.Provider value={{ size: '22', className: 'transition duration-300' }}>
              <div
                ref={socialsRef}
                className="inline-flex items-center gap-3 sm:gap-4 will-change-transform"
              >
                {socials.map(({ href, Icon, label }, index) => (
                  <div key={href} className="inline-flex items-center gap-3 sm:gap-4">
                    {index > 0 ? (
                      <span
                        className="hero-pop-item h-4 w-px bg-gray-300 dark:bg-gray-600"
                        style={{ animationDelay: `${socialStart + index * ITEM_STAGGER}s` }}
                        aria-hidden="true"
                      />
                    ) : null}
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="hero-pop-item social-icon text-[#494545] dark:text-gray-300"
                      style={{ animationDelay: `${socialStart + index * ITEM_STAGGER}s` }}
                    >
                      <Icon />
                    </a>
                  </div>
                ))}
              </div>
            </IconContext.Provider>

            <div
              ref={nameRef}
              className="hero-name-stage relative z-20 w-full will-change-transform"
            >
              <div className="hero-name-reveal relative mx-auto w-fit">
                {showLoader ? (
                  <div
                    className={`hero-boot-bar ${bootPhase === 'expanding' ? 'is-expanding' : ''}`}
                    aria-hidden="true"
                  >
                    <span className="hero-boot-spinner" />
                    <span className="hero-caret hero-caret-left" />
                    <span className="hero-caret hero-caret-right" />
                  </div>
                ) : null}

                <div className="hero-name-sizer" aria-hidden="true">
                  <InteractiveName
                    text={DISPLAY_NAME}
                    letterStagger={LETTER_STAGGER}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl whitespace-nowrap"
                  />
                </div>

                <div className={`hero-name-mask ${revealName ? 'is-revealed' : ''}`}>
                  <InteractiveName
                    text={DISPLAY_NAME}
                    letterStagger={LETTER_STAGGER}
                    teaseText={TEASE_NAME}
                    highlight={HIGHLIGHT_LETTERS}
                    revealed={revealName}
                    spotlight={beat?.letters ?? null}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl whitespace-nowrap"
                  />
                </div>
              </div>
            </div>

            <div
              ref={metaRef}
              className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 sm:gap-5 will-change-transform"
            >
              <div
                className={`role-list flex flex-wrap justify-center gap-x-3 gap-y-2 sm:gap-x-4 ${
                  litRole >= 0 ? 'is-reading' : ''
                }`}
              >
                {ROLES.map((role, index) => (
                  <div
                    key={role}
                    className="hero-pop-item role-pill inline-flex items-center px-1 py-0.5 text-[11px] sm:text-xs font-light text-gray-600 dark:text-gray-400"
                    style={{ animationDelay: `${skillsStart + index * ITEM_STAGGER}s` }}
                  >
                    {/* The pill's own transform belongs to its entrance animation, so
                        growing and lifting happens on this inner span instead */}
                    <span
                      className={`role-pill-inner inline-flex items-center gap-2 ${
                        litRole === index ? 'is-lit' : ''
                      }`}
                    >
                      <span className="block h-1.5 w-1.5 rounded-full bg-main-color" />
                      <span>{role}</span>
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={resumeUrl}
                download="Christian-Moises-CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="hero-pop-item cv-btn inline-flex h-10 w-44 items-center justify-center rounded-full bg-main-color text-xs font-semibold tracking-wide text-white"
                style={{ animationDelay: `${cvStart}s` }}
              >
                <span>View CV</span>
              </a>
            </div>
          </div>
        </div>

        <div
          ref={nowPlayingRef}
          className="hero-enter-fade absolute bottom-5 left-4 z-30 hidden w-72 will-change-transform sm:block sm:bottom-6 sm:left-6 md:left-10"
          style={{ animationDelay: `${nowPlayingStart}s` }}
        >
          <NowPlaying />
        </div>

        <div
          ref={scrollHintRef}
          className="hero-enter-fade pointer-events-none relative z-10 mb-5 flex justify-center will-change-transform sm:mb-6"
          style={{ animationDelay: `${scrollHintStart}s` }}
        >
          <Link
            to="Experience"
            smooth
            offset={-56}
            duration={700}
            className="scroll-hint pointer-events-auto inline-flex flex-col items-center gap-1 text-xs text-gray-400 dark:text-gray-500 cursor-pointer hover:text-main-color transition-colors"
          >
            <span>Scroll</span>
            <ChevronDown size={16} className="scroll-hint-icon" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
