import React from "react";
import modalOrderStyle from "./order-details.module.css";
import PropTypes from "prop-types";

const OrderDetails = ({orderNumber}) => {
  return (
    <>
      <h3 className={`${modalOrderStyle.details_number} text text_type_digits-large`}>{orderNumber}</h3>
      <span className={`${modalOrderStyle.details_description} text text_type_main-medium mt-8 mb-15`}>идентификатор заказа</span>
      <div className={`${modalOrderStyle.details_icon}`}></div>
      <span className={`${modalOrderStyle.details_description} text text_type_main-default mt-15`}>Ваш заказ начали готовить</span>
      <span className={`${modalOrderStyle.details_description} text text_type_main-default text_color_inactive mt-2 mb-30`}>Дождитесь готовности на орбитальной станции</span>
    </>
  )
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired
}

export default OrderDetails;