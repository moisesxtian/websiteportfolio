import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(true);
  const [activeLink, setActiveLink] = useState<string>('Intro'); // Explicit type for activeLink
  const [lastScrollY, setLastScrollY] = useState(0); // Track the last scroll position
  const [navbarVisible, setNavbarVisible] = useState(true); // Navbar visibility state

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLinkClick = (section: string) => {
    setActiveLink(section); // Update active link on click
  };

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;

      // If scrolling down and current scroll position is greater than the last scroll
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Hide navbar
        setNavbarVisible(false);
      }
      // If scrolling up and current scroll position is less than the last scroll
      else if (currentScrollY < lastScrollY) {
        // Show navbar
        setNavbarVisible(true);
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]); // Dependency on lastScrollY to track scroll changes

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 container mx-auto flex justify-between items-center bg-white z-50 transition-all duration-300 ${
        navbarVisible ? 'top-0' : '-top-20' // Hide navbar when scrolling down
      }`}
    >
      <h1 className="select-none cursor-pointer transition ease-in-out font-poppins font-bold text-3xl text-secondary-color">
        HYX
      </h1>

      <ul className="hidden sm:flex space-x-5 font-medium font-semibold text-sm text-gray-700">
        <Link to="Intro" spy={true} smooth={true} offset={50} duration={500}>
          <li
            className={`p-4 cursor-pointer select-none px-4 transition duration-200 ease-in-out ${
              activeLink === 'Intro' ? 'text-main-color' : 'hover:text-main-color'
            }`}
            onClick={() => handleLinkClick('Intro')}
          >
            Home
          </li>
        </Link>
        <Link to="Projects" spy={true} smooth={true} offset={50} duration={500}>
          <li
            className={`p-4 cursor-pointer select-none px-4 transition duration-200 ease-in-out ${
              activeLink === 'Projects' ? 'text-main-color' : 'hover:text-main-color'
            }`}
            onClick={() => handleLinkClick('Projects')}
          >
            Projects
          </li>
        </Link>
        <Link to="Certificates" spy={true} smooth={true} offset={50} duration={500}>
          <li
            className={`p-4 cursor-pointer select-none px-4 transition duration-200 ease-in-out ${
              activeLink === 'Certificates' ? 'text-main-color' : 'hover:text-main-color'
            }`}
            onClick={() => handleLinkClick('Certificates')}
          >
            Certificates
          </li>
        </Link>
        <Link to="About" spy={true} smooth={true} offset={50} duration={500}>
          <li
            className={`p-4 cursor-pointer select-none px-4 transition duration-200 ease-in-out ${
              activeLink === 'About' ? 'text-main-color' : 'hover:text-main-color'
            }`}
            onClick={() => handleLinkClick('About')}
          >
            About
          </li>
        </Link>
        <Link to="Contact" spy={true} smooth={true} offset={50} duration={500}>
          <li
            className={`p-4 cursor-pointer select-none px-4 transition duration-200 ease-in-out ${
              activeLink === 'Contact' ? 'text-main-color' : 'hover:text-main-color'
            }`}
            onClick={() => handleLinkClick('Contact')}
          >
            Contact
          </li>
        </Link>
      </ul>

      <div onClick={handleNav} className="flex sm:hidden p-4">
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div
        className={
          nav
            ? 'z-0 w-48 fixed right-[-100%] top-16 opacity-0 border-s border bg-white border-gray-300 rounded-xl text-sm sm:hidden text-sm ease-in-out duration-500'
            : 'bg-white w-48 fixed right-5 top-16 opacity-100 border-s border border-gray-300 rounded-xl text-sm sm:hidden text-sm ease-in-out duration-500'
        }
      >
        <ul>
          <Link to="Intro" spy={true} smooth={true} offset={50} duration={500}>
            <li
              className={`p-4 cursor-pointer select-none px-4 transition duration-200 ease-in-out ${
                activeLink === 'Intro' ? 'text-main-color' : 'hover:text-main-color'
              }`}
              onClick={() => handleLinkClick('Intro')}
            >
              Home
            </li>
          </Link>
          <Link to="Projects" spy={true} smooth={true} offset={50} duration={500}>
            <li
              className={`p-4 cursor-pointer select-none px-4 transition duration-200 ease-in-out ${
                activeLink === 'Projects' ? 'text-main-color' : 'hover:text-main-color'
              }`}
              onClick={() => handleLinkClick('Projects')}
            >
              Projects
            </li>
          </Link>
          <Link to="Certificates" spy={true} smooth={true} offset={50} duration={500}>
            <li
              className={`p-4 cursor-pointer select-none px-4 transition duration-200 ease-in-out ${
                activeLink === 'Certificates' ? 'text-main-color' : 'hover:text-main-color'
              }`}
              onClick={() => handleLinkClick('Certificates')}
            >
              Certificates
            </li>
          </Link>
          <Link to="About" spy={true} smooth={true} offset={50} duration={500}>
            <li
              className={`p-4 cursor-pointer select-none px-4 transition duration-200 ease-in-out ${
                activeLink === 'About' ? 'text-main-color' : 'hover:text-main-color'
              }`}
              onClick={() => handleLinkClick('About')}
            >
              About
            </li>
          </Link>
          <Link to="Contact" spy={true} smooth={true} offset={50} duration={500}>
            <li
              className={`p-4 cursor-pointer select-none px-4 transition duration-200 ease-in-out ${
                activeLink === 'Contact' ? 'text-main-color' : 'hover:text-main-color'
              }`}
              onClick={() => handleLinkClick('Contact')}
            >
              Contact
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
