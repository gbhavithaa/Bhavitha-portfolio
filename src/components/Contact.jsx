import './Contact.css'

const email = 'gbhavitharohini@gmail.com'

function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner">
        <div className="section-label contact-label">
          <span>04</span>
          <span>Contact</span>
        </div>

        <div className="contact-content">
          <header className="contact-heading">
            <p className="contact-kicker">For ideas, collaborations &amp; hellos</p>
            <h2 id="contact-title">Reach out to me,<br /><em>let’s connect.</em></h2>
          </header>

          <div className="contact-card">
            <span className="contact-tape" aria-hidden="true" />
            <p>
              I’m always interested in thoughtful products, ambitious ideas, and conversations about AI and the web.
            </p>
            <a className="contact-email" href={`mailto:${email}`}>
              <span>Send me an email</span>
              <strong>{email}</strong>
              <b aria-hidden="true">↗</b>
            </a>
          </div>
        </div>

        <aside className="contact-note" aria-label="Elsewhere online">
          <span>Elsewhere</span>
          <a href="https://linkedin.com/gbhavitharohini" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://github.com/gbhavithaa" target="_blank" rel="noreferrer">GitHub ↗</a>
          <p>Based in<br /><strong>Bengaluru, India</strong></p>
        </aside>
      </div>
    </section>
  )
}

export default Contact
