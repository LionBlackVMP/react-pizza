import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: 1,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;

export default pageSlice.reducer;
