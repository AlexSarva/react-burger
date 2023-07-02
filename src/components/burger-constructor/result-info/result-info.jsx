import {useDispatch, useSelector} from "react-redux";
import {fetchOrder} from "../../../services/reducers/orders";
import style from "./result-info.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

const ResultInfo = () => {

  const {totalPrice, ingredients} = useSelector((state) => state.burgerConstructor);
  const dispatch = useDispatch();
  const handleOrderClick = () => {
    dispatch(fetchOrder({ingredients: ingredients}));
  }

  return (
    <div className={`${style.container} mt-10`}>
      <div className={`${style.price} pt-1 pb-1 mr-10`}>
        <span className={"text text_type_digits-medium mr-2"}>{totalPrice}</span>
        <CurrencyIcon type={"primary"}/>
      </div>
      <Button onClick={handleOrderClick} htmlType="button" type="primary" size="large">
        Оформить заказ
      </Button>
    </div>
  )
};

export default ResultInfo;