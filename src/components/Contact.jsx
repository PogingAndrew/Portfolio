import { useState } from 'react'
import { EMAIL } from '../data.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(f) {
  const e = {}
  if (!f.fname.trim()) e.fname = 'Enter your first name.'
  if (!f.lname.trim()) e.lname = 'Enter your last name.'
  if (!EMAIL_RE.test(f.email)) e.email = 'Enter a valid email address, like name@example.com.'
  if (f.message.trim().length < 20) e.message = 'Write at least 20 characters so I know how to help.'
  return e
}

function Field({ id, label, type = 'text', area, value, error, onChange }) {
  const props = { id, value, onChange, 'aria-invalid': !!error }
  return (
    <div className={error ? 'bad' : ''}>
      <label htmlFor={id}>{label}</label>
      {area ? <textarea rows="5" {...props} /> : <input type={type} {...props} />}
      {error && <div className="err" role="alert">{error}</div>}
    </div>
  )
}

export default function Contact({ onResume }) {
  const [f, setF] = useState({ fname: '', lname: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const bind = k => ({ value: f[k], error: errors[k], onChange: ev => setF({ ...f, [k]: ev.target.value }) })

  function submit(ev) {
    ev.preventDefault()
    const e = validate(f)
    setErrors(e)
    if (Object.keys(e).length) return
    const body = `${f.message}\n\n— ${f.fname} ${f.lname} (${f.email})`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio message from ' + f.fname)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="contact">
      <div className="wrap">
        <h2>Contact</h2>
        <p className="lead">Hiring or collaborating? Send a message and I'll reply by email.</p>
        <div className="two">
          <form noValidate onSubmit={submit}>
            <div className="r2">
              <Field id="fname" label="First name" {...bind('fname')} />
              <Field id="lname" label="Last name" {...bind('lname')} />
            </div>
            <Field id="email" label="Email" type="email" {...bind('email')} />
            <Field id="message" label="Message" area {...bind('message')} />
            <div className="row" style={{ alignItems: 'center' }}>
              <button type="submit" className="btn fill">Send message</button>
              {sent && <span role="status" style={{ color: 'var(--ok)', fontWeight: 600 }}>Your email app opened with the message ready to send.</span>}
            </div>
          </form>
          <ul className="links">
            <li><a href={`mailto:${EMAIL}`}><span>Email</span><small>{EMAIL}</small></a></li>
            <li><a href="tel:+639770135777"><span>Phone</span><small>+63 977-013-5777</small></a></li>
            <li><a href="https://www.linkedin.com/in/andrew-cayanan/" target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><small>andrew-cayanan</small></a></li>
            <li><a href="https://github.com/AndrewCayanan" target="_blank" rel="noopener noreferrer"><span>GitHub</span><small>AndrewCayanan</small></a></li>
            <li><a href="#contact" onClick={e => { e.preventDefault(); onResume() }}><span>Resume</span><small>View or download PDF</small></a></li>
          </ul>
        </div>
      </div>
    </section>
  )
}
