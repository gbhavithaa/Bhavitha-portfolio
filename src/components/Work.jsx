import './Work.css'

const timeline = [
  {
    period: 'July 2025 — Present',
    title: 'AI & Full Stack Developer',
    place: 'Capgemini · Bengaluru, India',
    detail: 'Building and contributing to full stack solutions as part of a global technology team.',
    type: 'Experience',
  },
  {
    period: 'September 2024 — June 2025',
    title: 'Frontend Developer',
    place: 'Ola Krutrim· Bengaluru, India',
    detail: 'Worked on developing Ola Krutrim, collaborating with cross-functional teams to deliver high-quality software solutions.',
    type: 'Experience',
  },
  {
    period: '2020 — 2024',
    title: 'B.Tech in Computer Science & Information Technology',
    place: 'BVRIT · Hyderabad, India',
    detail: 'Built the foundations in computer science that continue to shape how I solve problems.',
    type: 'Education',
  },
]

function Work() {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="work-inner">
        <div className="section-label work-label">
          <span>02</span>
          <span>Work</span>
        </div>

        <div className="work-content">
          <header className="work-heading">
            <p className="work-kicker">A few pages from the journey</p>
            <h2 id="work-title">Learning in public, <em>building for real.</em></h2>
          </header>

          <ol className="work-timeline">
            {timeline.map((item) => (
              <li className="work-entry" key={`${item.period}-${item.title}`}>
                <div className="work-date">{item.period}</div>
                <article className="work-card">
                  <span className="work-pin" aria-hidden="true" />
                  <p className="work-type">{item.type}</p>
                  <h3>{item.title}</h3>
                  <p className="work-place">{item.place}</p>
                  <p className="work-detail">{item.detail}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <aside className="work-margin-note" aria-label="Experience summary">
          <span>Now</span>
          <strong>2 years</strong>
          <span>of making ideas work</span>
        </aside>
      </div>
    </section>
  )
}

export default Work
