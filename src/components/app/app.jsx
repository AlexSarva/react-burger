import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {IngredientsProvider} from "../../hoc/ingredients-provider";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {ingredientsApi} from "../../utils/ingredients-api";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

function App() {
  const [order, setOrder] = useState({
    number: 0,
    status: false
  });
  const [isIngModalOpen, setIsIngModalOpen] = useState(false);
  const [ingredients, setIngredients] = useState({
    buns: [],
    mains: [],
    sauces: []
  });
  const [ingredientInfo, setIngredientInfo] = useState({})
  const { getIngredients } =  ingredientsApi();

  const closeModal = useCallback(() => {
    setIsIngModalOpen(false);
    setOrder({status: false, number: null});
    setIngredientInfo({})
  }, []);

  const openIngDetailsModal = useCallback((info) => {
    setIngredientInfo(info)
    setIsIngModalOpen(true);
  }, []);

  const openOrderDetailsModal = ({number, status}) => {
    setOrder({...order, number: number, status: status})
  };

  useEffect(() => {
    getIngredients()
      .then(({data, success}) => {
        if (success === true) {
          setIngredients({
            buns: data.filter(item => item.type === "bun"),
            mains: data.filter(item => item.type === "main"),
            sauces: data.filter(item => item.type === "sauce")
          })
        } else {
          console.log('something went wrong');
        }
      })
      .catch((err) => {
        console.log(err);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const memoizedIngredients = useMemo(() => {
    return {
      buns: ingredients.buns,
      mains: ingredients.mains,
      sauces: ingredients.sauces,
    };
  }, [ingredients]);

  return (
    <>
      <AppHeader />
      <IngredientsProvider>
        <BurgerIngredients ingredients={memoizedIngredients}
                           onClickIng={openIngDetailsModal}
        />
        <BurgerConstructor onOrderClick={openOrderDetailsModal} />
      </IngredientsProvider>

      {isIngModalOpen && ingredientInfo && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails ingredient={ingredientInfo}/>
        </Modal>
      )}
      {order.status === true && (
        <Modal title="" onClose={closeModal}>
          <OrderDetails orderNumber={order.number} />
        </Modal>
      )}
    </>
  );
}

export default App;
