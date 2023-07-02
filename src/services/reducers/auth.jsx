import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import authApi from '../../utils/auth-api'
import {deleteCookie, getCookie, isTokenExpired, setCookie} from '../../utils/cookie'

const {login, register, userInfo, refreshToken} = authApi()

export const fetchRefreshToken = createAsyncThunk('auth/refreshToken/fetch', async (_, thunkAPI) => {
  const token = getCookie('accessToken')
  try {
    if (isTokenExpired(token)) {
      return await refreshToken()
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const fetchLogin = createAsyncThunk('auth/login/fetch', async (newUser, thunkAPI) => {
  try {
    return await login(newUser)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const fetchRegister = createAsyncThunk('auth/register/fetch', async (newUser, thunkAPI) => {
  try {
    return await register(newUser)
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const fetchUserInfo = createAsyncThunk('auth/user-info/fetch', async (_, thunkAPI) => {
  const token = getCookie('accessToken')
  try {
    return await userInfo({accessToken: token})
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogged: false,
    user: null,
    token: null,
    statuses: {
      loginStatus: 'idle',
      registerStatus: 'idle',
      userInfoStatus: 'idle'
    },
    errors: {
      isError: false,
      loginError: null,
      registerError: null,
      userInfoError: null
    }
  },
  reducers: {
    logout: (state) => {
      state.isLogged = false
      state.user = null
      state.token = null
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
    },
    resetErrors: (state) => {
      state.errors = {
        isError: false,
        loginError: null,
        registerError: null,
        userInfoError: null
      }
    },
    resetError: (state, action) => {
      const {error} = action.payload
      state.errors = {
        ...state.errors,
        [error]: null
      }
    },
    resetStatus: (state, action) => {
      const {status} = action.payload
      state.statuses = {
        ...state.statuses,
        [status]: 'idle'
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.statuses = {...state.statuses, loginStatus: 'loading'}
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.statuses = {...state.statuses, loginStatus: 'succeeded'}
        state.user = action.payload.user
        const access = action.payload.accessToken
        let accessToken
        if (access.indexOf('Bearer ') === 0) {
          accessToken = access.split('Bearer ')[1]
        }
        setCookie('accessToken', accessToken)
        const refreshToken = action.payload.refreshToken
        setCookie('refreshToken', refreshToken)
        state.token = accessToken
        state.isLogged = true
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.statuses = {...state.statuses, loginStatus: 'failed'}
        state.errors = {
          ...state.errors,
          isError: true,
          loginError: {
            code: action.payload.status,
            message: action.payload.statusText,
            reason: action.payload.body.message
          }
        }
      })
      .addCase(fetchRegister.pending, (state) => {
        state.statuses = {...state.statuses, registerStatus: 'loading'}
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.statuses = {...state.statuses, registerStatus: 'succeeded'}
        state.user = action.payload.user
        const access = action.payload.accessToken
        let accessToken
        if (access.indexOf('Bearer ') === 0) {
          accessToken = access.split('Bearer ')[1]
        }
        setCookie('accessToken', accessToken)
        const refreshToken = action.payload.refreshToken
        setCookie('refreshToken', refreshToken)
        state.token = accessToken
        state.isLogged = true
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.statuses = {...state.statuses, registerStatus: 'failed'}
        state.errors = {
          ...state.errors,
          isError: true,
          registerError: {
            code: action.payload.status,
            message: action.payload.statusText,
            reason: action.payload.body.message
          }
        }
      })
      .addCase(fetchUserInfo.pending, (state) => {
        state.statuses = {...state.statuses, userInfoStatus: 'loading'}
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.statuses = {...state.statuses, userInfoStatus: 'succeeded'}
        state.user = action.payload.user
        state.isLogged = true
        state.token = getCookie('accessToken')
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.statuses = {...state.statuses, userInfoStatus: 'failed'}
        state.errors = {
          ...state.errors,
          isError: true,
          userInfoError: {
            code: action.payload.status,
            message: action.payload.statusText,
            reason: action.payload.body.message
          }
        }
      })
      .addCase(fetchRefreshToken.pending, (state) => {
        state.statuses = {...state.statuses, refreshTokenStatus: 'loading'}
      })
      .addCase(fetchRefreshToken.fulfilled, (state, action) => {
        state.statuses = {...state.statuses, refreshTokenStatus: 'succeeded'}
        const access = action.payload.accessToken
        let accessToken
        if (access.indexOf('Bearer ') === 0) {
          accessToken = access.split('Bearer ')[1]
        }
        setCookie('accessToken', accessToken)
        const refreshToken = action.payload.refreshToken
        setCookie('refreshToken', refreshToken)
        state.token = accessToken
      })
      .addCase(fetchRefreshToken.rejected, (state, action) => {
        state.statuses = {...state.statuses, refreshTokenStatus: 'failed'}
        state.errors = {
          ...state.errors,
          isError: true,
          refreshTokenError: {
            code: action.payload.status,
            message: action.payload.statusText,
            reason: action.payload.body.message
          }
        }
      })
  }
})

export default authSlice.reducer

export const selectUser = (state) => state.auth.user
export const selectIsLogged = (state) => state.auth.isLogged
export const selectToken = (state) => state.auth.token
export const selectStatuses = (state) => state.auth.statuses
export const selectErrors = (state) => state.auth.errors

export const {logout, resetErrors, resetError, resetStatus} = authSlice.actions