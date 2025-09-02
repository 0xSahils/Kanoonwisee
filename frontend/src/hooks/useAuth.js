import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, logoutUser, checkSession } from "../store/slices/authSlice";
import { isAuthenticated, requiresAuth } from "../utils/cookieAuthUtils";

/**
 * Custom hook for managing cookie-based authentication
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const { 
    user, 
    role, 
    isAuthenticated: isAuthenticatedState, 
    isLoading, 
    sessionChecked,
    error 
  } = useSelector((state) => state.auth);

  /**
   * Check session validity and update auth state
   */
  const checkAuthSession = useCallback(async () => {
    // Check if we just logged in (grace period)
    const lastLoginTime = sessionStorage.getItem('lastLoginTime')
    const now = Date.now()
    const isRecentLogin = lastLoginTime && (now - parseInt(lastLoginTime)) < 10000 // 10 seconds
    
    if (isRecentLogin) {
      console.log('Recent login detected, skipping session check')
      return
    }
    
    // Check if we have a session cookie
    const hasSessionCookie = isAuthenticated();
    
    if (hasSessionCookie && !isAuthenticatedState) {
      // We have a session cookie but not authenticated in state
      // Try to get current user info
      try {
        await dispatch(getCurrentUser()).unwrap();
      } catch (error) {
        console.error('Failed to get current user:', error);
        // Session might be expired, check session will handle cleanup
        dispatch(checkSession());
      }
    } else if (!hasSessionCookie && isAuthenticatedState) {
      // No session cookie but authenticated in state
      // Session expired, update state
      dispatch(checkSession());
    }
  }, [dispatch, isAuthenticatedState]);

  /**
   * Initialize auth state on mount and when location changes
   */
  useEffect(() => {
    if (!sessionChecked) {
      checkAuthSession();
    }
  }, [checkAuthSession, sessionChecked]);

  /**
   * Periodic session check (every 5 minutes)
   */
  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionChecked) {
        checkAuthSession();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [checkAuthSession, sessionChecked]);

  /**
   * Logout function with proper cleanup
   */
  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout API fails, local state is cleared
    }
  }, [dispatch]);

  /**
   * Check if current route requires authentication
   */
  const checkRouteAuth = useCallback((pathname) => {
    const needsAuth = requiresAuth(pathname);
    const hasValidSession = isAuthenticated();
    
    return {
      needsAuth,
      hasValidSession,
      shouldRedirect: needsAuth && !hasValidSession && sessionChecked
    };
  }, [sessionChecked]);

  /**
   * Refresh user data manually
   */
  const refreshUserData = useCallback(async () => {
    try {
      await dispatch(getCurrentUser()).unwrap();
      return true;
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      return false;
    }
  }, [dispatch]);

  return {
    // Auth state
    isAuthenticated: isAuthenticatedState,
    user,
    role,
    isLoading,
    error,
    sessionChecked,
    
    // Actions
    logout: handleLogout,
    checkAuthSession,
    refreshUserData,
    checkRouteAuth,
    
    // Helpers
    hasSessionCookie: isAuthenticated(),
    isSessionValid: isAuthenticatedState && isAuthenticated(),
  };
};

export default useAuth;
