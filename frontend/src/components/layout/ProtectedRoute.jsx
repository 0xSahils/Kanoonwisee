import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, requiredRole }) => {
  const authState = useSelector((state) => state.auth)
  const { isAuthenticated, user, sessionChecked } = authState
  const location = useLocation()

  console.log('ProtectedRoute render:', {
    isAuthenticated,
    user: user ? { id: user.id, role: user.role } : null,
    sessionChecked,
    requiredRole,
    pathname: location.pathname
  })

  // Don't redirect if we haven't checked the session yet
  if (!sessionChecked) {
    console.log('ProtectedRoute: Session not checked yet, showing loading')
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: User not authenticated, redirecting to login')
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    console.log(`ProtectedRoute: User role '${user?.role}' doesn't match required '${requiredRole}'`)
    // Redirect to appropriate dashboard based on user role
    const redirectPath = user?.role === 'lawyer' ? '/lawyer/dashboard' : '/client/dashboard'
    return <Navigate to={redirectPath} replace />
  }

  console.log('ProtectedRoute: Access granted')
  return children
}

export default ProtectedRoute
