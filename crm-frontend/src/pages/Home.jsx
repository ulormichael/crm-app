import React from 'react';
import { usePage } from '../context/PageContext';
import Button from '../components/Button';
import Footer from '../components/Footer';

const HomePage = () => {
  const { setCurrentPage } = usePage();

  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="min h-screen bg-crm-home bg-cover flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-2xl w-full transform transition-all duration-500 hover:scale-105">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 font-inter leading-tight">
          Easy CRM for <span className="text-blue-600">Busy Teams</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Manage your customer relationships, track leads, and streamline your sales process with ease.
          Our intuitive platform helps you focus on what matters most: growing your business.
        </p>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => setCurrentPage('login')} primary>
            Get Started
          </Button>
          <Button onClick={() => setCurrentPage('about')}>
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;