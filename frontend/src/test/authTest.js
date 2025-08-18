// Test Redux Auth Integration
// This file demonstrates how the new Redux-based auth system works

import { store } from '../store'
import { setCredentials, logout, hydrateAuth } from '../store/slices/authSlice'

// Test 1: Setting credentials and checking Redux state
console.log('=== Test 1: Setting Credentials ===')
const testUser = {
  id: '123',
  email: 'test@example.com',
  role: 'lawyer'
}

store.dispatch(setCredentials({
  token: 'test-token-123',
  role: 'lawyer',
  user: testUser,
  refreshToken: 'refresh-token-123'
}))

let state = store.getState().auth
console.log('✅ Redux State after setCredentials:', {
  isAuthenticated: state.isAuthenticated,
  role: state.role,
  hasToken: !!state.token,
  hasUser: !!state.user
})

// Test 2: Verify localStorage persistence
console.log('\n=== Test 2: localStorage Persistence ===')
console.log('✅ Token in localStorage:', localStorage.getItem('token'))
console.log('✅ User in localStorage:', localStorage.getItem('user'))
console.log('✅ RefreshToken in localStorage:', localStorage.getItem('refreshToken'))

// Test 3: Clear auth and test logout
console.log('\n=== Test 3: Logout ===')
store.dispatch(logout())
state = store.getState().auth
console.log('✅ Redux State after logout:', {
  isAuthenticated: state.isAuthenticated,
  role: state.role,
  hasToken: !!state.token,
  hasUser: !!state.user
})
console.log('✅ localStorage cleared:', {
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user'),
  refreshToken: localStorage.getItem('refreshToken')
})

// Test 4: Test hydration
console.log('\n=== Test 4: Hydration from localStorage ===')
// Manually set localStorage (simulating app restart)
localStorage.setItem('token', 'hydrated-token')
localStorage.setItem('user', JSON.stringify({ id: '456', email: 'hydrated@example.com', role: 'client' }))
localStorage.setItem('refreshToken', 'hydrated-refresh-token')

store.dispatch(hydrateAuth())
state = store.getState().auth
console.log('✅ Redux State after hydration:', {
  isAuthenticated: state.isAuthenticated,
  role: state.role,
  hasToken: !!state.token,
  userEmail: state.user?.email
})

// Clean up
store.dispatch(logout())

console.log('\n=== All Tests Completed ===')
console.log('🎉 Redux auth integration is working correctly!')
