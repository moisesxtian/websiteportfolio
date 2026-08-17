import Navbar from '../components/Navbar';
import Intro from '../components/Intro';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="continuous-scroll overflow-x-hidden bg-page-bg text-secondary-color">
      <Navbar />
      <Intro />

      <div className="hero-cover-stack relative z-20 bg-page-bg">
        <Experience />
        <Projects />
        <Certificates />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
