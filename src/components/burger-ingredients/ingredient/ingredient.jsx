import React, { useState } from 'react'
import { useDrag } from 'react-dnd'
import style from './ingredient.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientFullType } from '../../../utils/types'
import { useNavigate } from 'react-router-dom'
import { showIngredientInfo } from '../../../services/reducers/ingredient-info'
import { useDispatch } from 'react-redux'

const Ingredient = ({ ingredient }) => {
  const [isCounterActive, setIsCounterActive] = useState(true)
  const navigate = useNavigate()
  const { image, price, name, count } = ingredient
  const dispatch = useDispatch()
  const [{ opacity }, dragRef] = useDrag({
    type: 'pickedIngredient',
    item: () => {
      return { ingredient, ingredientType: 'new' }
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
      isDragging: monitor.isDragging()
    }),
    end () {
      setIsCounterActive(true)
    }
  })

  const handleInfoClick = () => {
    const path = `/ingredients/${ingredient._id}`
    dispatch(showIngredientInfo({ item: ingredient }))
    navigate(path, { state: { modal: true } })
  }

  const hideCounter = () => {
    setIsCounterActive(false)
  }

  return (
    <li ref={dragRef}
        onClick={handleInfoClick}
        onMouseDown={hideCounter}
        className={`${style.container} pt-6`}
        style={{ opacity }}>
      <img className={`${style.image} pl-4 pr-4`} src={image} alt={name}/>
      <div className={`${style.price} pt-1 pb-1`}>
        <span className={'text text_type_digits-default'}>{price}</span>
        <CurrencyIcon type={'primary'}/>
      </div>
      <p className={`${style.text} pt-2`}>{name}</p>
      {isCounterActive && (count && count > 0)
        ? <Counter count={count} size="default" extraClass={style.counter}/>
        : null}
    </li>
  )
}

Ingredient.propTypes = {
  ingredient: IngredientFullType.isRequired
}

export default Ingredient
