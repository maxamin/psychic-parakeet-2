
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Nav from "./components/Nav"
import Hero from "./components/Hero"
import About from "./components/About"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import './App.css'

function App() {
  return(
    <div>
    <Nav/>
    <div id='Home'>
    <Hero/>
    </div>
    <br/>
    <br/>
    <div id="about">
    <About/>
    </div>
   
    <br/>
    <br/>
    <div id="Projects">
    <Projects/>
    </div>
    <br/>
    <br/>
    <div id="Contact">
    <Contact/>
    <ToastContainer />
    </div>
    <Footer/>
    </div>

  )
 
}

export default App
