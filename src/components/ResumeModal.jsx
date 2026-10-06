import Modal from './Modal.jsx'
import { RESUME } from '../data.js'

export default function ResumeModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      label="resume"
      title="Resume"
      actions={<a className="btn fill" href={RESUME} download>Download PDF</a>}
    >
      <iframe className="modal-frame" src={`${RESUME}#view=FitH&toolbar=0`} title="Bart Andrew D. Cayanan resume" />
      <p className="modal-note">
        Can't see the preview? <a href={RESUME} target="_blank" rel="noopener noreferrer">Open the PDF in a new tab</a>.
      </p>
    </Modal>
  )
}
