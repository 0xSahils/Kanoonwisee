import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const StampTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    state: 'all',
    search: '',
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/admin/stamps/stamp-templates');
      setTemplates(response.data.data.templates);
    } catch (err) {
      toast.error('Failed to fetch templates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTemplate = async (e) => {
    e.preventDefault();
    try {
      if (editingTemplate.id) {
        await axiosInstance.put(`/admin/stamps/stamp-templates/${editingTemplate.id}`, editingTemplate);
        toast.success('Template updated successfully');
      } else {
        await axiosInstance.post('/admin/stamps/stamp-templates', editingTemplate);
        toast.success('Template created successfully');
      }
      setShowModal(false);
      setEditingTemplate(null);
      fetchTemplates();
    } catch {
      toast.error('Failed to save template');
    }
  };

  const handleDeleteTemplate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this template?')) return;
    
    try {
      await axiosInstance.delete(`/admin/stamps/stamp-templates/${id}`);
      toast.success('Template deleted successfully');
      fetchTemplates();
    } catch {
      toast.error('Failed to delete template');
    }
  };

  const openEditModal = (template = null) => {
    setEditingTemplate(
      template || {
        state: '',
        documentType: '',
        basePrice: 10100,
        convenienceFee: 7697,
        description: '',
        metadata: {},
      }
    );
    setShowModal(true);
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesState = filters.state === 'all' || template.state === filters.state;
    const matchesSearch =
      !filters.search ||
      template.documentType.toLowerCase().includes(filters.search.toLowerCase()) ||
      template.state.toLowerCase().includes(filters.search.toLowerCase());
    return matchesState && matchesSearch;
  });

  const uniqueStates = [...new Set(templates.map((t) => t.state))].sort();

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Stamp Templates & Pricing</h1>
            <p className="text-gray-600">Manage stamp paper templates and pricing for all states</p>
          </div>
          <button
            onClick={() => openEditModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Template</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                value={filters.state}
                onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All States</option>
                {uniqueStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Document type or state..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading templates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{template.documentType}</h3>
                    <p className="text-sm text-gray-600">{template.state}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(template)}
                      className="text-blue-600 hover:text-blue-800 p-1.5 hover:bg-blue-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Price:</span>
                    <span className="font-semibold">₹{(template.basePrice / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Convenience Fee:</span>
                    <span className="font-semibold">₹{(template.convenienceFee / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-900 font-medium">Total:</span>
                    <span className="font-bold text-blue-600">
                      ₹{((template.basePrice + template.convenienceFee) / 100).toFixed(2)}
                    </span>
                  </div>
                </div>

                {template.description && (
                  <p className="mt-4 text-xs text-gray-500 line-clamp-2">
                    {template.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && filteredTemplates.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">No templates found</p>
          </div>
        )}
      </div>

      {/* Edit/Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingTemplate?.id ? 'Edit Template' : 'Create Template'}
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveTemplate} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    required
                    value={editingTemplate?.state || ''}
                    onChange={(e) =>
                      setEditingTemplate({ ...editingTemplate, state: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select State</option>
                    <option value="ANDHRA PRADESH">Andhra Pradesh</option>
                    <option value="ARUNACHAL PRADESH">Arunachal Pradesh</option>
                    <option value="ASSAM">Assam</option>
                    <option value="BIHAR">Bihar</option>
                    <option value="CHHATTISGARH">Chhattisgarh</option>
                    <option value="GOA">Goa</option>
                    <option value="GUJARAT">Gujarat</option>
                    <option value="HARYANA">Haryana</option>
                    <option value="HIMACHAL PRADESH">Himachal Pradesh</option>
                    <option value="JHARKHAND">Jharkhand</option>
                    <option value="KARNATAKA">Karnataka</option>
                    <option value="KERALA">Kerala</option>
                    <option value="MADHYA PRADESH">Madhya Pradesh</option>
                    <option value="MAHARASHTRA">Maharashtra</option>
                    <option value="MANIPUR">Manipur</option>
                    <option value="MEGHALAYA">Meghalaya</option>
                    <option value="MIZORAM">Mizoram</option>
                    <option value="NAGALAND">Nagaland</option>
                    <option value="ODISHA">Odisha</option>
                    <option value="PUNJAB">Punjab</option>
                    <option value="RAJASTHAN">Rajasthan</option>
                    <option value="SIKKIM">Sikkim</option>
                    <option value="TAMIL NADU">Tamil Nadu</option>
                    <option value="TELANGANA">Telangana</option>
                    <option value="TRIPURA">Tripura</option>
                    <option value="UTTAR PRADESH">Uttar Pradesh</option>
                    <option value="UTTARAKHAND">Uttarakhand</option>
                    <option value="WEST BENGAL">West Bengal</option>
                    <option value="DELHI">Delhi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Sale Deed"
                    value={editingTemplate?.documentType || ''}
                    onChange={(e) =>
                      setEditingTemplate({ ...editingTemplate, documentType: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    placeholder="101.00"
                    value={(editingTemplate?.basePrice / 100) || ''}
                    onChange={(e) =>
                      setEditingTemplate({
                        ...editingTemplate,
                        basePrice: Math.round(parseFloat(e.target.value) * 100),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Convenience Fee (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    placeholder="76.97"
                    value={(editingTemplate?.convenienceFee / 100) || ''}
                    onChange={(e) =>
                      setEditingTemplate({
                        ...editingTemplate,
                        convenienceFee: Math.round(parseFloat(e.target.value) * 100),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Additional information about this template..."
                  value={editingTemplate?.description || ''}
                  onChange={(e) =>
                    setEditingTemplate({ ...editingTemplate, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
                >
                  {editingTemplate?.id ? 'Update Template' : 'Create Template'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default StampTemplates;
