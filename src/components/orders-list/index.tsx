import style from './orders-list.module.css'
import { selectFeedOrders } from '../../services/reducers/feed'
import { useSelector } from 'react-redux'
import Order from '../order'

const OrdersList = () => {
  const orders = useSelector(selectFeedOrders)

  return (
    <section className={`${style.container} custom-scroll`}>
      {orders.map((order, index) => (
        <Order key={index} order={order}/>
      ))}
    </section>
  )
}

export default OrdersList
