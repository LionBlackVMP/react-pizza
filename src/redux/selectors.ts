import { createSelector } from "reselect";
import { RootState } from "./store";

export const selectSort = (state: RootState) => state.sort;
export const selectFilter = (state: RootState) => state.filter;
export const selectCurrentPage = (state: RootState) => state.page.current;
export const selectSearchValue = (state: RootState) => state.search.value;
export const setitems = (state: RootState) => state.pizza;
export const cartSelect = (state: RootState) => state.cart;

export const generalSelect = createSelector(
  [selectSort, selectFilter, selectCurrentPage, selectSearchValue, setitems],
  (sort, filter, currentPage, searchValue, pizzaItems) => ({
    sort: sort.sort,
    sortTypes: sort.sortTypes,
    category: filter.category,
    pizzaTypes: filter.pizzaTypes,
    currentPage,
    searchValue,
    pizzaItems: pizzaItems.items,
    pizzaLoading: pizzaItems.loading,
    pizzaError: pizzaItems.error,
  })
);
