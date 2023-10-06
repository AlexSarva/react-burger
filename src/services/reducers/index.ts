import { combineReducers } from '@reduxjs/toolkit'
import ingredientsReducer, { IngredientsState } from './ingredients'
import ingredientInfoReducer, { IngredientInfoState } from './ingredient-info'
import burgerConstructorReducer, { BurgerConstructorState } from './burger-constructor'
import ordersReducer, { OrdersState } from './orders'
import navReducer, { NavState } from './nav'
import authReducer, { AuthState } from './auth'
import feedReducer, { FeedState } from './feed'

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientInfo: ingredientInfoReducer,
  orders: ordersReducer,
  nav: navReducer,
  auth: authReducer,
  feed: feedReducer
})

export type RootState = {
  ingredients: IngredientsState,
  burgerConstructor: BurgerConstructorState,
  ingredientInfo: IngredientInfoState,
  orders: OrdersState,
  nav: NavState,
  auth: AuthState
  feed: FeedState
}

export default rootReducer
