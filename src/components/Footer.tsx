import { FaGithub, FaLinkedin, FaBehanceSquare, FaDiscord, FaFacebook } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white pt-12 pb-6 mt-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left: Branding & Social */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h2 className="text-2xl font-bold font-poppins tracking-wide text-main-color">Christian Moises</h2>
          <p className="text-gray-400 text-sm max-w-xs text-center md:text-left">
            Passionate developer & designer. Building creative, accessible, and performant web experiences.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub className="hover:text-orange-400 transition" size={22} />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="hover:text-orange-400 transition" size={22} />
            </a>
            <a href="https://behance.net/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Behance">
              <FaBehanceSquare className="hover:text-orange-400 transition" size={22} />
            </a>
            <a href="https://discord.com/users/yourdiscordid" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <FaDiscord className="hover:text-orange-400 transition" size={22} />
            </a>
            <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook className="hover:text-orange-400 transition" size={22} />
            </a>
          </div>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-col items-center gap-2">
          <span className="uppercase text-xs text-gray-400 tracking-widest mb-1">Quick Links</span>
          <a href="#Intro" className="hover:text-orange-400 transition text-sm">Home</a>
          <a href="#Projects" className="hover:text-orange-400 transition text-sm">Projects</a>
          <a href="#Certificates" className="hover:text-orange-400 transition text-sm">Certificates</a>
          <a href="#Experience" className="hover:text-orange-400 transition text-sm">Experience</a>
          <a href="#Contact" className="hover:text-orange-400 transition text-sm">Contact</a>
        </div>

        {/* Right: Contact & Tech */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="uppercase text-xs text-gray-400 tracking-widest mb-1">Contact</span>
          <a href="mailto:christiansmoises023@gmail.com" className="hover:text-orange-400 transition text-sm">
            christiansmoises023@gmail.com
          </a>
          <span className="mt-4 uppercase text-xs text-gray-400 tracking-widest mb-1">Tech Stack</span>
          <div className="flex gap-2 flex-wrap justify-center md:justify-end">
            <span className="bg-gray-800 px-2 py-1 rounded text-xs text-orange-400">React</span>
            <span className="bg-gray-800 px-2 py-1 rounded text-xs text-orange-400">TypeScript</span>
            <span className="bg-gray-800 px-2 py-1 rounded text-xs text-orange-400">TailwindCSS</span>
            <span className="bg-gray-800 px-2 py-1 rounded text-xs text-orange-400">Node.js</span>
            <span className="bg-gray-800 px-2 py-1 rounded text-xs text-orange-400">Python</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Christian Moises. All rights reserved. | Made with <span className="text-orange-400">❤️</span>
      </div>
    </footer>
  );
};

export default Footer;