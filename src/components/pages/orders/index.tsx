import styles from './orders.module.css'
import { useSelector } from 'react-redux'
import { selectMyOrders, wsInit } from '../../../services/reducers/orders'
import Order from '../../order'
import { useAppDispatch } from '../../../index'
import { useEffect } from 'react'

const Orders = () => {
  const orders = useSelector(selectMyOrders)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(wsInit('my'))
  }, [dispatch, wsInit])

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
