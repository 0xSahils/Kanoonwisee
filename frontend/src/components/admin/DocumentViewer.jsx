import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, FileText, Download, Eye, AlertCircle, RefreshCw } from 'lucide-react';
import { adminAPI } from '../../api/admin';
import toast from 'react-hot-toast';

const DocumentViewer = ({ isOpen, onClose, lawyer, documentType }) => {
  const [documentUrl, setDocumentUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preloadProgress, setPreloadProgress] = useState(0);
  const abortControllerRef = useRef(null);

  // Preload document to improve loading experience
  const preloadDocument = useCallback((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'document';
    document.head.appendChild(link);
    
    // Clean up after 5 minutes
    setTimeout(() => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    }, 300000);
  }, []);

  const fetchDocumentUrl = useCallback(async () => {
    if (!lawyer || !documentType) return;
    
    // Cancel any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();
    
    setLoading(true);
    setError(null);
    setPreloadProgress(0);
    
    try {
      console.log(`Fetching document URL for lawyer ${lawyer.id}, type: ${documentType}`);
      
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setPreloadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 100);
      
      const response = await adminAPI.getLawyerDocumentUrl(lawyer.id, documentType);
      
      clearInterval(progressInterval);
      setPreloadProgress(100);
      setDocumentUrl(response.viewUrl);
      
      // Preload the document in the background
      if (response.viewUrl) {
        preloadDocument(response.viewUrl);
      }
      
      console.log('Document URL fetched successfully');
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
        return;
      }
      
      console.error('Error fetching document URL:', error);
      setError('Failed to load document. The file may not be available.');
      toast.error('Failed to load document');
    } finally {
      setLoading(false);
    }
  }, [lawyer, documentType, preloadDocument]);

  // Body scroll lock effect
  useEffect(() => {
    if (isOpen) {
      // Store the original overflow value
      const originalOverflow = document.body.style.overflow;
      
      // Disable scrolling
      document.body.style.overflow = 'hidden';
      
      // Cleanup function to restore scrolling
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && lawyer && documentType) {
      // Add slight delay to allow modal animation to complete
      const timer = setTimeout(() => {
        fetchDocumentUrl();
      }, 150);
      
      return () => clearTimeout(timer);
    }
    
    // Reset state when modal closes
    if (!isOpen) {
      setDocumentUrl(null);
      setError(null);
      setPreloadProgress(0);
      
      // Cancel any ongoing requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }
  }, [isOpen, lawyer, documentType, fetchDocumentUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleDownload = () => {
    if (documentUrl) {
      // Create a temporary link element for download
      const link = document.createElement('a');
      link.href = documentUrl;
      link.download = `${lawyer.full_name}_${documentType === 'cv' ? 'CV' : 'Bar_Registration'}`;
      link.target = '_blank';
      
      // Add loading state to download button
      toast.promise(
        new Promise((resolve) => {
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(resolve, 1000);
        }),
        {
          loading: 'Preparing download...',
          success: 'Download started successfully!',
          error: 'Download failed',
        }
      );
    }
  };

  const retryLoad = useCallback(() => {
    fetchDocumentUrl();
  }, [fetchDocumentUrl]);

  const getDocumentTitle = () => {
    switch (documentType) {
      case 'cv':
        return 'CV/Resume';
      case 'bar_registration_file':
        return 'Bar Registration Certificate';
      default:
        return 'Document';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gray-50 sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {getDocumentTitle()}
              </h3>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* {documentUrl && !error && (
              <>
                <button
                  onClick={() => window.open(documentUrl, '_blank')}
                  className="inline-flex items-center px-3 py-2 border border-blue-300 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Open in Tab
                </button>
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </>
            )}
            {documentUrl && error && (
              <button
                onClick={() => window.open(documentUrl, '_blank')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Document
              </button>
            )} */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {loading && (
          <div className="h-1 bg-gray-200">
            <div 
              className="h-full bg-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${preloadProgress}%` }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4 relative">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600 mb-2">Loading document...</p>
                <p className="text-sm text-gray-500">{preloadProgress}% complete</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Unable to load document</h4>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                  onClick={retryLoad}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </button>
              </div>
            </div>
          ) : documentUrl ? (
            <div className="text-center py-8">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Document Ready</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  {getDocumentTitle()} for {lawyer.full_name} is ready to view. 
                  Choose your preferred viewing option below.
                </p>
                
                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => window.open(documentUrl, '_blank')}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <Eye className="h-5 w-5 mr-2" />
                    View Document in New Tab
                  </button>
                  
                  <button
                    onClick={handleDownload}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Document
                  </button>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg text-left">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-800">
                        <strong>Security Note:</strong> For security reasons, documents open in a new tab 
                        or can be downloaded. This ensures the best viewing experience and protects your privacy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No document available</p>
            </div>
          )}
        </div>

        {/* Footer with document info */}
        {documentUrl && !error && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center space-x-3">
                <span>📄 {getDocumentTitle()}</span>
                <span>👤 {lawyer.full_name}</span>
                <span className="text-green-600 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Ready
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>Expires in 1 hour</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentViewer;
