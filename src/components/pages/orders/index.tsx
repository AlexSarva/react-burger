import styles from './orders.module.css'
import { useSelector } from 'react-redux'
import { selectMyOrders } from '../../../services/reducers/orders'
import Order from '../../order'

const Orders = () => {
  const orders = useSelector(selectMyOrders)

  return (
    <section className={`${styles.container} custom-scroll`}>
      {orders.length === 0
        ? <p className={`${styles.empty} 'text text_type_main-medium'`}>У вас еще нет ни одного заказа</p>
        : orders.map((order, index) => (
          <Order key={index} order={order} extended={true} path={'/profile/orders'}/>
        ))}
    </section>
  )
}

export default Orders
