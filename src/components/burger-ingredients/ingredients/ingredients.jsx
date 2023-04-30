import React, {forwardRef} from "react";
import {ingredientsMapping} from "../../../utils/constants";
import {useSelector} from "react-redux";
import style from "./ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import PropTypes from "prop-types";

const Ingredients = forwardRef(({type}, ref) => {
  const title = ingredientsMapping[type];
  const ingredients = useSelector((state) => state.ingredients.items[type]);

  return (
    <div ref={ref} className={`${style.container} pt-10 custom-scroll`}>
      <h2>{title}</h2>
      <ul className={style.elements}>
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

export default Ingredients;

