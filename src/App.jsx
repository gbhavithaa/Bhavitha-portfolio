import { useState } from 'react'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Work from './components/Work.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import TravelingArtifacts from './components/TravelingArtifacts.jsx'

function App() {
  const [mode, setMode] = useState('chaos')

  return (
    <main>
      <Hero mode={mode} setMode={setMode} />
      <About />
      <Work />
      <Projects />
      <Contact />
      <TravelingArtifacts mode={mode} />
    </main>
  )
}

export default App
