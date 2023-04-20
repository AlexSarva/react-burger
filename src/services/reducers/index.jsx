import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients';
// import constructorReducer from './constructor';
// import ingredientDetailsReducer from './ingredientDetails';
// import ordersReducer from './orders';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  // constructor: constructorReducer,
  // ingredientDetails: ingredientDetailsReducer,
  // order: orderReducer,
});

export default rootReducer;