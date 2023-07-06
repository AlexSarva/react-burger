import { getCookie } from './cookie'
import { request, requestWithRefresh } from './api-utils'
import { AUTH_SERVICE } from './constants'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
  // 'Authorization': `Basic ${token}`,
}

const authApi = () => {
  const register = (payload) => {
    const { email, password, name } = payload
    return request(AUTH_SERVICE, '/auth/register', {
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
    return request(AUTH_SERVICE, '/auth/login', {
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

  const userInfo = () => {
    const token = getCookie('accessToken')
    return requestWithRefresh(AUTH_SERVICE, '/auth/user', {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`
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
    return requestWithRefresh(AUTH_SERVICE, '/auth/user', {
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

  const logout = () => {
    return request(AUTH_SERVICE, '/auth/logout', {
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
    return request(AUTH_SERVICE, '/password-reset', {
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
    return request(AUTH_SERVICE, '/password-reset/reset', {
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
    register, login, userInfo, logout, resetPassword, changePassword, patchUser
  }
}

export default authApi
