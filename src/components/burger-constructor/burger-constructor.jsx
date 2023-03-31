import constructorStyle from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {testData} from "../../utils/data.js";
import {ConstructorElementType} from "../../utils/types.js";

const ResultInfo = ({price}) => {
  return (
    <div className={`${constructorStyle.components__result} mt-10`}>
      <div className={`${constructorStyle.components__price} pt-1 pb-1 mr-10`}>
        <span className={"text text_type_digits-medium mr-2"}>{price}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <Button htmlType="button" type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  )
}

ResultInfo.propTypes = {
  price: PropTypes.number.isRequired,
}

const DragConstructorElement = ({ingredient}) => {
  return (
    <div className={`${constructorStyle.components__element}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        extraClass={'ml-2'}
      />
    </div>
  )
}

DragConstructorElement.propTypes = {
  ingredient: ConstructorElementType,
}

const BurgerComponents = ({ingredients, bun}) => {
  return (
    <div className={`${constructorStyle.components} pt-25`}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={bun.name + ' (верх)'}
        price={bun.price}
        thumbnail={bun.image_mobile}
        extraClass={"pl-8"}
      />
      <div className={`${constructorStyle.components__inside} custom-scroll`}>
        {ingredients.map((ingredient, index) => {
          return (
            <DragConstructorElement key={index} ingredient={ingredient}/>
          )
        })}
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={bun.name + ' (низ)'}
        price={bun.price}
        thumbnail={bun.image_mobile}
        extraClass={"pl-8"}
      />
    </div>
  );
}

BurgerComponents.prototype = {
  ingredients: PropTypes.arrayOf(ConstructorElementType),
  bun: ConstructorElementType,
}

const BurgerConstructor = () => {
  return (
    <section className={constructorStyle.container}>
      <BurgerComponents ingredients={testData} bun={testData[0]}/>
      <ResultInfo price={1000}/>
    </section>
  )
}

export default BurgerConstructor;