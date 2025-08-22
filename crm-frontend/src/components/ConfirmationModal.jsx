import React from "react";
import Button from "./Button";

// Custom Confirmation Modal
const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative p-8 bg-white w-96 rounded-2xl shadow-xl text-center">
        <h3 className="text-2xl font-bold mb-4">Confirm Action</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <Button onClick={onConfirm} primary>
            Confirm
          </Button>
          <Button onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

