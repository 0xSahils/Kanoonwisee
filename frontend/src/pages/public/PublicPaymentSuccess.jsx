import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

/**
 * PublicPaymentSuccess Component
 * 
 * Success page for public business service purchases
 */
const PublicPaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // Get payment data from navigation state
    if (location.state) {
      setPaymentData(location.state);
    } else {
      // If no state data, redirect to home
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <i className="fas fa-check text-green-600 text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for choosing KanoonWise for your legal services
          </p>
        </div>

        {/* Payment Details Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Payment Details
            </h2>
          </div>
          <div className="px-6 py-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Service</p>
                <p className="text-lg text-gray-900">{paymentData.packageName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Amount Paid</p>
                <p className="text-lg text-green-600 font-semibold">
                  {formatPrice(paymentData.amount)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Order ID</p>
                <p className="text-sm text-gray-900 font-mono">{paymentData.orderId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Payment ID</p>
                <p className="text-sm text-gray-900 font-mono">{paymentData.paymentId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Details Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Customer Information
            </h2>
          </div>
          <div className="px-6 py-6 space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-lg text-gray-900">{paymentData.customerDetails.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-lg text-gray-900">{paymentData.customerDetails.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-lg text-gray-900">{paymentData.customerDetails.phone}</p>
            </div>
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 bg-yellow-50 border-b border-yellow-100">
            <h2 className="text-xl font-semibold text-gray-900">
              What Happens Next?
            </h2>
          </div>
          <div className="px-6 py-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                    <span className="text-sm font-medium text-blue-600">1</span>
                  </div>
                </div>
                <div>
                  <p className="text-base text-gray-900 font-medium">
                    Confirmation Email
                  </p>
                  <p className="text-sm text-gray-600">
                    You'll receive a confirmation email with payment receipt and service details within 5 minutes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                    <span className="text-sm font-medium text-blue-600">2</span>
                  </div>
                </div>
                <div>
                  <p className="text-base text-gray-900 font-medium">
                    Expert Contact
                  </p>
                  <p className="text-sm text-gray-600">
                    Our legal expert will contact you within 24 hours to discuss your requirements and next steps.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                    <span className="text-sm font-medium text-blue-600">3</span>
                  </div>
                </div>
                <div>
                  <p className="text-base text-gray-900 font-medium">
                    Document Collection
                  </p>
                  <p className="text-sm text-gray-600">
                    We'll guide you through the required documents and handle all the paperwork for your service.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                    <span className="text-sm font-medium text-green-600">4</span>
                  </div>
                </div>
                <div>
                  <p className="text-base text-gray-900 font-medium">
                    Service Completion
                  </p>
                  <p className="text-sm text-gray-600">
                    We'll complete your service and provide all necessary documents and certificates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.print()}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <i className="fas fa-print"></i>
              <span>Print Receipt</span>
            </button>
            
            <button
              onClick={() => {
                const message = encodeURIComponent(
                  `Hi! I just completed payment for ${paymentData.packageName}. Order ID: ${paymentData.orderId}. Please confirm receipt and let me know the next steps.`
                );
                window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <i className="fab fa-whatsapp"></i>
              <span>Contact Support</span>
            </button>
          </div>
          
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            ← Back to Home
          </button>
        </div>

        {/* Important Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <i className="fas fa-info-circle text-blue-600 mt-1"></i>
            <div>
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> Please save this page or take a screenshot for your records. 
                If you have any questions, contact us at{' '}
                <a href="tel:+919876543210" className="underline">+91 98765 43210</a> or{' '}
                <a href="mailto:support@kanoonwise.com" className="underline">support@kanoonwise.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPaymentSuccess;