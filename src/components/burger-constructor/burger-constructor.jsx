import consructorStyle from './burger-constructor.module.css';
import {useEffect, useState} from "react";
import {CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {data} from "../../utils/data.js";


const ConstructorNavigation = (props) => {

  const handleClick = (e) => {
    props.onPickCategory(e);
  }

  return (
    <div style={{ display: 'flex' }}>
      <Tab value="bun" active={props.currentCategory === 'bun'} onClick={handleClick}>
        Булки
      </Tab>
      <Tab value="sauce" active={props.currentCategory === 'sauce'} onClick={handleClick}>
        Соусы
      </Tab>
      <Tab value="main" active={props.currentCategory === 'main'} onClick={handleClick}>
        Начинки
      </Tab>
    </div>
  )
}

const Ingredient = (props) => {

  const {image, price, name} = props.ingredient;

  return (
    <li className={`${consructorStyle.ingredient} pt-6`}>
      <img className={`${consructorStyle.ingredientImage} pl-4 pr-4`} src={image} alt={name} />
      <div className={consructorStyle.ingredientPrice}>
        <span className={"text text_type_digits-default pt-1 pb-1"}>{price}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <p>{name}</p>
    </li>
  )
}

const Ingredients = (props) => {
  const {title, ingredients} = props;
  return (
    <div className={`${consructorStyle.ingredients} pt-10  custom-scroll`}>
      <h2>{title}</h2>
      <ul className={consructorStyle.ingredientsList}>
        {ingredients && ingredients.map((ingredient) => (
          <Ingredient key={ingredient._id} ingredient={ingredient}/>
        ))}
      </ul>
    </div>
  )
}

const IngredientsMapping = {
  bun: "Булки",
  main: "Начинки",
  sauce: "Соусы"
}

const BurgerConstructor = () => {

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
      <ConstructorNavigation currentCategory={currentCategory} onPickCategory={handlePickCategory}/>
      {currentCategory === "bun" && <Ingredients title={IngredientsMapping["bun"]} ingredients={state.buns} />}
      {currentCategory === "sauce" && <Ingredients title={IngredientsMapping["sauce"]} ingredients={state.sauces}/>}
      {currentCategory === "main" && <Ingredients title={IngredientsMapping["main"]} ingredients={state.mains}/>}
    </section>
  )
}

export default BurgerConstructor;