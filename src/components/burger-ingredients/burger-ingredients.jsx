import ingredientsStyle from './burger-ingredients.module.css';
import {forwardRef, useEffect, useRef, useState} from "react";
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients, incrementCount} from "../../services/reducers/ingredients";
import Preloader from "../preloader/preloader";
import {ingredientsMapping} from "../../utils/constants";
import {showIngredientInfo} from "../../services/reducers/ingredient-info";
import NoContent from "../no-content/no-content";
import {addIngredient, removeIngredient} from "../../services/reducers/burger-constructor";
import {useDrag, useDrop} from "react-dnd";

const IngredientsNavigation = ({onPickCategory, currentCategory, refs}) => {

  const [activeCategory, setActiveCategory] = useState(null);

  const handleClick = (e) => {
    onPickCategory(e);
    refs[e].current.scrollIntoView({behavior: "smooth"});
  }

  useEffect(() => {
    setActiveCategory(currentCategory);
  }, [currentCategory]);

  return (
    <div className={ingredientsStyle.ingredients__navigation}>
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

const Ingredient = ({ingredient}) => {
  const {image, price, name, _id, type, count} = ingredient;
  const dispatch = useDispatch();
  const [{isDrag, opacity}, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const handleInfoClick = () => {
    dispatch(showIngredientInfo({item: ingredient}));
  }
  const handleAddClick = (e) => {
    e.stopPropagation();
    dispatch(incrementCount({_id, type}))
    dispatch(addIngredient({item: ingredient}))
  }

  return (
    <li ref={dragRef} onClick={handleInfoClick} className={`${ingredientsStyle.ingredient} pt-6`} style={{opacity}}>
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
}

const Ingredients = forwardRef(({type}, ref) => {
  const title = ingredientsMapping[type];
  const ingredients = useSelector((state) => state.ingredients.items[type]);

  return (
    <div ref={ref} className={`${ingredientsStyle.ingredients} pt-10  custom-scroll`}>
      <h2>{title}</h2>
      <ul className={ingredientsStyle.ingredients__list}>
        {ingredients && ingredients.map((ingredient) => (
          <Ingredient key={ingredient._id} ingredient={ingredient} />
        ))}
      </ul>
    </div>
  )
})

Ingredients.propTypes = {
  type: PropTypes.string.isRequired,
}

const BurgerIngredients = () => {

  const dispatch = useDispatch();
  const {status} = useSelector((state) => state.ingredients);
  const ingredientContainerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const [highlightedCategory, setHighlightedCategory] = useState('bun');


  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(removeIngredient({item: item.ingredient, index: item.index}));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const handleScroll = () => {
    const elementPositions = {
      bun: bunRef.current.offsetTop - ingredientContainerRef.current.offsetTop,
      sauce: sauceRef.current.offsetTop - ingredientContainerRef.current.offsetTop,
      main: mainRef.current.offsetTop - ingredientContainerRef.current.offsetTop,
    };

    const scrollTop = ingredientContainerRef.current.scrollTop;
    let maxVisiblePosition = -1;
    let visibleCategory = null;

    for (const category in elementPositions) {
      if (elementPositions[category] <= scrollTop && elementPositions[category] > maxVisiblePosition) {
        maxVisiblePosition = elementPositions[category];
        visibleCategory = category;
      }
    }

    if (visibleCategory !== null && visibleCategory !== highlightedCategory) {
      setHighlightedCategory(visibleCategory);
    }
  };

  const handlePickCategory = (category) => {
    setHighlightedCategory(category);
  };


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchIngredients());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const ingredientContainer = ingredientContainerRef.current;
    ingredientContainer.addEventListener('scroll', handleScroll);
    return () => ingredientContainer.removeEventListener('scroll', handleScroll);
  });

  return (
    <section className={`${ingredientsStyle.container}`}>
      <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
      <IngredientsNavigation currentCategory={highlightedCategory} onPickCategory={handlePickCategory}
      refs={{bun: bunRef, sauce: sauceRef, main: mainRef}}/>
      <div ref={ingredientContainerRef} className={`${ingredientsStyle.ingredients__container} custom-scroll`}>
        {status === 'loading'
          ? <Preloader />
          : (status === 'failed')
            ? <NoContent />
            :
            <div ref={dropTarget}>
              <Ingredients ref={bunRef} type={"bun"}/>
              <Ingredients ref={sauceRef} type={"sauce"}/>
              <Ingredients ref={mainRef} type={"main"}/>
            </div>
        }
      </div>
    </section>
  )
}

export default BurgerIngredients;