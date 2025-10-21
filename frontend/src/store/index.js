import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import lawyerSlice from './slices/lawyerSlice'
import clientSlice from './slices/clientSlice'
import appointmentSlice from './slices/appointmentSlice'
import reviewSlice from './slices/reviewSlice'
import paymentSlice from './slices/paymentSlice'
import stampSlice from './stampSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    lawyer: lawyerSlice,
    client: clientSlice,
    appointments: appointmentSlice,
    reviews: reviewSlice,
    payment: paymentSlice,
    stamp: stampSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})
