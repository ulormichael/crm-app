import React from 'react';

const MetricCard = ({ title, value, icon, color }) => {
  return (
    <div className={`${color} p-6 rounded-2xl shadow-md flex items-center space-x-4 transform transition-all duration-300 hover:scale-105`}>
      <div className="text-5xl">{icon}</div>
      <div>
        <div className="text-lg font-semibold text-gray-700">{title}</div>
        <div className="text-4xl font-bold font-inter">{value}</div>
      </div>
    </div>
  );
};

export default MetricCard;