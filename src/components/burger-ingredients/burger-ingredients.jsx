import ingredientsStyle from './burger-ingredients.module.css';
import React, {forwardRef, useCallback, useMemo, useRef, useState} from "react";
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useIngredients} from "../../hook/useIngredients";

const IngredientsNavigation = ({onPickCategory, currentCategory, refs}) => {

  const handleClick = useCallback((e) => {
    onPickCategory(e);
    refs[e].current.scrollIntoView({behavior: "smooth"});
  }, [onPickCategory, refs]);

  return (
    <div className={ingredientsStyle.ingredients__navigation}>
      <Tab value="bun" active={currentCategory === 'bun'} onClick={handleClick}>
        Булки
      </Tab>
      <Tab value="sauce" active={currentCategory === 'sauce'} onClick={handleClick}>
        Соусы
      </Tab>
      <Tab value="main" active={currentCategory === 'main'} onClick={handleClick}>
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

const Ingredient = ({ingredient, count, onClickIng}) => {
  const {image, price, name, _id, type} = ingredient;
  const {addToOrder} = useIngredients();

  const handleInfoClick = () => {
    onClickIng(ingredient);
  }
  const handleAddClick = (e) => {
    e.stopPropagation();
    addToOrder(_id, type, ingredient);
  }

  return (
    <li onClick={handleInfoClick} className={`${ingredientsStyle.ingredient} pt-6`}>
      <img className={`${ingredientsStyle.ingredient__image} pl-4 pr-4`} src={image} alt={name} />
      <div className={`${ingredientsStyle.ingredient__price} pt-1 pb-1`}>
        <span className={"text text_type_digits-default"}>{price}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <p onClick={handleAddClick} className={`${ingredientsStyle.ingredient_text} pt-2`}>{name}</p>
      {(count && count > 0) ? <Counter count={count} size="default" extraClass={ingredientsStyle.ingredient__counter} /> : null}
    </li>
  )
}

Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
  count: PropTypes.number,
  onClickIng: PropTypes.func.isRequired
}

const Ingredients = forwardRef(({title, ingredients, ingredientsCount, onClickIng}, ref) => {
  return (
    <div ref={ref} className={`${ingredientsStyle.ingredients} pt-10  custom-scroll`}>
      <h2>{title}</h2>
      <ul className={ingredientsStyle.ingredients__list}>
        {ingredients && ingredients.map((ingredient) => (
          <Ingredient key={ingredient._id}
                      ingredient={ingredient}
                      onClickIng={onClickIng}
                      count={ingredientsCount[ingredient._id]}/>
        ))}
      </ul>
    </div>
  )
})

Ingredients.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  ingredientsCount: PropTypes.object.isRequired
}

const IngredientsMapping = {
  bun: "Булки",
  main: "Начинки",
  sauce: "Соусы"
}

const BurgerIngredients = React.memo(function BurgerIngredients({ingredients, onClickIng}) {
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const [currentCategory, setCurrentCategory] = useState('bun');
  const {bunCount, sauceCount, mainCount} = useIngredients();

  const handlePickCategory = useCallback((category) => {
    setCurrentCategory(category);
  }, []);

  const ingredientsMemo = useMemo(() => ({
    buns: ingredients.buns,
    sauces: ingredients.sauces,
    mains: ingredients.mains,
  }), [ingredients]);

  return (
    <section className={`${ingredientsStyle.container}`}>
      <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
      <IngredientsNavigation currentCategory={currentCategory} onPickCategory={handlePickCategory}
      refs={{bun: bunRef, sauce: sauceRef, main: mainRef}}/>
      <div className={`${ingredientsStyle.ingredients__container} custom-scroll`}>
        <Ingredients ref={bunRef}
                     title={IngredientsMapping["bun"]}
                     ingredients={ingredientsMemo.buns}
                     ingredientsCount={bunCount}
                     onClickIng={onClickIng}
        />
        <Ingredients ref={sauceRef}
                     title={IngredientsMapping["sauce"]}
                     ingredients={ingredientsMemo.sauces}
                     ingredientsCount={sauceCount}
                     onClickIng={onClickIng}
        />
        <Ingredients ref={mainRef}
                     title={IngredientsMapping["main"]}
                     ingredients={ingredientsMemo.mains}
                     ingredientsCount={mainCount}
                     onClickIng={onClickIng}
        />
      </div>
    </section>
  )
})

BurgerIngredients.propTypes = {
  ingredients: PropTypes.object.isRequired,
  onClickIng: PropTypes.func.isRequired
}

export default BurgerIngredients;