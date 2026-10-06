// Scroll-reveal, hover-tilt and hero parallax for the whole page.
// Elements are tagged from here (selector -> direction) so the section components stay untouched.
// The visual rules live in styles.css under "3D page effects".

// [selector, direction, options]  directions: left | right | up | down | front | flipx | flipy
// stagger: ms between siblings of the same selector; tilt: follows the pointer in 3D after it has appeared.
const MAP = [
  // about
  ['#about h2', 'left'],
  ['#about .two > div:first-child', 'left'],
  ['#about .facts', 'right', { tilt: true }],
  ['#about .soft span', 'front', { stagger: 70 }],
  // skills
  ['#skills h2', 'down'],
  ['#skills .lead', 'up'],
  ['#skills .sk-row', 'left', { stagger: 90 }],
  ['#skills .sk-panel', 'right', { tilt: true }],
  // projects
  ['#work h2', 'right'],
  ['#work .lead', 'left'],
  ['#work .showcase', 'flipx'],
  ['#work .works-hint', 'up'],
  // certifications
  ['#certifications h2', 'down'],
  ['#certifications .lead', 'up'],
  ['#certifications .certs-stage', 'flipy'],
  ['#certifications .certs-list li', 'right', { stagger: 80 }],
  // contact
  ['#contact h2', 'right'],
  ['#contact .lead', 'left'],
  ['#contact .two > form', 'left'],
  ['#contact .links li', 'front', { stagger: 90, tilt: true }],
]

export function initFx() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const timers = []
  const cleanups = []

  /* ---- reveal ---- */
  const finish = (el, delay = 0) => timers.push(setTimeout(() => el.setAttribute('data-done', ''), delay + 1300))
  const show = el => {
    el.setAttribute('data-in', '')
    finish(el, parseInt(el.style.getPropertyValue('--d')) || 0)
  }
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(
        entries =>
          entries.forEach(e => {
            // reveal when it scrolls into view, or immediately if the visitor already jumped past it (anchor links)
            if (!e.isIntersecting && e.boundingClientRect.top >= 0) return
            io.unobserve(e.target)
            show(e.target)
          }),
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
      )
    : null

  MAP.forEach(([sel, dir, opt = {}]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      // Tagging is idempotent, but observing is not: React StrictMode runs this effect twice (the first run is
      // torn down), so every element that is not yet revealed must be observed again on each run.
      if (!el.hasAttribute('data-rv')) {
        el.setAttribute('data-rv', dir)
        if (opt.tilt) el.setAttribute('data-tilt', '')
        if (opt.stagger) el.style.setProperty('--d', Math.min(i, 8) * opt.stagger + 'ms')
      }
      if (el.hasAttribute('data-done')) return
      if (reduce || !io) { el.setAttribute('data-in', ''); el.setAttribute('data-done', ''); return }
      if (el.hasAttribute('data-in')) finish(el)
      else io.observe(el)
    })
  })
  cleanups.push(() => io && io.disconnect())

  /* ---- tilt (fine pointers only) ---- */
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduce) {
    const MAX = 7
    const move = ev => {
      const el = ev.target.closest?.('[data-tilt][data-done]')
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (ev.clientX - r.left) / r.width - 0.5
      const py = (ev.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--ry', (px * MAX * 2).toFixed(2) + 'deg')
      el.style.setProperty('--rx', (-py * MAX * 2).toFixed(2) + 'deg')
    }
    const leave = ev => {
      const el = ev.target
      if (el.matches?.('[data-tilt]')) { el.style.removeProperty('--rx'); el.style.removeProperty('--ry') }
    }
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerout', leave, { passive: true })
    cleanups.push(() => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerout', leave) })
  }

  /* ---- hero: scroll depth + mouse look ---- */
  const hero = document.getElementById('top')
  if (hero && !reduce) {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const p = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight || 1)))
        hero.style.setProperty('--hs', p.toFixed(3))
      })
    }
    const onMouse = ev => {
      const r = hero.getBoundingClientRect()
      hero.style.setProperty('--mx', (((ev.clientX - r.left) / r.width) * 2 - 1).toFixed(3))
      hero.style.setProperty('--my', (((ev.clientY - r.top) / r.height) * 2 - 1).toFixed(3))
    }
    const reset = () => { hero.style.setProperty('--mx', 0); hero.style.setProperty('--my', 0) }
    window.addEventListener('scroll', onScroll, { passive: true })
    hero.addEventListener('pointermove', onMouse, { passive: true })
    hero.addEventListener('pointerleave', reset)
    onScroll()
    cleanups.push(() => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      hero.removeEventListener('pointermove', onMouse)
      hero.removeEventListener('pointerleave', reset)
    })
  }

  return () => { timers.forEach(clearTimeout); cleanups.forEach(f => f()) }
}
