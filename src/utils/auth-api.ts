import { getCookie } from './cookie'
import { request, requestWithRefresh } from './api-utils'
import { AUTH_SERVICE } from './constants'
import { THeaders } from './api-types'

export type TAuth = {
  email: string;
  password: string;
  name?: string;
}

export type TUser = {
  email: string;
  name: string;
}

export type TAuthOptional = Partial<TAuth>;

export type TAuthResponse = {
  success: boolean;
  user: TUser,
  accessToken: string;
  refreshToken: string;
}

export type TSmallResponse = {
  success: boolean;
  message: string;
}

export type TUserInfo = Pick<TAuthResponse, 'success' | 'user'>

export type TResetPassword = Pick<TAuth, 'email'>

export type TResetPasswordConfirm = Pick<TAuth, 'password'> & { token: string }

const headers: THeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const authApi = (): {
  register: (payload: TAuth) => Promise<TAuthResponse>;
  login: (payload: TAuth) => Promise<TAuthResponse>;
  userInfo: () => Promise<TUserInfo>;
  logout: () => Promise<TSmallResponse>;
  resetPassword: (payload: TResetPassword) => Promise<TSmallResponse>;
  changePassword: (payload: TResetPasswordConfirm) => Promise<TSmallResponse>;
  patchUser: (payload: TAuthOptional) => Promise<TAuthResponse>;
} => {
  const register = (payload: TAuth): Promise<TAuthResponse> => {
    return request({
      address: AUTH_SERVICE,
      path: '/auth/register',
      options: {
        headers,
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload)
      }
    })
  }

  const login = (payload: TAuth): Promise<TAuthResponse> => {
    return request({
      address: AUTH_SERVICE,
      path: '/auth/login',
      options: {
        headers,
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload)
      }
    })
  }

  const userInfo = (): Promise<TUserInfo> => {
    const token = getCookie('accessToken')
    return requestWithRefresh({
      address: AUTH_SERVICE,
      path: '/auth/user',
      options: {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`
        },
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      }
    })
  }

  const patchUser = (payload: TAuthOptional) => {
    const token = getCookie('accessToken')
    return requestWithRefresh({
      address: AUTH_SERVICE,
      path: '/auth/user',
      options: {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`
        },
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload)
      }
    })
  }

  const logout = (): Promise<TSmallResponse> => {
    return request({
      address: AUTH_SERVICE,
      path: '/auth/logout',
      options: {
        headers,
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          token: getCookie('refreshToken')
        })
      }
    })
  }

  const resetPassword = (payload: TResetPassword): Promise<TSmallResponse> => {
    return request({
      address: AUTH_SERVICE,
      path: '/password-reset',
      options: {
        headers,
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload)
      }
    })
  }

  const changePassword = (payload: TResetPasswordConfirm) => {
    return request({
      address: AUTH_SERVICE,
      path: '/password-reset/reset',
      options: {
        headers,
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload)
      }
    })
  }

  return {
    register, login, userInfo, logout, resetPassword, changePassword, patchUser
  }
}

export default authApi
