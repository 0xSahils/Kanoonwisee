import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { appointmentAPI } from '../../api/appointments'

// Async thunks
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.getAppointments()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch appointments')
    }
  }
)

export const cancelAppointment = createAsyncThunk(
  'appointments/cancelAppointment',
  async (appointmentId, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.cancelAppointment(appointmentId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel appointment')
    }
  }
)

const initialState = {
  appointments: [],
  isLoading: false,
  error: null,
}

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    addAppointment: (state, action) => {
      state.appointments.push(action.payload)
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(apt => apt.id === action.payload.id)
      if (index !== -1) {
        state.appointments[index] = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Appointments
      .addCase(fetchAppointments.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.isLoading = false
        state.appointments = action.payload
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Cancel Appointment
      .addCase(cancelAppointment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.appointments.findIndex(apt => apt.id === action.payload.id)
        if (index !== -1) {
          state.appointments[index] = action.payload
        }
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearError, addAppointment, updateAppointment } = appointmentSlice.actions
export default appointmentSlice.reducer
