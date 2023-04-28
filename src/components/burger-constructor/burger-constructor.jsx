import constructorStyle from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ConstructorElementType} from "../../utils/types.js";
import {useDispatch, useSelector} from "react-redux";
import {
  addIngredient,
  onDrop,
  removeIngredient,
  setDropIndex,
} from "../../services/reducers/burger-constructor";
import {decrementCount, incrementCount} from "../../services/reducers/ingredients";
import {fetchOrder} from "../../services/reducers/orders";
import {useDrag, useDrop} from "react-dnd";
import {useRef, useState} from "react";

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
  const ref = useRef(null);
  const [pickedType, setPickedType] = useState(null);
  const {_id, type, name, price, image_mobile } = ingredient;
  const dispatch = useDispatch();
  const { position } = useSelector((state) => state.burgerConstructor.dragDropIndexes);
  const [{isDragging}, dragPicked] = useDrag({
    type: 'pickedIngredient',
    item: () => {
      return { index, ingredientType: 'exist', ingredient}
    },
    collect: (monitor) => ({
    isDragging: monitor.isDragging(),
  }),
  }
);

  const [{ isOver}, dropPicked] = useDrop({
    accept: 'pickedIngredient',
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
      }
    },
    hover(item, monitor) {
      setPickedType(item.ingredient.type);
      if (item.ingredient.type === 'bun') {
        return
      }
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const dropIndex = index
      if (dragIndex === dropIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < dropIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > dropIndex && hoverClientY > hoverMiddleY) {
        return
      }

      dispatch(setDropIndex({
        dropIndex: hoverClientY < hoverMiddleY ? dropIndex : (dropIndex + 1),
        position: hoverClientY < hoverMiddleY ? 'top' : 'bottom'
      }))

    },
    drop({index, ingredientType, ingredient} ) {
      if (ingredientType === 'exist') {
        dispatch(onDrop({dragIndex: index}))
      } else {
        dispatch(addIngredient({item: ingredient}));
        dispatch(incrementCount({_id: ingredient._id, type: ingredient.type}));
      }
    }
  })

  const handleDelete = () => {
    dispatch(removeIngredient({index, item: ingredient}));
    dispatch(decrementCount({_id, type}));
  }

  const opacity = isDragging ? 0 : 1
  const display = isDragging ? 'none' : ''
  const padding = pickedType !== 'bun' && isOver ? (position === 'top') ? '7px 0 0 0' : '0 0 7px 0' : ''
  const borderTop = pickedType !== 'bun' && isOver ? (position === 'top') ? '3px solid #4C4CFF' : '' : ''
  const borderBottom = pickedType !== 'bun' && isOver ? (position === 'bottom') ? '3px solid #4C4CFF' : '' : ''
  dragPicked(dropPicked(ref))

  return (
    <div ref={ref}
         className={`${constructorStyle.components__element} ${constructorStyle.components__element_type_drag}`}
         style={{ opacity, padding, display, borderTop, borderBottom }}>
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
  const [usedType, setUsedType] = useState(null);
  const { bun, options} = useSelector((state) => state.burgerConstructor);
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
    <div ref={dropTarget} className={`${constructorStyle.components}`} style={{outline}}>
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
        extraClass={`${constructorStyle.components__element} ${constructorStyle.components__element_type_bun} ${constructorStyle.components__element_bottom}`}
      />}
    </div>
  );
}

const EmptyConstructor = () => {
  const { options} = useSelector((state) => state.burgerConstructor);
  const dispatch = useDispatch();
  const [{isHover}, dropTarget] = useDrop({
    accept: "pickedIngredient",
    drop({ingredient}) {
      if (options.length === 0) {
        dispatch(addIngredient({item: ingredient}));
        dispatch(incrementCount({_id: ingredient._id, type: ingredient.type}));
      }
    },
    collect: monitor => ({
      isHover: options.length === 0 && monitor.isOver(),
    })
  });

  const outline = isHover ? '2px solid #4C4CFF' : '';

  return (
    <div ref={dropTarget} className={constructorStyle.empty} style={{outline}}>
      <p className={`text text_type_main-large text_color_inactive mb-5`}>Перетащите сюда</p>
      <p className={`text text_type_main-large text_color_inactive`}>ингредиенты</p>
    </div>
  )
}

const BurgerConstructor = () => {

  const { bun, options } = useSelector((state) => state.burgerConstructor);

  return (
    <section className={constructorStyle.container}>
      <div className={constructorStyle.constructor}>
        {!bun && options.length === 0 ? <EmptyConstructor /> : <BurgerComponents />}
      </div>
      <ResultInfo />
    </section>
  )
}

export default BurgerConstructor;