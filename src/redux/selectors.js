import { createSelector } from "reselect";
// selectors.js
export const selectSort = (state) => state.sort.sort;
export const selectCategory = (state) => state.filter.category;
export const selectCurrentPage = (state) => state.page.current;
export const selectSearchValue = (state) => state.search.value;

export const selectHomeData = createSelector(
  [selectSort, selectCategory, selectCurrentPage, selectSearchValue],
  (sort, category, currentPage, searchValue) => ({
    sort,
    category,
    currentPage,
    searchValue,
  })
);
