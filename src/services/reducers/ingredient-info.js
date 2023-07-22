import { createSlice } from '@reduxjs/toolkit'

const ingredientInfoSlice = createSlice({
  name: 'ingredientInfo',
  initialState: {
    itemDetails: null
  },
  reducers: {
    showIngredientInfo: (state, action) => {
      const { item } = action.payload
      state.itemDetails = item
    },
    hideIngredientInfo: (state) => {
      state.itemDetails = null
    }
  }
})

export const { showIngredientInfo, hideIngredientInfo } = ingredientInfoSlice.actions
export default ingredientInfoSlice.reducer
