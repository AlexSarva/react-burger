import constructorStyle from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ConstructorElementType} from "../../utils/types.js";
import {useEffect, useState} from "react";

const ResultInfo = ({price, onOrderClick}) => {
  return (
    <div className={`${constructorStyle.components__result} mt-10`}>
      <div className={`${constructorStyle.components__price} pt-1 pb-1 mr-10`}>
        <span className={"text text_type_digits-medium mr-2"}>{price}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <Button onClick={onOrderClick} htmlType="button" type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  )
}

ResultInfo.propTypes = {
  price: PropTypes.number.isRequired,
  onOrderClick: PropTypes.func.isRequired
}

const DragConstructorElement = ({num, ingredient, onDeleteIngredient}) => {

  const deleteIngredient = () => {
    onDeleteIngredient(num, ingredient._id);
  }

  return (
    <div className={`${constructorStyle.components__element} ${constructorStyle.components__element_type_drag}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={deleteIngredient}
        // extraClass={}
      />
    </div>
  )
}

DragConstructorElement.propTypes = {
  ingredient: ConstructorElementType,
  num: PropTypes.number.isRequired,
  onDeleteIngredient: PropTypes.func.isRequired
}

const BurgerComponents = ({ingredients, onDeleteIngredient}) => {
  return (
    <div className={`${constructorStyle.components} pt-25`}>
      {ingredients.bun && <ConstructorElement
        type="top"
        isLocked={true}
        text={ingredients.bun.name + ' (верх)'}
        price={ingredients.bun.price}
        thumbnail={ingredients.bun.image_mobile}
        extraClass={`${constructorStyle.components__element} ${constructorStyle.components__element_type_bun}`}
      />}
      <div className={`${constructorStyle.components__inside} custom-scroll`}>
        {ingredients.options && ingredients.options.map((ingredient, index) => {
          return (
            <DragConstructorElement key={index}
                                    num={index}
                                    ingredient={ingredient}
                                    onDeleteIngredient={onDeleteIngredient}/>
          )
        })}
      </div>
      {ingredients.bun && <ConstructorElement
        type="bottom"
        isLocked={true}
        text={ingredients.bun.name + ' (низ)'}
        price={ingredients.bun.price}
        thumbnail={ingredients.bun.image_mobile}
        extraClass={`${constructorStyle.components__element} ${constructorStyle.components__element_type_bun}`}
      />}
    </div>
  );
}

BurgerComponents.propTypes = {
  ingredients: PropTypes.shape({
    bun: ConstructorElementType,
    options: PropTypes.arrayOf(ConstructorElementType.isRequired)
  })
}

const BurgerConstructor = ({pickedIngredients, onOrderClick, onDeleteIngredient}) => {

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() =>{
    setTotalPrice(() => {
      const bunPrice = pickedIngredients.bun ? pickedIngredients.bun.price : 0;
      const optionsPrice = pickedIngredients.options? pickedIngredients.options.reduce((sum, option) => sum + option.price, 0) : 0;
      return bunPrice + optionsPrice;
    });
  },[pickedIngredients])

  return (
    <section className={constructorStyle.container}>
      <BurgerComponents ingredients={pickedIngredients} onDeleteIngredient={onDeleteIngredient}/>
      {(pickedIngredients.bun || pickedIngredients.options.length > 0)
      && <ResultInfo onOrderClick={onOrderClick} price={totalPrice}/>}
    </section>
  )
}

export default BurgerConstructor;