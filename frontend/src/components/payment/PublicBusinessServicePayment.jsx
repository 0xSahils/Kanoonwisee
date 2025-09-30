import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPublicPackages } from '../../store/slices/paymentSlice';
import { toast } from 'react-hot-toast';

/**
 * PublicBusinessServicePayment Component
 * 
 * Handles public business service purchases without login requirement
 * Uses Razorpay integration in TEST MODE for development
 * 
 * Note: Currently configured for test payments. For production:
 * 1. Update Razorpay key to live key
 * 2. Ensure backend has proper live key secret
 * 3. Update CSP policy if needed for live domain
 */
const PublicBusinessServicePayment = ({ 
  serviceName = '',
  buttonText,
  className = '',
  onPaymentSuccess 
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { packages, loading } = useSelector((state) => state.payment);
  
  const [matchedPackage, setMatchedPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [showDetailsForm, setShowDetailsForm] = useState(false);

  // Service name to package name mapping
  const getServiceToPackageMap = () => ({
    'Private Limited Company': 'Private Limited Company Registration',
    'Private Limited Registration': 'Private Limited Company Registration',
    'LLP Registration': 'LLP Registration',
    'Limited Liability Partnership': 'LLP Registration',
    'LLP Filing Essentials': 'LLP Filing Essentials',
    'LLP Compliance Retainer': 'LLP Compliance Retainer',
    'One Person Company': 'OPC Starter Plan',
    'OPC Registration': 'OPC Starter Plan',
    'One Person Company Registration': 'OPC Starter Plan',
    'OPC 🌱 Starter Plan': 'OPC Starter Plan',
    'OPC 🏆 Premium Plan': 'OPC Premium Plan',
    'OPC Starter Plan': 'OPC Starter Plan',
    'OPC Premium Plan': 'OPC Premium Plan',
    'Sole Proprietorship': 'Sole Proprietorship Registration',
    'Sole Proprietorship Registration': 'Sole Proprietorship Registration',
    'Sole Proprietorship Starter Plan': 'Sole Proprietorship Starter Plan',
    'Sole Proprietorship Premium Plan': 'Sole Proprietorship Premium Plan',
    'Partnership Firm': 'Partnership Firm Registration',
    'Partnership Firm Registration': 'Partnership Firm Registration',
    'Nidhi Company': 'Nidhi Company Registration',
    'Nidhi Company Registration': 'Nidhi Company Registration',
    'Trademark Registration': 'Trademark Registration',
    'Trademark Services': 'Trademark Registration',
    'Patent Services': 'Patent Services',
    'Patent Registration': 'Patent Services',
    'Copyright Registration': 'Copyright Registration',
    'Copyright Services': 'Copyright Registration',
    'Design Registration': 'Design Registration',
    'Design Services': 'Design Registration',
    'Startup Legal Kit': 'Startup Legal Kit',
    'Startup Package': 'Startup Legal Kit',
    'Essential Kit': 'Essential Kit',
    'Growth Kit': 'Growth Kit',
    'Scale-Up Kit': 'Scale-Up Kit',
    'Virtual Legal Officer': 'Virtual Legal Officer',
    'VLO': 'Virtual Legal Officer',
    'Compliance Package': 'Compliance Package',
    'Annual Compliance': 'Compliance Package',
    'GST Compliance': 'GST Compliance',
    'Labour Law Compliance': 'Labour Law Compliance',
    'POSH Compliance': 'POSH Compliance',
  });

  // Fetch packages on component mount
  useEffect(() => {
    const loadPackages = async () => {
      try {
        if (!packages || packages.length === 0) {
          await dispatch(fetchPublicPackages()).unwrap();
        }
      } catch (error) {
        console.error('Failed to fetch packages:', error);
        toast.error('Failed to load service packages');
      } finally {
        setIsLoading(false);
      }
    };

    loadPackages();
  }, [dispatch, packages]);

  // Match service to package when packages are loaded
  useEffect(() => {
    if (packages && packages.length > 0 && serviceName) {
      const serviceToPackageMap = getServiceToPackageMap();
      const packageName = serviceToPackageMap[serviceName] || serviceName;
      
      const foundPackage = packages.find(pkg => 
        pkg.name.toLowerCase().includes(packageName.toLowerCase()) ||
        packageName.toLowerCase().includes(pkg.name.toLowerCase())
      );
      
      setMatchedPackage(foundPackage);
    }
  }, [packages, serviceName]);  // Safely parse features from database
  const parseFeatures = (features) => {
    if (!features) return [];
    if (Array.isArray(features)) return features;
    if (typeof features === 'string') {
      try {
        const parsed = JSON.parse(features);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.warn('Failed to parse features as JSON:', error);
        return [features];
      }
    }
    return [];
  };

  // Format price display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Handle payment using backend order creation
  const handleDirectPayment = async () => {
    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      toast.error('Please fill in your contact details');
      return;
    }

    if (!matchedPackage) {
      toast.error('Package not selected');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerDetails.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Phone validation (basic)
    if (customerDetails.phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    try {
      setIsProcessing(true);

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error('Payment gateway not loaded. Please refresh the page.');
      }

      // Create order through backend
      const orderResponse = await fetch(`${import.meta.env.VITE_API_URL}/public-payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: matchedPackage.id,
          customerDetails
        })
      });

      if (!orderResponse.ok) {
        throw new Error(`HTTP error! status: ${orderResponse.status}`);
      }

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create payment order');
      }

      // Razorpay options
      const options = {
        key: orderData.razorpayKeyId,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'KanoonWise',
        description: `Payment for ${orderData.package.name}`,
        image: '/logo.png',
        order_id: orderData.order.id,
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.phone,
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast.error('Payment cancelled');
          },
        },
        handler: async (response) => {
          try {
            // Verify payment through backend
            const verifyResponse = await fetch(`${import.meta.env.VITE_API_URL}/public-payment/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customerDetails
              })
            });

            if (!verifyResponse.ok) {
              throw new Error(`HTTP error! status: ${verifyResponse.status}`);
            }

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              toast.success('Payment successful!');
              setIsProcessing(false);
              
              // Navigate to success page
              navigate('/payment-success', {
                state: {
                  serviceName,
                  packageName: orderData.package.name,
                  amount: orderData.package.price,
                  orderId: verifyData.order.id,
                  paymentId: verifyData.payment.id,
                  customerDetails,
                  isPublicPurchase: true,
                  receipt: verifyData.order.receipt
                }
              });

              // Call success callback if provided
              if (onPaymentSuccess) {
                onPaymentSuccess({
                  orderId: verifyData.order.id,
                  packageName: orderData.package.name,
                  amount: orderData.package.price,
                  customerDetails
                }, response);
              }
            } else {
              throw new Error(verifyData.message || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error(error.message || 'Payment verification failed');
            setIsProcessing(false);
          }
        },
        error: (error) => {
          console.error('Razorpay error:', error);
          toast.error('Payment failed. Please try again.');
          setIsProcessing(false);
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment initiation failed:', error);
      let errorMessage = 'Failed to initiate payment';
      
      if (error.message.includes('fetch failed') || error.message.includes('Failed to fetch')) {
        errorMessage = 'Backend server not reachable. Please ensure the backend is running on port 3000.';
      } else if (error.message.includes('404')) {
        errorMessage = 'Payment API endpoint not found. Please check backend routes.';
      } else if (error.message.includes('500')) {
        errorMessage = 'Server error. Please try again later.';
      }
      
      toast.error(errorMessage);
      setIsProcessing(false);
    }
  };

  // Show loading state
  if (isLoading || loading.fetchPackages) {
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading payment options...</span>
        </div>
      </div>
    );
  }

  // Show error if no package found
  if (!matchedPackage) {
    return (
      <div className={`text-center p-4 ${className}`}>
        <p className="text-gray-600 mb-2">Service package not available</p>
        <button
          onClick={() => {
            const message = encodeURIComponent(
              `Hi! I'm interested in ${serviceName} services. Could you please provide me with more details and pricing?`
            );
            window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
          }}
          className="text-blue-600 hover:text-blue-800 underline text-sm"
        >
          Contact us for custom pricing
        </button>
      </div>
    );
  }

  const defaultButtonText = `Get Started - ${formatPrice(matchedPackage.price)}`;

  return (
    <div className={`business-service-payment ${className}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        {/* Package Info */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {matchedPackage.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {matchedPackage.description}
          </p>
          
          {/* Price Display */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(matchedPackage.price)}
            </span>
            {matchedPackage.duration && (
              <span className="text-sm text-gray-500">
                • {matchedPackage.duration} days service
              </span>
            )}
          </div>

          {/* Key Features */}
          {matchedPackage.features && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                What's included:
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {parseFeatures(matchedPackage.features).slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-check text-green-500 mr-2 mt-0.5 text-xs"></i>
                    {feature}
                  </li>
                ))}
                {parseFeatures(matchedPackage.features).length > 3 && (
                  <li className="text-gray-500 italic">
                    + {parseFeatures(matchedPackage.features).length - 3} more features
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Customer Details Form */}
        {showDetailsForm && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Your Contact Details
            </h4>
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={customerDetails.email}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Payment Button */}
        <div className="pt-4 border-t border-gray-100">
          {!showDetailsForm ? (
            <button
              onClick={() => setShowDetailsForm(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center justify-center space-x-2">
                <i className="fas fa-shopping-cart"></i>
                <span>{buttonText || defaultButtonText}</span>
              </div>
            </button>
          ) : (
            <div className="space-y-3">
              <button
                onClick={handleDirectPayment}
                disabled={isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <i className="fas fa-credit-card"></i>
                    <span>Pay {formatPrice(matchedPackage.price)}</span>
                  </div>
                )}
              </button>
              <button
                onClick={() => setShowDetailsForm(false)}
                className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm"
              >
                ← Back to package details
              </button>
            </div>
          )}
          
          {/* Security Note */}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
              <i className="fas fa-lock"></i>
              <span>100% Secure Payment • No Registration Required</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicBusinessServicePayment;