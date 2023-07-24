import modalOverlayStyle from './modal-overlay.module.css'

type ModalOverlayProps = {
  onClick: () => void
}

const ModalOverlay = ({ onClick }: ModalOverlayProps) => {
  return <div className={modalOverlayStyle.modalOverlay} onClick={onClick}></div>
}

export default ModalOverlay
