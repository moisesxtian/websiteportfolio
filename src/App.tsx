import React from "react"
import Navbar from "./components/Navbar"
import Intro from "./components/Intro";
import Projects from "./components/Projects";
import './App.css'

function App(){
  return(
    <div>
      <Navbar />
      <Intro />
      <Projects/>
    </div>
    
  );
}
export default App;