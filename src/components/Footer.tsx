import { FaGithub, FaLinkedin, FaBehanceSquare, FaDiscord, FaFacebook } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-neutral-900 text-white pt-10 sm:pt-12 pb-6 mt-10 sm:mt-16 dark:bg-page-bg dark:border-t dark:border-white/10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <h2 className="text-2xl font-bold font-poppins tracking-wide text-main-color">
            Christian Moises
          </h2>
          <p className="text-gray-400 text-sm max-w-xs text-center md:text-left dark:text-gray-500">
            Passionate developer & designer. Building creative, accessible, and performant web
            experiences.
          </p>
          <div className="flex gap-4 mt-2">
            <a
              href="https://github.com/moisesxtian"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="hover:text-orange-400 transition" size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/christian-moises/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="hover:text-orange-400 transition" size={22} />
            </a>
            <a
              href="https://www.behance.net/hyxchan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Behance"
            >
              <FaBehanceSquare className="hover:text-orange-400 transition" size={22} />
            </a>
            <a
              href="https://discord.com/users/hyx.chan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
            >
              <FaDiscord className="hover:text-orange-400 transition" size={22} />
            </a>
            <a
              href="https://www.facebook.com/moisesxtian"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook className="hover:text-orange-400 transition" size={22} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 text-center text-left md:text-center">
          <span className="uppercase text-xs text-gray-400 tracking-widest mb-1 col-span-2 dark:text-gray-500">
            Quick Links
          </span>
          <a href="#Home" className="hover:text-orange-400 transition text-sm">
            Home
          </a>
          <a href="#Experience" className="hover:text-orange-400 transition text-sm">
            Experience
          </a>
          <a href="#Projects" className="hover:text-orange-400 transition text-sm">
            Projects
          </a>
          <a href="#Certificates" className="hover:text-orange-400 transition text-sm">
            Certificates
          </a>
          <a href="#Contact" className="hover:text-orange-400 transition text-sm col-span-2 text-center">
            Contact
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="uppercase text-xs text-gray-400 tracking-widest mb-1 dark:text-gray-500">
            Contact
          </span>
          <a
            href="mailto:christiansmoises023@gmail.com"
            className="hover:text-orange-400 transition text-sm"
          >
            christiansmoises023@gmail.com
          </a>
          <span className="mt-4 uppercase text-xs text-gray-400 tracking-widest mb-1 dark:text-gray-500">
            Tech Stack
          </span>
          <div className="flex gap-2 flex-wrap justify-center md:justify-end">
            <span className="bg-white/10 px-2 py-1 rounded text-xs text-orange-400 dark:bg-white/[0.06]">
              React
            </span>
            <span className="bg-white/10 px-2 py-1 rounded text-xs text-orange-400 dark:bg-white/[0.06]">
              TypeScript
            </span>
            <span className="bg-white/10 px-2 py-1 rounded text-xs text-orange-400 dark:bg-white/[0.06]">
              TailwindCSS
            </span>
            <span className="bg-white/10 px-2 py-1 rounded text-xs text-orange-400 dark:bg-white/[0.06]">
              Node.js
            </span>
            <span className="bg-white/10 px-2 py-1 rounded text-xs text-orange-400 dark:bg-white/[0.06]">
              Python
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 mt-10 pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Christian Moises. All rights reserved. | Made with{' '}
        <span className="text-orange-400">❤️</span>
      </div>
    </footer>
  );
};

export default Footer;
