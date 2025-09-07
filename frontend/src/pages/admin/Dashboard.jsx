import React, { useState, useEffect } from 'react'
import { adminAPI } from '../../api/admin'
import toast from 'react-hot-toast'
import { CheckCircle, XCircle, Clock, User, Mail, MapPin, Briefcase, Award, Shield, FileText, Eye, RefreshCw } from 'lucide-react'
import AdminLayout from './AdminLayout'

// Lazy load the DocumentViewer component
const LazyDocumentViewer = React.lazy(() => import('../../components/admin/DocumentViewer'))

const AdminDashboard = () => {
  const [lawyers, setLawyers] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [filter, setFilter] = useState('all')
  const [documentViewer, setDocumentViewer] = useState({
    isOpen: false,
    lawyer: null,
    documentType: null
  })

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

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const data = await adminAPI.getPendingLawyers()
      setLawyers(data)
      toast.success('Lawyers list refreshed')
    } catch (error) {
      console.error('Error refreshing lawyers:', error)
      toast.error('Failed to refresh lawyers list')
    } finally {
      setRefreshing(false)
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

  const openDocumentViewer = (lawyer, documentType) => {
    setDocumentViewer({
      isOpen: true,
      lawyer,
      documentType
    })
  }

  const closeDocumentViewer = () => {
    setDocumentViewer({
      isOpen: false,
      lawyer: null,
      documentType: null
    })
  }

  const filteredLawyers = lawyers.filter(lawyer => {
    if (filter === 'all') return true
    return lawyer.approved === filter
  })

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading pending lawyers...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Manage lawyer applications and platform oversight</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
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
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
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
                      {/* Document Viewing Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => openDocumentViewer(lawyer, 'cv')}
                          className="inline-flex items-center justify-center px-3 py-2 border border-blue-300 text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          title="View CV"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          CV
                        </button>
                        <button
                          onClick={() => openDocumentViewer(lawyer, 'bar_registration_file')}
                          className="inline-flex items-center justify-center px-3 py-2 border border-blue-300 text-sm font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          title="View Bar Registration"
                        >
                          <Award className="h-4 w-4 mr-1" />
                          Bar
                        </button>
                      </div>
                      
                      {/* Action Buttons */}
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
      
      {/* Lazy-loaded Document Viewer Modal */}
      {documentViewer.isOpen && (
        <React.Suspense 
          fallback={
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading document viewer...</p>
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <LazyDocumentViewer
            isOpen={documentViewer.isOpen}
            onClose={closeDocumentViewer}
            lawyer={documentViewer.lawyer}
            documentType={documentViewer.documentType}
          />
        </React.Suspense>
      )}
    </AdminLayout>
  )
}

export default AdminDashboard
