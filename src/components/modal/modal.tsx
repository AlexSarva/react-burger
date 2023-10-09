import { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import modalStyle from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay'

type ModalProps = {
  title: string
  children: ReactNode
  onClose: () => void
}

const Modal = ({ title, children, onClose }: ModalProps) => {
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keyup', handleKeyUp)
    }
    // eslint-disable-next-line
  }, []);

  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) {
    return null
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose}/>
      <div className={modalStyle.modal}>
        {title !== ''
          ? <div className={`${modalStyle.modal_header} mt-10`}>
          <h2 className={`${modalStyle.modal_title} text text_type_main-large`}>{title}</h2>
          <div className={modalStyle.modal_closeBtn} onClick={onClose}>
            <CloseIcon type="primary"/>
          </div>
        </div>
          : <div className={modalStyle.modal_closeBtn_right} onClick={onClose}>
            <CloseIcon type="primary"/>
          </div>}
        <div className={modalStyle.modal_body}>{children}</div>
      </div>
    </>,
    modalRoot
  )
}

export default Modal
