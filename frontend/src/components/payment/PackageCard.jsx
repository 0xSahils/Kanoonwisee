import React from 'react';
import { formatCurrency } from '../../utils/formatters';
import PaymentButton from './PaymentButton';

const PackageCard = ({ 
  package: pkg, 
  onPaymentSuccess, 
  onPaymentError,
  className = '',
  isSelected = false,
  onSelect 
}) => {
  if (!pkg) return null;

  const features = Array.isArray(pkg.features) ? pkg.features : [];

  return (
    <div className={`
      relative bg-white rounded-lg shadow-lg border-2 transition-all duration-300
      ${isSelected ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200 hover:border-blue-300'}
      ${className}
    `}>
      {isSelected && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-1 text-sm font-medium rounded-full">
            Selected
          </span>
        </div>
      )}
      
      <div className="p-6">
        {/* Package Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {pkg.name}
          </h3>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {formatCurrency(pkg.price)}
          </div>
          <p className="text-gray-600">
            Valid for {pkg.duration} days
          </p>
        </div>

        {/* Package Description */}
        {pkg.description && (
          <div className="mb-6">
            <p className="text-gray-700 text-center">
              {pkg.description}
            </p>
          </div>
        )}

        {/* Features List */}
        {features.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Features included:</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
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

        {/* Action Buttons */}
        <div className="space-y-3">
          {onSelect && (
            <button
              onClick={() => onSelect(pkg)}
              className={`
                w-full px-4 py-2 border border-blue-600 rounded-lg font-medium transition-colors duration-200
                ${isSelected 
                  ? 'bg-blue-600 text-white' 
                  : 'text-blue-600 bg-white hover:bg-blue-50'
                }
              `}
            >
              {isSelected ? 'Selected' : 'Select Package'}
            </button>
          )}
          
          <PaymentButton
            packageId={pkg.id}
            onSuccess={onPaymentSuccess}
            onError={onPaymentError}
            className="w-full"
          >
            Subscribe Now
          </PaymentButton>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;