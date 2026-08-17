import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

const navItems = [
  { label: 'Home', target: 'Home', id: 'Home' },
  { label: 'Experience', target: 'Experience', id: 'Experience' },
  { label: 'Projects', target: 'Projects', id: 'Projects' },
  { label: 'Certificates', target: 'Certificates', id: 'Certificates' },
  { label: 'Contact', target: 'Contact', id: 'Contact' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('Home');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [onHero, setOnHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const atHero = currentScrollY < 40;
      setOnHero(atHero);

      if (atHero) {
        setNavbarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setNavbarVisible(false);
        setMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setNavbarVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const sections = navItems.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.35 }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const linkActive = onHero
    ? 'text-main-color'
    : 'text-main-color bg-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ring-1 ring-white/70 backdrop-blur-md dark:bg-white/[0.12] dark:ring-white/15 dark:shadow-none';

  const linkIdle = onHero
    ? 'hover:text-main-color'
    : 'hover:text-main-color hover:bg-white/30 dark:hover:bg-white/[0.08]';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        navbarVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div
        className={`relative transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          onHero
            ? 'border-b border-transparent bg-transparent'
            : 'nav-glass border-b border-white/50 bg-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65),0_8px_32px_rgba(15,15,15,0.04)] backdrop-blur-[28px] backdrop-saturate-200 dark:border-white/[0.12] dark:bg-white/[0.06] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_32px_rgba(0,0,0,0.25)]'
        }`}
      >
        {!onHero ? (
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 via-white/10 to-transparent dark:from-white/[0.08] dark:via-transparent dark:to-transparent"
            aria-hidden="true"
          />
        ) : null}
        <div className="relative container mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 md:px-10 h-14 sm:h-16">
          <ul className="hidden md:flex items-center gap-1 lg:gap-2 font-semibold text-sm text-gray-700 dark:text-gray-300">
            {navItems.map(({ label, target, id }) => (
              <Link key={label} to={target} spy smooth offset={-56} duration={500}>
                <li
                  className={`cursor-pointer select-none px-3 py-2 rounded-lg transition duration-200 ${
                    activeLink === id ? linkActive : linkIdle
                  }`}
                >
                  {label}
                </li>
              </Link>
            ))}
          </ul>

          <div className="relative z-10 ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme(e);
              }}
              className={`relative z-10 min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-gray-700 dark:text-gray-300 transition-colors touch-manipulation ${
                onHero ? 'hover:text-main-color' : 'hover:bg-white/35 dark:hover:bg-white/[0.08]'
              }`}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className={`md:hidden relative z-10 min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-secondary-color touch-manipulation ${
                onHero ? 'hover:text-main-color' : 'hover:bg-white/35 dark:hover:bg-white/[0.08]'
              }`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div
          className={`relative z-10 md:hidden border-b ${
            onHero
              ? 'border-gray-200/60 bg-page-bg/95 backdrop-blur-md dark:border-gray-700/60'
              : 'nav-glass border-white/50 bg-white/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55),0_16px_48px_rgba(15,15,15,0.08)] backdrop-blur-[28px] backdrop-saturate-200 dark:border-white/[0.12] dark:bg-white/[0.07] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_16px_48px_rgba(0,0,0,0.35)]'
          }`}
        >
          <ul className="relative container mx-auto max-w-7xl px-4 py-2">
            {navItems.map(({ label, target, id }) => (
              <Link
                key={label}
                to={target}
                spy
                smooth
                offset={-56}
                duration={500}
                onClick={() => setMenuOpen(false)}
              >
                <li
                  className={`cursor-pointer select-none px-3 py-3 rounded-lg text-sm font-semibold transition ${
                    activeLink === id
                      ? 'text-main-color'
                      : 'text-gray-700 hover:text-main-color dark:text-gray-300'
                  }`}
                >
                  {label}
                </li>
              </Link>
            ))}
            <li className="mt-1 border-t border-gray-200/70 pt-2 dark:border-gray-700/70">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleTheme(e);
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-gray-700 hover:text-main-color dark:text-gray-300 touch-manipulation"
              >
                <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
