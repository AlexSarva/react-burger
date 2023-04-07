import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useIngredientsAPI} from "../../hooks/use-ingredients-api";

function App() {

  const [ingredients, setIngredients] = useState({
    buns: [],
    mains: [],
    sauces: []
  });
  const [pickedIngredients, setPickedIngredients] = useState({
    bun: null,
    options: [],
  });
  const { getIngredients} = useIngredientsAPI();

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
  },[getIngredients])

  const pickBun = (bun) => {
    setPickedIngredients({...pickedIngredients, bun: bun})
  }

  const pickOption = (item) => {
    setPickedIngredients({...pickedIngredients, options: [...pickedIngredients.options, item]})
  }

  return (
    <>
      <AppHeader />
      <BurgerIngredients ingredients={ingredients}
                         onClickBun={pickBun}
                         onClickOption={pickOption}
      />
      <BurgerConstructor pickedIngredients={pickedIngredients} />
    </>
  );
}

export default App;
