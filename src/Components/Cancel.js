import React from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();
  const goToPlans = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100 p-4">
      <div className="max-w-lg w-full border-2 border-red-400 bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-semibold text-red-800 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment has been cancelled. We’re sorry to see you go!
        </p>
        <p className="text-gray-500 mb-4">
          If you have any questions or need assistance, please contact support.
        </p>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
          onClick={goToPlans}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Cancel;
