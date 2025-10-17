import React from 'react';
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
  <div className="container-custom py-12 px-4 sm:px-6 lg:px-8 my-24">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-6 text-center">Privacy Policy</h1>
          <div className="w-24 h-1 mx-auto mb-8 bg-blue-600"></div>
          
          <div className="prose prose-lg max-w-none font-sans text-gray-700">
            <p className="mb-4">
              This Privacy Policy describes how Kanoonwise LLP ("we", "our", or "us") collects, uses, and shares your personal information when you use our website kanoonwise.com ("the Platform").
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us when you register for an account, create or modify your profile, set preferences, or make requests through the Platform.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to provide, maintain, and improve our services, including to facilitate connections between users and legal professionals.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Information Sharing</h2>
            <p className="mb-4">
              We may share your information with legal professionals on our platform to facilitate the services you request. We do not sell your personal information to third parties.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Your Rights</h2>
            <p className="mb-4">
              You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your information.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Grievance Officer</h2>
            <p className="mb-4">
              In accordance with the Information Technology Act, 2000 and the rules made thereunder, the name and contact details of the Grievance Officer are provided below:
            </p>
            <p className="mb-4">
              <strong>Name:</strong> Sanowar Khan<br />
              <strong>Email:</strong> grievance@kanoonwise.com
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at info@kanoonwise.com.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;