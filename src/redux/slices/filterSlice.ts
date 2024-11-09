import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  category: number;
  pizzaTypes: string[];
}

const initialState: FilterState = {
  category: 0,
  pizzaTypes: ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = filterSlice.actions;

export default filterSlice.reducer;
