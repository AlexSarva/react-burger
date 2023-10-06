import { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import style from './ingredients.module.css'
import Ingredient from '../ingredient/ingredient'
import { RootState } from '../../../services/reducers'
import { IngredientsMapping, IngredientType } from '../../../utils/ingrediens-types' // Update this import path with your actual root reducer path

interface IngredientsProps {
  type: IngredientType;
}

const Ingredients = forwardRef<HTMLDivElement, IngredientsProps>(({ type }, ref) => {
  const title = IngredientsMapping[type]
  const ingredients = useSelector((state: RootState) => state.ingredients.items[type])

  return (
    <div ref={ref} className={`${style.container} pt-10 custom-scroll`}>
      <h2>{title}</h2>
      <ul className={style.elements}>
        {ingredients && ingredients.map((ingredient) => (
          <Ingredient key={ingredient._id} ingredient={ingredient}/>
        ))}
      </ul>
    </div>
  )
})

Ingredients.displayName = 'Ingredients'

export default Ingredients
