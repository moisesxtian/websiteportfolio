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
  const [nav, setNav] = useState(true);
  const [activeLink, setActiveLink] = useState<string>('Home');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setNavbarVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setNavbarVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
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
      { root: null, rootMargin: '0px', threshold: 0.45 }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed backdrop-blur-sm bg-opacity-80 bg-white w-full left-1/2 transform -translate-x-1/2 container mx-auto flex justify-between items-center z-50 transition-all duration-300 ${
        navbarVisible ? 'top-0' : '-top-20'
      }`}
    >
      <h1 className="select-none cursor-pointer transition ease-in-out font-poppins font-bold text-3xl text-secondary-color">
        HYX
      </h1>

      <ul className="hidden sm:flex space-x-5 font-medium font-semibold text-sm text-gray-700">
        {navItems.map(({ label, target, id }) => (
          <Link key={label} to={target} spy smooth offset={-40} duration={500}>
            <li
              className={`p-4 cursor-pointer select-none px-4 transition duration-200 ease-in-out ${
                activeLink === id ? 'text-main-color' : 'hover:text-main-color'
              }`}
            >
              {label}
            </li>
          </Link>
        ))}
      </ul>

      <div onClick={handleNav} className="flex sm:hidden p-4">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div
        className={`${
          nav
            ? 'z-0 w-48 fixed right-[-100%] top-16 opacity-0'
            : 'bg-white w-48 fixed right-5 top-16 opacity-100 border border-gray-300 rounded-xl text-sm ease-in-out duration-500'
        } sm:hidden`}
      >
        <ul>
          {navItems.map(({ label, target, id }) => (
            <Link
              key={label}
              to={target}
              spy
              smooth
              offset={-40}
              duration={500}
              onClick={() => setNav(true)}
            >
              <li
                className={`p-4 cursor-pointer select-none px-4 transition duration-200 ease-in-out ${
                  activeLink === id ? 'text-main-color' : 'hover:text-main-color'
                }`}
              >
                {label}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
