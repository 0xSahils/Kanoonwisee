import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as stampAPI from '../api/stamp';

const initialState = {
  currentStep: 1,
  draftOrder: null,
  orderId: null,
  templates: [],
  states: [],
  promoCodes: [],
  pricing: null,
  serviceType: 'standard',
  doorstepDelivery: false,
  promoCode: '',
  promoApplied: false,
  promoDiscount: 0,
  orderDetails: null,
  loading: false,
  error: null,
  paymentLoading: false,
};

// Async thunks
export const fetchStates = createAsyncThunk(
  'stamp/fetchStates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await stampAPI.getStates();
      return response.data.data; // Extract data from { success: true, data: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch states');
    }
  }
);

export const fetchTemplatesByState = createAsyncThunk(
  'stamp/fetchTemplatesByState',
  async (state, { rejectWithValue }) => {
    try {
      const response = await stampAPI.getTemplatesByState(state);
      return response.data.data; // Extract data array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch templates');
    }
  }
);

export const fetchPromoCodes = createAsyncThunk(
  'stamp/fetchPromoCodes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await stampAPI.getPromoCodes();
      return response.data.data; // Extract data array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch promo codes');
    }
  }
);

export const createDraftOrder = createAsyncThunk(
  'stamp/createDraftOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await stampAPI.createDraftOrder(orderData);
      return response.data.data; // Extract data object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create order');
    }
  }
);

export const updateServiceSelection = createAsyncThunk(
  'stamp/updateServiceSelection',
  async ({ orderId, serviceData }, { rejectWithValue }) => {
    try {
      const response = await stampAPI.updateServiceSelection(orderId, serviceData);
      return response.data.data; // Extract data object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update service');
    }
  }
);

export const validatePromoCode = createAsyncThunk(
  'stamp/validatePromoCode',
  async ({ orderId, code, orderAmount }, { rejectWithValue }) => {
    try {
      const response = await stampAPI.validatePromoCode(orderId, { code, orderAmount });
      return { ...response.data.data, code }; // Extract data and add code
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Invalid promo code');
    }
  }
);

export const createPaymentOrder = createAsyncThunk(
  'stamp/createPaymentOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await stampAPI.createPaymentOrder(orderId);
      return response.data.data; // Extract data object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create payment order');
    }
  }
);

export const verifyPayment = createAsyncThunk(
  'stamp/verifyPayment',
  async ({ orderId, paymentData }, { rejectWithValue }) => {
    try {
      const response = await stampAPI.verifyPayment(orderId, paymentData);
      return response.data.data; // Extract data object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Payment verification failed');
    }
  }
);

export const fetchOrderDetails = createAsyncThunk(
  'stamp/fetchOrderDetails',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await stampAPI.getOrderDetails(orderId);
      return response.data.data; // Extract data object
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch order');
    }
  }
);

const stampSlice = createSlice({
  name: 'stamp',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < 5) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    setDraftOrder: (state, action) => {
      state.draftOrder = { ...state.draftOrder, ...action.payload };
    },
    setServiceType: (state, action) => {
      state.serviceType = action.payload;
    },
    setDoorstepDelivery: (state, action) => {
      state.doorstepDelivery = action.payload;
    },
    setPromoCode: (state, action) => {
      state.promoCode = action.payload;
    },
    removePromoCode: (state) => {
      state.promoCode = '';
      state.promoApplied = false;
      state.promoDiscount = 0;
    },
    resetFlow: () => {
      return initialState;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch States
      .addCase(fetchStates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Templates
      .addCase(fetchTemplatesByState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplatesByState.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchTemplatesByState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Promo Codes
      .addCase(fetchPromoCodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPromoCodes.fulfilled, (state, action) => {
        state.loading = false;
        state.promoCodes = action.payload;
      })
      .addCase(fetchPromoCodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Draft Order
      .addCase(createDraftOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDraftOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderId = action.payload.orderId;
        state.pricing = action.payload.breakdown;
        state.currentStep = 4; // Move to checkout
      })
      .addCase(createDraftOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Service Selection
      .addCase(updateServiceSelection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServiceSelection.fulfilled, (state, action) => {
        state.loading = false;
        state.pricing = action.payload.breakdown;
      })
      .addCase(updateServiceSelection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Validate Promo Code
      .addCase(validatePromoCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validatePromoCode.fulfilled, (state, action) => {
        state.loading = false;
        state.promoApplied = true;
        state.promoDiscount = action.payload.discount;
        state.promoCode = action.payload.code;
      })
      .addCase(validatePromoCode.rejected, (state, action) => {
        state.loading = false;
        state.promoApplied = false;
        state.error = action.payload;
      })

      // Create Payment Order
      .addCase(createPaymentOrder.pending, (state) => {
        state.paymentLoading = true;
        state.error = null;
      })
      .addCase(createPaymentOrder.fulfilled, (state) => {
        state.paymentLoading = false;
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.paymentLoading = false;
        state.error = action.payload;
      })

      // Verify Payment
      .addCase(verifyPayment.pending, (state) => {
        state.paymentLoading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.orderDetails = action.payload;
        state.currentStep = 5; // Move to success page
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.paymentLoading = false;
        state.error = action.payload;
      })

      // Fetch Order Details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCurrentStep,
  nextStep,
  prevStep,
  setDraftOrder,
  setServiceType,
  setDoorstepDelivery,
  setPromoCode,
  removePromoCode,
  resetFlow,
  clearError,
} = stampSlice.actions;

export default stampSlice.reducer;
