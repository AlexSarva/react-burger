import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyle from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({ title, children, onClose }) => {
  const handleKeyUp = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => document.removeEventListener('keyup', handleKeyUp);
  }, []);

  return ReactDOM.createPortal(
    <div className={modalStyle.modal}>
      <h2 className={modalStyle.modal_title}>{title}</h2>
      <div className={modalStyle.modal_closeBtn} onClick={onClose} >
        <CloseIcon type="primary" />
      </div>
      <div className={modalStyle.modal_body}>{children}</div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
