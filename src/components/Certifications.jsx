import { useRef, useState } from 'react'
import { SwipeCards } from '@/components/ui/image-stack-carousel'
import CertModal from './CertModal.jsx'
import { VIEWABLE_CERTS, asset } from '../data.js'

const CARDS = VIEWABLE_CERTS.map(c => ({
  id: c.title,
  img: asset(c.image),
  alt: `${c.title} certificate from ${c.issuer}`,
}))
const pad = n => String(n).padStart(2, '0')

export default function Certifications() {
  const stack = useRef(null)
  const [front, setFront] = useState(VIEWABLE_CERTS[0].title)
  const [zoom, setZoom] = useState(null)
  const index = Math.max(0, VIEWABLE_CERTS.findIndex(c => c.title === front))
  const total = VIEWABLE_CERTS.length

  return (
    <section id="certifications">
      <div className="wrap">
        <h2>Certifications</h2>
        <p className="lead">Courses and credentials I've completed. Swipe the stack, use the arrows, or pick one from the list.</p>

        <div className="certs-grid">
          <div className="certs-stage">
            <SwipeCards
              ref={stack}
              cards={CARDS}
              onChange={setFront}
              settings={{
                width: 460, height: 330, radius: 14, stackRotation: 4, stackScale: 0.04,
                maxVisible: 4, fit: 'contain', mobileBreakpoint: 520, mobileScale: 0.66,
              }}
            />
            <div className="certs-controls">
              <button className="btn ico" onClick={() => stack.current?.prev()} aria-label="Previous certificate">←</button>
              <span aria-live="polite">{pad(index + 1)} / {pad(total)}</span>
              <button className="btn ico" onClick={() => stack.current?.next()} aria-label="Next certificate">→</button>
            </div>
          </div>

          <ol className="certs-list">
            {VIEWABLE_CERTS.map((c, i) => {
              const active = i === index
              return (
                <li key={c.title}>
                  <button className="cert-row" aria-current={active} onClick={() => stack.current?.goTo(c.title)}>
                    <span className="idx">{pad(i + 1)}</span>
                    <span><b>{c.title}</b><small>{c.issuer}{c.date ? ` · ${c.date}` : ''}</small></span>
                    <span className="arrow" aria-hidden="true">{active ? '●' : '○'}</span>
                  </button>
                  {active && (
                    <div className="cert-detail">
                      <button className="btn" onClick={() => setZoom(i)}>View full size</button>
                      {c.verify && <a className="btn fill" href={c.verify} target="_blank" rel="noopener noreferrer">Verify</a>}
                    </div>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
        <CertModal index={zoom} setIndex={setZoom} />
      </div>
    </section>
  )
}
