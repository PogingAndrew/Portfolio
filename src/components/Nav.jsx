import { NAV } from '../data.js'
import Logo from './Logo.jsx'

export default function Nav({ active, theme, setTheme, onResume }) {
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <nav>
      <div className="wrap">
        <a className="logo" href="#top" aria-label="BAC — Bart Andrew Cayanan, back to top">
          <Logo className="logo-mark" />
        </a>
        {NAV.map(([id, label]) => (
          <a key={id} className={'l' + (active === id ? ' on' : '')} href={'#' + id}>{label}</a>
        ))}
        <button className="btn" onClick={onResume}>Resume</button>
        <button className="btn ico" onClick={() => setTheme(next)} aria-label={`Switch to ${next} theme`}>
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </nav>
  )
}
