import ingredientsStyle from './burger-ingredients.module.css';
import React, {forwardRef, useEffect, useRef, useState} from "react";
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {decrementCount, fetchIngredients} from "../../services/reducers/ingredients";
import Preloader from "../preloader/preloader";
import {ingredientsMapping} from "../../utils/constants";
import {hideIngredientInfo, showIngredientInfo} from "../../services/reducers/ingredient-info";
import NoContent from "../no-content/no-content";
import {removeIngredient} from "../../services/reducers/burger-constructor";
import {useDrag, useDrop} from "react-dnd";
import {setHighlightedCategory} from "../../services/reducers/nav";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

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
  const [isCounterActive, setIsCounterActive] = useState(true);
  const {image, price, name, count} = ingredient;
  const dispatch = useDispatch();
  const [{ opacity}, dragRef] = useDrag({
    type: 'pickedIngredient',
    item: () => {
      return { ingredient, ingredientType: 'new' }
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
      isDragging: monitor.isDragging(),
    }),
    end() {
      setIsCounterActive(true);
    }
  });

  const handleInfoClick = () => {
    dispatch(showIngredientInfo({item: ingredient}));
  }

  const hideCounter = () => {
    setIsCounterActive(false);
  }

  return (
    <li ref={dragRef}
        onClick={handleInfoClick}
        onMouseDown={hideCounter}
        className={`${ingredientsStyle.ingredient} pt-6`}
        style={{opacity}}>
      <img className={`${ingredientsStyle.ingredient__image} pl-4 pr-4`} src={image} alt={name} />
      <div className={`${ingredientsStyle.ingredient__price} pt-1 pb-1`}>
        <span className={"text text_type_digits-default"}>{price}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <p className={`${ingredientsStyle.ingredient_text} pt-2`}>{name}</p>
      {isCounterActive && (count && count > 0) ? <Counter count={count} size="default" extraClass={ingredientsStyle.ingredient__counter} /> : null}
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
    <div ref={ref} className={`${ingredientsStyle.ingredients} pt-10 custom-scroll`}>
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
  const { itemDetails } = useSelector((state) => state.ingredientInfo);
  const {highlightedCategory} = useSelector((state) => state.nav);
  const ingredientContainerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const [currentType, setCurrentType] = useState(null);

  const [{isHover}, dropTarget] = useDrop({
    accept: "pickedIngredient",
    drop(item) {
      if (item.ingredientType === 'exist') {
        dispatch(removeIngredient({item: item.ingredient, index: item.index}));
        dispatch(decrementCount({_id: item.ingredient._id, type: item.ingredient.type}));
      }
    },
    hover(item) {
      setCurrentType(item.ingredientType);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const closeModal = () => {
    dispatch(hideIngredientInfo());
  }


  const handlePickCategory = (category) => {
    dispatch(setHighlightedCategory(category));
  };


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchIngredients());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (!bunRef.current || !sauceRef.current || !mainRef.current || !ingredientContainerRef.current) {
        return;
      }

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
        dispatch(setHighlightedCategory(visibleCategory));
      }
    };

    const ingredientContainer = ingredientContainerRef.current;
    ingredientContainer.addEventListener('scroll', handleScroll);
    return () => ingredientContainer.removeEventListener('scroll', handleScroll);
  }, [highlightedCategory, dispatch]);

  const outline = currentType !== 'new' && isHover ? '2px solid purple' : '';

  return (
    <>
      <section className={`${ingredientsStyle.container}`}>
        <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
        <IngredientsNavigation currentCategory={highlightedCategory} onPickCategory={handlePickCategory}
        refs={{bun: bunRef, sauce: sauceRef, main: mainRef}}/>
        <div ref={ingredientContainerRef} className={`${ingredientsStyle.ingredients__container} custom-scroll`} style={{outline}}>
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
      {itemDetails && <Modal title="Детали ингредиента" onClose={closeModal}>
        <IngredientDetails ingredient={itemDetails}/>
      </Modal>}
    </>
  )
}

export default BurgerIngredients;