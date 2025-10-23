import React, { useState, useEffect } from "react";

const GrievanceBanner = () => {
  const [visible, setVisible] = useState(true);

  // Helpers: cookie fallback in case localStorage is blocked/cleared
  const getDismissed = () => {
    try {
      const val = localStorage.getItem("grievanceDismissed");
      if (val === "true") return true;
    } catch {
      // ignore storage read error
    }
    // cookie fallback
    try {
      return document.cookie.split(";").some((c) => c.trim().startsWith("grievanceDismissed=1"));
    } catch {
      return false;
    }
  };

  const setDismissed = () => {
    try {
      localStorage.setItem("grievanceDismissed", "true");
    } catch {
      // ignore cookie parsing error
    }
    try {
      // 30 days
      document.cookie = "grievanceDismissed=1; path=/; max-age=2592000; SameSite=Lax";
    } catch {
      // ignore storage write error
    }
  };

  // Respect user preference persisted across reloads
  useEffect(() => {
    if (getDismissed()) setVisible(false);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setDismissed();
  };

  if (!visible) return null;

  return (
    // Fixed banner beneath the header (header uses top-0 and h-16/h-20)
    <div
      id="grievance-officer"
      className="fixed inset-x-0 top-16 lg:top-20 z-[60] bg-yellow-50 border-b border-yellow-200 text-yellow-900 shadow-md"
      role="region"
      aria-label="Grievance Officer Contact"
    >
      <div className="container-custom py-2 px-4 sm:px-6 lg:px-8 text-sm flex items-center justify-center">
        <div className="flex items-center gap-3">
          <span className="font-semibold">Grievance Officer:</span>
          <span className="mr-2">Sanowar Khan</span>
          <a href="mailto:grievance@kanoonwise.com" className="underline">
            grievance@kanoonwise.com
          </a>
        </div>

        <button
          onClick={handleClose}
          aria-label="Close grievance banner"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-900 hover:text-yellow-700 bg-yellow-100 rounded-full p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GrievanceBanner;
