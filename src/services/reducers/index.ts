import { combineReducers } from '@reduxjs/toolkit'
import ingredientsReducer, { IngredientsState } from './ingredients'
import ingredientInfoReducer, { IngredientInfoState } from './ingredient-info'
import burgerConstructorReducer, { BurgerConstructorState } from './burger-constructor'
import orderReducer, { OrderState } from './order'
import navReducer, { NavState } from './nav'
import authReducer, { AuthState } from './auth'
import ordersReducer, { OrdersState } from './orders'

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientInfo: ingredientInfoReducer,
  order: orderReducer,
  nav: navReducer,
  auth: authReducer,
  orders: ordersReducer
})

export type RootState = {
  ingredients: IngredientsState,
  burgerConstructor: BurgerConstructorState,
  ingredientInfo: IngredientInfoState,
  order: OrderState,
  nav: NavState,
  auth: AuthState
  orders: OrdersState
}

export default rootReducer
