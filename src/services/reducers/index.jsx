import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients';
import ingredientInfoReducer from './ingredient-info';
import burgerConstructorReducer from './burger-constructor';
import ordersReducer from './orders';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientInfo: ingredientInfoReducer,
  orders: ordersReducer,
});

export default rootReducer;