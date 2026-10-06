import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { NAV } from './data.js'
import { initFx } from './fx.js'
import Logo from './components/Logo.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Certifications from './components/Certifications.jsx'
import Contact from './components/Contact.jsx'
import ResumeModal from './components/ResumeModal.jsx'
import Loader from './components/Loader.jsx'

export default function App() {
  const [active, setActive] = useState('')
  const [resumeOpen, setResumeOpen] = useState(false)
  const [loading, setLoading] = useState(true)   // holds the hero entrance + scroll lock
  const [showLoader, setShowLoader] = useState(true)
  const revealHero = useCallback(() => setLoading(false), [])
  const removeLoader = useCallback(() => setShowLoader(false), [])
  const openResume = () => setResumeOpen(true)
  const closeResume = useCallback(() => setResumeOpen(false), [])
  const [theme, setTheme] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme) }, [theme])

  // Lock scroll and hold the hero entrance until the intro finishes.
  useLayoutEffect(() => { document.documentElement.classList.toggle('is-loading', loading) }, [loading])

  // Scroll reveals, hover tilt and hero parallax (see src/fx.js).
  useLayoutEffect(() => initFx(), [])

  // Keep the hero exactly as tall as the space under the nav, so it fits the first screen.
  useEffect(() => {
    const nav = document.querySelector('nav')
    if (!nav) return
    const set = () => document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px')
    const ro = new ResizeObserver(set)
    ro.observe(nav); set()
    return () => ro.disconnect()
  }, [])

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  return (
    <>
      {showLoader && <Loader onReveal={revealHero} onDone={removeLoader} />}
      <Nav active={active} theme={theme} setTheme={setTheme} onResume={openResume} />
      <main>
        <Hero onResume={openResume} /><About /><Skills /><Projects /><Experience /><Certifications /><Contact onResume={openResume} />
      </main>
      <footer>
        <div className="wrap foot-row"><Logo /><span>© 2026 Bart Andrew D. Cayanan · Angeles City, Pampanga, Philippines</span></div>
      </footer>
      <ResumeModal open={resumeOpen} onClose={closeResume} />
    </>
  )
}
