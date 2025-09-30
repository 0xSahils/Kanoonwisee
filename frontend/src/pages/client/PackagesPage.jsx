import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPackages, setSelectedPackage, clearPaymentErrors } from '../../store/slices/paymentSlice';
import { toast } from 'react-hot-toast';
import PackageCard from '../../components/payment/PackageCard';

const PackagesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { packages, loading, error, selectedPackage } = useSelector((state) => state.payment);
  const { user } = useSelector((state) => state.auth);
  
  const [localSelectedPackage, setLocalSelectedPackage] = useState(null);

  useEffect(() => {
    dispatch(fetchPackages());
    
    // Clear any previous payment errors
    dispatch(clearPaymentErrors());
  }, [dispatch]);

  useEffect(() => {
    if (error.packages) {
      toast.error(error.packages);
    }
  }, [error.packages]);

  const handlePackageSelect = (pkg) => {
    setLocalSelectedPackage(pkg);
    dispatch(setSelectedPackage(pkg));
  };

  const handlePaymentSuccess = (verificationResult, razorpayResponse) => {
    toast.success('Payment successful! Redirecting to success page...');
    
    // Navigate to success page with payment details
    navigate('/client/payment-success', {
      state: {
        orderId: verificationResult.order_id || razorpayResponse.razorpay_order_id,
        paymentId: razorpayResponse.razorpay_payment_id,
        package: selectedPackage || localSelectedPackage,
      }
    });
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    toast.error('Payment failed. Please try again.');
  };

  if (loading.packages) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Legal Service Package
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the package that best fits your legal needs. All packages include 
            access to qualified lawyers and comprehensive legal support.
          </p>
        </div>

        {/* User Info */}
        {user && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-800">
              <span className="font-medium">Logged in as:</span> {user.email}
              {user.role && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              )}
            </p>
          </div>
        )}

        {/* Error State */}
        {error.packages && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">
              Error loading packages: {error.packages}
            </p>
            <button
              onClick={() => dispatch(fetchPackages())}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Packages Grid */}
        {packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                isSelected={selectedPackage?.id === pkg.id || localSelectedPackage?.id === pkg.id}
                onSelect={handlePackageSelect}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            ))}
          </div>
        ) : (
          !loading.packages && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No packages available</h3>
              <p className="text-gray-600">
                There are currently no packages available. Please check back later.
              </p>
            </div>
          )
        )}

        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose KanoonWise?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Lawyers</h3>
              <p className="text-gray-600">All our lawyers are verified and have relevant experience in their practice areas.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Platform</h3>
              <p className="text-gray-600">Your personal information and legal matters are kept confidential and secure.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM8.25 12l7.5 0" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Get support whenever you need it with our round-the-clock customer service.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;