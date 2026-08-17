import { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ThemeToggle from '../components/ThemeToggle';
import Intro from '../components/Intro';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import ChatBot from '../components/ChatBot';

export default function HomePage() {
  const [heroReady, setHeroReady] = useState(false);

  const handleBootReady = useCallback(() => {
    setHeroReady(true);
  }, []);

  useEffect(() => {
    if (heroReady) return;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [heroReady]);

  return (
    <div className="continuous-scroll overflow-x-clip bg-page-bg text-secondary-color">
      <Navbar hidden={!heroReady} />
      <ThemeToggle />
      <Intro onBootReady={handleBootReady} />

      {/* Overlapping layers: the stack slides up over the fixed hero, Work
          Experience covers Projects from the bottom, and the contact panel
          waits underneath until the sections scroll off it. */}
      <div className="relative z-20">
        <div className="hero-cover-stack relative z-10 bg-page-bg">
          <div className="section-pin">
            <Projects />
          </div>
          <div className="section-overlay">
            <Experience />
            <Certificates />
          </div>
        </div>

        {/* Marks where the contact panel sits in the page flow. The panel itself is
            stuck to the bottom of the screen, so nav links and the active-link spy
            need this marker instead to find the real end of the page. */}
        <div id="Contact" className="h-px" />

        <div className="bg-page-bg md:sticky md:bottom-0">
          <Contact />
        </div>
      </div>

      <ChatBot />
    </div>
  );
}
