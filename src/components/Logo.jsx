import { useEffect, useState } from 'react'
import { asset } from '../data.js'

// BAC cube mark. Renders a single <img>: the white-letter artwork on the dark theme,
// the dark-letter artwork on the light theme. It tracks the theme toggle via <html data-theme>.
const currentTheme = () => document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'

export default function Logo({ className = '' }) {
  const [theme, setTheme] = useState(currentTheme)
  useEffect(() => {
    setTheme(currentTheme())
    const mo = new MutationObserver(() => setTheme(currentTheme()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])
  return (
    <span className={'brand ' + className} aria-hidden="true">
      <img src={asset(`logo-on-${theme}.png`)} alt="" draggable="false" />
    </span>
  )
}
