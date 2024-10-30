import { createSelector } from "reselect";
// selectors.js
export const selectSort = (state) => state.sort;
export const selectFilter = (state) => state.filter;
export const selectCurrentPage = (state) => state.page.current;
export const selectSearchValue = (state) => state.search.value;

export const generalSelect = createSelector(
  [selectSort, selectFilter, selectCurrentPage, selectSearchValue],
  (sort, filter, currentPage, searchValue) => ({
    sort: sort.sort,
    sortTypes: sort.sortTypes,
    category: filter.category,
    pizzaTypes: filter.pizzaTypes,
    currentPage,
    searchValue,
  })
);
