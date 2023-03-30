import ingredientsStyle from './burger-ingredients.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const compData  = [
  {
    "_id":"60666c42cc7b410027a1a9b1",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":1255,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b5",
    "name":"Говяжий метеорит (отбивная)",
    "type":"main",
    "proteins":800,
    "fat":800,
    "carbohydrates":300,
    "calories":2674,
    "price":3000,
    "image":"https://code.s3.yandex.net/react/code/meat-04.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b6",
    "name":"Биокотлета из марсианской Магнолии",
    "type":"main",
    "proteins":420,
    "fat":142,
    "carbohydrates":242,
    "calories":4242,
    "price":424,
    "image":"https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b7",
    "name":"Соус Spicy-X",
    "type":"sauce",
    "proteins":30,
    "fat":20,
    "carbohydrates":40,
    "calories":30,
    "price":90,
    "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b4",
    "name":"Мясо бессмертных моллюсков Protostomia",
    "type":"main",
    "proteins":433,
    "fat":244,
    "carbohydrates":33,
    "calories":420,
    "price":1337,
    "image":"https://code.s3.yandex.net/react/code/meat-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b9",
    "name":"Соус традиционный галактический",
    "type":"sauce",
    "proteins":42,
    "fat":24,
    "carbohydrates":42,
    "calories":99,
    "price":15,
    "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b4",
    "name":"Мясо бессмертных моллюсков Protostomia",
    "type":"main",
    "proteins":433,
    "fat":244,
    "carbohydrates":33,
    "calories":420,
    "price":1337,
    "image":"https://code.s3.yandex.net/react/code/meat-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b9",
    "name":"Соус традиционный галактический",
    "type":"sauce",
    "proteins":42,
    "fat":24,
    "carbohydrates":42,
    "calories":99,
    "price":15,
    "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b4",
    "name":"Мясо бессмертных моллюсков Protostomia",
    "type":"main",
    "proteins":433,
    "fat":244,
    "carbohydrates":33,
    "calories":420,
    "price":1337,
    "image":"https://code.s3.yandex.net/react/code/meat-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b9",
    "name":"Соус традиционный галактический",
    "type":"sauce",
    "proteins":42,
    "fat":24,
    "carbohydrates":42,
    "calories":99,
    "price":15,
    "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b4",
    "name":"Мясо бессмертных моллюсков Protostomia",
    "type":"main",
    "proteins":433,
    "fat":244,
    "carbohydrates":33,
    "calories":420,
    "price":1337,
    "image":"https://code.s3.yandex.net/react/code/meat-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b9",
    "name":"Соус традиционный галактический",
    "type":"sauce",
    "proteins":42,
    "fat":24,
    "carbohydrates":42,
    "calories":99,
    "price":15,
    "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b8",
    "name":"Соус фирменный Space Sauce",
    "type":"sauce",
    "proteins":50,
    "fat":22,
    "carbohydrates":11,
    "calories":14,
    "price":80,
    "image":"https://code.s3.yandex.net/react/code/sauce-04.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png",
    "__v":0
  }]


const ResultInfo = ({price}) => {
  return (
    <div className={`${ingredientsStyle.components__result} mt-10`}>
      <div className={`${ingredientsStyle.components__price} pt-1 pb-1 mr-10`}>
        <span className={"text text_type_digits-medium mr-2"}>{price}</span>
        <CurrencyIcon type={"primary"} />
      </div>
      <Button htmlType="button" type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  )
}

const DragConstructorElement = ({ingredient}) => {
  return (
    <div className={`${ingredientsStyle.components__element}`}>
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

const BurgerComponents = ({ingredients, topBun, bottomBun}) => {
  return (
    <div className={`${ingredientsStyle.components} pt-25`} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center'}}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={topBun.name + ' (верх)'}
        price={topBun.price}
        thumbnail={topBun.image_mobile}
        extraClass={"pl-8"}
      />
      <div className={`${ingredientsStyle.components__inside} custom-scroll`} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center'}}>
        {ingredients.map((ingredient, index) => {
          return (
            <DragConstructorElement key={index} ingredient={ingredient}/>
          )
        })}
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={bottomBun.name + ' (низ)'}
        price={bottomBun.price}
        thumbnail={bottomBun.image_mobile}
        extraClass={"pl-8"}
      />
    </div>
  );
}

const BurgerIngredients = () => {
  return (
    <section className={ingredientsStyle.container}>
      <BurgerComponents ingredients={compData} topBun={compData[0]} bottomBun={compData[0]}/>
      <ResultInfo price={"1000"}/>
    </section>
  )
}

export default BurgerIngredients;