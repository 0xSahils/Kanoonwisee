import React from 'react';
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container-custom py-12 px-4 sm:px-6 lg:px-8 my-24">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-6 text-center">Terms of Service</h1>
          <div className="w-24 h-1 mx-auto mb-8 bg-blue-600"></div>
          
          <div className="prose prose-lg max-w-none font-sans text-gray-700">
            <p className="mb-4">
              These Terms of Service govern your use of the kanoonwise.com website ("the Platform") operated by Kanoonwise LLP.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Platform Description</h2>
            <p className="mb-4">
              Kanoonwise is a technology platform that facilitates connections between users and independent legal professionals and offers para-legal support products. Kanoonwise is not a law firm and does not provide any legal services, legal representation, or legal advice.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Founder's Statement</h2>
            <p className="mb-4">
              As Founder & CEO, Furquan Ali is a legal-domain expert and technology entrepreneur. He is not a practicing advocate and does not provide legal advice through Kanoonwise.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">User Accounts</h2>
            <p className="mb-4">
              When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your account credentials.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Independent Professionals</h2>
            <p className="mb-4">
              The advocates and other legal professionals featured on this Platform are independent practitioners. They are not employees, agents, or partners of Kanoonwise. They are solely responsible for the advice they provide, the services they render, and their adherence to all professional and ethical standards.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Intellectual Property</h2>
            <p className="mb-4">
              The Platform and its original content, features, and functionality are owned by Kanoonwise LLP and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall Kanoonwise LLP, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Grievance Officer</h2>
            <p className="mb-4">
              In accordance with the Information Technology Act, 2000 and the rules made thereunder, the name and contact details of the Grievance Officer are provided below:
            </p>
            <p className="mb-4">
              <strong>Name:</strong> Sanowar Khan<br />
              <strong>Email:</strong> grievance@kanoonwise.com
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms of Service on this page.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us at info@kanoonwise.com.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;