import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {
  return (
    <>
      <AppHeader />
      <BurgerConstructor />
      <BurgerIngredients />
    </>
  );
}

export default App;
