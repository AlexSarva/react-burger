import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/app/app'
import reportWebVitals from './reportWebVitals'

import { configureStore } from '@reduxjs/toolkit'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import logger from 'redux-logger'
import rootReducer from './services/reducers'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
})

export type FetchDispatch = typeof store.dispatch

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootContainer = document.getElementById('root')!

const root = ReactDOM.createRoot(rootContainer)
// eslint-disable-next-line jest/require-hook
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line jest/require-hook
reportWebVitals()
