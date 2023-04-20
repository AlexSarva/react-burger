import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { ingredientsApi } from "../../utils/ingredients-api";

const { getIngredients } = ingredientsApi();

export const fetchIngredients = createAsyncThunk('ingredients/fetch', async () => {

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await getIngredients()
  return response.data
})

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    items: {
      buns: [],
      mains: [],
      sauces: []
    },
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchIngredients.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchIngredients.fulfilled]: (state, action) => {
      state.items.buns = action.payload.filter(item => item.type === 'bun')
      state.items.mains = action.payload.filter(item => item.type === 'main')
      state.items.sauces = action.payload.filter(item => item.type === 'sauce')
      state.status = 'succeeded'
    },
    [fetchIngredients.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
});

export default ingredientsSlice.reducer;