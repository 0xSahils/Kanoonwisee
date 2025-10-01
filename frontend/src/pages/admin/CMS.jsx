import React, { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import { FileText, Edit, ExternalLink, RefreshCw, CheckCircle, AlertCircle, Maximize, Minimize } from 'lucide-react'

const CMSManagement = () => {
  const [cmsStatus, setCmsStatus] = useState('checking')
  const [showCMSEditor, setShowCMSEditor] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [cmsUrl] = useState(() => {
    // Determine CMS URL based on environment and cache it
    const isProduction = window.location.hostname !== 'localhost'
    if (isProduction) {
      return '/admin/'
    } else {
      // In development, use the deployed Netlify CMS
      return 'https://endearing-selkie-06bf74.netlify.app/admin/'
    }
  })

  // Create a single iframe reference to prevent reloading
  const cmsIframe = (
    <iframe
      src={cmsUrl}
      className="w-full h-full border-0"
      title="Decap CMS Editor"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
    />
  )

  useEffect(() => {
    checkCMSStatus()
  }, [])

  const checkCMSStatus = async () => {
    try {
      // Check if CMS admin interface is accessible
      const response = await fetch('/admin/index.html', { method: 'HEAD' })
      if (response.ok) {
        setCmsStatus('available')
      } else {
        setCmsStatus('unavailable')
      }
    } catch (error) {
      console.error('CMS status check failed:', error)
      setCmsStatus('error')
    }
  }

  const openCMSAdmin = () => {
    setShowCMSEditor(true)
  }

  const closeCMSAdmin = () => {
    setShowCMSEditor(false)
    setIsFullscreen(false)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const pages = [
    {
      name: 'Kanoonwise Academy',
      slug: 'kanoonwise-academy',
      description: 'Legal knowledge articles and educational content',
      lastModified: '2024-01-15',
      status: 'published'
    },
    {
      name: 'Document Templates',
      slug: 'document-templates',
      description: 'Legal document templates and guides',
      lastModified: '2024-01-14',
      status: 'published'
    },
    {
      name: 'Legal Insights',
      slug: 'legal-insights',
      description: 'Expert legal analysis and industry updates',
      lastModified: '2024-01-13',
      status: 'published'
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'draft':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (showCMSEditor) {
    if (isFullscreen) {
      return (
        <div className="fixed inset-0 z-50 bg-white w-screen h-screen">
          <div className="flex flex-col h-full">
            {/* Minimal header for fullscreen */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <h2 className="text-lg font-medium text-gray-900">Netlify CMS Editor</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Secure Admin Access
                  </div>
                </div>
                <button
                  onClick={closeCMSAdmin}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors mr-2"
                >
                  ← Back
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  title="Exit Fullscreen"
                >
                  <Minimize className="h-4 w-4" />
                </button>
              </div>
            </div>
            {/* Full screen iframe */}
            <div className="flex-1 w-full h-full">
              {cmsIframe}
            </div>
          </div>
        </div>
      )
    }

    return (
      <AdminLayout>
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Editor</h1>
              <p className="mt-2 text-gray-600">
                Edit website content using the integrated CMS
              </p>
            </div>
            <button
              onClick={closeCMSAdmin}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              ← Back to CMS Management
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Netlify CMS Editor</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      Secure Admin Access
                    </div>
                  </div>
                  <button
                    onClick={toggleFullscreen}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    title="Enter Fullscreen"
                  >
                    <Maximize className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="h-[calc(100vh-300px)]">
              {cmsIframe}
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Management System</h1>
              <p className="mt-2 text-gray-600">
                Manage website content using the integrated CMS editor
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={checkCMSStatus}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Check Status
              </button>
              <button
                onClick={openCMSAdmin}
                disabled={cmsStatus !== 'available'}
                className={`inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  cmsStatus === 'available'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <Edit className="h-4 w-4 mr-2" />
                Open CMS Editor
                <ExternalLink className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* CMS Status */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`flex-shrink-0 h-3 w-3 rounded-full ${
                  cmsStatus === 'available' ? 'bg-green-400' :
                  cmsStatus === 'checking' ? 'bg-yellow-400' : 'bg-red-400'
                }`}></div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">CMS Status</h3>
                  <p className="text-sm text-gray-500">
                    {cmsStatus === 'available' ? 'CMS is ready and accessible' :
                     cmsStatus === 'checking' ? 'Checking CMS availability...' :
                     cmsStatus === 'unavailable' ? 'CMS is not accessible' :
                     'Error checking CMS status'}
                  </p>
                </div>
              </div>
              {cmsStatus === 'available' && (
                <div className="text-sm text-gray-500">
                  Last checked: {new Date().toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Pages */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Managed Pages</h3>
            <p className="mt-1 text-sm text-gray-600">
              Pages that can be edited through the CMS
            </p>
          </div>
          <div className="divide-y divide-gray-200">
            {pages.map((page) => (
              <div key={page.slug} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-gray-400 mr-4" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{page.name}</h4>
                      <p className="text-sm text-gray-500">{page.description}</p>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(page.status)}`}>
                          {getStatusIcon(page.status)}
                          <span className="ml-1 capitalize">{page.status}</span>
                        </span>
                        <span className="text-xs text-gray-500 ml-3">
                          Last modified: {page.lastModified}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={openCMSAdmin}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={openCMSAdmin}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Edit className="h-5 w-5 mr-2 text-blue-500" />
              Open Content Editor
            </button>
            <button
              onClick={() => window.open('/', '_blank')}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="h-5 w-5 mr-2 text-green-500" />
              Preview Website
            </button>
            <button
              onClick={checkCMSStatus}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="h-5 w-5 mr-2 text-purple-500" />
              Refresh Status
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <FileText className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">CMS Help</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Use the CMS editor to modify website content without technical knowledge.
                  Changes are automatically saved to the repository and deployed.
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Edit page titles, descriptions, and content using the markdown editor</li>
                  <li>Upload images and media files through the media library</li>
                  <li>Preview changes before publishing</li>
                  <li>All changes are version controlled and can be reverted if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default CMSManagement