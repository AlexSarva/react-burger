import React from 'react';
import modalOverlayStyle from './modal-overlay.module.css';

const ModalOverlay = ({ onClick }) => {
  return <div className={modalOverlayStyle.modalOverlay} onClick={onClick}></div>;
};

export default ModalOverlay;