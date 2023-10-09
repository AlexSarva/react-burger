import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { IngredientsState } from './ingredients'
import { TIngredient } from '../../utils/ingrediens-types'

export type TOrder = {
  _id: string
  ingredients: Array<string>
  name: string
  status: 'done' | 'pending' | 'created'
  number: number
  createdAt: string
  updatedAt: string
}

export type TOrdersCnt = {
  total: number
  totalToday: number
}

export type TUpdateOrdersCnt = {
  cnt: TOrdersCnt
  type: 'feed' | 'my'
}

export type TMessageOrders = {
  success: boolean
  total: number
  totalToday: number
  orders: Array<TOrder>
}

export type TUpdateOrders = {
  orders: Array<TOrder>
  type: 'feed' | 'my'
}

export type TWSSError = {
  type: 'feed' | 'my'
  error: Event
}

export type TExtendedOrder = Omit<TOrder, 'ingredients'> & {
  ingredients: Array<TIngredient>
  ingredientsPrice: number
}

export type OrdersState = {
  orders: {
    feed: Array<TOrder>,
    my: Array<TOrder>
  }
  wsConnected: {
    feed: boolean,
    my: boolean
  }
  wsError: {
    feed: Event | null,
    my: Event | null
  }
  wsLoading: {
    feed: boolean,
    my: boolean
  }
  total: {
    feed: number,
    my: number
  }
  totalToday: {
    feed: number,
    my: number
  }
}

const initialState: OrdersState = {
  orders: {
    feed: [],
    my: []
  },
  wsConnected: {
    feed: false,
    my: false
  },
  wsError: {
    feed: null,
    my: null
  },
  wsLoading: {
    feed: false,
    my: false
  },
  total: {
    feed: 0,
    my: 0
  },
  totalToday: {
    feed: 0,
    my: 0
  }
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    wsInit: (state, action: PayloadAction<'my' | 'feed'>) => {
      state.wsLoading[action.payload] = true
    },
    onOpen: (state, action: PayloadAction<'my' | 'feed'>) => {
      state.wsLoading[action.payload] = false
      state.wsConnected[action.payload] = true
    },
    onError: (state, action: PayloadAction<TWSSError>) => {
      state.wsLoading[action.payload.type] = false
      state.wsError[action.payload.type] = action.payload.error
    },
    onClose: (state, action: PayloadAction<'my' | 'feed'>) => {
      state.wsLoading[action.payload] = false
      state.wsConnected[action.payload] = false
    },
    updateOrders: (state, action: PayloadAction<TUpdateOrders>) => {
      state.orders[action.payload.type] = action.payload.orders
    },
    setOrdersCnt: (state, action: PayloadAction<TUpdateOrdersCnt>) => {
      state.total[action.payload.type] = action.payload.cnt.total
      state.totalToday[action.payload.type] = action.payload.cnt.totalToday
    }
  }
})

export const selectFeedOrders = createSelector(
  (state: { ingredients: IngredientsState }) => state.ingredients.allItems,
  (state: { orders: OrdersState }) => state.orders.orders.feed,
  (allItems, orders) => {
    if (!orders.length) return []
    if (!allItems || allItems.length === 0) return []
    return orders.map((order) => {
      const ingredients = order.ingredients.map((id) => {
        const fullInfo = allItems.find((item) => item._id === id)
        if (typeof fullInfo === 'undefined') {
          throw new Error(`Unknown ingredient id: ${id}`)
        }
        return fullInfo
      })
      const ingredientsPrice = ingredients.reduce(
        (total: number, option: TIngredient) => total + option.price,
        0
      )
      return {
        ...order,
        ingredients,
        ingredientsPrice
      }
    })
  })

export const selectMyOrders = createSelector(
  (state: { ingredients: IngredientsState }) => state.ingredients.allItems,
  (state: { orders: OrdersState }) => state.orders.orders.my,
  (allItems, orders) => {
    if (!orders.length) return []
    if (!allItems || allItems.length === 0) return []
    return orders.map((order) => {
      const ingredients = order.ingredients.map((id) => {
        const fullInfo = allItems.find((item) => item._id === id)
        if (typeof fullInfo === 'undefined') {
          throw new Error(`Unknown ingredient id: ${id}`)
        }
        return fullInfo
      })
      const ingredientsPrice = ingredients.reduce(
        (total: number, option: TIngredient) => total + option.price,
        0
      )
      return {
        ...order,
        ingredients,
        ingredientsPrice
      }
    })
  })

export const selectFeedTotal = (state: { orders: OrdersState }) => state.orders.total.feed
export const selectMyTotal = (state: { orders: OrdersState }) => state.orders.total.my
export const selectFeedTotalToday = (state: { orders: OrdersState }) => state.orders.totalToday.feed
export const selectMyTotalToday = (state: { orders: OrdersState }) => state.orders.totalToday.my

export const selectPendingOrders = createSelector(
  (state: { orders: OrdersState }) => state.orders.orders.feed,
  (orders) => orders.filter((order) => order.status === 'pending'))

export const selectDoneOrders = createSelector(
  (state: { orders: OrdersState }) => state.orders.orders.feed,
  (orders) => orders.filter((order) => order.status === 'done'))

export const selectOrderByNumberType = (number: string, type: string) => createSelector(
  selectFeedOrders,
  selectMyOrders,
  (feedOrders, myOrders) => {
    if (type === 'feed') {
      return feedOrders.find((order) => {
        return order.number === Number(number)
      })
    }
    if (type === 'my') {
      return myOrders.find((order) => {
        return order.number === Number(number)
      })
    }
    return null
  }
)

export const { wsInit, onOpen, onError, updateOrders, onClose, setOrdersCnt } = ordersSlice.actions

export type TFeedActions = typeof ordersSlice.actions

export default ordersSlice.reducer
