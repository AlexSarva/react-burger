import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi, { TAuth, TAuthOptional, TAuthResponse, TSmallResponse, TUser, TUserInfo } from '../../utils/auth-api'
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie'
import { TErrorResponse } from '../../utils/api-types'
import { RootState } from './index'

const { login, register, userInfo, logout, patchUser } = authApi()

enum FetchStatus {
  idle = 'idle',
  loading = 'loading',
  succeeded = 'succeeded',
  failed = 'failed'
}

type TError = {
  code: number | null;
  message: string | null;
  reason: string | null;
}

export type AuthState = {
  isAuthChecked: boolean;
  user: TUser | null,
  token: string | null;
  statuses: {
    loginStatus: FetchStatus;
    registerStatus: FetchStatus;
    userInfoStatus: FetchStatus;
    patchUserInfoStatus: FetchStatus;
    logoutStatus: FetchStatus;
  },
  errors: {
    isError: boolean;
    loginError: TError | null;
    registerError: TError | null;
    userInfoError: TError | null;
    patchUserInfoError: TError | null;
    logoutError: TError | null;
  }
}

const initialState: AuthState = {
  isAuthChecked: false,
  user: null,
  token: null,
  statuses: {
    loginStatus: FetchStatus.idle,
    registerStatus: FetchStatus.idle,
    userInfoStatus: FetchStatus.idle,
    patchUserInfoStatus: FetchStatus.idle,
    logoutStatus: FetchStatus.idle
  },
  errors: {
    isError: false,
    loginError: null,
    registerError: null,
    userInfoError: null,
    patchUserInfoError: null,
    logoutError: null
  }
}

