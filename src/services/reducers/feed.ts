import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { IngredientsState } from './ingredients'
import { TIngredient } from '../../utils/ingrediens-types'

export type TOrder = {
  _id: string
  ingredients: Array<string>
  status: string
  number: string
  createdAt: string
  updatedAt: string
}

export type TExtendedOrder = Omit<TOrder, 'ingredients'> & {
  ingredients: Array<TIngredient>
  ingredientsPrice: number
}

const data: Array<TOrder> = [{
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0944',
    '643d69a5c3f7b9001cfa0948',
    '643d69a5c3f7b9001cfa0948',
    '643d69a5c3f7b9001cfa094a',
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0944'
  ],
  _id: '',
  status: 'done',
  number: '034535',
  createdAt: '2021-06-23T14:43:22.587Z',
  updatedAt: '2021-06-23T14:43:22.603Z'
},
{
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0944',
    '643d69a5c3f7b9001cfa0948',
    '643d69a5c3f7b9001cfa094a'
  ],
  _id: '',
  status: 'done',
  number: '034535',
  createdAt: '2021-06-23T14:43:22.587Z',
  updatedAt: '2021-06-23T14:43:22.603Z'
},
{
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0944',
    '643d69a5c3f7b9001cfa0948',
    '643d69a5c3f7b9001cfa094a'
  ],
  _id: '',
  status: 'done',
  number: '034535',
  createdAt: '2021-06-23T14:43:22.587Z',
  updatedAt: '2021-06-23T14:43:22.603Z'
},
{
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0944',
    '643d69a5c3f7b9001cfa0948',
    '643d69a5c3f7b9001cfa094a'
  ],
  _id: '',
  status: 'done',
  number: '034535',
  createdAt: '2021-06-23T14:43:22.587Z',
  updatedAt: '2021-06-23T14:43:22.603Z'
},
{
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0944',
    '643d69a5c3f7b9001cfa0948',
    '643d69a5c3f7b9001cfa094a'
  ],
  _id: '',
  status: 'done',
  number: '034535',
  createdAt: '2021-06-23T14:43:22.587Z',
  updatedAt: '2021-06-23T14:43:22.603Z'
},
{
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0944',
    '643d69a5c3f7b9001cfa0948',
    '643d69a5c3f7b9001cfa094a'
  ],
  _id: '',
  status: 'done',
  number: '034535',
  createdAt: '2021-06-23T14:43:22.587Z',
  updatedAt: '2021-06-23T14:43:22.603Z'
},
{
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0944',
    '643d69a5c3f7b9001cfa0948',
    '643d69a5c3f7b9001cfa094a'
  ],
  _id: '',
  status: 'done',
  number: '034535',
  createdAt: '2021-06-23T14:43:22.587Z',
  updatedAt: '2021-06-23T14:43:22.603Z'
}]

export type FeedState = {
  orders: Array<TOrder>
  currentOrder: TOrder | null
  wsConnected: boolean
  wsError: string | null
  wsLoading: boolean
  total: number
  totalToday: number
}

const initialState: FeedState = {
  orders: data,
  currentOrder: null,
  wsConnected: false,
  wsError: null,
  wsLoading: false,
  total: 0,
  totalToday: 0
}

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {}
})

export const selectFeedOrders = createSelector(
  (state: { ingredients: IngredientsState }) => state.ingredients.allItems,
  (state: { feed: FeedState }) => state.feed.orders,
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

export default feedSlice.reducer
