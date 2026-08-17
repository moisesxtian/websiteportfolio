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

  const barStyle = onHero
    ? 'bg-transparent'
    : 'bg-white/80 backdrop-blur-md border-b border-black/5 dark:bg-neutral-950/80 dark:border-white/10';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        navbarVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className={`transition-colors duration-300 ${barStyle}`}>
        <div className="relative container mx-auto max-w-7xl flex items-center justify-end px-4 sm:px-6 md:px-10 h-14 sm:h-16">
          <ul className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:gap-2 font-semibold text-sm text-gray-700 dark:text-gray-300">
            {navItems.map(({ label, target, id }) => (
              <Link key={label} to={target} spy smooth offset={-56} duration={500}>
                <li
                  className={`cursor-pointer select-none px-3 py-2 transition-colors duration-200 ${
                    activeLink === id ? 'text-main-color' : 'hover:text-main-color'
                  }`}
                >
                  {label}
                </li>
              </Link>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme(e);
              }}
              className="min-h-11 min-w-11 inline-flex items-center justify-center text-gray-700 transition-colors hover:text-main-color dark:text-gray-300 touch-manipulation"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden min-h-11 min-w-11 inline-flex items-center justify-center text-secondary-color transition-colors hover:text-main-color touch-manipulation"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div className="md:hidden border-b border-black/5 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-neutral-950/90">
          <ul className="container mx-auto max-w-7xl px-4 py-2">
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
                  className={`cursor-pointer select-none px-3 py-3 text-sm font-semibold transition-colors ${
                    activeLink === id
                      ? 'text-main-color'
                      : 'text-gray-700 hover:text-main-color dark:text-gray-300'
                  }`}
                >
                  {label}
                </li>
              </Link>
            ))}
            <li className="mt-1 border-t border-black/5 pt-2 dark:border-white/10">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleTheme(e);
                }}
                className="flex w-full items-center justify-between px-3 py-3 text-sm font-semibold text-gray-700 transition-colors hover:text-main-color dark:text-gray-300 touch-manipulation"
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
