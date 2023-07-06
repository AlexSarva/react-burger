import { getCookie, setCookie } from './cookie'
import { AUTH_SERVICE } from './constants'

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

export const request = (address, path, options) => {
  const url = address + path
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkResponse)
}

const refreshToken = () => {
  return request(AUTH_SERVICE, '/auth/token', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
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

export const requestWithRefresh = (address, path, options) => {
  const url = address + path
  return fetch(url, options)
    .then(checkResponse)
    .catch((err) => {
      if (err.body && ((err.body.message === 'Token is invalid') || (err.body.message === 'jwt expired'))) {
        return refreshToken()
          .then((refreshData) => {
            if (!refreshData.success) {
              return Promise.reject(refreshData)
            }
            const access = refreshData.accessToken
            let accessToken
            if (access.indexOf('Bearer ') === 0) {
              accessToken = access.split('Bearer ')[1]
            }
            setCookie('accessToken', accessToken)
            setCookie('refreshToken', refreshData.refreshToken)
            options.headers.authorization = refreshData.accessToken
            return fetch(url, options)
          })
          .then(checkResponse)
      } else {
        return Promise.reject(err)
      }
    })
}
