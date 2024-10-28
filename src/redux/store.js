// store.js
import { configureStore } from "@reduxjs/toolkit";
import sortReducer from "./slices/sortSlice";
import filterReducer from "./slices/filterSlice";
import pageReducer from "./slices/pageSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    sort: sortReducer,
    filter: filterReducer,
    page: pageReducer,
    search: searchReducer,
  },
});
