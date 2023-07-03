import { getCookie } from './cookie'

const AUTH_SERVICE = 'https://norma.nomoreparties.space/api'

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
    const { email, password, name } = payload
    return request('/auth/register', {
      headers,
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
  }

  const login = (payload) => {
    const { email, password } = payload
    return request('/auth/login', {
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

  const userInfo = ({ accessToken }) => {
    return request('/auth/user', {
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`
      },
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    })
  }

  const patchUser = (payload) => {
    const { name, email, password } = payload
    const token = getCookie('accessToken')
    return request('/auth/user', {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`
      },
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        name, email, password
      })
    })
  }

  const refreshToken = () => {
    return request('/auth/token', {
      headers,
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        token: getCookie('refreshToken')
      })
    })
  }

  const logout = () => {
    return request('/auth/logout', {
      headers,
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        token: getCookie('refreshToken')
      })
    })
  }

  const resetPassword = (payload) => {
    const { email } = payload
    return request('/password-reset', {
      headers,
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        email
      })
    })
  }

  const changePassword = (payload) => {
    const { password, token } = payload
    return request('/password-reset/reset', {
      headers,
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        password,
        token
      })
    })
  }

  return {
    register, login, userInfo, refreshToken, logout, resetPassword, changePassword, patchUser
  }
}

export default authApi
