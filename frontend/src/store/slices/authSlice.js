import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authAPI } from '../../api/auth'
import { clearLegacyAuthData, isAuthenticated } from '../../utils/cookieAuthUtils'

// Async thunks for cookie-based authentication
export const requestOtp = createAsyncThunk(
  'auth/requestOtp',
  async ({ email, role = 'client' }, { rejectWithValue }) => {
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

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.getCurrentUser()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get user info')
    }
  }
)

// Initialize authentication from existing cookies on app startup
export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async (_, { rejectWithValue }) => {
    try {
      // Check if we have authentication cookies
      if (!isAuthenticated()) {
        return rejectWithValue('No authentication cookies found')
      }
      
      // Try to get current user info to validate session
      const response = await authAPI.getCurrentUser()
      return response.data
    } catch (error) {
      // Session invalid or expired
      return rejectWithValue(error.response?.data?.message || 'Session invalid')
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    try {
      await authAPI.logout()
      return {}
    } catch {
      // Even if logout API fails, we should clear local state
      return {}
    }
  }
)

// Initial state - no localStorage dependency
const initialState = {
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  otpSent: false,
  sessionChecked: false, // Flag to track if we've checked session on startup
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set user credentials after successful authentication
    setCredentials: (state, action) => {
      const { user } = action.payload
      state.user = user
      state.role = user?.role
      state.isAuthenticated = true
      state.error = null
      state.sessionChecked = true
    },
    
    // Clear all authentication state
    logout: (state) => {
      state.user = null
      state.role = null
      state.isAuthenticated = false
      state.otpSent = false
      state.error = null
      state.sessionChecked = true
      
      // Clear any legacy localStorage data
      clearLegacyAuthData()
    },
    
    // Update user information
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    
    // Clear errors
    clearError: (state) => {
      state.error = null
    },
    
    // Check session status from cookies
    checkSession: (state) => {
      const hasSession = isAuthenticated()
      
      if (!hasSession && state.isAuthenticated) {
        // Session expired, clear state
        state.user = null
        state.role = null
        state.isAuthenticated = false
        state.otpSent = false
      }
      
      state.sessionChecked = true
    },
    
    // Reset OTP state
    resetOtpState: (state) => {
      state.otpSent = false
      state.error = null
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
      
      // Verify OTP - establishes session via cookies
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.role = action.payload.user?.role
        state.isAuthenticated = true
        state.otpSent = false
        state.sessionChecked = true
        
        // Set login timestamp for grace period
        sessionStorage.setItem('lastLoginTime', Date.now().toString())
        
        // Clear any legacy localStorage data
        clearLegacyAuthData()
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Get current user info
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.role = action.payload.user?.role
        state.isAuthenticated = true
        state.sessionChecked = true
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
        state.user = null
        state.role = null
        state.sessionChecked = true
      })
      
      // Initialize authentication from cookies on app startup
      .addCase(initializeAuth.pending, (state) => {
        // Don't set loading for initialization to avoid blocking UI
        state.error = null
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.role = action.payload.user?.role
        state.isAuthenticated = true
        state.sessionChecked = true
        state.error = null
      })
      .addCase(initializeAuth.rejected, (state) => {
        // No valid session found, ensure clean state
        state.user = null
        state.role = null
        state.isAuthenticated = false
        state.sessionChecked = true
        state.error = null
        
        // Clear any legacy localStorage data
        clearLegacyAuthData()
      })
      
      // Logout user
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
        state.role = null
        state.isAuthenticated = false
        state.otpSent = false
        state.error = null
        state.sessionChecked = true
        
        // Clear any legacy localStorage data
        clearLegacyAuthData()
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false
        // Even if logout fails, clear the state
        state.user = null
        state.role = null
        state.isAuthenticated = false
        state.otpSent = false
        state.sessionChecked = true
        
        // Clear any legacy localStorage data
        clearLegacyAuthData()
      })
  },
})

export const { 
  setCredentials, 
  logout, 
  updateUser, 
  clearError, 
  checkSession, 
  resetOtpState 
} = authSlice.actions

export default authSlice.reducer
