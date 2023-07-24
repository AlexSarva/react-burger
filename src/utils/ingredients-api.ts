import { getCookie } from './cookie'
import { request, requestWithRefresh } from './api-utils'
import { BURGER_SERVICE } from './constants'
import { TIngredient } from './ingrediens-types'
import { THeaders } from './api-types'

const headers: THeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export type TIngredientOrder = {
  ingredients: Array<string>;
}

export type TOrderResponse = {
  success: boolean;
  name: string;
  order: {
    number: number;
  }
}

export type TIngredientsResponse = {
  success: boolean;
  data: Array<TIngredient>;
}

export const ingredientsApi = (): {
  getIngredients: () => Promise<TIngredientsResponse>;
  getOrderNumber: (payload: TIngredientOrder) => Promise<TOrderResponse>;
} => {
  const getIngredients = (): Promise<TIngredientsResponse> => {
    return request({
      address: BURGER_SERVICE,
      path: '/ingredients',
      options: {
        headers,
        method: 'GET'
      }
    })
  }

  const getOrderNumber = (payload: TIngredientOrder): Promise<TOrderResponse> => {
    const token = getCookie('accessToken')
    return requestWithRefresh({
      address: BURGER_SERVICE,
      path: '/orders',
      options: {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify(payload)
      }
    })
  }

  return {
    getIngredients, getOrderNumber
  }
}
