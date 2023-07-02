import {getCookie} from "./cookie";

const AUTH_SERVICE = 'https://norma.nomoreparties.space/api/auth'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
  // 'Authorization': `Basic ${token}`,
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  } else {
    return res.json().then((data) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        status: res.status,
        statusText: res.statusText,
        body: data
      })
    })
  }
}

const authApi = () => {
  const request = (path, options) => {
    const url = AUTH_SERVICE + path
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, options).then(checkResponse)
  }
  const register = (payload) => {
    const {email, password, name} = payload
    console.log({name, email, password})
    return request('/register', {
      headers,
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        name,
        email,
        password,
      })
    })
  }

  const login = (payload) => {
    const {email, password} = payload
    return request('/login', {
      headers,
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        email,
        password
      })
    })
  }

  const userInfo = ({accessToken}) => {
    return request('/user', {
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`
      },
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
  }

  const refreshToken = () => {
    return request('/token', {
      headers,
      method: 'POST',
      body: JSON.stringify({
        token: getCookie('refreshToken')
      })
    })
  }

  const logout = () => {
    return request('/logout', {
      headers,
      method: 'POST',
      body: JSON.stringify({
        token: getCookie('refreshToken')
      })
    })
  }

  return {
    register, login, userInfo, refreshToken, logout
  }
}

export default authApi
