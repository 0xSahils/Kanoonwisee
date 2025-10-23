import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  fetchTemplatesByState,
  createDraftOrder,
  nextStep,
  prevStep,
  resetFlow,
} from '../../store/stampSlice';
import toast from 'react-hot-toast';
import Header from '../../components/landing/Header';

// Validation schemas
const step1Schema = z.object({
  documentType: z.string().min(1, 'Please select document type'),
  purpose: z.string().optional(),
});

const step2Schema = z.object({
  firstPartyName: z.string().min(2, 'First party name required'),
  firstPartyPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
  secondPartyName: z.string().min(2, 'Second party name required'),
  secondPartyPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
});

const StampWizard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const state = searchParams.get('state');

  const { currentStep, templates, loading } = useSelector(
    (state) => state.stamp
  );

  const [formData, setFormData] = useState({
    state: state || '',
    documentType: '',
    purpose: '',
    firstPartyName: '',
    firstPartyPhone: '',
    secondPartyName: '',
    secondPartyPhone: '',
    payingParty: 'first',
    stampAmount: 0, // User will enter amount
  });

  useEffect(() => {
    if (state) {
      dispatch(fetchTemplatesByState(state));
      setFormData((prev) => ({ ...prev, state: state.toUpperCase() }));
    }
  }, [state, dispatch]);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (currentStep === 1) {
        dispatch(resetFlow());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    if (currentStep === 1) {
      navigate('/stamps');
    } else {
      dispatch(prevStep());
    }
  };

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50 py-8 px-4 pt-24">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        )}

        {/* Progress Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {currentStep === 1 && `Stamp paper for ${formData.state}`}
              {currentStep === 2 && 'Details of party'}
              {currentStep === 3 && 'Stamp Amount'}
            </h2>
            <span className="text-sm text-gray-500">{currentStep}/4 Steps complete</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {currentStep === 1 && (
            <Step1
              formData={formData}
              setFormData={setFormData}
              templates={templates}
              onNext={() => dispatch(nextStep())}
            />
          )}
          {currentStep === 2 && (
            <Step2
              formData={formData}
              setFormData={setFormData}
              onNext={() => dispatch(nextStep())}
            />
          )}
          {currentStep === 3 && (
            <Step3
              formData={formData}
              setFormData={setFormData}
              templates={templates}
              onSubmit={async () => {
                try {
                  const result = await dispatch(createDraftOrder(formData)).unwrap();
                  navigate(`/stamps/checkout/${result.orderId}`);
                } catch (error) {
                  toast.error(error);
                }
              }}
              loading={loading}
            />
          )}
        </div>

        {/* Help Link */}
        <div className="text-center mt-6">
          <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <span>💬</span>
            <span>Need help? Talk to an Expert (free)</span>
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

// Step 1: Document Selection
const Step1 = ({ formData, setFormData, templates, onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      documentType: formData.documentType,
      purpose: formData.purpose,
    },
  });

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type of document
        </label>
        <select
          {...register('documentType')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
        >
          <option value="">Select the type of document</option>
          {templates.map((template) => (
            <option key={template.id} value={template.documentType}>
              {template.documentType}
            </option>
          ))}
        </select>
        {errors.documentType && (
          <p className="text-red-500 text-sm mt-1">{errors.documentType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Purpose (Optional)
        </label>
        <textarea
          {...register('purpose')}
          placeholder="Write purpose of stamp paper here (optional)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Next
      </button>
    </form>
  );
};

// Step 2: Party Details
const Step2 = ({ formData, setFormData, onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      firstPartyName: formData.firstPartyName,
      firstPartyPhone: formData.firstPartyPhone,
      secondPartyName: formData.secondPartyName,
      secondPartyPhone: formData.secondPartyPhone,
    },
  });

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <p className="text-gray-600 mb-4">
        Enter details of the individuals involved in this agreement
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          First Party Name
        </label>
        <input
          {...register('firstPartyName')}
          placeholder="Eg: Suresh Kumar"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.firstPartyName && (
          <p className="text-red-500 text-sm mt-1">{errors.firstPartyName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          First Party Phone (Optional)
        </label>
        <input
          {...register('firstPartyPhone')}
          placeholder="Eg: 9876543210"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.firstPartyPhone && (
          <p className="text-red-500 text-sm mt-1">{errors.firstPartyPhone.message}</p>
        )}
      </div>

      <div className="border-t pt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Second Party Name
        </label>
        <input
          {...register('secondPartyName')}
          placeholder="Eg: Suresh Kumar"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.secondPartyName && (
          <p className="text-red-500 text-sm mt-1">{errors.secondPartyName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Second Party Phone (Optional)
        </label>
        <input
          {...register('secondPartyPhone')}
          placeholder="Eg: 9876543210"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.secondPartyPhone && (
          <p className="text-red-500 text-sm mt-1">{errors.secondPartyPhone.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Next
      </button>
    </form>
  );
};

// Step 3: Stamp Amount
const Step3 = ({ formData, setFormData, templates, onSubmit, loading }) => {
  // Find the selected template to get base price
  const selectedTemplate = templates.find(
    (t) => t.documentType === formData.documentType
  );
  const basePrice = selectedTemplate?.basePrice || 100; // Default to ₹1 (100 paise) if not found
  
  // Create dynamic schema based on base price
  const dynamicStep3Schema = z.object({
    payingParty: z.enum(['first', 'second', 'both']),
    stampAmount: z.number()
      .min(basePrice, `Minimum amount is ₹${(basePrice / 100).toFixed(2)} for this document type`)
      .max(100000000, 'Amount too large'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(dynamicStep3Schema),
    defaultValues: {
      payingParty: formData.payingParty,
      stampAmount: formData.stampAmount,
    },
  });

  const handleFormSubmit = (data) => {
    setFormData({ ...formData, ...data });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Who is paying stamp duty?
        </label>
        <select
          {...register('payingParty')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="first">{formData.firstPartyName || 'First Party'}</option>
          <option value="second">{formData.secondPartyName || 'Second Party'}</option>
          <option value="both">Both Parties</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount (In Rupees)
        </label>
        {selectedTemplate && (
          <div className="mb-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Minimum amount for {selectedTemplate.documentType}:</span> ₹{(basePrice / 100).toFixed(2)}
            </p>
          </div>
        )}
        <input
          type="number"
          step="0.01"
          min={(basePrice / 100).toFixed(2)}
          placeholder={`Eg: ${(basePrice / 100).toFixed(2)}`}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => {
            const rupees = parseFloat(e.target.value) || 0;
            const paise = Math.round(rupees * 100); // Convert rupees to paise
            setValue('stampAmount', paise);
            setFormData({ ...formData, stampAmount: paise }); // Update formData too
          }}
          defaultValue={(formData.stampAmount / 100).toFixed(2)}
        />
        {errors.stampAmount && (
          <p className="text-red-500 text-sm mt-1">{errors.stampAmount.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Enter amount up to 2 decimal places (e.g., {(basePrice / 100).toFixed(2)} or {((basePrice + 10000) / 100).toFixed(2)})
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        {loading ? 'Processing...' : 'Submit'}
      </button>
    </form>
  );
};

export default StampWizard;
