import style from './order.module.css'
import { TExtendedOrder } from '../../services/reducers/feed'
import { FC } from 'react'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'

type OrderProps = {
  order: TExtendedOrder
}

const MAX_INGREDIENTS = 6

const Order: FC<OrderProps> = ({ order }) => {
  return (
    <article className={style.container}>
      <div className={style.info}>
        <p className={'text text_type_digits-default'}>{`#${order.number}`}</p>
        <FormattedDate date={new Date(order.createdAt)} className={'text_color_inactive'}/>
      </div>
      <h2 className={'text text_type_main-medium'}>{'Какое-то сложное название'}</h2>
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
