import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import React from "react";
import modalOrderStyle from "./order-details.module.css";
import { generateOrder } from "../../utils/utils";

const OrderDetails = ({onClose}) => {
  return (
    <>
      <ModalOverlay onClick={onClose} />
      <Modal title="" onClose={onClose}>
        <h3 className={`${modalOrderStyle.details_number} text text_type_digits-large`}>{generateOrder()}</h3>
        <span className={`${modalOrderStyle.details_description} text text_type_main-medium mt-8 mb-15`}>идентификатор заказа</span>
        <div className={`${modalOrderStyle.details_icon}`}></div>
        <span className={`${modalOrderStyle.details_description} text text_type_main-default mt-15`}>Ваш заказ начали готовить</span>
        <span className={`${modalOrderStyle.details_description} text text_type_main-default text_color_inactive mt-2 mb-30`}>Дождитесь готовности на орбитальной станции</span>
      </Modal>
    </>
  )
}

export default OrderDetails;