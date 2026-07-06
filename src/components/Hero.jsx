import { useState } from 'react'
import Nav from './Nav.jsx'
import PhotoSlot from './PhotoSlot.jsx'
import ModeToggle from './ModeToggle.jsx'
import './Hero.css'

// Add your own photos here: set `src` (import it or point at /public)
// and `alt`. Position/rotation is controlled by `positionClass`,
// defined in Hero.css.
const slots = [
  { id: 1, positionClass: 'slot-1', tab: '01 — process', tape: true, src: '', alt: '' },
  { id: 2, positionClass: 'slot-2', tab: '02 — sketch', tape: false, src: '', alt: '' },
  { id: 3, positionClass: 'slot-3', tab: '03 — shot', tape: true, src: '', alt: '' },
  { id: 4, positionClass: 'slot-4', tab: '04 — screen', tape: true, src: '', alt: '' },
  { id: 5, positionClass: 'slot-5', tab: '05 — detail', tape: false, src: '', alt: '' },
  { id: 6, positionClass: 'slot-6', tab: '06 — moment', tape: false, src: '', alt: '' },
]

function Hero() {
  const [mode, setMode] = useState('chaos') // 'chaos' | 'clean'

  return (
    <>
      <Nav />
      <section className="hero">
        <ModeToggle mode={mode} setMode={setMode} />
        <div className="hero-inner">
          <div className={`photo-grid ${mode}`}>
            {slots.map((slot) => (
              <PhotoSlot key={slot.id} {...slot} />
            ))}
          </div>

          <div className="text-block">
            <div className="eyebrow">Bengaluru, &amp; India </div>
            <h1 className="name">
              Bhavitha
              <br />
              Rohini
              <span className="cursor">&nbsp;</span>
            </h1>
            <div className="stamp">Full Stack Developer</div>
            <p className="tagline">
              I design <strong>interfaces that feel considered</strong> — part research,
              part instinct, part typewriter. Currently shaping products by day, collecting
              little visual ideas by night.
            </p>
            <div className="scroll-cue">
              <span></span>
              Scroll
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
