import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStates } from '../../store/stampSlice';
import Header from '../../components/landing/Header';
import { Zap, Lock } from 'lucide-react';

const StampLandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { states, loading } = useSelector((state) => state.stamp);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  const handleProceed = () => {
    if (selectedState) {
      navigate(`/stamps/order?state=${selectedState}`);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Easiest & Fastest way to get your Stamp paper
          </h1>
          <p className="text-xl text-gray-600">
            Get official e-stamp papers delivered within hours
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Step indicator */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              1
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Fill up the form. 👋</h2>
            </div>
          </div>

          {/* State Selection */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-3">
              State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              disabled={loading}
            >
              <option value="">Select state</option>
              {Array.isArray(states) && states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            disabled={!selectedState || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Proceed to Stamp Purchase
          </button>
        </div>

        {/* Process Steps */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-lg mb-4">
              2
            </div>
            <h3 className="font-semibold text-lg mb-2">Payment.</h3>
            <p className="text-gray-600">Secure payment via Razorpay</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-lg mb-4">
              3
            </div>
            <h3 className="font-semibold text-lg mb-2">Download your Stamp paper.</h3>
            <p className="text-gray-600">Get your e-stamp instantly</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <img src="https://png.pngtree.com/element_our/sm/20180626/sm_5b321c99945a2.png" alt="WP Icon" className="w-12 h-12" />
              {/* <span className="text-2xl"></span> */}
              <h3 className="font-semibold text-lg">Need help?</h3>
            </div>
            <button className="text-blue-600 font-medium hover:underline">
              Talk to an Expert (free)
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 text-center">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Express Delivery</h3>
            <p className="text-gray-600">Get your stamp within 1 hour</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">100% Secure</h3>
            <p className="text-gray-600">Government-approved e-stamps</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default StampLandingPage;
