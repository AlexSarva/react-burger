import React, {useEffect} from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {hideIngredientInfo} from "../../services/reducers/ingredient-info";
import NoContent from "../no-content/no-content";
import {clearOrder, hideOrder} from "../../services/reducers/orders";
import {clearConstructor} from "../../services/reducers/burger-constructor";
import {clearIngredients} from "../../services/reducers/ingredients";
import Preloader from "../preloader/preloader";

function App() {
  const dispatch = useDispatch();
  const { itemDetails, showDetails } = useSelector((state) => state.ingredientInfo);
  const { status, showOrder } = useSelector((state) => state.orders);

  const closeModal = () => {
    dispatch(hideIngredientInfo());
    dispatch(hideOrder());
    dispatch(clearOrder());
  };

  useEffect(() => {
    return () => {
      if (status === 'succeeded') {
        dispatch(clearConstructor());
        dispatch(clearIngredients());
      }
    };
  }, [dispatch, status]);


  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>

      {showDetails && itemDetails && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails ingredient={itemDetails}/>
        </Modal>
      )}

      {showOrder && (
        <Modal title="" onClose={closeModal}>
          {(status === 'loading')
            ? <Preloader />
            : (status === 'failed')
              ? <NoContent />
              : <OrderDetails />
          }
        </Modal>
      )}
    </>
  );
}

export default App;
