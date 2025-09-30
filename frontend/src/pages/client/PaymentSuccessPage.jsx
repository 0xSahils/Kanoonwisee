import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrderDetails } from '../../store/slices/paymentSlice';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.payment);
  
  const [orderDetails, setOrderDetails] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);

  // Get data from navigation state or URL params
  const stateData = location.state || {};
  const urlParams = new URLSearchParams(location.search);
  
  const orderId = stateData.orderId || urlParams.get('orderId');
  const paymentId = stateData.paymentId || urlParams.get('paymentId');
  const packageData = stateData.package;
  const serviceName = stateData.serviceName; // For business services
  const isBusinessService = Boolean(serviceName);

  useEffect(() => {
    // If we have package data from state, use it
    if (packageData) {
      setPackageDetails(packageData);
    }

    // If we have orderId, fetch order details
    if (orderId) {
      dispatch(fetchOrderDetails(orderId))
        .unwrap()
        .then((result) => {
          setOrderDetails(result);
          // If we don't have package data from state, get it from order details
          if (!packageData && result.package) {
            setPackageDetails(result.package);
          }
        })
        .catch((error) => {
          console.error('Failed to fetch order details:', error);
        });
    }

    // If no orderId or paymentId, redirect to packages page
    if (!orderId && !paymentId) {
      navigate('/client/packages');
    }
  }, [orderId, paymentId, packageData, dispatch, navigate]);

  if (loading.orderDetails && !orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600">
            {isBusinessService 
              ? `Thank you for choosing our ${serviceName} service. Your payment has been processed successfully.`
              : 'Thank you for your subscription. Your payment has been processed successfully.'
            }
          </p>
        </div>

        {/* Payment Details Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-green-50 px-6 py-4 border-b border-green-200">
            <h2 className="text-xl font-semibold text-green-800">Payment Details</h2>
          </div>
          
          <div className="p-6 space-y-4">
            {paymentId && (
              <div className="flex justify-between">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-mono text-sm">{paymentId}</span>
              </div>
            )}
            
            {orderId && (
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono text-sm">{orderId}</span>
              </div>
            )}
            
            {orderDetails?.created_at && (
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Date:</span>
                <span>{formatDateTime(orderDetails.created_at)}</span>
              </div>
            )}
            
            {orderDetails?.amount && (
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(orderDetails.amount / 100)}
                </span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Paid
              </span>
            </div>
          </div>
        </div>

        {/* Package Details Card */}
        {packageDetails && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
              <h2 className="text-xl font-semibold text-blue-800">Subscription Details</h2>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {packageDetails.name}
                  </h3>
                  {packageDetails.description && (
                    <p className="text-gray-600 mt-1">{packageDetails.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(packageDetails.price)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Valid for {packageDetails.duration} days
                  </div>
                </div>
              </div>

              {/* Features */}
              {packageDetails.features && packageDetails.features.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Included Features:</h4>
                  <ul className="space-y-2">
                    {packageDetails.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">What's Next?</h3>
          <ul className="space-y-2 text-blue-700">
            {isBusinessService ? (
              <>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Our legal experts will contact you within 24 hours to begin the {serviceName} process
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  You will receive a detailed checklist of required documents via email
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Track your service progress through your client dashboard
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Get priority support and consultation throughout the process
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  You can now access all features included in your subscription
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Book appointments with qualified lawyers
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Access your subscription details in your dashboard
                </li>
              </>
            )}
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              A confirmation email has been sent to your registered email address
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/client/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Go to Dashboard
          </Link>
          
          <Link
            to="/client/orders"
            className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            View All Orders
          </Link>
          
          <Link
            to="/client/packages"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
          >
            Browse More Packages
          </Link>
        </div>

        {/* Help Section */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Need help or have questions about your subscription?
          </p>
          <div className="space-x-4">
            <Link
              to="/support"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              to="/faq"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;