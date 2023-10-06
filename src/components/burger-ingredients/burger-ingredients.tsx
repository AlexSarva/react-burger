import style from './burger-ingredients.module.css'
import { RefObject, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementCount } from '../../services/reducers/ingredients'
import Preloader from '../preloader/preloader'
import NoContent from '../no-content/no-content'
import { removeIngredient } from '../../services/reducers/burger-constructor'
import { useDrop } from 'react-dnd'
import { setHighlightedCategory } from '../../services/reducers/nav'
import IngredientsNavigation from './ingredients-navigation/ingredients-navigation'
import Ingredients from './ingredients/ingredients'
import { RootState } from '../../services/reducers'
import { IngredientType } from '../../utils/ingrediens-types'
import { TDragConstructorElementExpanded } from '../burger-constructor/drag-constructor-element/drag-constructor-element'

export interface TIngredientsRefs {
  [key: string]: RefObject<HTMLDivElement>;
}

type TElementsPositions = {
  [IngredientType: string]: number;
}

const BurgerIngredients = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state: RootState) => state.ingredients)
  const { highlightedCategory } = useSelector((state: RootState) => state.nav)
  const ingredientContainerRef = useRef<HTMLDivElement>(null)
  const bunRef = useRef<HTMLDivElement>(null)
  const sauceRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const [currentType, setCurrentType] = useState<string | null>(null)

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'pickedIngredient',
    drop (item: unknown) {
      const { ingredientType, ingredient, index } = item as TDragConstructorElementExpanded
      if (ingredientType === 'exist') {
        dispatch(removeIngredient({ item: ingredient, index }))
        dispatch(decrementCount(ingredient))
      }
    },
    hover (item) {
      const { ingredientType } = item as TDragConstructorElementExpanded
      setCurrentType(ingredientType)
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  })

  const handlePickCategory = (category: IngredientType) => {
    dispatch(setHighlightedCategory(category))
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!bunRef.current || !sauceRef.current || !mainRef.current || !ingredientContainerRef.current) {
        return
      }

      const elementPositions: TElementsPositions = {
        bun: bunRef.current.offsetTop - ingredientContainerRef.current.offsetTop,
        sauce: sauceRef.current.offsetTop - ingredientContainerRef.current.offsetTop,
        main: mainRef.current.offsetTop - ingredientContainerRef.current.offsetTop
      }

      const scrollTop = ingredientContainerRef.current.scrollTop
      let maxVisiblePosition = -1
      let visibleCategory: IngredientType | null = null

      for (const category in elementPositions) {
        const cat = category as IngredientType
        if (elementPositions[cat] <= scrollTop && elementPositions[cat] > maxVisiblePosition) {
          maxVisiblePosition = elementPositions[cat]
          visibleCategory = cat
        }
      }

      if (visibleCategory !== null && visibleCategory !== highlightedCategory) {
        dispatch(setHighlightedCategory(visibleCategory))
      }
    }

    const ingredientContainer = ingredientContainerRef.current
    ingredientContainer?.addEventListener('scroll', handleScroll)
    return () => ingredientContainer?.removeEventListener('scroll', handleScroll)
  }, [highlightedCategory, dispatch])

  const outline = currentType !== 'new' && isHover ? '2px solid purple' : ''

  return (
    <section className={`${style.container}`}>
      <h1 className={'text text_type_main-large mt-10 mb-5'}>Соберите бургер</h1>
      <IngredientsNavigation currentCategory={highlightedCategory} onPickCategory={handlePickCategory}
                             refs={{ bun: bunRef, sauce: sauceRef, main: mainRef }}/>
      <div ref={ingredientContainerRef} className={`${style.ingredients} custom-scroll`} style={{ outline }}>
        {status === 'loading'
          ? <Preloader/>
          : (status === 'failed')
              ? <NoContent/>
              : <div ref={dropTarget}>
              <Ingredients ref={bunRef} type={IngredientType.Bun}/>
              <Ingredients ref={sauceRef} type={IngredientType.Sauce}/>
              <Ingredients ref={mainRef} type={IngredientType.Main}/>
            </div>
        }
      </div>
    </section>
  )
}

export default BurgerIngredients
