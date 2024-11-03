// store.js
import { configureStore } from "@reduxjs/toolkit";
import sort from "./slices/sortSlice";
import filter from "./slices/filterSlice";
import page from "./slices/pageSlice";
import search from "./slices/searchSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzaSlice";

export const store = configureStore({
  reducer: {
    sort,
    filter,
    page,
    search,
    cart,
    pizza,
  },
});
