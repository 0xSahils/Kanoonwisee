# Redux-Based Authentication System

## Overview

The authentication system has been refactored to use **Redux Toolkit as the primary state management** with localStorage serving only as a backup persistence layer. This provides better state management, consistency, and debugging capabilities.

## Architecture

### Core Files

1. **`/src/store/slices/authSlice.js`** - Main Redux slice with auth state and actions
2. **`/src/api/axiosInstance.js`** - Configured Axios instance that reads tokens from Redux
3. **`/src/features/auth/Login.jsx`** - Updated login component using Redux
4. **`/src/features/auth/ProtectedRoute.jsx`** - Route protection using Redux state
5. **`/src/components/auth/AuthProvider.jsx`** - App-level auth hydration and management
6. **`/src/hooks/useAuth.js`** - Custom hook for auth operations

### State Structure

```javascript
{
  auth: {
    token: string | null,           // JWT access token
    role: 'lawyer' | 'client' | null, // User role
    user: object | null,            // User profile data
    refreshToken: string | null,    // JWT refresh token
    isAuthenticated: boolean,       // Primary auth flag
    isLoading: boolean,            // Loading state
    error: string | null,          // Error messages
    otpSent: boolean              // OTP flow state
  }
}
```

## Key Changes

### 1. Redux as Primary State
- **Before**: `localStorage.getItem('token')` throughout the app
- **After**: `useSelector((state) => state.auth.token)`

### 2. Centralized Auth Actions
```javascript
// Set credentials after login
dispatch(setCredentials({ token, role, user, refreshToken }))

// Update user profile
dispatch(updateUser({ name: 'New Name' }))

// Logout
dispatch(logout())

// Hydrate from localStorage on app start
dispatch(hydrateAuth())
```

### 3. Automatic Token Management
- Axios instance automatically reads token from Redux store
- Automatic token refresh on 401 errors
- Proactive token refresh when expiring soon
- Redux state updates on token refresh

### 4. Route Protection
```jsx
// Before: Checked localStorage directly
// After: Uses Redux state
const { isAuthenticated, role } = useSelector(state => state.auth)
```

## Usage Examples

### Login Flow
```jsx
const handleLogin = async (credentials) => {
  const result = await dispatch(verifyOtp(credentials)).unwrap()
  
  // Redux automatically handles token storage
  dispatch(setCredentials({
    token: result.token,
    role: result.user.role,
    user: result.user,
    refreshToken: result.refreshToken
  }))
}
```

### API Calls
```jsx
// Axios automatically includes token from Redux state
const response = await api.get('/protected-endpoint')
```

### Protected Routes
```jsx
<ProtectedRoute requiredRole="lawyer">
  <LawyerDashboard />
</ProtectedRoute>
```

### Custom Hook Usage
```jsx
const { isAuthenticated, role, user, logout } = useAuth()

if (!isAuthenticated) {
  return <LoginPrompt />
}
```

## Benefits

1. **Consistent State**: Single source of truth for auth state
2. **Better Debugging**: Redux DevTools show all auth state changes
3. **Automatic Persistence**: localStorage updated automatically when Redux state changes
4. **Type Safety**: Centralized state structure
5. **Easier Testing**: Mock Redux state instead of localStorage
6. **Better UX**: Immediate state updates across components

## Migration Guide

### Replace localStorage reads:
```javascript
// Before
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'))

// After
const { token, user } = useSelector(state => state.auth)
```

### Replace role checks:
```javascript
// Before
const role = JSON.parse(localStorage.getItem('user'))?.role

// After
const { role } = useSelector(state => state.auth)
```

### Replace auth checks:
```javascript
// Before
const isAuthenticated = !!localStorage.getItem('token')

// After
const { isAuthenticated } = useSelector(state => state.auth)
```

## Testing

Run the auth test to verify functionality:
```javascript
import './test/authTest.js'
```

The test verifies:
- ✅ Setting credentials updates Redux state
- ✅ localStorage is automatically updated
- ✅ Logout clears both Redux and localStorage
- ✅ Hydration restores state from localStorage

## Security Notes

- Tokens are still stored in localStorage for persistence
- Redux state is the primary source during runtime
- Automatic token refresh prevents session timeouts
- Secure logout clears all auth data
- HTTPS required in production for token security
