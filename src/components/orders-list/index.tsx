import style from './orders-list.module.css'
import { selectFeedOrders } from '../../services/reducers/orders'
import { useSelector } from 'react-redux'
import Order from '../order'
import Preloader from '../preloader/preloader'

const OrdersList = () => {
  const orders = useSelector(selectFeedOrders)

  return (
    <section className={`${style.container} custom-scroll`}>
      {orders.length === 0
        ? <Preloader />
        : orders.map((order, index) => (
        <Order key={index} order={order} extended={false} path={'/feed'}/>
        ))}
    </section>
  )
}

export default OrdersList
