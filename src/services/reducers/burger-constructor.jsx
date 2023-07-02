import { createSlice } from "@reduxjs/toolkit";

const updateTotalPrice = (state) => {
  const bunPrice = state.bun ? state.bun.price : 0;
  const optionsPrice = state.options.reduce(
    (total, option) => total + option.price,
    0
  );
  state.totalPrice = bunPrice * 2 + optionsPrice;
};

const handleShow = (state) => {
  state.show = !!(state.bun || state.options.length > 0);
}

const fillIngredients = (state) => {
  const bun = state.bun ? [state.bun._id, state.bun._id] : [];
  const options = state.options.map(option => option._id);
  state.ingredients = [...bun, ...options];
}

const constructorSlice = createSlice({
  name: "burger-constructor",
  initialState: {
    bun: null,
    options: [],
    totalPrice: 0,
    show: false,
    ingredients: [],
    dragDropIndexes: {
      dropIndex: null,
      position: ''
    }
  },
  reducers: {
    setDropIndex: (state, action) => {
      const { dropIndex, position } = action.payload;
      state.dragDropIndexes.dropIndex = dropIndex;
      state.dragDropIndexes.position = position;
    },
    onDrop: (state, action) => {
      const { dragIndex } = action.payload;
      const { dropIndex, position } = state.dragDropIndexes;
      const dragItem = state.options[dragIndex];
      state.options.splice(dragIndex, 1);
      if (position === 'top') {
        state.options.splice(dropIndex, 0, dragItem);
      } else {
        state.options.splice(dropIndex, 0, dragItem);
      }
      // state.options.splice(dropIndex, 0, dragItem);
      state.dragDropIndexes.dropIndex = null;
      fillIngredients(state);
    },
    addIngredient: (state, action) => {
      const { item } = action.payload;
      const { dropIndex } = state.dragDropIndexes;
      if (item.type === "bun") {
        state.bun = item;
      } else if (state.options.length === 0) {
        state.options.push(item);
      } else {
        state.options.splice(dropIndex, 0, item);
      }
      updateTotalPrice(state);
      handleShow(state);
      fillIngredients(state);
    },
    removeIngredient: (state, action) => {
      const { index, item } = action.payload;
      if (item.type === "bun") {
        state.bun = null;
      } else {
        state.options.splice(index, 1);
      }
      updateTotalPrice(state);
      handleShow(state);
      fillIngredients(state);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.options = [];
      state.totalPrice = 0;
      state.show = false;
      fillIngredients(state);
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  setDropIndex,
  onDrop
} = constructorSlice.actions;
export default constructorSlice.reducer;
