import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { ingredientsApi } from "../../utils/ingredients-api";

const { getIngredients } = ingredientsApi();

export const fetchIngredients = createAsyncThunk('ingredients/fetch', async (_, thunkAPI) => {
  try {
    return await getIngredients();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    items: {
      bun: [],
      main: [],
      sauce: []
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    incrementCount: (state, action) => {
      const { _id, type } = action.payload;
      if (type === 'bun') {
        state.items.bun.forEach((item) => {
          item.count = 0;
        });
      }
      const item = state.items[type].find((item) => item._id === _id);
      if (item) {
        item.count = (item.count || 0) + 1;
      }
    },
    decrementCount: (state, action) => {
      const { _id, type } = action.payload;
      const item = state.items[type].find((item) => item._id === _id);
      if (item && item.count > 0) {
        item.count -= 1;
      }
    },
    clearIngredients: (state) => {
      state.items.bun.forEach((item) => {
        item.count = 0;
      });
      state.items.main.forEach((item) => {
        item.count = 0;
      });
      state.items.sauce.forEach((item) => {
        item.count = 0;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        if (action.payload.success === true ) {
          state.items.bun = action.payload.data.filter(item => item.type === 'bun')
          state.items.main = action.payload.data.filter(item => item.type === 'main')
          state.items.sauce = action.payload.data.filter(item => item.type === 'sauce')
          state.status = 'succeeded'
        } else {
          state.status = 'failed'
          state.error = `Error success: ${action.payload.success}`
        }
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed'
        state.error = `${action.error.message} > Error Code ${action.payload.statusCode}: ${action.payload.statusText}`
      })
  }

});

export const { incrementCount, decrementCount, clearIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;