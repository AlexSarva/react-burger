import { getCookie, setCookie } from './cookie'
import { AUTH_SERVICE } from './constants'
import { TErrorResponse, TRefreshData, TRequest } from './api-types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkResponse = (res: Response): Promise<any> => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request = ({ address, path, options }: TRequest): Promise<any> => {
  const url = address + path
  return fetch(url, options).then(checkResponse)
}

const refreshToken = (): Promise<TRefreshData> => {
  const options: RequestInit = {
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
  }
  const parameters: TRequest = {
    address: AUTH_SERVICE,
    path: '/auth/token',
    options
  }
  return request(parameters)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requestWithRefresh = ({ address, path, options }: TRequest): Promise<any> => {
  const url = address + path
  return fetch(url, options)
    .then(checkResponse)
    .catch((err: TErrorResponse) => {
      if (err.body && ((err.body.message === 'Token is invalid') || (err.body.message === 'jwt expired'))) {
        return refreshToken()
          .then((refreshData) => {
            if (!refreshData.success) {
              return Promise.reject(refreshData)
            }
            const access: string = refreshData.accessToken
            const refreshToken: string = refreshData.refreshToken
            let accessToken: string
            if (access.indexOf('Bearer ') === 0) {
              accessToken = access.split('Bearer ')[1]
            } else {
              accessToken = access
            }
            setCookie('accessToken', accessToken)
            setCookie('refreshToken', refreshToken)
            const headers = { ...options.headers, authorization: refreshData.accessToken }
            return fetch(url, { ...options, headers })
          })
          .then(checkResponse)
      } else {
        return Promise.reject(err)
      }
    })
}
