import {ingredientsApi} from "../../utils/ingredients-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const { getOrderNumber } = ingredientsApi();

export const fetchOrder = createAsyncThunk('order/fetch', async (ingredients, thunkAPI) => {
  try {
    return await getOrderNumber(ingredients);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: {
      name: null,
      number: null
    },
    status: 'idle',
    error: null,
    showOrder: false,
  },
  reducers: {
    clearOrder: (state) => {
      state.order = {
        name: null,
        number: null
      };
      state.status = 'idle';
    },
    hideOrder: (state) => {
      state.showOrder = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.showOrder = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        if (action.payload.success === true ) {
          state.order.name = action.payload.name;
          state.order.number = action.payload.order.number;
          state.status = 'succeeded';
        } else {
          state.status = 'failed';
          state.error = `Error success: ${action.payload.success}`;
        }
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = `${action.error.message} > Error Code ${action.payload.statusCode}: ${action.payload.statusText}`;
      })
  }
})

export const { clearOrder, hideOrder } = orderSlice.actions;
export default orderSlice.reducer;