import modalOrderStyle from './order-details.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/reducers'

const OrderDetails = () => {
  const { order } = useSelector((state: RootState) => state.orders)

  return (
    <>
      <h3 className={`${modalOrderStyle.details_number} text text_type_digits-large`}>{order.number}</h3>
      <span className={`${modalOrderStyle.details_description} text text_type_main-medium mt-8 mb-15`}>идентификатор заказа</span>
      <div className={`${modalOrderStyle.details_icon}`}></div>
      <span
        className={`${modalOrderStyle.details_description} text text_type_main-default mt-15`}>{`Ваш заказ "${order.name}" начали готовить`}</span>
      <span
        className={`${modalOrderStyle.details_description} text text_type_main-default text_color_inactive mt-2 mb-30`}>Дождитесь готовности на орбитальной станции</span>
    </>
  )
}

export default OrderDetails
