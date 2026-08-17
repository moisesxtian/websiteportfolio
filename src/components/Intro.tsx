import { useEffect, useRef } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaBehanceSquare,
  FaDiscord,
  FaFacebook,
} from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-scroll';
import { IconContext } from 'react-icons';
import { useResume } from '../Hooks/useResume';
import CursorAura from './CursorAura';
import HomeParticleBackground from './HomeParticleBackground';
import InteractiveName from './InteractiveName';

const ROLES = [
  'Full Stack Development',
  'Automation Engineering',
  'AI Development',
  'Web Scraping'
];

const OTHER_SOCIALS = [
  { href: 'https://github.com/moisesxtian', Icon: FaGithub },
  { href: 'https://www.linkedin.com/in/christian-moises/', Icon: FaLinkedin },
  { href: 'https://discord.com/users/hyx.chan', Icon: FaDiscord },
  { href: 'https://www.facebook.com/moisesxtian', Icon: FaFacebook },
];

const Home = () => {
  const { resumeUrl } = useResume();
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useRef(false);
  const entranceDone = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    if (!section) return;

    const entranceTimer = window.setTimeout(() => {
      entranceDone.current = true;
    }, prefersReduced.current ? 0 : 900);

    let frame = 0;

    const updateScroll = () => {
      if (!entranceDone.current && !prefersReduced.current) return;

      const rect = section.getBoundingClientRect();
      const travel = Math.max(rect.height * 0.65, 1);
      const raw = Math.min(1, Math.max(0, -rect.top / travel));
      const progress = prefersReduced.current ? 0 : raw;

      const nameEl = nameRef.current;
      if (nameEl) {
        if (progress === 0) {
          nameEl.style.transform = '';
          nameEl.style.opacity = '';
        } else {
          nameEl.style.transform = `translate3d(0, ${progress * -20}px, 0)`;
          nameEl.style.opacity = String(1 - progress * 0.4);
        }
      }

      const metaEl = metaRef.current;
      if (metaEl) {
        if (progress === 0) {
          metaEl.style.transform = '';
          metaEl.style.opacity = '';
        } else {
          metaEl.style.transform = `translate3d(0, ${progress * -36}px, 0)`;
          metaEl.style.opacity = String(1 - progress * 0.85);
        }
      }
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="Home"
      className="section-cut relative flex min-h-[100svh] flex-col overflow-hidden font-poppins text-secondary-color scroll-mt-16 sm:scroll-mt-20"
    >
      <HomeParticleBackground containerRef={sectionRef} />
      <CursorAura containerRef={sectionRef} />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-20">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center gap-5 sm:gap-6">
          <IconContext.Provider value={{ size: '22', className: 'transition duration-300' }}>
            <div
              className="hero-reveal inline-flex items-center gap-3 sm:gap-4"
              style={{ animationDelay: '0.05s' }}
            >
              <div className="inline-flex items-center">
                <a
                  href="https://www.behance.net/hyxchan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon text-[#494545] dark:text-gray-300"
                  aria-label="Behance"
                >
                  <FaBehanceSquare />
                </a>
              </div>

              {OTHER_SOCIALS.map(({ href, Icon }) => (
                <div key={href} className="inline-flex items-center gap-3 sm:gap-4">
                  <span className="h-4 w-px bg-gray-300 dark:bg-gray-600" aria-hidden="true" />
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon text-[#494545] dark:text-gray-300"
                  >
                    <Icon />
                  </a>
                </div>
              ))}
            </div>
          </IconContext.Provider>

          <div className="mx-auto flex w-full flex-col items-center gap-2 sm:gap-3">
            <div
              ref={nameRef}
              className="hero-reveal w-full will-change-transform"
              style={{ animationDelay: '0.12s' }}
            >
              <InteractiveName
                text="Christian Moises"
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
              />
            </div>
          </div>

          <div
            ref={metaRef}
            className="hero-reveal mx-auto flex w-full max-w-2xl flex-col items-center gap-4 sm:gap-5 will-change-transform"
            style={{ animationDelay: '0.42s' }}
          >
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 sm:gap-x-4">
              {ROLES.map((role) => (
                <div
                  key={role}
                  className="role-pill inline-flex items-center gap-2 px-1 py-0.5 text-[11px] sm:text-xs font-light text-gray-600 dark:text-gray-400"
                >
                  <span className="block h-1.5 w-1.5 rounded-full bg-main-color" />
                  <span>{role}</span>
                </div>
              ))}
            </div>

            <a href={resumeUrl} download="Christian-Moises-CV.pdf" target="_blank" rel="noreferrer">
              <button
                type="button"
                className="cv-btn w-40 h-9 rounded-xl bg-main-color text-white text-xs"
              >
                View CV
              </button>
            </a>
          </div>
        </div>
      </div>

      <div
        className="hero-reveal relative z-10 mb-5 flex justify-center sm:mb-6"
        style={{ animationDelay: '0.55s' }}
      >
        <Link
          to="Experience"
          smooth
          offset={-56}
          duration={500}
          className="scroll-hint inline-flex flex-col items-center gap-1 text-xs text-gray-400 dark:text-gray-500 cursor-pointer hover:text-main-color transition-colors"
        >
          <span>Scroll</span>
          <ChevronDown size={16} className="scroll-hint-icon" />
        </Link>
      </div>
    </section>
  );
};

export default Home;
