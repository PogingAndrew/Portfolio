import { useEffect, useState } from 'react'

// Each line is a list of [className, text] tokens.
const LINES = [
  [['k', 'const '], ['', 'developer = {']],
  [['', '  name: '], ['s', '"Bart Andrew D. Cayanan"'], ['', ',']],
  [['', '  role: '], ['s', '"Web Developer"'], ['', ',']],
  [['', '  school: '], ['s', '"Holy Angel University"'], ['', ',']],
  [['', '  stack: ['], ['s', '"JavaScript"'], ['', ', '], ['s', '"PHP"'], ['', ', '], ['s', '"Angular"'], ['', '],']],
  [['', '  learning: ['], ['s', '"AWS"'], ['', ', '], ['s', '"Dart"'], ['', '],']],
  [['', '  goal: '], ['s', '"Senior Full-Stack Developer"'], ['', ',']],
  [['', '  openToWork: '], ['n', 'true']],
  [['', '};']],
]
const TOTAL = LINES.reduce((a, l) => a + l.reduce((b, p) => b + p[1].length, 0) + 1, 0)

export default function CodeCard() {
  const [n, setN] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(TOTAL); return }
    const t = setInterval(() => setN(v => (v >= TOTAL ? v : v + 2)), 28)
    return () => clearInterval(t)
  }, [])

  let left = n
  return (
    <div className="card-code" aria-label="Profile summary as code">
      <div className="bar"><i /><i /><i /><span className="mono">profile.js</span></div>
      <pre>
        {LINES.map((line, i) => {
          const parts = line.map(([cls, text], j) => {
            const take = Math.max(0, Math.min(left, text.length))
            left -= take
            return <span key={j} className={cls}>{text.slice(0, take)}</span>
          })
          left = Math.max(0, left - 1)
          return <div key={i}>{parts}</div>
        })}
        {n < TOTAL && <span className="caret" />}
      </pre>
    </div>
  )
}
