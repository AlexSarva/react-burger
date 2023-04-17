import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {ingredientsApi} from "../../utils/ingredients-api";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {IngredientsContext} from "../../services/ingredientsContext";

function App() {
  const [orderNumber, setOrderNumber] = useState(null);
  const [bunCount, setBunCount] = useState({});
  const [sauceCount, setSauceCount] = useState({});
  const [mainCount, setMainCount] = useState({});
  const [isIngModalOpen, setIsIngModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [ingredients, setIngredients] = useState({
    buns: [],
    mains: [],
    sauces: []
  });
  const [pickedIngredients, setPickedIngredients] = useState({
    bun: null,
    options: [],
  });
  const [ingredientInfo, setIngredientInfo] = useState({})
  const { getIngredients, getOrderNumber } =  ingredientsApi();

  const pickBun = (bun) => {
    setPickedIngredients({...pickedIngredients, bun: bun})
  }
  const pickOption = (item) => {
    setPickedIngredients({...pickedIngredients, options: [...pickedIngredients.options, item]})
  }
  const addToOrder = (id, type, ingredient) => {
    if (type === 'bun') {
      pickBun(ingredient)
      setBunCount(() => {
        const newCnt = {}
        newCnt[id] = 1
        return newCnt
      });
    } else if (type === 'main') {
      pickOption(ingredient)
      setMainCount({...mainCount, [id]: mainCount[id]? mainCount[id] + 1 : 1});
    } else if (type === 'sauce') {
      pickOption(ingredient)
      setSauceCount({...sauceCount, [id]: sauceCount[id]? sauceCount[id] + 1 : 1});
    }
  }

  const deleteOption = (index, id) => {
    setPickedIngredients({...pickedIngredients,
      options: [...pickedIngredients.options.slice(0, index),
        ...pickedIngredients.options.slice(index + 1)]})
    setMainCount((prev) => {
      const newCnt = {...prev}
      newCnt[id] = prev[id]? prev[id] - 1 : 0
      return newCnt
    })
    setSauceCount((prev) => {
      const newCnt = {...prev}
      newCnt[id] = prev[id]? prev[id] - 1 : 0
      return newCnt
    })
  }

  const closeModal = () => {
    setIsIngModalOpen(false);
    setIsOrderModalOpen(false);
    setIngredientInfo({})
  };

  const openIngDetailsModal = (info) => {
    setIngredientInfo(info)
    setIsIngModalOpen(true);
  }

  const makeOrder = () => {
    setOrderNumber(null)
    const bun = pickedIngredients.bun ? [pickedIngredients.bun._id, pickedIngredients.bun._id] : [];
    const options = pickedIngredients.options.map(option => option._id);
    getOrderNumber({ingredients: [...bun, ...options]})
      .then((response) => {
        setOrderNumber(response.order.number);
      })
      .then(() => {
        setIsOrderModalOpen(true);
      })
      .catch((err) => {
        setOrderNumber(null);
        console.log(err);
      })
  }

  const openOrderDetailsModal = () => {
    makeOrder();
  }

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

  return (
    <>
      <AppHeader />
      <BurgerIngredients ingredients={ingredients}
                         onAddToOrder={addToOrder}
                         onClickIng={openIngDetailsModal}
                         bunCount={bunCount}
                         sauceCount={sauceCount}
                         mainCount={mainCount}
      />
      <IngredientsContext.Provider value={{pickedIngredients, deleteOption}}>
        <BurgerConstructor onOrderClick={openOrderDetailsModal} />
      </IngredientsContext.Provider>

      {isIngModalOpen && ingredientInfo && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails ingredient={ingredientInfo}/>
        </Modal>
      )}
      {isOrderModalOpen && (
        <Modal title="" onClose={closeModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
}

export default App;
