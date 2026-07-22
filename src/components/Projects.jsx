import { useState } from 'react'
import './Projects.css'

// Replace these placeholders with your own project details and links.
const projects = [
  {
    title: 'ShadowSouled Art',
    description: 'Created a website for a famous artist to showcase their artwork and sell their pieces online. The website features a gallery of the artist\'s work, and a blog for sharing news and updates.',
    stack: ['React', 'Tailwind CSS', 'AOS'],
    github: 'https://github.com/gbhavithaa/shadowsouled-art.git',
    live: '#',
  },
  {
    title: 'Bhavitha Portfolio',
    description: 'A personal scrapbook themed portfolio website to showcase my skills, projects, and experience. The website features a clean and modern design, and is fully responsive for all devices.',
    stack: ['React', 'JavaScript', 'CSS'],
    github: 'https://github.com/gbhavithaa/Bhavitha-portfolio.git',
    live: '#',
  },
  {
    title: 'AQuA',
    description: 'Live test case management tool for QA engineers to manage and execute test cases, track defects, and generate reports. The tool features a user-friendly interface and is designed to improve the efficiency of the testing process.',
    stack: ['Docker', 'GO', 'API'],
    github: '#',
    live: '#',
  },
  {
    title: 'AI based SBOM Analysis',
    description: 'A tool that uses AI to analyze software bill of materials (SBOM) and identify potential security vulnerabilities. The tool features a user-friendly interface and is designed to help developers and security teams improve the security of their software.',
    stack: ['x', 'y', 'z'],
    github: '#',
    live: '#',
  },
  {
    title: 'five',
    description: 'scjsncs',
    stack: ['x', 'y', 'z'],
    github: '#',
    live: '#',
  },
  {
    title: 'six',
    description: 'jsdbvhs',
    stack: ['x', 'y', 'z'],
    github: '#',
    live: '#',
  },
]

function ProjectLinks({ project }) {
  return (
    <div className="project-links">
      <a href={project.github} target="_blank" rel="noreferrer">
        GitHub <span aria-hidden="true">↗</span>
      </a>
      <a href={project.live} target="_blank" rel="noreferrer">
        Live site <span aria-hidden="true">↗</span>
      </a>
    </div>
  )
}

function Projects() {
  const [showAll, setShowAll] = useState(false)
  const displayedProjects = showAll ? projects : projects.slice(0, 3)

  return (
    <section className="projects" id="projects" aria-labelledby="projects-title">
      <div className="projects-inner">
        <div className="section-label projects-label">
          <span>04</span>
          <span>Projects</span>
        </div>

        <div className="projects-content">
          <header className="projects-heading">
            <p className="projects-kicker">Things I made along the way</p>
            <h2 id="projects-title">A few ideas, <em>brought to life.</em></h2>
          </header>

          <div className="projects-grid">
            {displayedProjects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <span className="project-number">0{index + 1}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="project-stack" aria-label={`${project.title} technologies`}>
                  {project.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <ProjectLinks project={project} />
              </article>
            ))}
          </div>

          {projects.length > 3 && (
            <button
              className="projects-more"
              type="button"
              onClick={() => setShowAll((current) => !current)}
              aria-expanded={showAll}
            >
              {showAll ? 'Show fewer projects' : `More projects (${projects.length - 3})`}
              <span aria-hidden="true">{showAll ? '↑' : '↓'}</span>
            </button>
          )}
        </div>

        <aside className="projects-note" aria-label="Project note">
          <span>From sketches</span>
          <strong>to live products</strong>
        </aside>
      </div>
    </section>
  )
}

export default Projects
