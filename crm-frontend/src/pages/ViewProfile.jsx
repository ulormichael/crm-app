import React, { useEffect } from 'react';
import { usePage } from '../context/PageContext';
import Button from '../components/Button';

const ViewProfilePage = () => {
  const { selectedItem, setCurrentPage, setSelectedItem } = usePage();

  useEffect(() => {
    if (!selectedItem) {
      setCurrentPage('dashboard');
    }
  }, [selectedItem, setCurrentPage]);

  if (!selectedItem) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center font-inter">
          {selectedItem.type} Profile
        </h2>
        <div className="space-y-4 text-lg text-gray-700">
          <p><strong>ID:</strong> {selectedItem.id}</p>
          <p><strong>Type:</strong> {selectedItem.type}</p>
          <p><strong>Name:</strong> {selectedItem.name}</p>
          <p><strong>Email:</strong> {selectedItem.email}</p>
          <p><strong>Status:</strong> {selectedItem.status}</p>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <Button onClick={() => { setCurrentPage('editProfile'); }}>
            Edit Profile
          </Button>
          <Button onClick={() => { setCurrentPage('dashboard'); setSelectedItem(null); }}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfilePage;

// ---