import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  reviews: [],
  isLoading: false,
  error: null,
};

export const voteReview = createAsyncThunk(
  "reviews/voteReview",
  async ({ id, voteType }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8070/api/reviews/${id}/vote`,
        {
          voteType,
        }
      );
      return response.data; // Return the updated review
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateReviewResponse = createAsyncThunk(
  "reviews/updateResponse",
  async ({ id, response }) => {
    // Change responseData to response
    const responseData = await axios.post(
      `http://localhost:8070/api/reviews/${id}/response`,
      { response } // Change to response
    );
    console.log("reviewSlicethunk response updating", responseData.data);
    return responseData.data; // Return the updated review data
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview", // Action type
  async (reviewId, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8070/api/reviews/${reviewId}`);
      return reviewId; // Return the ID of the deleted review
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addReview = createAsyncThunk(
  "review/addReview", // Action type
  async (newReview, { rejectWithValue }) => {
    console.log(newReview);

    try {
      const response = await axios.post(
        "http://localhost:8070/api/reviews",{newReview},{
          
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
        }
        
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllReviews = createAsyncThunk(
  "review/getAllReviews",
  async (storeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8070/api/reviews/${storeId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateReview = createAsyncThunk(
  "review/updateReview",
  async (reviewData, { rejectWithValue }) => {
    console.log(reviewData);
    try {
      const response = await axios.put(
        `http://localhost:8070/api/reviews/${reviewData._id}`,
        reviewData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getAllReviews.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getAllReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(getAllReviews.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(addReview.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(addReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.reviews.push(action.payload);
    });

    builder.addCase(addReview.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(deleteReview.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      // Filter out the deleted review from the reviews array
      state.reviews = state.reviews.filter(
        (review) => review._id !== action.payload
      );
    });

    builder.addCase(deleteReview.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateReviewResponse.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateReviewResponse.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      // Find the index of the updated review and update it
      const index = state.reviews.findIndex(
        (review) => review._id === action.payload._id
      );
      if (index !== -1) {
        state.reviews[index] = action.payload;
      }
    });
    builder.addCase(updateReviewResponse.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(voteReview.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(voteReview.fulfilled, (state, action) => {
      const updatedReview = action.payload;
      const index = state.reviews.findIndex(
        (review) => review._id === updatedReview._id
      );
      if (index !== -1) {
        state.reviews[index] = updatedReview; // Update the review in the state
      }
      state.isLoading = false;
    });
    builder.addCase(voteReview.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateReview.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(updateReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      // Find the index of the updated review and update it
      const index = state.reviews.findIndex(
        (review) => review._id === action.payload._id
      );
      if (index !== -1) {
        state.reviews[index] = action.payload;
      }
    });

    builder.addCase(updateReview.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default reviewSlice.reducer;
