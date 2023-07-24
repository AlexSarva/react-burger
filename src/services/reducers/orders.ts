import { ingredientsApi, TIngredientOrder, TOrderResponse } from '../../utils/ingredients-api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TErrorResponse } from '../../utils/api-types'

const { getOrderNumber } = ingredientsApi()

export type OrdersState = {
  order: {
    name: string | null,
    number: number | null,
  },
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
  showOrder: boolean
}

const initialState: OrdersState = {
  order: {
    name: null,
    number: null
  },
  status: 'idle',
  error: null,
  showOrder: false
}

export const fetchOrder = createAsyncThunk<TOrderResponse, TIngredientOrder, { rejectValue: TErrorResponse }>(
  'order/fetch',
  async (ingredients, thunkAPI) => {
    try {
      return await getOrderNumber(ingredients)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  })

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = {
        name: null,
        number: null
      }
      state.status = 'idle'
    },
    hideOrder: (state) => {
      state.showOrder = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.showOrder = true
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.order.name = action.payload.name
          state.order.number = action.payload.order.number
          state.status = 'succeeded'
        } else {
          state.status = 'failed'
          state.error = `Error success: ${action.payload.success}`
        }
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = 'failed'
        state.error = `${action.error.message} > Error Code ${action.payload?.status}: ${action.payload?.statusText}`
      })
  }
})

export const { clearOrder, hideOrder } = orderSlice.actions
export default orderSlice.reducer
