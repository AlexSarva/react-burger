import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useIngredientsAPI} from "../../hooks/use-ingredients-api";
import ModalIngredients from "../modal-ingredients/modal-ingredients";

function App() {
  const [isIngModalOpen, setIsIngModalOpen] = useState(false);
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
  const { getIngredients} = useIngredientsAPI();

  const pickBun = (bun) => {
    setPickedIngredients({...pickedIngredients, bun: bun})
  }
  const pickOption = (item) => {
    setPickedIngredients({...pickedIngredients, options: [...pickedIngredients.options, item]})
  }

  const closeModal = () => {
    setIsIngModalOpen(false);
    setIngredientInfo({})
  };

  const handleIngInfo = (info) => {
    setIngredientInfo(info)
    setIsIngModalOpen(true);
  }


  useEffect(() => {
    getIngredients()
      .then(({data, success}) => {
        console.log(data);
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
  },[])

  return (
    <>
      <AppHeader />
      <BurgerIngredients ingredients={ingredients}
                         onClickBun={pickBun}
                         onClickOption={pickOption}
                         onClickIng={handleIngInfo}
      />
      <BurgerConstructor pickedIngredients={pickedIngredients} />
      {isIngModalOpen && ingredientInfo && <ModalIngredients ingredient={ingredientInfo} onClose={closeModal} />}
    </>
  );
}

export default App;
