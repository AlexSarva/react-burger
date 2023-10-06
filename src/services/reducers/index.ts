import { combineReducers } from '@reduxjs/toolkit'
import ingredientsReducer, { IngredientsState } from './ingredients'
import ingredientInfoReducer, { IngredientInfoState } from './ingredient-info'
import burgerConstructorReducer, { BurgerConstructorState } from './burger-constructor'
import ordersReducer, { OrdersState } from './orders'
import navReducer, { NavState } from './nav'
import authReducer, { AuthState } from './auth'

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientInfo: ingredientInfoReducer,
  orders: ordersReducer,
  nav: navReducer,
  auth: authReducer
})

export type RootState = {
  ingredients: IngredientsState,
  burgerConstructor: BurgerConstructorState,
  ingredientInfo: IngredientInfoState,
  orders: OrdersState,
  nav: NavState,
  auth: AuthState
}

export default rootReducer
