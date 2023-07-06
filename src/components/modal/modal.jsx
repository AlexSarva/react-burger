import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import modalStyle from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import ModalOverlay from '../modal-overlay/modal-overlay'

const Modal = ({ title, children, onClose }) => {
  useEffect(() => {
    const handleKeyUp = (event) => {
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

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose} />
      <div className={modalStyle.modal}>
        <div className={`${modalStyle.modal_header} mt-10`}>
          <h2 className={`${modalStyle.modal_title} text text_type_main-large`}>{title}</h2>
          <div className={modalStyle.modal_closeBtn} onClick={onClose}>
            <CloseIcon type="primary"/>
          </div>
        </div>
        <div className={modalStyle.modal_body}>{children}</div>
      </div>
    </>,
    document.getElementById('modal-root')
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal
