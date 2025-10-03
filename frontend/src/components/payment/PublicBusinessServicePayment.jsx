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
  packageData = null,
  buttonText,
  className = '',
  onPaymentSuccess 
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { packages, loading, packagesFetched } = useSelector((state) => state.payment);
  
  const [matchedPackage, setMatchedPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [showDetailsForm, setShowDetailsForm] = useState(false);

  // Service name to package name mapping
  const getServiceToPackageMap = () => ({
    // Private Limited Company Registration
    'Private Limited Company': 'Starter Plan',
    'Private Limited Registration': 'Starter Plan',
    'Private Limited Company Registration': 'Starter Plan',
    
    // OPC Registration
    'One Person Company': 'OPC Starter Plan',
    'OPC Registration': 'OPC Starter Plan',
    'One Person Company Registration': 'OPC Starter Plan',
    'OPC 🌱 Starter Plan': 'OPC Starter Plan',
    'OPC 🏆 Premium Plan': 'OPC Premium Plan',
    'OPC Starter Plan': 'OPC Starter Plan',
    'OPC Premium Plan': 'OPC Premium Plan',
    
    // Sole Proprietorship
    'Sole Proprietorship': 'Sole Proprietorship Registration',
    'Sole Proprietorship Registration': 'Sole Proprietorship Registration',
    'Sole Proprietorship Starter Plan': 'Sole Proprietorship Starter Plan',
    'Sole Proprietorship Premium Plan': 'Sole Proprietorship Premium Plan',
    
    // Partnership Firm Registration
    'Partnership Firm': 'Partnership Starter Plan',
    'Partnership Firm Registration': 'Partnership Starter Plan',
    'Partnership Starter Plan': 'Partnership Starter Plan',
    'Partnership Premium Plan': 'Partnership Premium Plan',
    
    // Trademark Services
    'Trademark Registration': 'Brand Starter',
    'Trademark Services': 'Brand Starter',
    'Brand Starter': 'Brand Starter',
    'Business Shield': 'Business Shield',
    'Enterprise Guard': 'Enterprise Guard',
    
    // Patent Services
    'Patent Services': 'Provisional Patent Filing',
    'Patent Registration': 'Provisional Patent Filing',
    'Provisional Patent Filing': 'Provisional Patent Filing',
    'Complete Patent Prosecution': 'Complete Patent Prosecution',
    
    // Copyright Services
    'Copyright Registration': 'Creator Basic',
    'Copyright Services': 'Creator Basic',
    'Creator Basic': 'Creator Basic',
    'Professional Shield': 'Professional Shield',
    'Enterprise Vault': 'Enterprise Vault',
    
    // Design Registration
    'Design Registration': 'Design Basic',
    'Design Services': 'Design Basic',
    'Design Basic': 'Design Basic',
    'Design Professional': 'Design Professional',
    'Design Enterprise': 'Design Enterprise',
    
    // Virtual Legal Officer
    'Virtual Legal Officer': 'VLO Advisory Plan',
    'VLO': 'VLO Advisory Plan',
    'VLO Advisory Plan': 'VLO Advisory Plan',
    'VLO Growth Plan': 'VLO Growth Plan',
    
    // Labour Law Compliance
    'Labour Law Compliance': 'Starter Team',
    'Startup Team': 'Starter Team',
    'Starter Team': 'Starter Team',
    'Growth Team': 'Growth Team',
    
    // GST Compliance
    'GST Compliance': 'GST Registration',
    'GST Registration': 'GST Registration',
    'GST Filing - Standard': 'GST Filing - Standard',
    'GST Filing - Pro': 'GST Filing - Pro',
    
    // Accounting Tax Services
    'Accounting Tax Services': 'Startup Plan',
    'Accounting & Tax Services': 'Startup Plan',
    'Startup Plan': 'Startup Plan',
    'Growth Plan': 'Growth Plan',
    
    // LLP Services
    'LLP Registration': 'LLP Registration',
    'Limited Liability Partnership': 'LLP Registration',
    'LLP Filing Essentials': 'LLP Filing Essentials',
    'LLP Compliance Retainer': 'LLP Compliance Retainer',
    
    // Other services
    'Nidhi Company': 'Nidhi Company Registration',
    'Nidhi Company Registration': 'Nidhi Company Registration',
    'Startup Legal Kit': 'Startup Legal Kit',
    'Startup Package': 'Startup Legal Kit',
    'Essential Kit': 'Essential Kit',
    'Growth Kit': 'Growth Kit',
    'Scale-Up Kit': 'Scale-Up Kit',
    'Compliance Package': 'Compliance Package',
    'Annual Compliance': 'Compliance Package',
    'Filing Essentials': 'Filing Essentials',
    'Annual Compliance Retainer': 'Annual Compliance Retainer',
    'Complete Secretarial': 'Complete Secretarial',
    'POSH Compliance': 'POSH Compliance',
  });

  // Fetch packages once on component mount (skip if packageData is provided)
  useEffect(() => {
    // Always skip if packageData is provided
    if (packageData) {
      setIsLoading(false);
      return;
    }
    
    // Only fetch if we don't have packages and haven't fetched before
    const shouldFetchPackages = !packagesFetched && (!packages || packages.length === 0);
    const notCurrentlyLoading = !loading.packages;
    const notAlreadyFetched = !hasFetched;
    
    if (shouldFetchPackages && notCurrentlyLoading && notAlreadyFetched) {
      console.log('Fetching public packages...');
      setHasFetched(true);
      setIsLoading(true);
      
      dispatch(fetchPublicPackages())
        .unwrap()
        .then(() => {
          console.log('Public packages fetched successfully');
        })
        .catch((error) => {
          console.error('Failed to fetch packages:', error);
          toast.error('Failed to load service packages');
          setHasFetched(false); // Reset on error to allow retry
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (packagesFetched && packages && packages.length > 0) {
      // Packages already available, no need to fetch
      setIsLoading(false);
      if (!hasFetched) {
        setHasFetched(true);
      }
    }
  }, [dispatch, packages, packagesFetched, loading.packages, hasFetched, packageData]);

  // Match service to package when packages are loaded or use provided packageData
  useEffect(() => {
    if (packageData) {
      // Use provided package data directly
      setMatchedPackage(packageData);
      setIsLoading(false);
    } else if (packages && packages.length > 0 && serviceName) {
      const serviceToPackageMap = getServiceToPackageMap();
      const packageName = serviceToPackageMap[serviceName] || serviceName;
      
      const foundPackage = packages.find(pkg => 
        pkg.name.toLowerCase().includes(packageName.toLowerCase()) ||
        packageName.toLowerCase().includes(pkg.name.toLowerCase())
      );
      
      setMatchedPackage(foundPackage);
    }
  }, [packages, serviceName, packageData]);

  // Format price display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Extract numeric value from price string (e.g., "₹14,999" -> 14999)
  const extractNumericPrice = (priceString) => {
    if (typeof priceString === 'number') return priceString;
    if (typeof priceString === 'string') {
      return parseInt(priceString.replace(/[^\d]/g, ''));
    }
    return 0;
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
      const requestBody = {
        customerDetails
      };

      // For backend packages, use packageId. For local packages, send the full package data
      // Check if this is a real UUID (database package) or local package data
      const isUUID = matchedPackage.id && matchedPackage.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
      
      if (isUUID) {
        // Real database package - send packageId
        requestBody.packageId = matchedPackage.id;
      } else {
        // Local package data - send the full package data
        requestBody.packageData = {
          name: matchedPackage.name,
          price: extractNumericPrice(matchedPackage.price),
          description: matchedPackage.bestFor || matchedPackage.description || '',
          features: matchedPackage.features || []
        };
      }

      const orderResponse = await fetch(`${import.meta.env.VITE_API_URL}/public-payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
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
        description: `Payment for ${orderData.package.name}`.replace(/[^\w\s\-.,()]/g, ''), // Remove special characters and emojis
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
  if (isLoading || loading.packages) {
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

  const defaultButtonText = `Get Started - ${typeof matchedPackage.price === 'number' ? formatPrice(matchedPackage.price) : matchedPackage.price}`;

  return (
    <div className={`business-service-payment ${className}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
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
        <div>
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
                    <span>Pay {typeof matchedPackage.price === 'number' ? formatPrice(matchedPackage.price) : matchedPackage.price}</span>
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