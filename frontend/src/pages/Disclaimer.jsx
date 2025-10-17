import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/landing/Footer';

const Disclaimer = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    // Record acceptance and navigate home
    localStorage.setItem('disclaimerAccepted', 'true');
    navigate('/');
  };

  const handleDecline = () => {
    // If user declines, take them to an informational page (home) — avoid about:blank
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Disclaimer</h1>
            <p className="mt-2 text-lg text-gray-600">
              Please read this disclaimer carefully before using the kanoonwise.com website ("the Platform"), operated by Kanoonwise LLP.
            </p>
          </div>

          <div className="space-y-6 text-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">1. For Informational Purposes Only</h2>
              <p className="mt-2">
                The content provided on this Platform, including but not limited to articles in our "Legal Insights" section, guides, templates, and blog posts, is for general informational purposes only. It is not intended as, and should not be construed as, professional legal advice. You should not act or refrain from acting based on any information found on this Platform without first seeking independent legal counsel from a qualified advocate.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">2. No Attorney-Client Relationship</h2>
              <p className="mt-2">
                Your use of this Platform in any manner—including browsing content, using our tools, or submitting an inquiry—does not create an attorney-client relationship between you and Kanoonwise. This privileged relationship is formed exclusively between you and the independent legal professional you choose to engage.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">3. Kanoonwise is Not a Law Firm</h2>
              <p className="mt-2">
                Kanoonwise is a technology platform that facilitates connections between users and independent legal professionals and offers para-legal support products. Kanoonwise is not a law firm and does not provide any legal services, legal representation, or legal advice.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">4. Independent Professionals</h2>
              <p className="mt-2">
                The advocates and other legal professionals featured on this Platform are independent practitioners. They are not employees, agents, or partners of Kanoonwise. They are solely responsible for the advice they provide, the services they render, and their adherence to all professional and ethical standards.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">5. No Guarantee of Outcomes</h2>
              <p className="mt-2">
                Kanoonwise makes no representation, guarantee, or warranty (express or implied) regarding the outcome of any legal matter. The result of any legal issue is subject to various unpredictable factors and is never guaranteed.
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center space-x-6">
            <button
              onClick={handleAccept}
              className="px-6 py-3 bg-accent-500 text-primary-900 font-semibold rounded-lg hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-400"
            >
              Accept & Continue
            </button>
            <button
              onClick={handleDecline}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Disclaimer;