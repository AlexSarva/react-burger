import style from './status-list.module.css'
import { FC, useMemo } from 'react'
import { TOrder } from '../../../services/reducers/orders'

type StatusListProps = {
  label: string
  orders: Array<TOrder>
  color?: string
}

const MAX_ORDERS_PER_COLUMN = 10
const MAX_ORDERS = 40

const StatusList: FC<StatusListProps> = ({ label, orders, color }) => {
  const numRows = useMemo(() => {
    if (orders.length > MAX_ORDERS_PER_COLUMN) {
      return MAX_ORDERS_PER_COLUMN
    } else {
      return orders.length
    }
  }, [orders])

  return (
    <div className={style.container}>
      <p className={'text text_type_main-medium'}>{`${label}:`}</p>
      <div className={style.orders} style={{
        gridTemplateRows: `repeat(${numRows}, auto)`
      }}>
        {orders.slice(0, MAX_ORDERS).map((order, index) => (
          <p key={index} className={'text text_type_digits-default'} style={{
            color: typeof color !== 'undefined' ? color : 'white'
          }}>{order.number}</p>))}
      </div>
    </div>
  )
}

export default StatusList
