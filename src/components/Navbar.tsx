import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const navItems = [
  { label: 'Home', target: 'Home', id: 'Home' },
  { label: 'Experience', target: 'Experience', id: 'Experience' },
  { label: 'Projects', target: 'Projects', id: 'Projects' },
  { label: 'Certificates', target: 'Certificates', id: 'Certificates' },
  { label: 'Contact', target: 'Contact', id: 'Contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('Home');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setNavbarVisible(false);
        setMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setNavbarVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        navbarVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="border-b border-gray-200/70 bg-white/85 backdrop-blur-md">
        <div className="container mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 md:px-10 h-14 sm:h-16">
          <h1 className="select-none font-poppins font-bold text-2xl sm:text-3xl text-secondary-color">
            CM
          </h1>

          <ul className="hidden md:flex items-center gap-1 lg:gap-2 font-semibold text-sm text-gray-700">
            {navItems.map(({ label, target, id }) => (
              <Link key={label} to={target} spy smooth offset={-56} duration={500}>
                <li
                  className={`cursor-pointer select-none px-3 py-2 rounded-lg transition duration-200 ${
                    activeLink === id
                      ? 'text-main-color bg-orange-50'
                      : 'hover:text-main-color hover:bg-gray-50'
                  }`}
                >
                  {label}
                </li>
              </Link>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="md:hidden border-b border-gray-200 bg-white shadow-lg">
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
                  className={`cursor-pointer select-none px-3 py-3 rounded-lg text-sm font-semibold transition ${
                    activeLink === id ? 'text-main-color bg-orange-50' : 'text-gray-700'
                  }`}
                >
                  {label}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
