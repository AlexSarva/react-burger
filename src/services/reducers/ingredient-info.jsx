import {createSlice} from "@reduxjs/toolkit";

const ingredientInfoSlice = createSlice({
  name: 'ingredientInfo',
  initialState: {
    itemDetails: {},
    showDetails: false,
  },
  reducers: {
    showIngredientInfo: (state, action) => {
      const {item} = action.payload;
      state.itemDetails = item;
      state.showDetails = true;
    },
    hideIngredientInfo: (state) => {
      state.itemDetails = {};
      state.showDetails = false;
    }
  },
});

export const { showIngredientInfo, hideIngredientInfo } = ingredientInfoSlice.actions;
export default ingredientInfoSlice.reducer;