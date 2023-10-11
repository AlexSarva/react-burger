import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ingredientsApi, TIngredientsResponse } from '../../utils/ingredients-api'
import { IngredientType, TIngredient } from '../../utils/ingrediens-types'
import { createSelector } from 'reselect'
import { TErrorResponse } from '../../utils/api-types'

export type IngredientsState = {
  items: {
    bun: TIngredient[];
    main: TIngredient[];
    sauce: TIngredient[];
  },
  allItems: TIngredient[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const { getIngredients } = ingredientsApi()

export const fetchIngredients = createAsyncThunk<TIngredientsResponse, void, { rejectValue: TErrorResponse }>(
  'ingredients/fetch',
  async (_, thunkAPI) => {
    try {
      return await getIngredients()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const initialState: IngredientsState = {
  items: {
    bun: [],
    main: [],
    sauce: []
  },
  allItems: [],
  status: 'idle',
  error: null
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    incrementCount: (state, action: PayloadAction<TIngredient>) => {
      const { _id, type } = action.payload
      if (type === IngredientType.Bun) {
        state.items.bun.forEach((item) => {
          item.count = 0
        })
      }
      const item = state.items[type].find((item) => item._id === _id)
      if (item) {
        item.count = (item.count || 0) + 1
      }
    },
    decrementCount: (state, action: PayloadAction<TIngredient>) => {
      const { _id, type } = action.payload
      const item = state.items[type].find((item) => item._id === _id)
      if (item && item.count && item.count > 0) {
        item.count -= 1
      }
    },
    clearIngredients: (state) => {
      state.items.bun.forEach((item) => {
        item.count = 0
      })
      state.items.main.forEach((item) => {
        item.count = 0
      })
      state.items.sauce.forEach((item) => {
        item.count = 0
      })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.items.bun = action.payload.data.filter(item => item.type === IngredientType.Bun)
          state.items.main = action.payload.data.filter(item => item.type === IngredientType.Main)
          state.items.sauce = action.payload.data.filter(item => item.type === IngredientType.Sauce)
          state.allItems = action.payload.data
          state.status = 'succeeded'
        } else {
          state.status = 'failed'
          state.error = `Error success: ${action.payload.success}`
        }
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed'
        state.error = `${action.error.message} > Error Code ${action.payload?.status}: ${action.payload?.statusText}`
      })
  }
})

export const selectIngredients = (state: { ingredients: IngredientsState }) => state.ingredients.allItems

export const selectIngredientsStatus = (state: { ingredients: IngredientsState }) => state.ingredients.status

export const selectIngredientById = (id: string | undefined) => createSelector(
  selectIngredients,
  (items: TIngredient[]) => {
    if (items) {
      return items.find((item) => item._id === id)
    }
    return null
  }
)

export const { incrementCount, decrementCount, clearIngredients } = ingredientsSlice.actions
export default ingredientsSlice.reducer
