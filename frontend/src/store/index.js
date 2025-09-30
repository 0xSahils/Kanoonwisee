import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import lawyerSlice from './slices/lawyerSlice'
import clientSlice from './slices/clientSlice'
import appointmentSlice from './slices/appointmentSlice'
import reviewSlice from './slices/reviewSlice'
import paymentSlice from './slices/paymentSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    lawyer: lawyerSlice,
    client: clientSlice,
    appointments: appointmentSlice,
    reviews: reviewSlice,
    payment: paymentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})
