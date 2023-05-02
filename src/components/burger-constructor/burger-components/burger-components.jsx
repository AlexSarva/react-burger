import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {addIngredient} from "../../../services/reducers/burger-constructor";
import {incrementCount} from "../../../services/reducers/ingredients";
import style from "./burger-components.module.css";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import DragConstructorElement from "../drag-constructor-element/drag-constructor-element";

const BurgerComponents = () => {
  const [usedType, setUsedType] = useState(null);
  const {bun, options} = useSelector((state) => state.burgerConstructor);
  const dispatch = useDispatch();
  const [{isHover}, dropTarget] = useDrop({
    accept: "pickedIngredient",
    drop({ingredient}) {
      if (ingredient.type === 'bun') {
        dispatch(addIngredient({item: ingredient}));
        dispatch(incrementCount({_id: ingredient._id, type: ingredient.type}));
      }
      if (options.length === 0) {
        dispatch(addIngredient({item: ingredient}));
        dispatch(incrementCount({_id: ingredient._id, type: ingredient.type}));
      }
    },
    hover({ingredient}) {
      setUsedType(ingredient.type);
    },
    collect(monitor) {
      return ({
        isHover: (usedType === 'bun' || options.length === 0) && monitor.isOver(),
      })
    }
  });

  // const outline = isHover ? '2px solid #4C4CFF' : '';
  const outline = isHover ? '2px solid #4C4CFF' : '';

  return (
    <div ref={dropTarget} className={`${style.container}`} style={{outline}}>
      {bun && <ConstructorElement
        type="top"
        isLocked={true}
        text={bun.name + ' (верх)'}
        price={bun.price}
        thumbnail={bun.image_mobile}
        extraClass={`${style.element} ${style.element_type_bun}`}
      />}
      <div className={`${style.inside} custom-scroll`}>
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
        extraClass={`${style.element} ${style.element_type_bun} ${style.element_position_bottom}`}
      />}
    </div>
  );
};

export default BurgerComponents;