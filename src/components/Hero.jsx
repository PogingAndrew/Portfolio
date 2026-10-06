import { PoemAnimation } from '@/components/ui/poem-animation'
import { asset } from '../data.js'

const FACTS = [
  ['Based in', 'Angeles City, PH'],
  ['Studying', 'IT Web Development'],
  ['Stack', 'React · Vite · Supabase'],
]

export default function Hero({ onResume }) {
  return (
    <section className="hero" id="top">
      {/* The sliding letters are decorative, so the real heading stays available to screen readers and search engines. */}
      <h1 className="sr-only">Bart Andrew Cayanan</h1>
      <PoemAnimation
        className="hero-stage"
        text="BART ANDREW CAYANAN"
        imageUrl={asset('bart-cutout.webp')}
        label="Bart Andrew Cayanan, shown seated, in front of his name sliding across three walls"
      />
      <div className="hero-fade" aria-hidden="true" />

      <div className="wrap hero-top">
        <span className="status"><span className="dot" />Open to internships and junior roles</span>
      </div>

      <div className="wrap hero-bottom">
        <div className="hero-copy">
          <p className="role">Web developer who builds responsive, user-focused interfaces.</p>
          <p className="lead">IT Web Development student at Holy Angel University, aiming to grow into a Senior Full-Stack Web Developer.</p>
          <div className="row">
            <a className="btn fill" href="#work">See my projects</a>
            <button className="btn" onClick={onResume}>View resume</button>
            <a className="btn" href="#contact">Get in touch</a>
          </div>
        </div>
        <dl className="hero-facts">
          {FACTS.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
        </dl>
      </div>

      <a className="hero-scroll" href="#about" aria-label="Scroll to About"><span /></a>
    </section>
  )
}
