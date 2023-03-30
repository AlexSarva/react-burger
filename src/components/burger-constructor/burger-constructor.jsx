import consructorStyle from './burger-constructor.module.css';
import {forwardRef, useEffect, useRef, useState} from "react";
import {CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {data} from "../../utils/data.js";
import PropTypes from "prop-types";


const ConstructorNavigation = ({onPickCategory, currentCategory, refs}) => {

  const handleClick = (e) => {
    onPickCategory(e);
    refs[e].current.scrollIntoView({behavior: "smooth"});
  }

  return (
    <div style={{ display: 'flex' }}>
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

ConstructorNavigation.propTypes = {
  onPickCategory: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
  refs: PropTypes.object.isRequired
}

const Ingredient = ({ingredient}) => {
  const {image, price, name} = ingredient;
  return (
    <li className={`${consructorStyle.ingredient} pt-6`}>
      <img className={`${consructorStyle.ingredient__image} pl-4 pr-4`} src={image} alt={name} />
      <div className={`${consructorStyle.ingredient__price} pt-1 pb-1`}>
        <span className={"text text_type_digits-default"}>{price}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <p className={`${consructorStyle.ingredient_text} pt-2`}>{name}</p>
    </li>
  )
}

Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired
}

const Ingredients = forwardRef(({title, ingredients}, ref) => {
  return (
    <div ref={ref} className={`${consructorStyle.ingredients} pt-10  custom-scroll`}>
      <h2>{title}</h2>
      <ul className={consructorStyle.ingredients__list}>
        {ingredients && ingredients.map((ingredient) => (
          <Ingredient key={ingredient._id} ingredient={ingredient}/>
        ))}
      </ul>
    </div>
  )
})

Ingredients.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired
}

const IngredientsMapping = {
  bun: "Булки",
  main: "Начинки",
  sauce: "Соусы"
}

const BurgerConstructor = () => {

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const [state, setState] = useState({
    buns: [],
    mains: [],
    sauces: []
  });
  const [currentCategory, setCurrentCategory] = useState('bun');

  const handlePickCategory = (category) => {
    setCurrentCategory(category);
  }

  useEffect(() => {
    setState({
      buns: data.filter(item => item.type === "bun"),
      mains: data.filter(item => item.type === "main"),
      sauces: data.filter(item => item.type === "sauce")
    })
  },[])


  return (
    <section className={`${consructorStyle.container}`}>
      <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
      <ConstructorNavigation currentCategory={currentCategory} onPickCategory={handlePickCategory}
      refs={{bun: bunRef, sauce: sauceRef, main: mainRef}}/>
      <div className={`${consructorStyle.ingredients__container} custom-scroll`}>
        <Ingredients ref={bunRef} title={IngredientsMapping["bun"]} ingredients={state.buns} />
        <Ingredients ref={sauceRef} title={IngredientsMapping["sauce"]} ingredients={state.sauces}/>
        <Ingredients ref={mainRef} title={IngredientsMapping["main"]} ingredients={state.mains}/>
      </div>
    </section>
  )
}

export default BurgerConstructor;