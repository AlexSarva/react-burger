import { createSlice } from '@reduxjs/toolkit'
import { IngredientType } from '../../utils/ingrediens-types'

export type NavState = {
  highlightedCategory: IngredientType
}

const initialState: NavState = {
  highlightedCategory: IngredientType.Bun
}

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setHighlightedCategory: (state, action: { payload: IngredientType, type: string }) => {
      state.highlightedCategory = action.payload
    }
  }
})

export const { setHighlightedCategory } = navSlice.actions

export default navSlice.reducer
