import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { clientAPI } from '../../api/client'

// Async thunks
export const fetchClientProfile = createAsyncThunk(
  'client/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await clientAPI.getProfile()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile')
    }
  }
)

export const updateClientProfile = createAsyncThunk(
  'client/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await clientAPI.updateProfile(profileData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile')
    }
  }
)

export const fetchAllLawyers = createAsyncThunk(
  'client/fetchAllLawyers',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await clientAPI.getAllLawyers(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch lawyers')
    }
  }
)

export const searchLawyers = createAsyncThunk(
  'client/searchLawyers',
  async (searchParams, { rejectWithValue }) => {
    try {
      const response = await clientAPI.searchLawyers(searchParams)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search lawyers')
    }
  }
)

export const fetchLawyerDetails = createAsyncThunk(
  'client/fetchLawyerDetails',
  async (lawyerId, { rejectWithValue }) => {
    try {
      const response = await clientAPI.getLawyerDetails(lawyerId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch lawyer details')
    }
  }
)

export const bookAppointment = createAsyncThunk(
  'client/bookAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await clientAPI.bookAppointment(appointmentData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to book appointment')
    }
  }
)

export const fetchClientAppointments = createAsyncThunk(
  'client/fetchAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await clientAPI.getAppointments()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch appointments')
    }
  }
)

const initialState = {
  profile: null,
  searchResults: [],
  selectedLawyer: null,
  appointments: [],
  stats: {
    upcomingConsultations: 0,
    pendingRequests: 0,
  },
  isLoading: false,
  searchLoading: false,
  hasSearched: false, // Track if user has performed a search
  error: null,
}

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearSearchResults: (state) => {
      state.searchResults = []
      state.hasSearched = false
    },
    clearSelectedLawyer: (state) => {
      state.selectedLawyer = null
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchClientProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchClientProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload
      })
      .addCase(fetchClientProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update Profile
      .addCase(updateClientProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateClientProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload
      })
      .addCase(updateClientProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch All Lawyers
      .addCase(fetchAllLawyers.pending, (state) => {
        state.searchLoading = true
        state.error = null
      })
      .addCase(fetchAllLawyers.fulfilled, (state, action) => {
        state.searchLoading = false
        state.searchResults = action.payload.lawyers || []
      })
      .addCase(fetchAllLawyers.rejected, (state, action) => {
        state.searchLoading = false
        state.error = action.payload
        state.searchResults = []
      })
      // Search Lawyers
      .addCase(searchLawyers.pending, (state) => {
        state.searchLoading = true
        state.error = null
        state.hasSearched = true
      })
      .addCase(searchLawyers.fulfilled, (state, action) => {
        state.searchLoading = false
        // Extract lawyers array from the response
        state.searchResults = action.payload.lawyers || []
      })
      .addCase(searchLawyers.rejected, (state, action) => {
        state.searchLoading = false
        state.error = action.payload
        state.searchResults = []
      })
      // Fetch Lawyer Details
      .addCase(fetchLawyerDetails.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchLawyerDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedLawyer = action.payload
      })
      .addCase(fetchLawyerDetails.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Book Appointment
      .addCase(bookAppointment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.isLoading = false
        state.appointments.push(action.payload)
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch Appointments
      .addCase(fetchClientAppointments.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchClientAppointments.fulfilled, (state, action) => {
        state.isLoading = false
        state.appointments = action.payload
      })
      .addCase(fetchClientAppointments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearSearchResults, clearSelectedLawyer, updateStats } = clientSlice.actions
export default clientSlice.reducer
