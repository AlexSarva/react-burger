import style from './status-list.module.css'
import { FC, useMemo } from 'react'

type StatusListProps = {
  label: string
  orders: Array<string>
  color?: string
}

const MAX_ORDERS = 10

const StatusList: FC<StatusListProps> = ({ label, orders, color }) => {
  const numRows = useMemo(() => {
    if (orders.length > MAX_ORDERS) {
      return MAX_ORDERS
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
        {orders.map((order, index) => (
          <p key={index} className={'text text_type_digits-default'} style={{
            color: typeof color !== 'undefined' ? color : 'white'
          }}>{order}</p>))}
      </div>
    </div>
  )
}

export default StatusList
