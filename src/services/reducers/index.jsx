import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients';
import ingredientInfoReducer from './ingredient-info';
import burgerConstructorReducer from './burger-constructor';
import ordersReducer from './orders';
import navReducer from './nav';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientInfo: ingredientInfoReducer,
  orders: ordersReducer,
  nav: navReducer
});

export default rootReducer;