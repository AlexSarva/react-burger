import ingredientsStyle from './burger-ingredients.module.css';
import {forwardRef, useEffect, useRef, useState} from "react";
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {data} from "../../utils/data.js";
import PropTypes from "prop-types";


const IngredientsNavigation = ({onPickCategory, currentCategory, refs}) => {

  const handleClick = (e) => {
    onPickCategory(e);
    refs[e].current.scrollIntoView({behavior: "smooth"});
  }

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

const Ingredient = ({ingredient, count, onAddClick}) => {
  const {image, price, name, _id, type} = ingredient;

  const handleAddClick = () => {
    onAddClick(_id, type);
  }

  return (
    <li onClick={handleAddClick} className={`${ingredientsStyle.ingredient} pt-6`}>
      <img className={`${ingredientsStyle.ingredient__image} pl-4 pr-4`} src={image} alt={name} />
      <div className={`${ingredientsStyle.ingredient__price} pt-1 pb-1`}>
        <span className={"text text_type_digits-default"}>{price}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <p className={`${ingredientsStyle.ingredient_text} pt-2`}>{name}</p>
      {count && <Counter count={count} size="default" extraClass={ingredientsStyle.ingredient__counter} />}
    </li>
  )
}

Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
  count: PropTypes.number
}

const Ingredients = forwardRef(({title, ingredients, onAddClick, ingredientsCount}, ref) => {
  return (
    <div ref={ref} className={`${ingredientsStyle.ingredients} pt-10  custom-scroll`}>
      <h2>{title}</h2>
      <ul className={ingredientsStyle.ingredients__list}>
        {ingredients && ingredients.map((ingredient) => (
          <Ingredient key={ingredient._id}
                      ingredient={ingredient}
                      onAddClick={onAddClick}
                      count={ingredientsCount[ingredient._id]}/>
        ))}
      </ul>
    </div>
  )
})

Ingredients.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  ingredientsCount: PropTypes.object.isRequired
}

const IngredientsMapping = {
  bun: "Булки",
  main: "Начинки",
  sauce: "Соусы"
}

const BurgerIngredients = () => {

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const [bunCount, setBunCount] = useState({});
  const [sauceCount, setSauceCount] = useState({});
  const [mainCount, setMainCount] = useState({});

  const [state, setState] = useState({
    buns: [],
    mains: [],
    sauces: []
  });
  const [currentCategory, setCurrentCategory] = useState('bun');

  const handlePickCategory = (category) => {
    setCurrentCategory(category);
  }

  const handleAddClick = (id, type) => {
    if (type === 'bun') {
      setBunCount({...bunCount, [id]: bunCount[id]? bunCount[id] + 1 : 1});
    } else if (type === 'main') {
      setMainCount({...mainCount, [id]: mainCount[id]? mainCount[id] + 1 : 1});
    } else if (type === 'sauce') {
      setSauceCount({...sauceCount, [id]: sauceCount[id]? sauceCount[id] + 1 : 1});
    }
  }

  useEffect(() => {
    setState({
      buns: data.filter(item => item.type === "bun"),
      mains: data.filter(item => item.type === "main"),
      sauces: data.filter(item => item.type === "sauce")
    })
  },[])


  return (
    <section className={`${ingredientsStyle.container}`}>
      <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
      <IngredientsNavigation currentCategory={currentCategory} onPickCategory={handlePickCategory}
      refs={{bun: bunRef, sauce: sauceRef, main: mainRef}}/>
      <div className={`${ingredientsStyle.ingredients__container} custom-scroll`}>
        <Ingredients ref={bunRef}
                     title={IngredientsMapping["bun"]}
                     ingredients={state.buns}
                     ingredientsCount={bunCount}
                     onAddClick={handleAddClick}
        />
        <Ingredients ref={sauceRef}
                     title={IngredientsMapping["sauce"]}
                     ingredients={state.sauces}
                     ingredientsCount={sauceCount}
                     onAddClick={handleAddClick}/>
        <Ingredients ref={mainRef}
                     title={IngredientsMapping["main"]}
                     ingredients={state.mains}
                     ingredientsCount={mainCount}
                     onAddClick={handleAddClick}/>
      </div>
    </section>
  )
}

export default BurgerIngredients;