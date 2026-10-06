import { EXPERIENCE } from '../data.js'

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <h2 style={{ marginBottom: 40 }}>Experience and education</h2>
        <div className="tl">
          {EXPERIENCE.map(({ title, when, org, points }) => (
            <div className="item" key={title}>
              <header><h3>{title}</h3><span className="when mono">{when}</span></header>
              <div className="org">{org}</div>
              {points && <ul>{points.map(p => <li key={p}>{p}</li>)}</ul>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
