import { useEffect, useState } from 'react'
import Modal from './Modal.jsx'
import { VIEWABLE_CERTS as CERTS, asset } from '../data.js'

// index: which certificate is open (null = closed). Arrow keys move between certificates.
export default function CertModal({ index, setIndex }) {
  const open = index !== null
  const [failed, setFailed] = useState(false)
  const count = CERTS.length
  const cert = open ? CERTS[index] : null
  const go = d => setIndex((index + d + count) % count)

  useEffect(() => { setFailed(false) }, [index])

  useEffect(() => {
    if (!open) return
    const onKey = e => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  return (
    <Modal
      open={open}
      onClose={() => setIndex(null)}
      label="certificate"
      title={cert ? cert.title : ''}
      wide
      actions={cert && (
        <>
          {cert.verify && <a className="btn fill" href={cert.verify} target="_blank" rel="noopener noreferrer">Verify</a>}
          {!failed && <a className="btn" href={asset(cert.image)} target="_blank" rel="noopener noreferrer">Open full size</a>}
        </>
      )}
    >
      {cert && (
        <>
          <div className="cert-stage">
            {failed ? (
              <p className="cert-missing">
                Certificate image not added yet.<br />
                <span className="mono">Add it as public/{cert.image}</span>
              </p>
            ) : (
              <img key={cert.image} src={asset(cert.image)} alt={`${cert.title} certificate from ${cert.issuer}`} onError={() => setFailed(true)} />
            )}
          </div>
          <div className="cert-foot">
            <button className="btn" onClick={() => go(-1)} aria-label="Previous certificate">← Previous</button>
            <span>{cert.issuer}{cert.date && ` · ${cert.date}`} · {index + 1} of {count}</span>
            <button className="btn" onClick={() => go(1)} aria-label="Next certificate">Next →</button>
          </div>
        </>
      )}
    </Modal>
  )
}
