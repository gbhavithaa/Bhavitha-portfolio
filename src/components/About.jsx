import './About.css'

function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-inner">
        <div className="section-label">
          <span>01</span>
          <span>About me</span>
          <div className="about-label-landings" aria-hidden="true">
            <span className="about-landing about-dreams" data-artifact-target="dreams" data-artifact-rotation="-7" />
            <span className="about-landing about-paint" data-artifact-target="paint" data-artifact-rotation="7" />
            <span className="about-landing about-cone" data-artifact-target="cone" data-artifact-rotation="-10" />
          </div>
        </div>

        <div className="about-paper">
          <span className="paper-tape" aria-hidden="true" />
          <p className="about-kicker">A little note from my desk</p>
          <h2 id="about-title">Building with curiosity, <em>one idea at a time.</em></h2>
          <div className="about-copy">
            <p>
              I’m Bhavitha, an AI and full stack developer based in Bengaluru.
            </p>
            <p>
              I enjoy turning complex ideas into useful, human-friendly digital experiences.
            </p>
            <p>
              From intelligent chatbots to polished web applications, I like working where logic meets design.
            </p>
            <p>
              I’m always learning, experimenting, and looking for the next problem worth solving.
            </p>
          </div>

          <div className="about-signoff">
            <span>Currently collecting</span>
            <strong>ideas, bugs &amp; good coffee</strong>
          </div>
        </div>

        <aside className="about-notes" aria-label="Quick facts">
          <p className="notes-title">Quick notes</p>
          <dl>
            <div>
              <dt>Based in</dt>
              <dd>Bengaluru, India</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>AI + full stack</dd>
            </div>
            <div>
              <dt>Approach</dt>
              <dd>Curious by default</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}

export default About
