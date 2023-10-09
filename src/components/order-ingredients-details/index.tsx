import styles from './order-ingredients-details.module.css'
import { TExtendedOrder } from '../../services/reducers/orders'
import { FC, useMemo } from 'react'
import { checkOrderStatus, TStatus } from '../../utils/utils'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { TIngredient } from '../../utils/ingrediens-types'

type IngredientProps = {
  ingredient: TIngredient
}

const Ingredient: FC<IngredientProps> = ({ ingredient }) => {
  const { count, name, price, image_mobile: imageMobile } = ingredient
  return (
    <div className={styles.ingredient}>
      <img className={styles.image} src={imageMobile} alt={name}/>
      <p className={'text text_type_main-default ml-4'}>{name}</p>
      <div className={styles.price}>
        <span className={'text text_type_digits-default'}>{`${count}\u00A0x\u00A0${price}`}</span>
        <CurrencyIcon type={'primary'}/>
      </div>
    </div>
  )
}

type OrderIngredientsDetailsProps = {
  order: TExtendedOrder
}

const OrderIngredientsDetails: FC<OrderIngredientsDetailsProps> = ({ order }) => {
  const status: TStatus = useMemo(() => {
    return checkOrderStatus(order)
  }, [order])

  const collapsedIngredients = useMemo(() => {
    const ingredients: Array<TIngredient> = []
    order.ingredients.forEach((originalIngredient) => {
      const ingredient = { ...originalIngredient } // Shallow copy
      const index = ingredients.findIndex((item) => item._id === ingredient._id)
      if (index === -1) {
        ingredient.count = 1
        ingredients.push(ingredient)
      } else {
        if (ingredients[index].count !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ingredients[index].count!++
        } else {
          ingredients[index].count = 1
        }
      }
    })
    return ingredients
  }, [order.ingredients])

  return (
    <div className={styles.container}>
      <span className={'text text_type_digits-default'}>{`#${order.number}`}</span>
      <h2 className={'text text_type_main-large mt-10'}>{order.name}</h2>
      <p className={'text text_type_main-small mt-3'} style={{
        color: status.color
      }}>{status.label}</p>
      <p className={'text text_type_main-large mt-15'}>Состав:</p>
      <div className={`${styles.ingredients} mt-6 custom-scroll`}>
        {collapsedIngredients.map((ingredient, index) => (
          <Ingredient key={index} ingredient={ingredient}/>
        ))}
      </div>
      <div className={`${styles.footer} pt-10 pb-2`}>
        <FormattedDate date={new Date(order.createdAt)} className={'text text_type_main-small text_color_inactive'} />
        <div className={`${styles.price}`}>
          <span className={'text text_type_digits-default'}>{order.ingredientsPrice}</span>
          <CurrencyIcon type={'primary'}/>
        </div>
      </div>
    </div>
  )
}

export default OrderIngredientsDetails
