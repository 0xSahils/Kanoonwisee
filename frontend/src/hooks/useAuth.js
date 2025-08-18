import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessToken, logout } from "../store/slices/authSlice";
import { isTokenExpired, isTokenExpiringSoon } from "../utils/tokenUtils";

/**
 * Custom hook for managing authentication and automatic token refresh
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const { token, refreshToken, isAuthenticated, user, role } = useSelector(
    (state) => state.auth
  );

  /**
   * Check and refresh token if needed
   */
  const checkAndRefreshToken = useCallback(async () => {
    if (!token || !refreshToken) {
      // Give a grace period for new authentications to settle
      const authTimestamp = localStorage.getItem("authTimestamp");
      const now = Date.now();
      if (authTimestamp && now - parseInt(authTimestamp) < 10000) {
        // 10 second grace period
        console.log(
          "Grace period active - skipping logout for missing refresh token"
        );
        return true;
      }

      if (isAuthenticated) {
        console.log("No token or refresh token found - logging out");
        dispatch(logout());
      }
      return false;
    }

    // If token is expired, try to refresh
    if (isTokenExpired(token)) {
      try {
        await dispatch(refreshAccessToken()).unwrap();
        return true;
      } catch (error) {
        console.error("Token refresh failed:", error);
        dispatch(logout());
        return false;
      }
    }

    // If token expires soon, refresh proactively
    if (isTokenExpiringSoon(token)) {
      try {
        dispatch(refreshAccessToken());
      } catch (error) {
        console.error("Proactive token refresh failed:", error);
      }
    }

    return true;
  }, [dispatch, isAuthenticated, token, refreshToken]);

  /**
   * Initialize auth state and setup periodic token checks
   */
  useEffect(() => {
    // Check token on mount
    if (isAuthenticated) {
      checkAndRefreshToken();
    }

    // Set up periodic token checking (every 4 minutes)
    const interval = setInterval(() => {
      if (isAuthenticated) {
        checkAndRefreshToken();
      }
    }, 4 * 60 * 1000); // 4 minutes

    return () => clearInterval(interval);
  }, [checkAndRefreshToken, isAuthenticated]);

  /**
   * Manual refresh function for components to use
   */
  const refreshTokenManually = useCallback(async () => {
    try {
      await dispatch(refreshAccessToken()).unwrap();
      return true;
    } catch (error) {
      console.error("Manual token refresh failed:", error);
      return false;
    }
  }, [dispatch]);

  /**
   * Logout function
   */
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    isAuthenticated,
    user,
    role,
    token,
    refreshToken,
    checkAndRefreshToken,
    refreshTokenManually,
    logout: handleLogout,
  };
};

export default useAuth;
