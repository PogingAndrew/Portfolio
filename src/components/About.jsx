import { STRENGTHS } from '../data.js'

const FACTS = [
  ['Location', 'Angeles City, PH'],
  ['Studying', 'BS IT, Web Development'],
  ['Languages', 'English, Tagalog, Kapampangan'],
  ['Building with', 'React, Vite, Supabase'],
  ['Career goal', 'Senior Full-Stack Dev'],
]

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <h2>About me</h2>
        <div className="two">
          <div>
            <p>I'm a third-year IT student specializing in Web Development at Holy Angel University in Angeles City, Pampanga. I enjoy turning a design into something people can click, scroll and use.</p>
            <p>My coursework covers JavaScript, PHP, Python, Java, Angular and Dart. These days I build my projects with React and Vite, and use Supabase for the database, authentication and APIs behind them. I've also built an e-commerce site with a database, responsive personal sites, Angular projects and Figma components, and I'm a member of the Amazon Web Services Learning Club.</p>
            <p>I work well under pressure, collaborate easily in a team, and pick up new tools quickly.</p>
            <div className="soft" aria-label="Strengths">
              {STRENGTHS.map(s => <span key={s}>{s}</span>)}
            </div>
          </div>
          <dl className="facts" style={{ margin: 0 }}>
            {FACTS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </div>
      </div>
    </section>
  )
}
