import { FC, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import { addIngredient, onDrop, removeIngredient, setDropIndex } from '../../../services/reducers/burger-constructor'
import { decrementCount, incrementCount } from '../../../services/reducers/ingredients'
import style from './drag-constructor-element.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientType, TIngredient } from '../../../utils/ingrediens-types'
import { RootState } from '../../../services/reducers'
import { TDragConstructorElement } from '../../burger-ingredients/ingredient/ingredient'
import { useAppDispatch } from '../../../index'

export type TDragConstructorElementExpanded = TDragConstructorElement & { index: number }

type TDragConstructorElementProps = {
  index: number;
  ingredient: TIngredient;
}

const DragConstructorElement: FC<TDragConstructorElementProps> = ({ index, ingredient }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [pickedType, setPickedType] = useState<IngredientType | null>(null)
  // eslint-disable-next-line camelcase
  const { name, price, image_mobile: imageMobile } = ingredient
  const dispatch = useAppDispatch()
  const { position } = useSelector((state: RootState) => state.burgerConstructor.dragDropIndexes)
  const [{ isDragging }, dragPicked] = useDrag({
    type: 'pickedIngredient',
    item: () => {
      return { index, ingredientType: 'exist', ingredient } as TDragConstructorElementExpanded
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }
  )

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [{ isOver }, dropPicked] = useDrop({
    accept: 'pickedIngredient',
    collect (monitor) {
      return {
        isOver: monitor.isOver()
      }
    },
    hover (item: unknown, monitor) {
      const { ingredient, index: ingredientDragIndex } = item as TDragConstructorElementExpanded
      setPickedType(ingredient.type)
      if (ingredient.type === IngredientType.Bun) {
        return
      }
      if (!ref.current) {
        return
      }
      const dragIndex = ingredientDragIndex
      const dropIndex = index
      if (dragIndex === dropIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      if (!clientOffset) {
        return
      }
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
    drop (item: unknown) {
      const { index, ingredientType, ingredient } = item as TDragConstructorElementExpanded
      if (ingredientType === 'exist') {
        dispatch(onDrop({ dragIndex: index }))
      } else {
        dispatch(addIngredient(ingredient))
        dispatch(incrementCount(ingredient))
      }
    }
  })

  const handleDelete = () => {
    dispatch(removeIngredient({ index, item: ingredient }))
    dispatch(decrementCount(ingredient))
  }

  const opacity = isDragging ? 0 : 1
  const display = isDragging ? 'none' : ''
  const padding = pickedType !== IngredientType.Bun && isOver ? (position === 'top') ? '7px 0 0 0' : '0 0 7px 0' : ''
  const borderTop = pickedType !== IngredientType.Bun && isOver ? (position === 'top') ? '3px solid #4C4CFF' : '' : ''
  const borderBottom = pickedType !== IngredientType.Bun && isOver ? (position === 'bottom') ? '3px solid #4C4CFF' : '' : ''
  dragPicked(dropPicked(ref))

  return (
    <div ref={ref}
         className={style.container}
         style={{ opacity, padding, display, borderTop, borderBottom }}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={imageMobile}
        handleClose={handleDelete}
      />
    </div>
  )
}

export default DragConstructorElement
