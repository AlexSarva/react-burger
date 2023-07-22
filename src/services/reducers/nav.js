import { createSlice } from '@reduxjs/toolkit'

const navSlice = createSlice({
  name: 'nav',
  initialState: {
    highlightedCategory: 'bun'
  },
  reducers: {
    setHighlightedCategory: (state, action) => {
      state.highlightedCategory = action.payload
    }
  }
})

export const { setHighlightedCategory } = navSlice.actions

export default navSlice.reducer
