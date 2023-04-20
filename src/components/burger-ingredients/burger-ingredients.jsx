import ingredientsStyle from './burger-ingredients.module.css';
import {forwardRef, useEffect, useRef, useState} from "react";
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import { fetchIngredients } from "../../services/reducers/ingredients";
import Preloader from "../preloader/preloader";

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

const Ingredient = ({ingredient, count, onAddClick, onClickIng}) => {
  const {image, price, name, _id, type} = ingredient;

  const handleInfoClick = () => {
    onClickIng(ingredient);
  }
  const handleAddClick = (e) => {
    e.stopPropagation();
    onAddClick(_id, type, ingredient);
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
  onAddClick: PropTypes.func.isRequired,
  onClickIng: PropTypes.func.isRequired
}

const Ingredients = forwardRef(({title, ingredients, onAddClick, ingredientsCount, onClickIng}, ref) => {
  return (
    <div ref={ref} className={`${ingredientsStyle.ingredients} pt-10  custom-scroll`}>
      <h2>{title}</h2>
      <ul className={ingredientsStyle.ingredients__list}>
        {ingredients && ingredients.map((ingredient) => (
          <Ingredient key={ingredient._id}
                      ingredient={ingredient}
                      onAddClick={onAddClick}
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
  onAddClick: PropTypes.func.isRequired,
  ingredientsCount: PropTypes.object.isRequired
}

const IngredientsMapping = {
  bun: "Булки",
  main: "Начинки",
  sauce: "Соусы"
}

const BurgerIngredients = ({onAddToOrder, onClickIng, bunCount, sauceCount, mainCount}) => {

  const dispatch = useDispatch();
  const {buns, mains, sauces} = useSelector((state) => state.ingredients.items);
  const ingredientsStatus = useSelector((state) => state.ingredients.status);

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const [currentCategory, setCurrentCategory] = useState('bun');

  const handlePickCategory = (category) => {
    setCurrentCategory(category);
  }

  useEffect(() => {
    if (ingredientsStatus === 'idle') {
      dispatch(fetchIngredients());
    }
  }, [ingredientsStatus, dispatch]);

  return (
    <section className={`${ingredientsStyle.container}`}>
      <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
      <IngredientsNavigation currentCategory={currentCategory} onPickCategory={handlePickCategory}
      refs={{bun: bunRef, sauce: sauceRef, main: mainRef}}/>
      <div className={`${ingredientsStyle.ingredients__container} custom-scroll`}>
        {ingredientsStatus === 'loading'
          ? <Preloader />
          :
          <>
            <Ingredients ref={bunRef}
                         title={IngredientsMapping["bun"]}
                         ingredients={buns}
                         ingredientsCount={bunCount}
                         onAddClick={onAddToOrder}
                         onClickIng={onClickIng}
            />
            <Ingredients ref={sauceRef}
                         title={IngredientsMapping["sauce"]}
                         ingredients={sauces}
                         ingredientsCount={sauceCount}
                         onAddClick={onAddToOrder}
                         onClickIng={onClickIng}
            />
            <Ingredients ref={mainRef}
                         title={IngredientsMapping["main"]}
                         ingredients={mains}
                         ingredientsCount={mainCount}
                         onAddClick={onAddToOrder}
                         onClickIng={onClickIng}
            />
          </>
        }
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  onAddToOrder: PropTypes.func.isRequired,
  onClickIng: PropTypes.func.isRequired,
  bunCount: PropTypes.object.isRequired,
  sauceCount: PropTypes.object.isRequired,
  mainCount: PropTypes.object.isRequired
}

export default BurgerIngredients;