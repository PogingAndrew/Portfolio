import { useEffect, useRef } from 'react'

// Shared pop-up shell: Esc to close, click outside to close, scroll lock, focus return.
export default function Modal({ open, onClose, label, title, actions, children, wide }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    const onKey = e => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previous?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={'modal' + (wide ? ' wide' : '')} role="dialog" aria-modal="true" aria-label={label} onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <b>{title}</b>
          <div className="row">
            {actions}
            <button ref={closeRef} className="btn ico" onClick={onClose} aria-label={`Close ${label}`}>✕</button>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
