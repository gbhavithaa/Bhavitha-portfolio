import { useEffect, useRef, useState } from 'react'
import './TechStack.css'

const technologies = [
  'React', 'JavaScript', 'TypeScript', 'HTML / CSS', 'Node.js', 'Express',
  'Python', 'Git', 'Docker', 'SQL', 'MongoDB', 'AI / LLM APIs',
]

function TechStack() {
  const sectionRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const folderTarget = section?.querySelector('.tech-folder-target')
    if (!folderTarget) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsOpen(true)
        observer.disconnect()
      }
    // The real folder remains invisible until the travelling copy reaches
    // this landing point. This creates a hand-off rather than two folders.
    }, { rootMargin: '-5% 0px -90% 0px', threshold: 0 })

    observer.observe(folderTarget)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className={`tech-stack ${isOpen ? 'is-open' : ''}`} id="tech-stack" aria-labelledby="tech-stack-title">
      <div className="tech-stack-inner">
        <div className="section-label tech-stack-label">
          <span>03</span>
          <span>Toolbox</span>
        </div>

        <div className="tech-stack-content">
          <header className="tech-stack-heading">
            <p>What I build with</p>
            <h2 id="tech-stack-title">A folder full of <em>favourite tools.</em></h2>
          </header>

          <div className="tech-folder-stage">
            <span className="tech-folder-target" data-artifact-target="folder" data-artifact-rotation="-4" aria-hidden="true" />
            <img className="tech-folder" src="/images/folder.png" alt="" aria-hidden="true" />
            <div className="tech-paper" aria-label="Technology stack">
              <span className="tech-paper-tape" aria-hidden="true" />
              <p>Selected tools &amp; technologies</p>
              <ul className="tech-tags">
                {technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <aside className="tech-note" aria-label="Technology stack note">
          <span>Always learning</span>
          <strong>one tool at a time</strong>
        </aside>
      </div>
    </section>
  )
}

export default TechStack
