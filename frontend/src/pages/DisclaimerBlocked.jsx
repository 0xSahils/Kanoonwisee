import React from "react";
import { useNavigate } from "react-router-dom";

const DisclaimerBlocked = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
        <p className="text-gray-700 mb-6">
          You have declined the site's disclaimer. You will not be able to access Kanoonwise unless you accept the disclaimer.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              // allow the user to return to homepage where they can accept
              localStorage.removeItem("disclaimerDeclined");
              navigate("/");
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-md"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerBlocked;
