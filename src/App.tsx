import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Intro />
      <Projects />
      <Certificates />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;