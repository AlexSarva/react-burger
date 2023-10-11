import style from './order.module.css'
import { TExtendedOrder } from '../../services/reducers/orders'
import { FC, useCallback, useMemo } from 'react'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { checkOrderStatus, TStatus } from '../../utils/utils'
import { useLocation, useNavigate } from 'react-router-dom'

type OrderProps = {
  order: TExtendedOrder
  extended: boolean,
  path: string
}

const MAX_INGREDIENTS = 6

const Order: FC<OrderProps> = ({ order, extended, path }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleOrderClick = useCallback(() => {
    navigate(`${path}/${order.number}`, {
      state: { modal: true, from: location.pathname }
    })
  }, [navigate, order.number])

  const status: TStatus = useMemo(() => {
    return checkOrderStatus(order)
  }, [order])

  return (
    <article className={style.container} onClick={handleOrderClick}>
      <div className={style.info}>
        <p className={'text text_type_digits-default'}>{`#${order.number}`}</p>
        <FormattedDate date={new Date(order.createdAt)} className={'text_color_inactive'}/>
      </div>
      <div className={style.title}>
        <h2 className={'text text_type_main-medium'}>{order.name}</h2>
        {extended && <p className={'text text_type_main-small'} style={{
          color: status.color
        }}>{status.label}</p>}
      </div>
      <div className={style.info}>
        <div className={style.ingredients}>
          {order.ingredients.slice(0, MAX_INGREDIENTS).map((ingredient, index) => (
            <img key={index} className={style.image} src={ingredient.image_mobile} alt={ingredient.name} style={{
              zIndex: order.ingredients.length - index
            }}/>
          ))}
          {order.ingredients.length - MAX_INGREDIENTS > 0 && <div className={style.imageCover} style={{
            zIndex: order.ingredients.length - MAX_INGREDIENTS + 1
          }}>
            <p className={'text text_type_digits-default'}>{`+${order.ingredients.length - MAX_INGREDIENTS}`}</p>
          </div>}
        </div>
        <div className={`${style.price} pt-1 pb-1`}>
          <span className={'text text_type_digits-default'}>{order.ingredientsPrice}</span>
          <CurrencyIcon type={'primary'}/>
        </div>
      </div>
    </article>
  )
}

export default Order
