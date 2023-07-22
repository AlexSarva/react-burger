import React, { useEffect, useState } from 'react'
import style from './ingredients-navigation.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

const IngredientsNavigation = ({ onPickCategory, currentCategory, refs }) => {
  const [activeCategory, setActiveCategory] = useState(null)

  const handleClick = (e) => {
    onPickCategory(e)
    refs[e].current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    setActiveCategory(currentCategory)
  }, [currentCategory])

  return (
    <div className={style.container}>
      <Tab value="bun" active={activeCategory === 'bun'} onClick={handleClick}>
        Булки
      </Tab>
      <Tab value="sauce" active={activeCategory === 'sauce'} onClick={handleClick}>
        Соусы
      </Tab>
      <Tab value="main" active={activeCategory === 'main'} onClick={handleClick}>
        Начинки
      </Tab>
    </div>
  )
}

IngredientsNavigation.propTypes = {
  onPickCategory: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
  refs: PropTypes.object.isRequired
}

export default IngredientsNavigation
