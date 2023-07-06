import { getCookie } from './cookie'
import { request, requestWithRefresh } from './api-utils'
import { BURGER_SERVICE } from './constants'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export const ingredientsApi = () => {
  const getIngredients = () => {
    return request(BURGER_SERVICE, '/ingredients', {
      headers,
      method: 'GET'
    })
  }

  const getOrderNumber = (payload) => {
    const token = getCookie('accessToken')
    return requestWithRefresh(BURGER_SERVICE, '/orders', {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })
  }

  return {
    getIngredients, getOrderNumber
  }
}
