import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOrderDetails,
  fetchPromoCodes,
  updateServiceSelection,
  createPaymentOrder,
  verifyPayment,
//   setServiceType,
  setDoorstepDelivery,
//   setPromoCode,
  removePromoCode,
} from '../../store/stampSlice';
import toast from 'react-hot-toast';
import { Tag, Percent, Gift, CheckCircle, Zap, Truck, Lock } from 'lucide-react';

const StampCheckout = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orderDetails, pricing, doorstepDelivery, promoCode, promoCodes, loading } =
    useSelector((state) => state.stamp);

  const [selectedService, setSelectedService] = useState('standard');
  const [promo, setPromo] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [confirmedDeliveryAddress, setConfirmedDeliveryAddress] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: '',
  });

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetails(orderId));
      dispatch(fetchPromoCodes());
    }
  }, [orderId, dispatch]);

  // Initialize delivery address with first party details
  useEffect(() => {
    if (orderDetails) {
      setDeliveryAddress({
        name: orderDetails.firstPartyName || '',
        phone: orderDetails.firstPartyPhone || '',
        address: '',
        city: '',
        pincode: '',
        state: orderDetails.state || '',
      });
    }
  }, [orderDetails]);

  useEffect(() => {
    // Update pricing when service type or doorstep changes
    if (orderDetails && orderId) {
      const serviceData = {
        serviceType: selectedService,
        doorstepDelivery,
        ...(promo && { promoCode: promo }),
        ...(doorstepDelivery && confirmedDeliveryAddress && { deliveryAddress: confirmedDeliveryAddress }),
      };
      
      dispatch(
        updateServiceSelection({
          orderId,
          serviceData,
        })
      );
    }
  }, [selectedService, doorstepDelivery, orderId, orderDetails, dispatch, promo, confirmedDeliveryAddress]);

  const handleApplyPromoCode = async (promoCode) => {
    try {
      const serviceData = {
        serviceType: selectedService,
        doorstepDelivery,
        promoCode,
        ...(doorstepDelivery && confirmedDeliveryAddress && { deliveryAddress: confirmedDeliveryAddress }),
      };
      
      await dispatch(
        updateServiceSelection({
          orderId,
          serviceData,
        })
      ).unwrap();
      
      setPromo(promoCode);
      toast.success('Promo code applied!');
    } catch {
      toast.error('Invalid promo code');
    }
  };

  const handlePayment = async () => {
    try {
      // Create Razorpay order
      const paymentData = await dispatch(createPaymentOrder(orderId)).unwrap();

      const options = {
        key: paymentData.keyId,
        amount: paymentData.amount,
        currency: paymentData.currency,
        order_id: paymentData.razorpayOrderId,
        name: 'KanoonWise Stamp Papers',
        description: `Stamp Paper for ${orderDetails?.state}`,
        handler: async (response) => {
          try {
            await dispatch(
              verifyPayment({
                orderId,
                paymentData: {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
              })
            ).unwrap();
            navigate(`/stamps/success/${orderId}`);
          } catch {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          email: orderDetails?.guestEmail,
          contact: orderDetails?.guestPhone,
        },
        theme: { color: '#4F46E5' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error('Failed to create payment order');
    }
  };

  if (loading || !orderDetails) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const breakdown = pricing || {
    stampPaper: orderDetails.basePrice,
    convenienceFee: orderDetails.convenienceFee,
    serviceCharge: orderDetails.serviceCharge,
    doorstepCharge: 0,
    discount: orderDetails.promoDiscount,
    total: orderDetails.totalAmount,
  };

  const totalSavings = 1500 + breakdown.discount;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              {/* <h2 className="text-2xl font-bold mb-4">Checkout</h2> */}
              
              <div className="border rounded-lg p-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex-shrink-0 flex items-center justify-center">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      Stamp paper for {orderDetails.state} for {orderDetails.documentType}
                    </h3>
                    <button type="button" className="text-blue-600 text-sm hover:underline mt-1">
                      ← Edit stamp details
                    </button>
                  </div>
                </div>
              </div>

              {/* <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Stamp Paper</span>
                  <span>₹{(breakdown.stampPaper / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Convenience Fee</span>
                  <div className="text-right">
                    <div>₹{(breakdown.convenienceFee / 100).toFixed(2)}</div>
                    <div className="text-xs text-gray-400 line-through">₹91.97</div>
                  </div>
                </div>
                {breakdown.serviceCharge > 0 && (
                  <div className="flex justify-between text-orange-600">
                    <span>Express Service</span>
                    <span>+₹{(breakdown.serviceCharge / 100).toFixed(2)}</span>
                  </div>
                )}
                {breakdown.doorstepCharge > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>Doorstep Delivery Charges</span>
                    <span>+₹{(breakdown.doorstepCharge / 100).toFixed(2)}</span>
                  </div>
                )}
              </div> */}
            </div>

            {/* Service Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-4">Delivery Options</h3>

              <div className="space-y-4">
                {/* Standard Service */}
                <label
                  className={`block border-2 rounded-lg p-4 cursor-pointer transition ${
                    selectedService === 'standard'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="service"
                    value="standard"
                    checked={selectedService === 'standard'}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">Standard Service</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          No extra charge
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Stamp paper provided within the day</p>
                    </div>
                  </div>
                </label>

                {/* Express Service */}
                <label
                  className={`block border-2 rounded-lg p-4 cursor-pointer transition relative ${
                    selectedService === 'express'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="absolute top-2 right-2">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      Fast & Popular
                    </span>
                  </div>
                  <input
                    type="radio"
                    name="service"
                    value="express"
                    checked={selectedService === 'express'}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-orange-500 text-orange-500 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">Express Service</span>
                        <span className="text-orange-600 font-medium">+ ₹100 charge</span>
                      </div>
                      <p className="text-sm text-gray-600">Stamp paper provided within 1 hour</p>
                    </div>
                  </div>
                </label>

                {/* Doorstep Delivery */}
                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={doorstepDelivery}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setShowAddressModal(true);
                      } else {
                        dispatch(setDoorstepDelivery(false));
                      }
                    }}
                    className="w-5 h-5"
                  />
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">I want Doorstep delivery</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right: Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Checkout</h2>

              {/* Order Summary */}
              {/* <div className="border-b pb-4 mb-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded flex-shrink-0 flex items-center justify-center">
                    <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div> */}

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm mb-4 pb-4 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Stamp Paper</span>
                  <span className="font-medium">₹{(breakdown.stampPaper / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Convenience Fee</span>
                  <div className="text-right">
                    <div className="font-medium">₹{(breakdown.convenienceFee / 100).toFixed(2)}</div>
                    <div className="text-xs text-gray-400 line-through">₹91.97</div>
                  </div>
                </div>
                {breakdown.serviceCharge > 0 && (
                  <div className="flex justify-between text-orange-600">
                    <span>Express Service</span>
                    <span className="font-medium">+₹{(breakdown.serviceCharge / 100).toFixed(2)}</span>
                  </div>
                )}
                {breakdown.doorstepCharge > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>Doorstep Delivery</span>
                    <span className="font-medium">+₹{(breakdown.doorstepCharge / 100).toFixed(2)}</span>
                  </div>
                )}
                {breakdown.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      <Gift className="w-4 h-4" />
                      Promo Discount ({promoCode})
                    </span>
                    <span className="font-medium">-₹{(breakdown.discount / 100).toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Promo Code */}
              <div className="mb-4">
                {promoCode ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Gift className="w-5 h-5 text-green-600" />
                      <div className="flex items-center gap-2">
                        <span className="bg-white px-3 py-1 rounded-md text-sm font-mono font-semibold text-green-700">
                          {promoCode}
                        </span>
                        <span className="text-sm text-green-700 font-medium">Applied!</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(removePromoCode());
                        setPromo('');
                      }}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Available Promo Codes */}
                    {promoCodes && promoCodes.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowPromoModal(true)}
                        className="w-full flex items-center justify-between p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <Tag className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-semibold text-gray-900">
                              {promoCodes.length} Offer{promoCodes.length > 1 ? 's' : ''} Available
                            </p>
                            <p className="text-xs text-gray-600">
                              Click to view and apply
                            </p>
                          </div>
                        </div>
                        <svg 
                          className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Total Payable */}
              <div className="pt-4 border-t mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-lg font-semibold text-gray-900">Total Payable</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{(breakdown.total / 100).toFixed(2)}
                    </div>
                    {totalSavings > 0 && (
                      <div className="text-sm text-gray-400 line-through">
                        ₹{((breakdown.total + totalSavings) / 100).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Inclusive of all taxes and fees
                </p>
              </div>

              {/* Pay Button */}
              <button
                type="button"
                onClick={handlePayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl"
              >
                <Lock className="w-5 h-5" />
                <span>Pay securely now</span>
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By continuing, you agree to KanoonWise Terms & Conditions
              </p>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                <span>Powered by</span>
                <img 
                  src="/razorpay-dark.webp" 
                  alt="Razorpay" 
                  className="h-5 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full flex flex-col">
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between flex-shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
              <button
                type="button"
                onClick={() => setShowAddressModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={deliveryAddress.name}
                  onChange={(e) =>
                    setDeliveryAddress({ ...deliveryAddress, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="Eg: 9876543210"
                  maxLength={10}
                  value={deliveryAddress.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                    setDeliveryAddress({ ...deliveryAddress, phone: value });
                  }}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Must be 10 digits starting with 6-9</p>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Eg: 123, Ram vihar"
                  value={deliveryAddress.address}
                  onChange={(e) =>
                    setDeliveryAddress({ ...deliveryAddress, address: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Eg: New Delhi"
                  value={deliveryAddress.city}
                  onChange={(e) =>
                    setDeliveryAddress({ ...deliveryAddress, city: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Pincode and State */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    placeholder="Eg: 110001"
                    maxLength={6}
                    value={deliveryAddress.pincode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                      setDeliveryAddress({ ...deliveryAddress, pincode: value });
                    }}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">Must be 6 digits</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    value={deliveryAddress.state}
                    onChange={(e) =>
                      setDeliveryAddress({ ...deliveryAddress, state: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                  >
                    <option value="">Select State</option>
                    <option value="ANDHRA PRADESH">Andhra Pradesh</option>
                    <option value="ARUNACHAL PRADESH">Arunachal Pradesh</option>
                    <option value="ASSAM">Assam</option>
                    <option value="BIHAR">Bihar</option>
                    <option value="CHHATTISGARH">Chhattisgarh</option>
                    <option value="GOA">Goa</option>
                    <option value="GUJARAT">Gujarat</option>
                    <option value="HARYANA">Haryana</option>
                    <option value="HIMACHAL PRADESH">Himachal Pradesh</option>
                    <option value="JHARKHAND">Jharkhand</option>
                    <option value="KARNATAKA">Karnataka</option>
                    <option value="KERALA">Kerala</option>
                    <option value="MADHYA PRADESH">Madhya Pradesh</option>
                    <option value="MAHARASHTRA">Maharashtra</option>
                    <option value="MANIPUR">Manipur</option>
                    <option value="MEGHALAYA">Meghalaya</option>
                    <option value="MIZORAM">Mizoram</option>
                    <option value="NAGALAND">Nagaland</option>
                    <option value="ODISHA">Odisha</option>
                    <option value="PUNJAB">Punjab</option>
                    <option value="RAJASTHAN">Rajasthan</option>
                    <option value="SIKKIM">Sikkim</option>
                    <option value="TAMIL NADU">Tamil Nadu</option>
                    <option value="TELANGANA">Telangana</option>
                    <option value="TRIPURA">Tripura</option>
                    <option value="UTTAR PRADESH">Uttar Pradesh</option>
                    <option value="UTTARAKHAND">Uttarakhand</option>
                    <option value="WEST BENGAL">West Bengal</option>
                    <option value="DELHI">Delhi</option>
                  </select>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                type="button"
                onClick={() => {
                  // Check if all fields are filled
                  if (
                    !deliveryAddress.name ||
                    !deliveryAddress.phone ||
                    !deliveryAddress.address ||
                    !deliveryAddress.city ||
                    !deliveryAddress.pincode ||
                    !deliveryAddress.state
                  ) {
                    toast.error('Please fill all delivery address fields');
                    return;
                  }
                  
                  // Validate phone number (must be 10 digits starting with 6-9)
                  const phoneRegex = /^[6-9]\d{9}$/;
                  if (!phoneRegex.test(deliveryAddress.phone)) {
                    toast.error('Phone number must be 10 digits starting with 6-9');
                    return;
                  }
                  
                  // Validate pincode (must be exactly 6 digits)
                  const pincodeRegex = /^\d{6}$/;
                  if (!pincodeRegex.test(deliveryAddress.pincode)) {
                    toast.error('Pincode must be exactly 6 digits');
                    return;
                  }
                  
                  // Save the confirmed address
                  setConfirmedDeliveryAddress(deliveryAddress);
                  dispatch(setDoorstepDelivery(true));
                  setShowAddressModal(false);
                  toast.success('Delivery address saved!');
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
              >
                Confirm delivery address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Promo Codes Modal */}
      {showPromoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Gift className="w-6 h-6 text-blue-600" />
                Available Offers
              </h2>
              <button
                type="button"
                onClick={() => setShowPromoModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              {promoCodes && promoCodes.map((promo) => {
                const now = new Date();
                const isValid = 
                  (!promo.validUntil || new Date(promo.validUntil) >= now) &&
                  (!promo.validFrom || new Date(promo.validFrom) <= now) &&
                  (!promo.usageLimit || promo.usageCount < promo.usageLimit) &&
                  (breakdown.total >= promo.minOrderAmount);

                const discountText = promo.discountType === 'fixed'
                  ? `₹${(promo.discountValue / 100).toFixed(2)} OFF`
                  : `${promo.discountValue}% OFF${promo.maxDiscount ? ` (Max ₹${(promo.maxDiscount / 100).toFixed(2)})` : ''}`;

                return (
                  <div
                    key={promo.id}
                    className={`border rounded-lg p-4 ${
                      isValid
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-dashed border-blue-400">
                            <Percent className="w-4 h-4 text-blue-600" />
                            <span className="font-mono font-bold text-blue-700 text-sm">
                              {promo.code}
                            </span>
                          </div>
                          <span className="text-green-600 font-semibold text-sm">
                            {discountText}
                          </span>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600">
                          {promo.minOrderAmount > 0 && (
                            <p className="flex items-center gap-1">
                              <span className="text-gray-500">•</span>
                              Minimum order: ₹{(promo.minOrderAmount / 100).toFixed(2)}
                            </p>
                          )}
                          {promo.validUntil && (
                            <p className="flex items-center gap-1">
                              <span className="text-gray-500">•</span>
                              Valid till {new Date(promo.validUntil).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </p>
                          )}
                          {promo.usageLimit && (
                            <p className="flex items-center gap-1">
                              <span className="text-gray-500">•</span>
                              {promo.usageLimit - promo.usageCount} uses remaining
                            </p>
                          )}
                        </div>

                        {!isValid && (
                          <p className="text-xs text-red-600 mt-2">
                            {breakdown.total < promo.minOrderAmount
                              ? `Minimum order amount: ₹${(promo.minOrderAmount / 100).toFixed(2)}`
                              : 'This offer has expired or is not available'}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={async () => {
                          if (isValid) {
                            setShowPromoModal(false);
                            await handleApplyPromoCode(promo.code);
                          }
                        }}
                        disabled={!isValid}
                        className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                          isValid
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                );
              })}

              {(!promoCodes || promoCodes.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <Gift className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>No promo codes available at the moment</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StampCheckout;
