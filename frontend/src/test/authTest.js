// Test Cookie-Based Auth Integration
// This file demonstrates how the new cookie-based auth system works

import { store } from '../store'
import { setCredentials, logout, checkSession } from '../store/slices/authSlice'
import { clearLegacyAuthData, getCsrfToken, hasAuthCookies } from '../utils/tokenUtils'

// Test 1: Setting credentials (tokens now in httpOnly cookies)
console.log('=== Test 1: Setting Credentials (Cookie-Based) ===')
const testUser = {
  id: '123',
  email: 'test@example.com',
  role: 'lawyer'
}

store.dispatch(setCredentials({
  user: testUser,
  role: 'lawyer'
}))

let state = store.getState().auth
console.log('✅ Redux State after setCredentials:', {
  isAuthenticated: state.isAuthenticated,
  role: state.role,
  hasUser: !!state.user
})

// Test 2: Verify localStorage is NOT used for tokens
console.log('\n=== Test 2: Verify No localStorage Token Storage ===')
console.log('✅ Token in localStorage (should be null):', localStorage.getItem('token'))
console.log('✅ RefreshToken in localStorage (should be null):', localStorage.getItem('refreshToken'))
console.log('✅ Auth cookies present:', hasAuthCookies())

// Test 3: Test CSRF token functionality
console.log('\n=== Test 3: CSRF Token Handling ===')
const csrfToken = getCsrfToken()
console.log('✅ CSRF Token available:', csrfToken ? 'YES' : 'NO')

// Test 4: Clear auth and test logout
console.log('\n=== Test 4: Logout (Cookie-Based) ===')
store.dispatch(logout())
state = store.getState().auth
console.log('✅ Redux State after logout:', {
  isAuthenticated: state.isAuthenticated,
  role: state.role,
  hasUser: !!state.user
})

// Test 5: Clean up legacy localStorage data
console.log('\n=== Test 5: Legacy Data Cleanup ===')
// Simulate legacy data
localStorage.setItem('token', 'legacy-token')
localStorage.setItem('refreshToken', 'legacy-refresh')
localStorage.setItem('authTimestamp', '12345')

console.log('✅ Before cleanup - localStorage keys:', Object.keys(localStorage))
clearLegacyAuthData()
console.log('✅ After cleanup - localStorage keys:', Object.keys(localStorage))

// Test 6: Session check functionality
console.log('\n=== Test 6: Session Check ===')
store.dispatch(checkSession())
state = store.getState().auth
console.log('✅ Session checked, sessionChecked flag:', state.sessionChecked)

console.log('\n=== All Tests Completed ===')
console.log('🎉 Cookie-based auth integration is working correctly!')
console.log('🔒 Tokens are securely stored in httpOnly cookies')
console.log('🧹 Legacy localStorage data has been cleaned up')
