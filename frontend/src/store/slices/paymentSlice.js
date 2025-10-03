import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { paymentAPI } from '../../api/payment';

// Async thunks
export const fetchPackages = createAsyncThunk(
  'payment/fetchPackages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await paymentAPI.getPackages();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch packages');
    }
  }
);

export const fetchPublicPackages = createAsyncThunk(
  'payment/fetchPublicPackages',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Check if packages are already loaded and not stale
      const state = getState();
      const existingPackages = state.payment?.packages;
      const packagesFetched = state.payment?.packagesFetched;
      const isLoading = state.payment?.loading?.packages;
      
      // If we already have packages and have fetched before, return them
      if (packagesFetched && existingPackages && existingPackages.length > 0 && !isLoading) {
        console.log('Using cached packages, skipping API call');
        return { data: existingPackages, fromCache: true };
      }
      
      console.log('Making API call for public packages');
      const response = await paymentAPI.getPublicPackages();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch public packages');
    }
  }
);

export const createOrder = createAsyncThunk(
  'payment/createOrder',
  async (packageId, { rejectWithValue }) => {
    try {
      const response = await paymentAPI.createOrder(packageId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create order');
    }
  }
);

export const verifyPayment = createAsyncThunk(
  'payment/verifyPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await paymentAPI.verifyPayment(paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Payment verification failed');
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'payment/fetchUserOrders',
  async (status, { rejectWithValue }) => {
    try {
      const response = await paymentAPI.getUserOrders(status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const fetchOrderDetails = createAsyncThunk(
  'payment/fetchOrderDetails',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await paymentAPI.getOrderDetails(orderId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch order details');
    }
  }
);

const initialState = {
  packages: [],
  packagesFetched: false, // Flag to track if packages have been fetched
  currentOrder: null,
  userOrders: [],
  selectedPackage: null,
  loading: {
    packages: false,
    createOrder: false,
    verifyPayment: false,
    userOrders: false,
    orderDetails: false,
  },
  error: {
    packages: null,
    createOrder: null,
    verifyPayment: null,
    userOrders: null,
    orderDetails: null,
  },
  paymentState: 'idle', // 'idle', 'creating', 'processing', 'success', 'failed'
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearPaymentErrors: (state) => {
      state.error = {
        packages: null,
        createOrder: null,
        verifyPayment: null,
        userOrders: null,
        orderDetails: null,
      };
    },
    setSelectedPackage: (state, action) => {
      state.selectedPackage = action.payload;
    },
    resetPaymentState: (state) => {
      state.paymentState = 'idle';
      state.currentOrder = null;
      state.error.createOrder = null;
      state.error.verifyPayment = null;
    },
    setPaymentState: (state, action) => {
      state.paymentState = action.payload;
    },
    clearPackages: (state) => {
      state.packages = [];
      state.packagesFetched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch packages
      .addCase(fetchPackages.pending, (state) => {
        state.loading.packages = true;
        state.error.packages = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading.packages = false;
        state.packages = action.payload.data || action.payload;
        state.packagesFetched = true;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading.packages = false;
        state.error.packages = action.payload;
      })

      // Fetch public packages
      .addCase(fetchPublicPackages.pending, (state) => {
        state.loading.packages = true;
        state.error.packages = null;
      })
      .addCase(fetchPublicPackages.fulfilled, (state, action) => {
        state.loading.packages = false;
        // Handle both fresh API responses and cached responses
        if (action.payload.fromCache) {
          // Data is from cache, packages already set
          console.log('Packages loaded from cache');
        } else {
          // Fresh API response
          state.packages = action.payload.data || action.payload;
          state.packagesFetched = true;
          console.log('Packages loaded from API:', state.packages.length);
        }
      })
      .addCase(fetchPublicPackages.rejected, (state, action) => {
        state.loading.packages = false;
        state.error.packages = action.payload;
      })

      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading.createOrder = true;
        state.error.createOrder = null;
        state.paymentState = 'creating';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading.createOrder = false;
        state.currentOrder = action.payload.data || action.payload;
        state.paymentState = 'processing';
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading.createOrder = false;
        state.error.createOrder = action.payload;
        state.paymentState = 'failed';
      })

      // Verify payment
      .addCase(verifyPayment.pending, (state) => {
        state.loading.verifyPayment = true;
        state.error.verifyPayment = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading.verifyPayment = false;
        state.currentOrder = action.payload.data || action.payload;
        state.paymentState = 'success';
        // Add to user orders if not already present
        if (state.userOrders && !state.userOrders.find(order => order.order_id === state.currentOrder.order_id)) {
          state.userOrders.unshift(state.currentOrder);
        }
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading.verifyPayment = false;
        state.error.verifyPayment = action.payload;
        state.paymentState = 'failed';
      })

      // Fetch user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading.userOrders = true;
        state.error.userOrders = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading.userOrders = false;
        state.userOrders = action.payload.data || action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading.userOrders = false;
        state.error.userOrders = action.payload;
      })

      // Fetch order details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading.orderDetails = true;
        state.error.orderDetails = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading.orderDetails = false;
        // Update the order in userOrders if it exists
        const orderData = action.payload.data || action.payload;
        const orderIndex = state.userOrders.findIndex(order => order.order_id === orderData.order_id);
        if (orderIndex !== -1) {
          state.userOrders[orderIndex] = orderData;
        }
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading.orderDetails = false;
        state.error.orderDetails = action.payload;
      });
  },
});

export const {
  clearPaymentErrors,
  setSelectedPackage,
  resetPaymentState,
  setPaymentState,
  clearPackages,
} = paymentSlice.actions;

export default paymentSlice.reducer;