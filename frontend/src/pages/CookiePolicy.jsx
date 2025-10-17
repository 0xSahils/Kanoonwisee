import React from 'react';
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12 my-24">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-6 text-center">Cookie Policy</h1>
          <div className="w-24 h-1 mx-auto mb-8 bg-blue-600"></div>
          
          <div className="prose prose-lg max-w-none font-sans text-gray-700">
            <p className="mb-4">
              This Cookie Policy explains how Kanoonwise LLP ("we", "our", or "us") uses cookies and similar technologies on our website kanoonwise.com.
            </p>
            
            <h2 className="text-2xl font-medium text-gray-800 mt-8 mb-4">What Are Cookies</h2>
            <p className="mb-4">
              Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>
            
            <h2 className="text-2xl font-medium text-gray-800 mt-8 mb-4">How We Use Cookies</h2>
            <p className="mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Essential cookies: These are necessary for the website to function properly.</li>
              <li>Analytical/performance cookies: These allow us to recognize and count visitors and see how they move around our website.</li>
              <li>Functionality cookies: These enable the website to provide enhanced functionality and personalization.</li>
              <li>Targeting cookies: These record your visit to our website, the pages you visit, and the links you follow.</li>
            </ul>
            
            <h2 className="text-2xl font-medium text-gray-800 mt-8 mb-4">Types of Cookies We Use</h2>
            <p className="mb-4">
              Our website uses the following types of cookies:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Session Cookies:</strong> These are temporary cookies that are deleted when you close your browser.</li>
              <li><strong>Persistent Cookies:</strong> These remain on your device until they expire or you delete them.</li>
              <li><strong>First-Party Cookies:</strong> These are set by our website.</li>
              <li><strong>Third-Party Cookies:</strong> These are set by third parties, such as Google Analytics.</li>
            </ul>
            
            <h2 className="text-2xl font-medium text-gray-800 mt-8 mb-4">Managing Cookies</h2>
            <p className="mb-4">
              Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser. You can also delete cookies that have already been set.
            </p>
            <p className="mb-4">
              Please note that disabling certain cookies may affect the functionality of our website.
            </p>
            
            <h2 className="text-2xl font-medium text-gray-800 mt-8 mb-4">Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
            </p>
            
            <p className="mt-8 text-sm text-gray-500">Last Updated: June 15, 2023</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiePolicy;