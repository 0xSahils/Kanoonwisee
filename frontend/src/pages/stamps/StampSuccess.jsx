import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails } from '../../store/stampSlice';
import Header from '../../components/landing/Header';

const StampSuccess = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderDetails, loading } = useSelector((state) => state.stamp);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetails(orderId));
      
      // Poll for PDF generation
      const interval = setInterval(() => {
        dispatch(fetchOrderDetails(orderId));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [orderId, dispatch]);

  if (loading && !orderDetails) {
    return (
      <>
      <Header />
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
      </>
    );
  }

  // If order details failed to load
  if (!loading && !orderDetails) {
    return (
      <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4 pt-24">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              We couldn't find the details for this order. Please check your email or contact support.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }

  const isGenerating = orderDetails?.status === 'generating' || orderDetails?.status === 'payment_verified';
  const isReady = orderDetails?.status === 'generated';

  const handleDownloadAndNavigate = () => {
    // Trigger download
    if (orderDetails?.s3PresignedUrl) {
      const link = document.createElement('a');
      link.href = orderDetails.s3PresignedUrl;
      link.download = `stamp-paper-${orderId}.pdf`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Navigate to home after a short delay to ensure download starts
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50 py-12 px-4 pt-24">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {isGenerating && (
            <>
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Generating Your Stamp Paper...
              </h1>
              <p className="text-gray-600 mb-6">
                Please wait while we generate your official e-stamp paper.
                This usually takes a few seconds.
              </p>
            </>
          )}

          {isReady && (
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Payment Successful!
              </h1>
              <p className="text-gray-600 mb-8">
                Your e-stamp paper has been generated successfully.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h2 className="font-semibold mb-4">Order Details</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono">{orderDetails.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">State:</span>
                    <span>{orderDetails.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Document Type:</span>
                    <span>{orderDetails.documentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">
                      ₹{(orderDetails.totalAmount / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="capitalize">{orderDetails.serviceType}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleDownloadAndNavigate}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors"
                >
                  📄 Download Stamp Paper PDF & Return Home
                </button>
              </div>

              <p className="text-xs text-red-600 mt-6">
                ⚠️ This document will be available for download for 30 days.
              </p>
            </>
          )}

          {!isGenerating && !isReady && (
            <>
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Processing Order
              </h1>
              <p className="text-gray-600 mb-8">
                Your order is being processed. Current status: <span className="font-semibold">{orderDetails?.status}</span>
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h2 className="font-semibold mb-4">Order Details</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono">{orderDetails?.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold capitalize">{orderDetails?.status}</span>
                  </div>
                  {orderDetails?.state && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">State:</span>
                      <span>{orderDetails.state}</span>
                    </div>
                  )}
                  {orderDetails?.documentType && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Document Type:</span>
                      <span>{orderDetails.documentType}</span>
                    </div>
                  )}
                  {orderDetails?.totalAmount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-semibold">
                        ₹{(orderDetails.totalAmount / 100).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => navigate('/')}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors"
              >
                Return Home
              </button>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default StampSuccess;
