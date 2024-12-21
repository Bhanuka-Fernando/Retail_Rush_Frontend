import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all stores
export const fetchStores = createAsyncThunk(
  "stores/fetchStores",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/stores");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch stores"
      );
    }
  }
);

// Fetch a single store by ID
export const fetchSingleStore = createAsyncThunk(
  "stores/fetchSingleStore",
  async (storeID, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/stores/${storeID}`); // Adjust the API endpoint
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch store details"
      );
    }
  }
);

// Create the slice
const storesSlice = createSlice({
  name: "stores",
  initialState: {
    stores: [],
    singleStore: null, // New state for single store details
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchStores.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong"; // Show error message
      })
      .addCase(fetchSingleStore.pending, (state) => {
        state.status = "loading"; // Loading state for fetching single store
        state.singleStore = null; // Reset single store before fetching
      })
      .addCase(fetchSingleStore.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleStore = action.payload; // Store the fetched single store
      })
      .addCase(fetchSingleStore.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch store details"; // Show error message
      });
  },
});

export default storesSlice.reducer;