export const fetchLogin = createAsyncThunk<TAuthResponse, TAuth, { rejectValue: TErrorResponse }>(
  'auth/login/fetch',
  async (newUser: TAuth, thunkAPI) => {
    try {
      return await login(newUser)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  })

export const fetchLogout = createAsyncThunk<TSmallResponse, void, { rejectValue: TErrorResponse }>(
  'auth/logout/fetch',
  async (_, thunkAPI) => {
    try {
      return await logout()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  })

export const fetchRegister = createAsyncThunk<TAuthResponse, TAuth, { rejectValue: TErrorResponse }>(
  'auth/register/fetch',
  async (newUser, thunkAPI) => {
    try {
      return await register(newUser)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  })

export const fetchUserInfo = createAsyncThunk<TUserInfo, void, { rejectValue: TErrorResponse }>(
  'auth/user-info/fetch',
  async (_, thunkAPI) => {
    try {
      return await userInfo()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  })

export const fetchPatchUserInfo = createAsyncThunk<TAuthResponse, TAuthOptional, { rejectValue: TErrorResponse }>(
  'auth/patch-user-info/fetch',
  async (newUser, thunkAPI) => {
    try {
      return await patchUser(newUser)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  })

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state, action) => {
      const { error } = action.payload
      state.errors = {
        ...state.errors,
        [error]: null
      }
    },
    resetStatus: (state, action) => {
      const { status } = action.payload
      state.statuses = {
        ...state.statuses,
        [status]: FetchStatus.idle
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.statuses = { ...state.statuses, loginStatus: FetchStatus.loading }
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.statuses = { ...state.statuses, loginStatus: FetchStatus.succeeded }
        state.user = action.payload.user
        const access = action.payload.accessToken
        let accessToken
        if (access.indexOf('Bearer ') === 0) {
          accessToken = access.split('Bearer ')[1]
        } else {
          accessToken = access
        }
        setCookie('accessToken', accessToken)
        const refreshToken = action.payload.refreshToken
        setCookie('refreshToken', refreshToken)
        state.token = accessToken
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.statuses = { ...state.statuses, loginStatus: FetchStatus.failed }
        state.errors = {
          ...state.errors,
          isError: true,
          loginError: {
            code: action.payload ? action.payload.status : null,
            message: action.payload ? action.payload.statusText : null,
            reason: action.payload ? action.payload.body ? action.payload.body.message : null : null
          }
        }
      })
      .addCase(fetchRegister.pending, (state) => {
        state.statuses = { ...state.statuses, registerStatus: FetchStatus.loading }
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.statuses = { ...state.statuses, registerStatus: FetchStatus.succeeded }
        state.user = action.payload.user
        const access = action.payload.accessToken
        let accessToken
        if (access.indexOf('Bearer ') === 0) {
          accessToken = access.split('Bearer ')[1]
        } else {
          accessToken = access
        }
        setCookie('accessToken', accessToken)
        const refreshToken = action.payload.refreshToken
        setCookie('refreshToken', refreshToken)
        state.token = accessToken
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.statuses = { ...state.statuses, registerStatus: FetchStatus.failed }
        state.errors = {
          ...state.errors,
          isError: true,
          registerError: {
            code: action.payload ? action.payload.status : null,
            message: action.payload ? action.payload.statusText : null,
            reason: action.payload ? action.payload.body ? action.payload.body.message : null : null
          }
        }
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.statuses = { ...state.statuses, userInfoStatus: FetchStatus.loading }
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.statuses = { ...state.statuses, userInfoStatus: FetchStatus.succeeded }
        state.user = action.payload.user
        state.token = getCookie('accessToken')
        state.isAuthChecked = true
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.statuses = { ...state.statuses, userInfoStatus: FetchStatus.failed }
        state.isAuthChecked = true
        state.errors = {
          ...state.errors,
          isError: true,
          userInfoError: {
            code: action.payload ? action.payload.status : null,
            message: action.payload ? action.payload.statusText : null,
            reason: action.payload ? action.payload.body ? action.payload.body.message : null : null
          }
        }
      })
      .addCase(fetchLogout.pending, (state) => {
        state.statuses = { ...state.statuses, logoutStatus: FetchStatus.loading }
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.statuses = { ...state.statuses, logoutStatus: FetchStatus.succeeded }
        state.user = null
        state.token = null
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.statuses = { ...state.statuses, logoutStatus: FetchStatus.failed }
        state.errors = {
          ...state.errors,
          isError: true,
          logoutError: {
            code: action.payload ? action.payload.status : null,
            message: action.payload ? action.payload.statusText : null,
            reason: action.payload ? action.payload.body ? action.payload.body.message : null : null
          }
        }
      })
      .addCase(fetchPatchUserInfo.pending, (state) => {
        state.statuses = { ...state.statuses, patchUserInfoStatus: FetchStatus.loading }
      })
      .addCase(fetchPatchUserInfo.fulfilled, (state, action) => {
        state.statuses = { ...state.statuses, patchUserInfoStatus: FetchStatus.succeeded }
        state.user = action.payload.user
      })
      .addCase(fetchPatchUserInfo.rejected, (state, action) => {
        state.statuses = { ...state.statuses, patchUserInfoStatus: FetchStatus.failed }
        state.errors = {
          ...state.errors,
          isError: true,
          patchUserInfoError: {
            code: action.payload ? action.payload.status : null,
            message: action.payload ? action.payload.statusText : null,
            reason: action.payload ? action.payload.body ? action.payload.body.message : null : null
          }
        }
      })
  }
})

export default authSlice.reducer

export const selectUser = (state: RootState): TUser | null => state.auth.user
export const selectToken = (state: RootState): string | null => state.auth.token
export const selectIsAuthChecked = (state: RootState): boolean => state.auth.isAuthChecked
export const selectStatuses = (state: RootState): {
  loginStatus: FetchStatus;
  registerStatus: FetchStatus;
  userInfoStatus: FetchStatus;
  patchUserInfoStatus: FetchStatus;
  logoutStatus: FetchStatus;
} => state.auth.statuses
export const selectErrors = (state: RootState): {
  isError: boolean;
  loginError: TError | null;
  registerError: TError | null;
  userInfoError: TError | null;
  patchUserInfoError: TError | null;
  logoutError: TError | null;
} => state.auth.errors

export const { resetError, resetStatus } = authSlice.actions
