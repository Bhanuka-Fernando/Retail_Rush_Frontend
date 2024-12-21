import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products by store ID with try-catch
export const fetchProductsByStoreId = createAsyncThunk(
  "products/fetchByStoreId",
  async (storeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8070/api/items/store/${storeId}`
      );
      return response.data; // Return the fetched products
    } catch (error) {
      // Return a custom error message if the request fails
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a slice of the state for products
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [], // Array to hold products
    status: "idle", // Loading status
    error: null, // Error state
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByStoreId.pending, (state) => {
        state.status = "loading"; // Set loading state
      })
      .addCase(fetchProductsByStoreId.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set succeeded state
        state.products = action.payload; // Store the fetched products
      })
      .addCase(fetchProductsByStoreId.rejected, (state, action) => {
        state.status = "failed"; // Set failed state
        state.error = action.payload; // Capture error message from the rejected action
      });
  },
});

export default productSlice.reducer;
