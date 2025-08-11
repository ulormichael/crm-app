import React, { useState, useEffect } from 'react';
import { usePage } from '../context/PageContext';
import Button from '../components/Button';

const EditProfilePage = () => {
  const { selectedItem, setCurrentPage, setSelectedItem, updateCrmData } = usePage();
  const [formData, setFormData] = useState(selectedItem || {});

  useEffect(() => {
    if (!selectedItem) {
      setCurrentPage('dashboard');
    } else {
      setFormData(selectedItem);
    }
  }, [selectedItem, setCurrentPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCrmData(formData);
    setSelectedItem(null);
    setCurrentPage('dashboard');
  };

  if (!selectedItem) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center font-inter">
          Edit {selectedItem.type} Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={formData.email || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-gray-700 text-sm font-semibold mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={formData.status || ''}
              onChange={handleChange}
              required
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-center space-x-4 mt-8">
            <Button type="submit" primary>
              Save Changes
            </Button>
            <Button onClick={() => { setCurrentPage('dashboard'); setSelectedItem(null); }}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;