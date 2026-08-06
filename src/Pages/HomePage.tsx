import Navbar from '../components/Navbar';
import Intro from '../components/Intro';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="overflow-x-hidden snap-y snap-proximity bg-page-bg text-secondary-color">
      <Navbar />
      <div className="snap-start">
        <Intro />
      </div>
      <div className="snap-start">
        <Experience />
      </div>
      <div className="snap-start">
        <Projects />
      </div>
      <div className="snap-start">
        <Certificates />
      </div>
      <div className="snap-start">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
