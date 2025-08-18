import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { lawyerAPI } from '../../api/lawyer'

// Async thunks
export const fetchLawyerProfile = createAsyncThunk(
  'lawyer/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await lawyerAPI.getProfile()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile')
    }
  }
)

export const updateLawyerProfile = createAsyncThunk(
  'lawyer/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await lawyerAPI.updateProfile(profileData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile')
    }
  }
)

export const fetchLawyerAppointments = createAsyncThunk(
  'lawyer/fetchAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await lawyerAPI.getAppointments()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch appointments')
    }
  }
)

export const updateAppointmentStatus = createAsyncThunk(
  'lawyer/updateAppointmentStatus',
  async ({ appointmentId, status }, { rejectWithValue }) => {
    try {
      const response = await lawyerAPI.updateAppointmentStatus(appointmentId, status)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update appointment')
    }
  }
)

const initialState = {
  profile: null,
  appointments: [],
  stats: {
    totalConsultations: 0,
    pendingRequests: 0,
    upcomingConsultations: 0,
  },
  isLoading: false,
  error: null,
}

const lawyerSlice = createSlice({
  name: 'lawyer',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchLawyerProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchLawyerProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload
      })
      .addCase(fetchLawyerProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update Profile
      .addCase(updateLawyerProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateLawyerProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload
      })
      .addCase(updateLawyerProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch Appointments
      .addCase(fetchLawyerAppointments.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchLawyerAppointments.fulfilled, (state, action) => {
        state.isLoading = false
        state.appointments = action.payload
      })
      .addCase(fetchLawyerAppointments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update Appointment Status
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(apt => apt.id === action.payload.id)
        if (index !== -1) {
          state.appointments[index] = action.payload
        }
      })
  },
})

export const { clearError, updateStats } = lawyerSlice.actions
export default lawyerSlice.reducer
