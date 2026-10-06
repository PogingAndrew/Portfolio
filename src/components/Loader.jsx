import { useEffect, useRef, useState } from 'react'
import { TechLogo } from '@/components/ui/tech-logos'

// Intro / loading screen, adapted from the structure of matthieugivelet.com:
// a % counter, the name split into two groups of letters with a slot between them,
// letters rising in one by one, the slot cycling through React, Node.js and Supabase, then the screen lifting away
// so the hero's own entrance animation can play.
const LEFT = 'BART'
const RIGHT = 'CAYANAN'
const TECH = ['React', 'Node.js', 'Supabase'] // strongest skills, shown in the slot
const SHOW_FROM = 1300 // ms: the slot is open by now, so the first logo appears
const PER_LOGO = 750   // ms each logo stays on screen
const DURATION = SHOW_FROM + PER_LOGO * 3 // counter reaches 100 as the last logo finishes

const ease = t => 0.5 - Math.cos(Math.PI * t) / 2 // gentle in and out, so the % doesn't race ahead

export default function Loader({ onReveal, onDone }) {
  const [pct, setPct] = useState(0)
  const [shot, setShot] = useState(-1) // -1 until the slot has opened
  const [phase, setPhase] = useState('in') // in -> out
  const doneRef = useRef(onDone)
  doneRef.current = onDone
  const revealRef = useRef(onReveal)
  revealRef.current = onReveal

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { revealRef.current(); doneRef.current(); return }

    // wait for fonts so the letters don't jump when they load
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    let raf = 0, start = 0, cancelled = false, t1 = 0, t2 = 0
    fontsReady.then(() => {
      if (cancelled) return
      const tick = now => {
        if (!start) start = now
        const elapsed = now - start
        const p = Math.min(1, elapsed / DURATION)
        setPct(Math.round(ease(p) * 100))
        setShot(elapsed < SHOW_FROM ? -1 : Math.min(TECH.length - 1, Math.floor((elapsed - SHOW_FROM) / PER_LOGO)))
        if (p < 1) raf = requestAnimationFrame(tick)
        else {
          t1 = setTimeout(() => { setPhase('out'); revealRef.current() }, 350)
          t2 = setTimeout(() => doneRef.current(), 350 + 1100)
        }
      }
      raf = requestAnimationFrame(tick)
    })
    return () => { cancelled = true; cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const letters = (word, base) =>
    word.split('').map((c, i) => (
      <span className="ld-mask" key={i}>
        <span className="ld-letter" style={{ '--i': base + i }}>{c}</span>
      </span>
    ))

  return (
    <div className="loader" data-phase={phase} role="status" aria-label={`Loading ${pct}%`}>
      <div className="ld-count" aria-hidden="true">{pct}%</div>
      <div className="ld-name" aria-hidden="true">
        <span className="ld-word">{letters(LEFT, 0)}</span>
        <span className="ld-slot">
          {TECH.map((t, i) => (
            <span className="ld-tech" key={t} data-on={i === shot ? '' : undefined}>
              <TechLogo name={t} size={96} />
            </span>
          ))}
        </span>
        <span className="ld-word">{letters(RIGHT, LEFT.length)}</span>
      </div>
      <div className="ld-foot" aria-hidden="true"><span>Portfolio</span><span key={shot} className="ld-label">{TECH[shot] ?? ''}</span><span>©2026</span></div>
    </div>
  )
}
