import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { reviewAPI } from '../../api/reviews'

// Async thunks
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (lawyerId, { rejectWithValue }) => {
    try {
      const response = await reviewAPI.getReviews(lawyerId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews')
    }
  }
)

export const createReview = createAsyncThunk(
  'reviews/createReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await reviewAPI.createReview(reviewData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create review')
    }
  }
)

export const fetchClientReviews = createAsyncThunk(
  'reviews/fetchClientReviews',
  async (_, { rejectWithValue }) => {
    try {
      const response = await reviewAPI.getClientReviews()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch client reviews')
    }
  }
)

const initialState = {
  reviews: [],
  clientReviews: [],
  isLoading: false,
  error: null,
}

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearReviews: (state) => {
      state.reviews = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.reviews = action.payload
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Create Review
      .addCase(createReview.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.clientReviews.push(action.payload)
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch Client Reviews
      .addCase(fetchClientReviews.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchClientReviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.clientReviews = action.payload
      })
      .addCase(fetchClientReviews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearReviews } = reviewSlice.actions
export default reviewSlice.reducer
