import { useEffect, useRef } from 'react';
import HeroAvatar from '/public/assets/HeroCard.webp';
import { ReactTyped } from 'react-typed';
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
import NowPlaying from './NowPlaying';
import CursorAura from './CursorAura';
import HomeParticleBackground from './HomeParticleBackground';

const Home = () => {
  const { resumeUrl } = useResume();
  const sectionRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const tiltTarget = useRef({ rx: 0, ry: 0 });
  const tiltCurrent = useRef({ rx: 0, ry: 0 });

  useEffect(() => {
    let frame = 0;
    const startedAt = performance.now();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;

    const animate = (now: number) => {
      const elapsed = (now - startedAt) / 1000;
      const floatAmount = prefersReduced || isCoarse ? 0 : 10;
      const floatY = Math.sin((elapsed * Math.PI * 2) / 5.5) * -floatAmount;

      const ease = 0.08;
      tiltCurrent.current.rx += (tiltTarget.current.rx - tiltCurrent.current.rx) * ease;
      tiltCurrent.current.ry += (tiltTarget.current.ry - tiltCurrent.current.ry) * ease;

      const floatEl = floatRef.current;
      if (floatEl) {
        floatEl.style.transform = `translate3d(0, ${floatY}px, 0)`;
      }

      const tiltEl = tiltRef.current;
      if (tiltEl) {
        const rx = tiltCurrent.current.rx;
        const ry = tiltCurrent.current.ry;
        tiltEl.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    tiltTarget.current = {
      ry: (x - 0.5) * 3,
      rx: (0.5 - y) * 2,
    };
  };

  const handleMouseLeave = () => {
    tiltTarget.current = { rx: 0, ry: 0 };
  };

  return (
    <section
      ref={sectionRef}
      id="Home"
      className="section-page section-cut font-poppins text-secondary-color relative overflow-hidden"
    >
      <HomeParticleBackground containerRef={sectionRef} />
      <CursorAura containerRef={sectionRef} />
      <div className="section-page-inner relative z-10 pb-10 md:pb-14">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10 w-full">
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-3 sm:space-y-4 w-full lg:w-[52%] min-w-0">
            <h2 className="hero-reveal text-xs sm:text-sm font-medium text-secondary-color">
              I AM
            </h2>
            <h1 className="hero-reveal text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] break-words">
              Christian Moises
            </h1>
            <h3 className="hero-reveal text-sm sm:text-base max-w-xl">
              an{' '}
              <span className="font-bold text-main-color">
                <ReactTyped
                  strings={['AI Developer', 'Automations Engineer']}
                  typeSpeed={40}
                  backSpeed={40}
                  loop
                />
              </span>{' '}
              from the Philippines.
            </h3>

            <div className="hero-reveal flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 max-w-xl">
              {[
                'Full Stack Development',
                'Automation Engineering',
                'AI Development',
                'Web Scraping',
                'Graphic Designer',
              ].map((role) => (
                <div
                  key={role}
                  className="role-pill flex items-center space-x-2 rounded-full border border-gray-300 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-light bg-white/70 dark:border-gray-600 dark:bg-neutral-900/70"
                >
                  <span className="block w-2 h-2 bg-main-color rounded-full" />
                  <span>{role}</span>
                </div>
              ))}
            </div>

            <IconContext.Provider value={{ size: '24', className: 'transition duration-300' }}>
              <div className="hero-reveal flex justify-center lg:justify-start gap-3 sm:gap-4 border border-gray-200 px-4 sm:px-5 py-2 rounded-full bg-white/60 dark:border-gray-700 dark:bg-neutral-900/60">
                {[
                  { href: 'https://github.com/moisesxtian', Icon: FaGithub },
                  { href: 'https://www.linkedin.com/in/christian-moises/', Icon: FaLinkedin },
                  { href: 'https://www.behance.net/hyxchan', Icon: FaBehanceSquare },
                  { href: 'https://discord.com/users/hyx.chan', Icon: FaDiscord },
                  { href: 'https://www.facebook.com/moisesxtian', Icon: FaFacebook },
                ].map(({ href, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon text-[#494545] dark:text-gray-300"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </IconContext.Provider>

            <a
              href={resumeUrl}
              download="Christian-Moises-CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="hero-reveal"
            >
              <button className="cv-btn w-40 h-9 rounded-xl bg-main-color text-white text-xs">
                View CV
              </button>
            </a>
          </div>

          <div className="hero-float-stage relative w-full lg:w-[42%] flex flex-col items-center justify-center">
            <div
              className="relative w-[min(92vw,380px)] sm:w-[min(70vw,400px)] lg:w-full"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="hero-float-shadow absolute -bottom-2 left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-[100%] bg-black/20 blur-xl" />
              <div ref={floatRef} className="relative will-change-transform">
                <div
                  ref={tiltRef}
                  className="relative will-change-transform"
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <img
                    src={HeroAvatar}
                    alt="Christian Moises"
                    className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_28px_35px_rgba(37,37,37,0.22)]"
                    draggable={false}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                  />
                </div>

                <div className="pointer-events-auto absolute bottom-2 sm:bottom-3 left-1/2 z-20 w-[92%] max-w-[300px] -translate-x-1/2 px-1">
                  <NowPlaying />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link
          to="Experience"
          smooth
          offset={-56}
          duration={500}
          className="scroll-hint absolute bottom-1 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 text-xs text-gray-400 dark:text-gray-500 cursor-pointer hover:text-main-color transition-colors"
        >
          <span>Scroll</span>
          <ChevronDown size={16} className="scroll-hint-icon" />
        </Link>
      </div>
    </section>
  );
};

export default Home;
