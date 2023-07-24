import { FC, useEffect, useState } from 'react'
import style from './ingredients-navigation.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientType } from '../../../utils/ingrediens-types'
import { TIngredientsRefs } from '../burger-ingredients'

interface TIngredientsNavigation {
  onPickCategory: (arg0: IngredientType) => void;
  currentCategory: string;
  refs: TIngredientsRefs;
}

const IngredientsNavigation: FC<TIngredientsNavigation> = ({ onPickCategory, currentCategory, refs }) => {
  const [activeCategory, setActiveCategory] = useState('bun')

  const handleClick = (ing: IngredientType) => {
    onPickCategory(ing)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    refs[ing].current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    setActiveCategory(currentCategory)
  }, [currentCategory])

  return (
    <div className={style.container}>
      <Tab value="bun" active={activeCategory === 'bun'} onClick={() => handleClick(IngredientType.Bun)}>
        Булки
      </Tab>
      <Tab value="sauce" active={activeCategory === 'sauce'} onClick={() => handleClick(IngredientType.Sauce)}>
        Соусы
      </Tab>
      <Tab value="main" active={activeCategory === 'main'} onClick={() => handleClick(IngredientType.Main)}>
        Начинки
      </Tab>
    </div>
  )
}

export default IngredientsNavigation
