import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth, checkSession } from '../store/slices/authSlice';

/**
 * Session Manager Component
 * Handles authentication state synchronization with cookies
 * Should be mounted once at the app level
 */
const SessionManager = () => {
  const dispatch = useDispatch();
  const { sessionChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    // Initialize authentication from existing cookies on app startup
    const initializeSession = async () => {
      // Check if we just logged in (grace period to avoid conflicts)
      const lastLoginTime = sessionStorage.getItem('lastLoginTime')
      const now = Date.now()
      const isRecentLogin = lastLoginTime && (now - parseInt(lastLoginTime)) < 2000 // 2 seconds
      
      if (isRecentLogin) {
        // Recent login detected, just mark session as checked
        // This prevents interference with the login flow
        dispatch(checkSession());
        return
      }
      
      // Try to initialize authentication from cookies
      try {
        await dispatch(initializeAuth()).unwrap();
        // Successfully restored authentication from cookies
      } catch {
        // No valid session found or session expired
        // This is normal for first-time visitors or expired sessions
        dispatch(checkSession());
      }
    };

    if (!sessionChecked) {
      initializeSession();
    }
  }, [dispatch, sessionChecked]);

  // This component doesn't render anything
  return null;
};

export default SessionManager;
