import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authAPI } from '../../api/auth'

// Async thunks
export const requestOtp = createAsyncThunk(
  'auth/requestOtp',
  async ({ email, role = 'lawyer' }, { rejectWithValue }) => {
    try {
      const response = await authAPI.requestOtp(email, role)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send OTP')
    }
  }
)

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyOtp(email, otp)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Invalid OTP')
    }
  }
)

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }
      
      const response = await authAPI.refreshToken(refreshToken)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to refresh token')
    }
  }
)

// Initial state - check localStorage for saved auth data
const savedToken = localStorage.getItem('token')
const savedUser = localStorage.getItem('user')

const initialState = {
  token: savedToken || null,
  role: savedUser ? JSON.parse(savedUser).role : null,
  user: savedUser ? JSON.parse(savedUser) : null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: !!savedToken,
  isLoading: false,
  error: null,
  otpSent: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, role, user, refreshToken } = action.payload
      state.token = token
      state.role = role || user?.role
      state.user = user
      state.isAuthenticated = true
      state.error = null
      
      // Persist to localStorage as backup
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      if (refreshToken) {
        state.refreshToken = refreshToken
        localStorage.setItem('refreshToken', refreshToken)
      }
    },
    logout: (state) => {
      state.token = null
      state.role = null
      state.user = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.otpSent = false
      state.error = null
      
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    updateTokens: (state, action) => {
      const { accessToken, refreshToken } = action.payload
      state.token = accessToken
      if (refreshToken) {
        state.refreshToken = refreshToken
      }
      localStorage.setItem('token', accessToken)
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
      }
    },
    clearError: (state) => {
      state.error = null
    },
    hydrateAuth: (state) => {
      // Hydrate Redux state from localStorage on app startup
      const savedToken = localStorage.getItem('token')
      const savedUser = localStorage.getItem('user')
      const savedRefreshToken = localStorage.getItem('refreshToken')
      
      if (savedToken && savedUser) {
        try {
          const user = JSON.parse(savedUser)
          state.token = savedToken
          state.role = user.role
          state.user = user
          state.refreshToken = savedRefreshToken
          state.isAuthenticated = true
        } catch {
          // If parsing fails, clear invalid data
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          localStorage.removeItem('refreshToken')
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Request OTP
      .addCase(requestOtp.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestOtp.fulfilled, (state) => {
        state.isLoading = false
        state.otpSent = true
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload.token
        state.role = action.payload.user.role
        state.user = action.payload.user
        state.refreshToken = action.payload.refreshToken
        state.isAuthenticated = true
        state.otpSent = false
        
        // Persist to localStorage as backup
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        if (action.payload.refreshToken) {
          localStorage.setItem('refreshToken', action.payload.refreshToken)
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Refresh Token
      .addCase(refreshAccessToken.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload.accessToken
        if (action.payload.refreshToken) {
          state.refreshToken = action.payload.refreshToken
        }
        localStorage.setItem('token', action.payload.accessToken)
        if (action.payload.refreshToken) {
          localStorage.setItem('refreshToken', action.payload.refreshToken)
        }
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        // Clear auth state on refresh failure
        state.token = null
        state.role = null
        state.user = null
        state.refreshToken = null
        state.isAuthenticated = false
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
      })
  },
})

export const { setCredentials, logout, updateUser, updateTokens, clearError, hydrateAuth } = authSlice.actions
export default authSlice.reducer
