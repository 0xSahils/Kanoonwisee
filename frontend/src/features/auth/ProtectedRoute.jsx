import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = role === 'lawyer' ? '/lawyer/dashboard' : '/client/dashboard'
    return <Navigate to={redirectPath} replace />
  }

  return children
}

export default ProtectedRoute
