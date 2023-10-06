import { createSlice } from '@reduxjs/toolkit'
import { TIngredient } from '../../utils/ingrediens-types'

export type IngredientInfoState = {
  itemDetails: TIngredient | null
}

const initialState: IngredientInfoState = {
  itemDetails: null
}

const ingredientInfoSlice = createSlice({
  name: 'ingredientInfo',
  initialState,
  reducers: {
    showIngredientInfo: (state, action: { payload: TIngredient, type: string }) => {
      state.itemDetails = action.payload
    },
    hideIngredientInfo: (state) => {
      state.itemDetails = null
    }
  }
})

export const { showIngredientInfo, hideIngredientInfo } = ingredientInfoSlice.actions
export default ingredientInfoSlice.reducer
