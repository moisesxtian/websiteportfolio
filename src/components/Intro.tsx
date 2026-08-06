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
import { IoTerminal } from 'react-icons/io5';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-scroll';
import { IconContext } from 'react-icons';
import { useSkills } from '../Hooks/useSkills';
import { useResume } from '../Hooks/useResume';
import { getSkillIcon } from '../lib/skillIcons';

const Home = () => {
  const { skills } = useSkills();
  const { resumeUrl } = useResume();
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltTarget = useRef({ rx: 0, ry: 0 });
  const tiltCurrent = useRef({ rx: 0, ry: 0 });

  useEffect(() => {
    let frame = 0;
    const startedAt = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startedAt) / 1000;
      // Soft float only — keep rotation tiny so image text doesn't warp
      const floatY = Math.sin((elapsed * Math.PI * 2) / 5.5) * -10;

      const ease = 0.08;
      tiltCurrent.current.rx += (tiltTarget.current.rx - tiltCurrent.current.rx) * ease;
      tiltCurrent.current.ry += (tiltTarget.current.ry - tiltCurrent.current.ry) * ease;

      const el = cardRef.current;
      if (el) {
        const rx = tiltCurrent.current.rx;
        const ry = tiltCurrent.current.ry;
        el.style.transform = `translate3d(0, ${floatY}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Very subtle tilt so baked-in image text stays stable
    tiltTarget.current = {
      ry: (x - 0.5) * 3,
      rx: (0.5 - y) * 2,
    };
  };

  const handleMouseLeave = () => {
    tiltTarget.current = { rx: 0, ry: 0 };
  };

  const renderSkillChip = (
    skill: { id: string; name: string; icon_key: string | null },
    keyPrefix: string
  ) => {
    const Icon = getSkillIcon(skill.icon_key);
    return (
      <div key={`${keyPrefix}-${skill.id}`} className="flex p-1">
        <div className="skill-chip flex gap-2 rounded-lg p-1.5 border border-gray-300 text-xs items-center whitespace-nowrap bg-white/80">
          <Icon size={15} />
          <span>{skill.name}</span>
        </div>
      </div>
    );
  };

  return (
    <section id="Home" className="section-page section-cut font-poppins text-secondary-color">
      <div className="section-page-inner relative">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-6 w-full">
          {/* Copy */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4 w-full md:w-1/2">
            <h2 className="hero-reveal text-sm font-medium text-secondary-color" style={{ animationDelay: '0ms' }}>
              I AM
            </h2>
            <h1
              className="hero-reveal text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight"
              style={{ animationDelay: '80ms' }}
            >
              Christian Moises
            </h1>
            <h3 className="hero-reveal text-sm sm:text-base" style={{ animationDelay: '140ms' }}>
              a {' '}
              <span className="font-bold text-main-color">
                <ReactTyped
                  strings={['Software Developer', 'Web Developer', 'Data Scientist']}
                  typeSpeed={40}
                  backSpeed={40}
                  loop
                />
              </span>{' '}
              from the Philippines.
            </h3>

            <div
              className="hero-reveal flex flex-wrap justify-center md:justify-start gap-3 max-w-xl"
              style={{ animationDelay: '200ms' }}
            >
              {[
                'Web Developer',
                'App Development',
                'Data Science',
                'Machine Learning',
                'Graphic Designer',
              ].map((role) => (
                <div
                  key={role}
                  className="role-pill flex items-center space-x-2 rounded-full border border-gray-300 px-3 py-1 text-xs font-light bg-white/70"
                >
                  <span className="block w-2 h-2 bg-main-color rounded-full" />
                  <span>{role}</span>
                </div>
              ))}
            </div>

            <IconContext.Provider
              value={{ size: '28', className: 'transition duration-300' }}
            >
              <div
                className="hero-reveal flex justify-center md:justify-start gap-3 sm:gap-4 border border-gray-200 px-5 py-2 rounded-full bg-white/60"
                style={{ animationDelay: '260ms' }}
              >
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
                    className="social-icon text-[#494545]"
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
              style={{ animationDelay: '320ms' }}
            >
              <button className="cv-btn w-40 h-9 rounded-xl bg-main-color text-white text-xs">
                View CV
              </button>
            </a>

            <div
              className="hero-reveal flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1"
              style={{ animationDelay: '380ms' }}
            >
              <IoTerminal size={36} color="#F97316" className="terminal-pulse" />
              <div className="text-left">
                <h1 className="text-main-color font-bold">Technologies & Languages</h1>
                <p className="text-sm text-gray-600">Technologies I use and have worked with.</p>
              </div>
            </div>

            <IconContext.Provider value={{ color: '#F97316' }}>
              <div
                className="hero-reveal flex w-full md:w-[620px] overflow-hidden group MyGradient"
                style={{ animationDelay: '440ms' }}
              >
                <div className="flex max-w-none animate-loop-scroll group-hover:paused">
                  {skills.map((skill) => renderSkillChip(skill, 'a'))}
                </div>
                <div
                  className="flex max-w-none animate-loop-scroll group-hover:paused"
                  aria-hidden="true"
                >
                  {skills.map((skill) => renderSkillChip(skill, 'b'))}
                </div>
              </div>
            </IconContext.Provider>
          </div>

          {/* Plain floating image — no card chrome */}
          <div className="hero-float-stage relative w-full md:w-[42%] flex items-center justify-center">
            <div
              className="relative w-[min(100%,380px)] md:w-full"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="hero-float-shadow absolute -bottom-2 left-1/2 h-6 w-2/3 rounded-[100%] bg-black/20 blur-xl" />
              <div
                ref={cardRef}
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
            </div>
          </div>
        </div>

        <Link
          to="Projects"
          smooth
          offset={-40}
          duration={500}
          className="scroll-hint absolute bottom-0 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-xs text-gray-400 cursor-pointer hover:text-main-color transition-colors"
        >
          <span>Scroll</span>
          <ChevronDown size={16} className="scroll-hint-icon" />
        </Link>
      </div>
    </section>
  );
};

export default Home;
