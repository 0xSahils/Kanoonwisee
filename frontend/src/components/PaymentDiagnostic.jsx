import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPackages } from '../store/slices/paymentSlice';

const PaymentDiagnostic = () => {
  const dispatch = useDispatch();
  const { packages, loading, error } = useSelector((state) => state.payment);
  const { user } = useSelector((state) => state.auth);
  
  const [diagnosticData, setDiagnosticData] = useState({});

  useEffect(() => {
    // Fetch packages for testing
    dispatch(fetchPackages()).then((result) => {
      setDiagnosticData(prev => ({
        ...prev,
        fetchResult: result,
        timestamp: new Date().toISOString()
      }));
    }).catch((error) => {
      setDiagnosticData(prev => ({
        ...prev,
        fetchError: error,
        timestamp: new Date().toISOString()
      }));
    });
  }, [dispatch]);

  const testServiceMapping = () => {
    const serviceToPackageMap = {
      'Trademark Registration': 'Trademark Registration',
      'Patent Services': 'Patent Services',
      'Private Limited Company': 'Private Limited Company Registration',
    };

    const testServices = ['Trademark Registration', 'Patent Services', 'Private Limited Company'];
    const results = {};

    testServices.forEach(serviceName => {
      const packageName = serviceToPackageMap[serviceName] || serviceName;
      const foundPackage = packages?.find(pkg => 
        pkg.name.toLowerCase().includes(packageName.toLowerCase()) ||
        packageName.toLowerCase().includes(pkg.name.toLowerCase())
      );
      results[serviceName] = foundPackage;
    });

    setDiagnosticData(prev => ({
      ...prev,
      mappingTest: results
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Payment System Diagnostic</h2>
      
      {/* Authentication Status */}
      <div className="mb-6 p-4 border rounded">
        <h3 className="text-lg font-semibold mb-2">Authentication Status</h3>
        <div className="space-y-2">
          <div>User Logged In: <span className={user ? "text-green-600" : "text-red-600"}>{user ? "Yes" : "No"}</span></div>
          {user && (
            <div className="text-sm text-gray-600">
              <div>User ID: {user.id}</div>
              <div>Email: {user.email}</div>
              <div>Role: {user.role}</div>
            </div>
          )}
        </div>
      </div>

      {/* Packages Status */}
      <div className="mb-6 p-4 border rounded">
        <h3 className="text-lg font-semibold mb-2">Packages Status</h3>
        <div className="space-y-2">
          <div>Loading: <span className={loading.packages ? "text-yellow-600" : "text-green-600"}>{loading.packages ? "Yes" : "No"}</span></div>
          <div>Error: <span className={error.packages ? "text-red-600" : "text-green-600"}>{error.packages || "None"}</span></div>
          <div>Packages Count: <span className="font-mono">{packages?.length || 0}</span></div>
        </div>
      </div>

      {/* Packages List */}
      {packages && packages.length > 0 && (
        <div className="mb-6 p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">Available Packages</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {packages.map((pkg) => (
              <div key={pkg.id} className="text-sm flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">{pkg.name}</span>
                <span className="text-green-600">₹{pkg.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service Mapping Test */}
      <div className="mb-6 p-4 border rounded">
        <h3 className="text-lg font-semibold mb-2">Service Mapping Test</h3>
        <button 
          onClick={testServiceMapping}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test Service to Package Mapping
        </button>
        {diagnosticData.mappingTest && (
          <div className="space-y-2">
            {Object.entries(diagnosticData.mappingTest).map(([service, pkg]) => (
              <div key={service} className="text-sm p-2 bg-gray-50 rounded">
                <div className="font-medium">{service}</div>
                <div className={pkg ? "text-green-600" : "text-red-600"}>
                  {pkg ? `Mapped to: ${pkg.name} (₹${pkg.price})` : "No package found"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API Test Results */}
      {diagnosticData.timestamp && (
        <div className="mb-6 p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">API Test Results</h3>
          <div className="text-sm space-y-2">
            <div>Last Test: {diagnosticData.timestamp}</div>
            {diagnosticData.fetchResult && (
              <div className="text-green-600">✅ Packages fetched successfully</div>
            )}
            {diagnosticData.fetchError && (
              <div className="text-red-600">❌ Error: {JSON.stringify(diagnosticData.fetchError)}</div>
            )}
          </div>
        </div>
      )}

      {/* Raw Data */}
      <details className="p-4 border rounded">
        <summary className="text-lg font-semibold cursor-pointer">Raw Diagnostic Data</summary>
        <pre className="mt-4 p-4 bg-gray-100 rounded text-xs overflow-auto">
          {JSON.stringify({
            user: user ? { id: user.id, email: user.email, role: user.role } : null,
            packages: packages?.map(p => ({ id: p.id, name: p.name, price: p.price })),
            loading,
            error,
            diagnosticData
          }, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default PaymentDiagnostic;