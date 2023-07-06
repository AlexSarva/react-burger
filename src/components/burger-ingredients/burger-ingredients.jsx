import style from './burger-ingredients.module.css'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementCount } from '../../services/reducers/ingredients'
import Preloader from '../preloader/preloader'
import NoContent from '../no-content/no-content'
import { removeIngredient } from '../../services/reducers/burger-constructor'
import { useDrop } from 'react-dnd'
import { setHighlightedCategory } from '../../services/reducers/nav'
import IngredientsNavigation from './ingredients-navigation/ingredients-navigation'
import Ingredients from './ingredients/ingredients'

const BurgerIngredients = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.ingredients)
  const { highlightedCategory } = useSelector((state) => state.nav)
  const ingredientContainerRef = useRef(null)
  const bunRef = useRef(null)
  const sauceRef = useRef(null)
  const mainRef = useRef(null)
  const [currentType, setCurrentType] = useState(null)

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'pickedIngredient',
    drop (item) {
      if (item.ingredientType === 'exist') {
        dispatch(removeIngredient({ item: item.ingredient, index: item.index }))
        dispatch(decrementCount({ _id: item.ingredient._id, type: item.ingredient.type }))
      }
    },
    hover (item) {
      setCurrentType(item.ingredientType)
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  })

  const handlePickCategory = (category) => {
    dispatch(setHighlightedCategory(category))
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!bunRef.current || !sauceRef.current || !mainRef.current || !ingredientContainerRef.current) {
        return
      }

      const elementPositions = {
        bun: bunRef.current.offsetTop - ingredientContainerRef.current.offsetTop,
        sauce: sauceRef.current.offsetTop - ingredientContainerRef.current.offsetTop,
        main: mainRef.current.offsetTop - ingredientContainerRef.current.offsetTop
      }

      const scrollTop = ingredientContainerRef.current.scrollTop
      let maxVisiblePosition = -1
      let visibleCategory = null

      for (const category in elementPositions) {
        if (elementPositions[category] <= scrollTop && elementPositions[category] > maxVisiblePosition) {
          maxVisiblePosition = elementPositions[category]
          visibleCategory = category
        }
      }

      if (visibleCategory !== null && visibleCategory !== highlightedCategory) {
        dispatch(setHighlightedCategory(visibleCategory))
      }
    }

    const ingredientContainer = ingredientContainerRef.current
    ingredientContainer.addEventListener('scroll', handleScroll)
    return () => ingredientContainer.removeEventListener('scroll', handleScroll)
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
              <Ingredients ref={bunRef} type={'bun'}/>
              <Ingredients ref={sauceRef} type={'sauce'}/>
              <Ingredients ref={mainRef} type={'main'}/>
            </div>
        }
      </div>
    </section>
  )
}

export default BurgerIngredients
