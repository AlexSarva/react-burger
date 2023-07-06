import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import { addIngredient, onDrop, removeIngredient, setDropIndex } from '../../../services/reducers/burger-constructor'
import { decrementCount, incrementCount } from '../../../services/reducers/ingredients'
import style from './drag-constructor-element.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ConstructorElementType } from '../../../utils/types'
import PropTypes from 'prop-types'
import { ingredientsTypes } from '../../../utils/constants'

const DragConstructorElement = ({ index, ingredient }) => {
  const ref = useRef(null)
  const [pickedType, setPickedType] = useState(null)
  const { _id, type, name, price, image_mobile } = ingredient
  const dispatch = useDispatch()
  const { position } = useSelector((state) => state.burgerConstructor.dragDropIndexes)
  const [{ isDragging }, dragPicked] = useDrag({
    type: 'pickedIngredient',
    item: () => {
      return { index, ingredientType: 'exist', ingredient }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }
  )

  const [{ isOver }, dropPicked] = useDrop({
    accept: 'pickedIngredient',
    collect (monitor) {
      return {
        isOver: monitor.isOver()
      }
    },
    hover (item, monitor) {
      setPickedType(item.ingredient.type)
      if (item.ingredient.type === ingredientsTypes.bun) {
        return
      }
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const dropIndex = index
      if (dragIndex === dropIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < dropIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > dropIndex && hoverClientY > hoverMiddleY) {
        return
      }

      dispatch(setDropIndex({
        dropIndex: hoverClientY < hoverMiddleY ? dropIndex : (dropIndex + 1),
        position: hoverClientY < hoverMiddleY ? 'top' : 'bottom'
      }))
    },
    drop ({ index, ingredientType, ingredient }) {
      if (ingredientType === 'exist') {
        dispatch(onDrop({ dragIndex: index }))
      } else {
        dispatch(addIngredient({ item: ingredient }))
        dispatch(incrementCount({ _id: ingredient._id, type: ingredient.type }))
      }
    }
  })

  const handleDelete = () => {
    dispatch(removeIngredient({ index, item: ingredient }))
    dispatch(decrementCount({ _id, type }))
  }

  const opacity = isDragging ? 0 : 1
  const display = isDragging ? 'none' : ''
  const padding = pickedType !== ingredientsTypes.bun && isOver ? (position === 'top') ? '7px 0 0 0' : '0 0 7px 0' : ''
  const borderTop = pickedType !== ingredientsTypes.bun && isOver ? (position === 'top') ? '3px solid #4C4CFF' : '' : ''
  const borderBottom = pickedType !== ingredientsTypes.bun && isOver ? (position === 'bottom') ? '3px solid #4C4CFF' : '' : ''
  dragPicked(dropPicked(ref))

  return (
    <div ref={ref}
         className={style.container}
         style={{ opacity, padding, display, borderTop, borderBottom }}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image_mobile}
        handleClose={handleDelete}
      />
    </div>
  )
}

DragConstructorElement.propTypes = {
  ingredient: ConstructorElementType.isRequired,
  index: PropTypes.number.isRequired
}

export default DragConstructorElement
