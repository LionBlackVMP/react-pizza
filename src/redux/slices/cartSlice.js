import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.totalPrice += action.payload.price;
    },
    removeItem: (state, action) => {
      const { id, size, type } = action.payload;

      const itemToRemove = state.items.find(
        (el) => el.id === id && el.size === size && el.type === type
      );

      if (itemToRemove) {
        state.items = state.items.filter((el) => el !== itemToRemove);
        state.totalPrice -= itemToRemove.price;
      }
    },

    removeSameItems: (state, action) => {
      const { id, size, type } = action.payload;

      state.items = state.items.filter(
        (el) => !(el.id === id && el.size === size && el.type === type)
      );

      state.totalPrice = state.items.reduce((total, item) => total + item.price, 0);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, removeSameItems } = cartSlice.actions;

export default cartSlice.reducer;
