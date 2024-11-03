import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizza",
  async ({ sort, category, search, page }, { rejectWithValue }) => {
    try {
      const url = new URL("https://6713e287690bf212c76016d7.mockapi.io/items");
      switch (sort) {
        case "rating":
          url.searchParams.append("sortby", "rating");
          break;

        case "price":
          url.searchParams.append("sortby", "price");
          break;

        case "alphabet":
          url.searchParams.append("sortby", "title");
          url.searchParams.append("order", "asc");
          break;
        default:
          break;
      }

      url.searchParams.append("limit", 4);
      url.searchParams.append("page", page);
      category && url.searchParams.append("category", category);
      search && url.searchParams.append("search", search);

      const { data } = await axios.get(url);

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pizzaSlice.reducer;
