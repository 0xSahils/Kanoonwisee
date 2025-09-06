import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role, sessionChecked } = useSelector((state) => state.auth)
  const location = useLocation()

  // Wait for session check to complete before making routing decisions
  if (!sessionChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Checking authentication...</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    let redirectPath = '/client/dashboard'
    if (role === 'lawyer') {
      redirectPath = '/lawyer/dashboard'
    } else if (role === 'admin') {
      redirectPath = '/admin/panel'
    }
    return <Navigate to={redirectPath} replace />
  }

  return children
}

export default ProtectedRoute
