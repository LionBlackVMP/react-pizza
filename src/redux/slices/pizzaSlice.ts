import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<PizzaItem[], urlParams, { rejectValue: string }>(
  "pizza/fetchPizza",
  async (params, { rejectWithValue }) => {
    try {
      const { sort, category, search, page } = params;
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

      url.searchParams.append("limit", "4");
      url.searchParams.append("page", page);
      category && url.searchParams.append("category", category.toString());
      search && url.searchParams.append("search", search);

      const { data } = await axios.get(url.toString());

      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

interface urlParams {
  sort: string;
  category: number;
  page: string;
  search?: string | undefined;
}

export interface PizzaItem {
  id: number;
  price: number;
  category: number;
  imageUrl: string;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
}

interface PizzaState {
  items: PizzaItem[];
  loading: boolean;
  error: string | null;
}

const initialState: PizzaState = {
  items: [],
  loading: false,
  error: null,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
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
        state.error = action.payload ?? null;
      });
  },
});

export default pizzaSlice.reducer;
