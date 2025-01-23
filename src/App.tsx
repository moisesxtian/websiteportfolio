import React from "react"
import Navbar from "./components/Navbar"
import Intro from "./components/Intro";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates"
import './App.css'

function App(){
  return(
    <div>
      <Navbar />
      <Intro />
      <Projects/>
      <Certificates/>
    </div>
    
  );
}
export default App;