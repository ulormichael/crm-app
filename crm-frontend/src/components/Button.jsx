import React from 'react';
import ConfirmationModal from './ConfirmationModal';

// Generic Button Component
const Button = ({ children, onClick, primary, fullWidth, type = 'button', className = '' }) => {
  const baseClasses = "font-bold py-3 px-6 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2";
  const primaryClasses = "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";
  const secondaryClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400";
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;