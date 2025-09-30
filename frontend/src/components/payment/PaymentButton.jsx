import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder, verifyPayment, setPaymentState } from '../../store/slices/paymentSlice';
import { toast } from 'react-hot-toast';

const PaymentButton = ({ 
  packageId, 
  className = '', 
  children = 'Pay Now',
  onSuccess,
  onError,
  disabled = false 
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.payment);
  const { user } = useSelector((state) => state.auth);
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!packageId) {
      toast.error('Package not selected');
      return;
    }

    if (!user) {
      toast.error('Please login to continue');
      return;
    }

    try {
      setIsProcessing(true);
      dispatch(setPaymentState('creating'));

      // Create order
      const orderResult = await dispatch(createOrder(packageId)).unwrap();
      
      if (!orderResult.orderId) {
        throw new Error('Failed to create order');
      }

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error('Payment gateway not loaded. Please refresh the page.');
      }

      // Razorpay options
      const options = {
        key: orderResult.keyId,
        amount: orderResult.amount,
        currency: orderResult.currency,
        name: 'KanoonWise',
        description: `Payment for ${orderResult.packageName}`,
        order_id: orderResult.orderId,
        prefill: {
          name: user.name || user.email.split('@')[0],
          email: user.email,
          contact: user.phone || '',
        },
        theme: {
          color: '#2563eb', // Blue theme color
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            dispatch(setPaymentState('idle'));
            toast.error('Payment cancelled');
          },
        },
        handler: async (response) => {
          try {
            // Verify payment
            const verifyResult = await dispatch(verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            })).unwrap();

            toast.success('Payment successful!');
            setIsProcessing(false);
            
            // Call success callback if provided
            if (onSuccess) {
              onSuccess(verifyResult, response);
            }
          } catch (verifyError) {
            console.error('Payment verification failed:', verifyError);
            toast.error(verifyError || 'Payment verification failed');
            setIsProcessing(false);
            
            // Call error callback if provided
            if (onError) {
              onError(verifyError);
            }
          }
        },
        error: (error) => {
          console.error('Razorpay error:', error);
          toast.error('Payment failed. Please try again.');
          setIsProcessing(false);
          dispatch(setPaymentState('failed'));
          
          // Call error callback if provided
          if (onError) {
            onError(error);
          }
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment initiation failed:', error);
      toast.error(error.message || 'Failed to initiate payment');
      setIsProcessing(false);
      dispatch(setPaymentState('failed'));
      
      // Call error callback if provided
      if (onError) {
        onError(error);
      }
    }
  };

  const isLoading = loading.createOrder || isProcessing;

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center px-6 py-3 
        border border-transparent text-base font-medium rounded-lg
        text-white bg-blue-600 hover:bg-blue-700 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default PaymentButton;