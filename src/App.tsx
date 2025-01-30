
import Navbar from "./components/Navbar"
import Intro from "./components/Intro";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates"
import Experience from "./components/Experience"
import Contact from "./components/Contact"


function App(){
  return(
    <div>
      <Navbar />
      <Intro />
      <Projects/>
      <Certificates/>
      <Experience/>
      <Contact/>
    </div>
    
  );
}
export default App;