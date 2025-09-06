import React, { useState, useEffect } from 'react'
import { adminAPI } from '../api/admin'
import toast from 'react-hot-toast'
import { CheckCircle, XCircle, Clock, User, Mail, MapPin, Briefcase, Award } from 'lucide-react'

const AdminPanel = () => {
  const [lawyers, setLawyers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchPendingLawyers()
  }, [])

  const fetchPendingLawyers = async () => {
    try {
      const data = await adminAPI.getPendingLawyers()
      setLawyers(data)
    } catch (error) {
      console.error('Error fetching lawyers:', error)
      toast.error('Failed to fetch pending lawyers')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      await adminAPI.updateLawyerStatus(id, status)
      toast.success(`Lawyer ${status} successfully`)
      // Remove from list if approved or canceled
      setLawyers(lawyers.filter(lawyer => lawyer.id !== id))
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update lawyer status')
    }
  }

  const filteredLawyers = lawyers.filter(lawyer => {
    if (filter === 'all') return true
    return lawyer.approved === filter
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pending lawyers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600 text-lg">Manage lawyer applications and approvals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {lawyers.filter(l => l.approved === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {lawyers.filter(l => l.approved === 'approved').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {lawyers.filter(l => l.approved === 'canceled').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All ({lawyers.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pending ({lawyers.filter(l => l.approved === 'pending').length})
            </button>
          </div>
        </div>

        {/* Lawyers List */}
        {filteredLawyers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No lawyers found</h3>
            <p className="text-gray-600">
              {filter === 'all' ? 'No lawyers to review at this time.' : `No ${filter} lawyers found.`}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredLawyers.map((lawyer) => (
              <div key={lawyer.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {lawyer.full_name}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-gray-400" />
                              {lawyer.User?.email}
                            </div>
                            <div className="flex items-center">
                              <Award className="h-4 w-4 mr-2 text-gray-400" />
                              {lawyer.bar_registration_number}
                            </div>
                            {lawyer.city && (
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                                {lawyer.city}
                              </div>
                            )}
                            {lawyer.years_experience && (
                              <div className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                                {lawyer.years_experience} years experience
                              </div>
                            )}
                          </div>
                          {lawyer.specialization && lawyer.specialization.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Specializations:</p>
                              <div className="flex flex-wrap gap-2">
                                {lawyer.specialization.map((spec, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  >
                                    {spec}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleStatusUpdate(lawyer.id, 'approved')}
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(lawyer.id, 'canceled')}
                        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
