import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaymentButton from './PaymentButton';
import { fetchPackages } from '../../store/slices/paymentSlice';
import { toast } from 'react-hot-toast';

/**
 * BusinessServicePayment Component
 * 
 * Displays a payment button for business services with appropriate pricing
 * Matches business service types to database packages
 * 
 * @param {string} serviceName - Name of the business service (e.g., "Trademark Registration")
 * @param {string} serviceType - Type of service for package matching
 * @param {string} buttonText - Custom button text (optional)
 * @param {string} className - Additional CSS classes
 * @param {function} onPaymentSuccess - Callback for successful payment
 */
const BusinessServicePayment = ({ 
  serviceName = '',
  buttonText,
  className = '',
  onPaymentSuccess 
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { packages, loading } = useSelector((state) => state.payment);
  const { user } = useSelector((state) => state.auth);
  
  const [matchedPackage, setMatchedPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch packages on component mount
  useEffect(() => {
    const loadPackages = async () => {
      try {
        if (!packages || packages.length === 0) {
          await dispatch(fetchPackages()).unwrap();
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
      // Service name to package name mapping
      const serviceToPackageMap = {
        // Company Registration Services
        'Private Limited Company': 'Private Limited Company Registration',
        'Private Limited Registration': 'Private Limited Company Registration',
        'LLP Registration': 'LLP Registration',
        'Limited Liability Partnership': 'LLP Registration',
        'One Person Company': 'One Person Company (OPC) Registration',
        'OPC Registration': 'One Person Company (OPC) Registration',
        'Sole Proprietorship': 'Sole Proprietorship Registration',
        'Sole Proprietorship Registration': 'Sole Proprietorship Registration',
        'Partnership Firm': 'Partnership Firm Registration',
        'Partnership Firm Registration': 'Partnership Firm Registration',
        'Nidhi Company': 'Nidhi Company Registration',
        'Nidhi Company Registration': 'Nidhi Company Registration',
        
        // Trademark & IP Services
        'Trademark Registration': 'Trademark Registration',
        'Trademark Services': 'Trademark Registration',
        'Patent Services': 'Patent Services',
        'Patent Registration': 'Patent Services',
        'Copyright Registration': 'Copyright Registration',
        'Copyright Services': 'Copyright Registration',
        'Design Registration': 'Design Registration',
        'Design Services': 'Design Registration',
        
        // Startup Services
        'Startup Legal Kit': 'Startup Legal Kit',
        'Startup Package': 'Startup Legal Kit',
        'Virtual Legal Officer': 'Virtual Legal Officer',
        'VLO': 'Virtual Legal Officer',
        'Compliance Package': 'Compliance Package',
        'Annual Compliance': 'Compliance Package',
      };

      const packageName = serviceToPackageMap[serviceName] || serviceName;
      const foundPackage = packages.find(pkg => 
        pkg.name.toLowerCase().includes(packageName.toLowerCase()) ||
        packageName.toLowerCase().includes(pkg.name.toLowerCase())
      );
      
      if (foundPackage) {
        setMatchedPackage(foundPackage);
      } else {
        // Fallback: try to match by service type or partial name
        const fallbackPackage = packages.find(pkg => {
          const pkgName = pkg.name.toLowerCase();
          const svcName = serviceName.toLowerCase();
          return pkgName.includes('trademark') && svcName.includes('trademark') ||
                 pkgName.includes('patent') && svcName.includes('patent') ||
                 pkgName.includes('copyright') && svcName.includes('copyright') ||
                 pkgName.includes('company') && svcName.includes('company') ||
                 pkgName.includes('llp') && svcName.includes('llp') ||
                 pkgName.includes('startup') && svcName.includes('startup');
        });
        setMatchedPackage(fallbackPackage);
      }
    }
  }, [packages, serviceName]);

  const handlePaymentSuccess = (paymentResult, razorpayResponse) => {
    // Navigate to success page with service details
    navigate('/payment/success', {
      state: {
        serviceName,
        packageName: matchedPackage?.name,
        amount: matchedPackage?.price,
        orderId: paymentResult.orderId,
        paymentId: razorpayResponse.razorpay_payment_id,
      }
    });

    // Call parent callback if provided
    if (onPaymentSuccess) {
      onPaymentSuccess(paymentResult, razorpayResponse);
    }
  };

  const handlePaymentError = (error) => {
    toast.error('Payment failed. Please try again.');
    console.error('Business service payment error:', error);
  };

  const handleLoginRequired = () => {
    toast.error('Please login to continue with payment');
    navigate('/auth/login', { 
      state: { returnTo: window.location.pathname } 
    });
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
          onClick={() => navigate('/contact')}
          className="text-blue-600 hover:text-blue-800 underline text-sm"
        >
          Contact us for custom pricing
        </button>
      </div>
    );
  }

  // Format price display
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Safely parse features from database
  const parseFeatures = (features) => {
    if (!features) return [];
    
    // If it's already an array, return it
    if (Array.isArray(features)) return features;
    
    // If it's a string, try to parse as JSON
    if (typeof features === 'string') {
      try {
        const parsed = JSON.parse(features);
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.warn('Failed to parse features as JSON:', error);
        // If JSON parsing fails, treat as a single feature
        return [features];
      }
    }
    
    return [];
  };

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

        {/* Payment Button */}
        <div className="pt-4 border-t border-gray-100">
          {user ? (
            <PaymentButton
              packageId={matchedPackage.id}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center justify-center space-x-2">
                <i className="fas fa-shield-alt"></i>
                <span>{buttonText || defaultButtonText}</span>
              </div>
            </PaymentButton>
          ) : (
            <button
              onClick={handleLoginRequired}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center justify-center space-x-2">
                <i className="fas fa-sign-in-alt"></i>
                <span>Login to Get Started</span>
              </div>
            </button>
          )}
          
          {/* Security Note */}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
              <i className="fas fa-lock"></i>
              <span>100% Secure Payment • SSL Encrypted</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessServicePayment;