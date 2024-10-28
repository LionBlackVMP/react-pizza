import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: 0,
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setSort } = sortSlice.actions;

export default sortSlice.reducer;
