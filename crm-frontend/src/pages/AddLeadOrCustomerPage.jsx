// Page to add a new CRM item

import React, { useState } from 'react';
import { usePage } from '../context/PageContext';
import Button from '../components/Button';

// Page to add a new CRM item
const AddLeadOrCustomerPage = () => {
  const { setCurrentPage, addCrmItem } = usePage();
  const [formData, setFormData] = useState({
    type: 'Lead',
    name: '',
    email: '',
    status: 'New'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCrmItem(formData);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center font-inter">
          Add New Lead or Customer
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="type" className="block text-gray-700 text-sm font-semibold mb-2">
              Type
            </label>
            <select
              id="type"
              name="type"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Lead">Lead</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={formData.name}
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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-center space-x-4 mt-8">
            <Button type="submit" primary>
              Add Item
            </Button>
            <Button onClick={() => setCurrentPage('dashboard')}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadOrCustomerPage;