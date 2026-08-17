import Navbar from '../components/Navbar';
import Intro from '../components/Intro';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <div className="continuous-scroll overflow-x-clip bg-page-bg text-secondary-color">
      <Navbar />
      <Intro />

      {/* Two overlapping layers: the sections slide up over the fixed hero, and the
          contact panel waits underneath the sections until they scroll off it. */}
      <div className="relative z-20">
        <div className="hero-cover-stack relative z-10 bg-page-bg">
          <Experience />
          <Projects />
          <Certificates />
        </div>

        {/* Marks where the contact panel sits in the page flow. The panel itself is
            stuck to the bottom of the screen, so nav links and the active-link spy
            need this marker instead to find the real end of the page. */}
        <div id="Contact" className="h-px" />

        <div className="bg-page-bg md:sticky md:bottom-0">
          <Contact />
        </div>
      </div>
    </div>
  );
}
