import React from "react";

const Modal = ({ isOpen, onClose, message, subscriptionDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-70 transition-opacity duration-300 ease-in-out">
      <div className="bg-white border-4 border-green-400  rounded-lg shadow-lg p-24 max-w-sm mx-auto transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100">
        <h1 className="text-3xl font-semibold mb-4 text-center text-gray-800">
          Subscription Status
        </h1>
        <p className="text-gray-700 text-center mb-4">{message}</p>
        {subscriptionDetails && (
          <div className="mt-4 text-center">
            <p className="font-medium text-gray-800">
              <strong>Start Date:</strong> {subscriptionDetails.startDate}
            </p>
            <p className="font-medium text-gray-800">
              <strong>End Date:</strong> {subscriptionDetails.endDate}
            </p>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
