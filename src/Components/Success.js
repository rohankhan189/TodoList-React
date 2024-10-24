import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate(); 
  const goToDashboard = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-300 p-4">
      <div className="max-w-lg w-full bg-white border-4 border-green-500 shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-semibold text-green-800 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your subscription has been activated.</p>
        <p className="text-gray-500 mb-4">You can now enjoy all the features available in your selected plan!</p>
        <button 
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
          onClick={goToDashboard} // Call the navigation function on click
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Success;
