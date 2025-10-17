import React from "react";

const DisclaimerModal = ({ isOpen, onAccept, onDecline, centerAt = 0.75 }) => {
  if (!isOpen) return null;

  // centerAt: fraction of viewport height where modal center should be (0..1)
  const topPercent = Math.max(0.5, Math.min(0.9, centerAt)) * 100;

  return (
    <div className="fixed inset-0 z-50 my-10 flex items-start justify-center">
      {/* Backdrop with subtle blur */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
      <div
        className="relative w-full max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-xl"
        style={{ marginTop: `${topPercent}vh`, transform: "translateY(-50%)" }}
      >
        <div className="mb-4 text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-800">Disclaimer</h2>
          <div className="w-16 h-1 mx-auto mt-2 bg-blue-600"></div>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto pr-2 font-sans text-gray-700 leading-relaxed">
          <p className="mb-3">
            Welcome to Kanoonwise. Before you proceed, please read and acknowledge the following disclaimer:
          </p>
          
          <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">Not a Substitute for Legal Advice</h3>
          <p className="mb-3">
            The information provided on this website is for general informational purposes only and does not constitute legal advice. It should not be relied upon as a substitute for professional legal advice tailored to your specific circumstances.
          </p>
          
          <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">No Attorney-Client Relationship</h3>
          <p className="mb-3">
            Use of this website does not create an attorney-client relationship. Communications with lawyers through this platform are not protected by attorney-client privilege until a formal engagement is established directly with the lawyer.
          </p>
          
          <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">Lawyer Listings</h3>
          <p className="mb-3">
            We provide a platform for lawyers to list their services. However, we do not endorse or recommend any specific lawyer. The choice of legal representation remains solely with the user after their own due diligence.
          </p>
          
          <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">Compliance with Bar Council of India Rules</h3>
          <p className="mb-3">
            This platform operates in compliance with the rules established by the Bar Council of India. We do not solicit or advertise legal services, nor do we engage in the practice of law. We merely facilitate connections between users and legal professionals.
          </p>
          
          <h3 className="text-lg font-medium text-gray-800 mt-4 mb-2">Accuracy of Information</h3>
          <p className="mb-3">
            While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information contained on this website.
          </p>
        </div>
        
  <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onAccept}
            className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Accept & Continue
          </button>
          <button
            onClick={onDecline}
            className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors font-medium"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;