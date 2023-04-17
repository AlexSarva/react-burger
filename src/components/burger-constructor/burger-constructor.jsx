import constructorStyle from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ConstructorElementType} from "../../utils/types.js";
import React, {useCallback, useMemo} from "react";
import {useIngredients} from "../../hook/useIngredients";
import {ingredientsApi} from "../../utils/ingredients-api";

const ResultInfo = React.memo(function ResultInfo({price, onOrderClick}) {
  const { getOrderNumber } = ingredientsApi();
  const {pickedIngredients} = useIngredients();

  const makeOrder = useCallback(() => {
    const bun = pickedIngredients.bun ? [pickedIngredients.bun._id, pickedIngredients.bun._id] : [];
    const options = pickedIngredients.options.map(option => option._id);
    getOrderNumber({ingredients: [...bun, ...options]})
      .then((response) => {
        onOrderClick({number: response.order.number, status: true});
      })
      .catch((err) => {
        onOrderClick({number: null, status: false});
        console.log(err);
      })
  },[getOrderNumber, onOrderClick, pickedIngredients]);

  return (
    <div className={`${constructorStyle.components__result} mt-10`}>
      <div className={`${constructorStyle.components__price} pt-1 pb-1 mr-10`}>
        <span className={"text text_type_digits-medium mr-2"}>{price}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <Button onClick={makeOrder} htmlType="button" type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  )
})

ResultInfo.propTypes = {
  price: PropTypes.number.isRequired,
  onOrderClick: PropTypes.func.isRequired
}

const DragConstructorElement = React.memo(function DragConstructorElement({num, ingredient}) {

  const {deleteOption} = useIngredients();

  const deleteIngredient = useCallback(() => {
    deleteOption(num, ingredient._id);
  }, [deleteOption, num, ingredient]);

  return (
    <div className={`${constructorStyle.components__element} ${constructorStyle.components__element_type_drag}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={deleteIngredient}
      />
    </div>
  )
})

DragConstructorElement.propTypes = {
  ingredient: ConstructorElementType,
  num: PropTypes.number.isRequired
}


const BunConstructorElement = React.memo(function BunConstructorElement({type, data}) {

  return (
    type === "top" ? <ConstructorElement
      type="top"
      isLocked={true}
      text={data.bun.name + ' (верх)'}
      price={data.bun.price}
      thumbnail={data.bun.image_mobile}
      extraClass={`${constructorStyle.components__element} ${constructorStyle.components__element_type_bun}`}
    /> : <ConstructorElement
    type="bottom"
    isLocked={true}
    text={data.bun.name + ' (низ)'}
    price={data.bun.price}
    thumbnail={data.bun.image_mobile}
    extraClass={`${constructorStyle.components__element} ${constructorStyle.components__element_type_bun}`}
    />
  )
})


const BurgerComponents = React.memo(function BurgerComponents() {
  const {pickedIngredients} = useIngredients();

  return (
    <div className={`${constructorStyle.components} pt-25`}>
      {pickedIngredients.bun && <BunConstructorElement type={'top'} data={pickedIngredients}/>}
      <div className={`${constructorStyle.components__inside} custom-scroll`}>
        {pickedIngredients.options && pickedIngredients.options.map((ingredient, index) => {
          return (
            <DragConstructorElement key={index}
                                    num={index}
                                    ingredient={ingredient}/>
          )
        })}
      </div>
      {pickedIngredients.bun && <BunConstructorElement type={'bottom'} data={pickedIngredients}/>}
    </div>
  );
})

const BurgerConstructor = React.memo(function BurgerConstructor({onOrderClick}) {

  const {pickedIngredients} = useIngredients();

  const totalPrice = useMemo(() => {
    const bunPrice = pickedIngredients.bun ? pickedIngredients.bun.price * 2 : 0;
    const optionsPrice = pickedIngredients.options ? pickedIngredients.options.reduce((sum, option) => sum + option.price, 0) : 0;
    return bunPrice + optionsPrice;
  }, [pickedIngredients]);

  return (
    <section className={constructorStyle.container}>
      <BurgerComponents />
      {(pickedIngredients.bun || pickedIngredients.options.length > 0)
      && <ResultInfo onOrderClick={onOrderClick} price={totalPrice}/>}
    </section>
  )
})

BurgerConstructor.propTypes = {
  onOrderClick: PropTypes.func.isRequired
}

export default BurgerConstructor;