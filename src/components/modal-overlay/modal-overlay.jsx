import React from 'react';
import modalOverlayStyle from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = ({ onClick }) => {
  return <div className={modalOverlayStyle.modalOverlay} onClick={onClick}></div>;
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default ModalOverlay;