import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  current: number;
}
const initialState: PageState = {
  current: 1,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;

export default pageSlice.reducer;
