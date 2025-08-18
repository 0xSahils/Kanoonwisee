import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrateAuth } from "../../store/slices/authSlice";
import useAuth from "../../hooks/useAuth";

/**
 * AuthProvider component that handles global authentication logic
 * This component should wrap the entire app to manage token refresh and hydration
 */
const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { checkAndRefreshToken } = useAuth();

  useEffect(() => {
    // Hydrate Redux store from localStorage on app startup
    dispatch(hydrateAuth());

    // Initial token check when the app loads
    checkAndRefreshToken();

    // Set up periodic check to ensure auth state stays in sync
    const syncInterval = setInterval(() => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      // If we have auth data in localStorage but Redux isn't synced, re-hydrate
      if (token && user) {
        dispatch(hydrateAuth());
      }
    }, 5000); // Reduced frequency to every 5 seconds to prevent conflicts during auth flow

    // Cleanup interval on unmount
    return () => clearInterval(syncInterval);
  }, [dispatch, checkAndRefreshToken]);

  return children;
};

export default AuthProvider;
