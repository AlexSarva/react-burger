import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'
import { addIngredient } from '../../../services/reducers/burger-constructor'
import { incrementCount } from '../../../services/reducers/ingredients'
import style from './empty-constructor.module.css'
import { RootState } from '../../../services/reducers'
import { TDragConstructorElementExpanded } from '../drag-constructor-element/drag-constructor-element'

const EmptyConstructor = () => {
  const { options } = useSelector((state: RootState) => state.burgerConstructor)
  const dispatch = useDispatch()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'pickedIngredient',
    drop (item: unknown) {
      const { ingredient } = item as TDragConstructorElementExpanded
      if (options.length === 0) {
        dispatch(addIngredient(ingredient))
        dispatch(incrementCount(ingredient))
      }
    },
    collect: monitor => ({
      isHover: options.length === 0 && monitor.isOver()
    })
  })

  const outline = isHover ? '2px solid #4C4CFF' : ''

  return (
    <div ref={dropTarget} className={style.container} style={{ outline }}>
      <p className={'text text_type_main-large text_color_inactive mb-5'}>Перетащите сюда</p>
      <p className={'text text_type_main-large text_color_inactive'}>ингредиенты</p>
    </div>
  )
}

export default EmptyConstructor
