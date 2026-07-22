import { useLayoutEffect, useRef } from 'react'
import Nav from './Nav.jsx'
import PhotoSlot from './PhotoSlot.jsx'
import ModeToggle from './ModeToggle.jsx'
import './Hero.css'

const slots = [
  {
    id: 1,
    positionClass: 'slot-1',
    travelId: 'dreams',
    src: '/images/dreams.png',
    alt: 'Dictionary clipping defining dreams as aspirations and goals for the future',
    sound: 'dreams',
  },
  {
    id: 2,
    positionClass: 'slot-2',
    src: '/images/book.png',
    alt: 'Open grid notebook pages',
    overlay: {
      src: '/images/Stain.png',
      alt: '',
      className: 'book-stain',
    },
  },
  {
    id: 3,
    positionClass: 'slot-3',
    travelId: 'paint',
    src: '/images/Paint.png',
    alt: 'Pixel art paint tool palette',
    sound: 'paint',
  },
  {
    id: 4,
    positionClass: 'slot-4',
    travelId: 'folder',
    src: '/images/folder.png',
    alt: 'Blue folder icon',
    sound: 'folder',
  },
  {
    id: 5,
    positionClass: 'slot-5',
    src: '/images/setup.png',
    alt: 'Setup with laptop, monitor, and keyboard',
    sound: 'page',
  },
  {
    id: 6,
    positionClass: 'slot-6',
    travelId: 'cone',
    src: '/images/VLC Icon.png',
    alt: 'VLC media player cone',
    sound: 'vlc',
  },
  {
    id: 7,
    positionClass: 'slot-7',
    src: '/images/cursor.png',
    alt: 'Pixel cursor pointer',
    sound: 'cursor',
  },
  {
    id: 8,
    positionClass: 'slot-8',
    src: '/images/ctrlZ.png',
    alt: 'Ctrl+Z keyboard shortcut',
  }
]

function Hero({ mode, setMode }) {
  const textBlockRef = useRef(null)
  const photoGridRef = useRef(null)
  const previousLayoutRef = useRef(null)

  const changeMode = (nextMode) => {
    // Record the current layout before React applies the new mode. After the
    // update, the effect below uses those positions to glide the two groups
    // into their already-defined clean/chaos layouts.
    previousLayoutRef.current = [textBlockRef.current, photoGridRef.current]
      .filter(Boolean)
      .map((element) => ({ element, rect: element.getBoundingClientRect() }))

    setMode(nextMode)
  }

  useLayoutEffect(() => {
    const previousLayout = previousLayoutRef.current
    if (!previousLayout) return

    previousLayoutRef.current = null
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    previousLayout.forEach(({ element, rect }) => {
      const nextRect = element.getBoundingClientRect()
      const x = rect.left - nextRect.left
      const y = rect.top - nextRect.top

      if (x || y) {
        element.getAnimations().forEach((animation) => animation.cancel())
        element.animate(
          [
            { transform: `translate(${x}px, ${y}px)` },
            { transform: 'translate(0, 0)' },
          ],
          {
            duration: 620,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          },
        )
      }
    })
  }, [mode])

  return (
    <>
      <Nav />
      <section className="hero">
        <ModeToggle mode={mode} setMode={changeMode} />
        <div className={`hero-inner ${mode}`}>
          <div ref={photoGridRef} className={`photo-grid ${mode}`}>
            {slots.map((slot) => (
              <PhotoSlot key={slot.id} {...slot} />
            ))}
          </div>

          <div ref={textBlockRef} className="text-block">
            <div className="eyebrow">Bengaluru, India </div>
            <h1 className="name">
              Bhavitha
              <br />
              Rohini
              <span className="cursor">&nbsp;</span>
            </h1>
            <div className="stamp">Full Stack Developer</div>
            <p className="tagline">
              Hi, I'm a <strong>AI & Full Stack Developer</strong> — I build intelligent systems, 
              chatbots, and modern web applications. 
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
