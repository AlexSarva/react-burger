import { createSlice } from '@reduxjs/toolkit'
import { IngredientType, TIngredient } from '../../utils/ingrediens-types'

export type BurgerConstructorState = {
  bun: TIngredient | null
  options: Array<TIngredient>
  totalPrice: number
  show: boolean
  ingredients: Array<string>
  dragDropIndexes: {
    dropIndex: number
    position: string
  }
}

const initialState: BurgerConstructorState = {
  bun: null,
  options: [],
  totalPrice: 0,
  show: false,
  ingredients: [],
  dragDropIndexes: {
    dropIndex: 0,
    position: ''
  }
}

const updateTotalPrice = (state: BurgerConstructorState): void => {
  const bunPrice: number = state.bun ? state.bun.price : 0
  const optionsPrice: number = state.options.reduce(
    (total: number, option: TIngredient) => total + option.price,
    0
  )
  state.totalPrice = bunPrice * 2 + optionsPrice
}

const handleShow = (state: BurgerConstructorState): void => {
  state.show = !!(state.bun || state.options.length > 0)
}

const fillIngredients = (state: BurgerConstructorState) => {
  const bun: Array<string> = state.bun ? [state.bun._id, state.bun._id] : []
  const options: Array<string> = state.options.map(option => option._id)
  state.ingredients = [bun[0], ...options, bun[1]]
}

const constructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  reducers: {
    setDropIndex: (state, action) => {
      const { dropIndex, position } = action.payload
      state.dragDropIndexes.dropIndex = dropIndex
      state.dragDropIndexes.position = position
    },
    onDrop: (state, action) => {
      const { dragIndex } = action.payload
      const { dropIndex, position } = state.dragDropIndexes
      const dragItem = state.options[dragIndex]
      state.options.splice(dragIndex, 1)
      if (position === 'top') {
        state.options.splice(dropIndex, 0, dragItem)
      } else {
        state.options.splice(dropIndex, 0, dragItem)
      }
      // state.options.splice(dropIndex, 0, dragItem);
      state.dragDropIndexes.dropIndex = 0
      fillIngredients(state)
    },
    addIngredient: (state, action: { payload: TIngredient, type: string }) => {
      const item = action.payload
      const { dropIndex } = state.dragDropIndexes
      if (item.type === IngredientType.Bun) {
        state.bun = item
      } else if (state.options.length === 0) {
        state.options.push(item)
      } else {
        state.options.splice(dropIndex, 0, item)
      }
      updateTotalPrice(state)
      handleShow(state)
      fillIngredients(state)
    },
    removeIngredient: (state, action: {
      payload: {
        index: number;
        item: TIngredient;
      },
      type: string
    }) => {
      const { index, item } = action.payload
      if (item.type === IngredientType.Bun) {
        state.bun = null
      } else {
        state.options.splice(index, 1)
      }
      updateTotalPrice(state)
      handleShow(state)
      fillIngredients(state)
    },
    clearConstructor: (state) => {
      state.bun = null
      state.options = []
      state.totalPrice = 0
      state.show = false
      fillIngredients(state)
    }
  }
})

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  setDropIndex,
  onDrop
} = constructorSlice.actions
export default constructorSlice.reducer
