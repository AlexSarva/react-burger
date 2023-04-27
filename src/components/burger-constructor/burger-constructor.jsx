import constructorStyle from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ConstructorElementType} from "../../utils/types.js";
import {useDispatch, useSelector} from "react-redux";
import {removeIngredient} from "../../services/reducers/burger-constructor";
import {decrementCount} from "../../services/reducers/ingredients";
import {fetchOrder} from "../../services/reducers/orders";

const ResultInfo = () => {

  const {totalPrice, ingredients} = useSelector((state) => state.burgerConstructor);
  const dispatch = useDispatch();
  const handleOrderClick = () => {
    dispatch(fetchOrder({ingredients: ingredients}));
  }

  return (
    <div className={`${constructorStyle.components__result} mt-10`}>
      <div className={`${constructorStyle.components__price} pt-1 pb-1 mr-10`}>
        <span className={"text text_type_digits-medium mr-2"}>{totalPrice}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <Button onClick={handleOrderClick} htmlType="button" type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  )
}

const DragConstructorElement = ({index, ingredient}) => {

  const {_id, type, name, price, image_mobile } = ingredient;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeIngredient({index, item: ingredient}));
    dispatch(decrementCount({_id, type}));
  }

  return (
    <div className={`${constructorStyle.components__element} ${constructorStyle.components__element_type_drag}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image_mobile}
        handleClose={handleDelete}
      />
    </div>
  )
}

DragConstructorElement.propTypes = {
  ingredient: ConstructorElementType,
  index: PropTypes.number.isRequired
}

const BurgerComponents = () => {

  const { bun, options} = useSelector((state) => state.burgerConstructor);

  return (
    <div className={`${constructorStyle.components} pt-25`}>
      {bun && <ConstructorElement
        type="top"
        isLocked={true}
        text={bun.name + ' (верх)'}
        price={bun.price}
        thumbnail={bun.image_mobile}
        extraClass={`${constructorStyle.components__element} ${constructorStyle.components__element_type_bun}`}
      />}
      <div className={`${constructorStyle.components__inside} custom-scroll`}>
        {options && options.map((ingredient, index) => {
          return (
            <DragConstructorElement key={index}
                                    index={index}
                                    ingredient={ingredient}/>
          )
        })}
      </div>
      {bun && <ConstructorElement
        type="bottom"
        isLocked={true}
        text={bun.name + ' (низ)'}
        price={bun.price}
        thumbnail={bun.image_mobile}
        extraClass={`${constructorStyle.components__element} ${constructorStyle.components__element_type_bun}`}
      />}
    </div>
  );
}

const BurgerConstructor = () => {

  const { show } = useSelector((state) => state.burgerConstructor);

  return (
    <section className={constructorStyle.container}>
      <BurgerComponents />
      {show && <ResultInfo />}
    </section>
  )
}

export default BurgerConstructor;