const baseUrl = 'https://norma.nomoreparties.space/api'
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({
    statusCode: res.status,
    statusText: res.statusText
  })
}

const request = (path, options) => {
  const url = baseUrl + path
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkResponse)
}

export const ingredientsApi = () => {
  const getIngredients = () => {
    return request('/ingredients', {
      headers,
      method: 'GET'
    })
  }

  const getOrderNumber = (payload) => {
    return request('/orders', {
      headers,
      method: 'POST',
      body: JSON.stringify(payload)
    })
  }

  return {
    getIngredients, getOrderNumber
  }
}
