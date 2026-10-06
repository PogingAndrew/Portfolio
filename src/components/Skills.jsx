import {
  Slideshow,
  SlideshowIndicator,
  SlideshowImageContainer,
  SlideshowImageWrap,
} from '@/components/ui/slideshow'
import { TechLogo } from '@/components/ui/tech-logos'
import { SKILL_GROUPS } from '../data.js'

const pad = n => String(n).padStart(2, '0')

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <h2>Skills</h2>
        <p className="lead">The languages and tools I use in coursework and personal projects. Hover or tap an area to see its stack.</p>

        <Slideshow className="sk-grid">
          <div className="sk-list">
            {SKILL_GROUPS.map((g, i) => (
              <div className="sk-row" key={g.id}>
                <span className="sk-idx mono">{pad(i + 1)}</span>
                <SlideshowIndicator index={i}>{g.title}</SlideshowIndicator>
                <span className="sk-count mono">{pad(g.items.length)}</span>
              </div>
            ))}
          </div>

          <SlideshowImageContainer className="sk-panel">
            {SKILL_GROUPS.map((g, i) => (
              <SlideshowImageWrap key={g.id} index={i} className="sk-slide">
                <p className="sk-blurb">{g.blurb}</p>
                <ul className="sk-logos">
                  {g.items.map(([name, note]) => (
                    <li key={name} className="sk-logo">
                      <TechLogo name={name} size={52} />
                      <b>{name}</b>
                      <small>{note}</small>
                    </li>
                  ))}
                </ul>
              </SlideshowImageWrap>
            ))}
          </SlideshowImageContainer>
        </Slideshow>
      </div>
    </section>
  )
}
