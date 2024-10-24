import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../Utilis/helper";
import axiosInstance from "../Utilis/axiosInstance";
import ValidateOtp from "../Components/OtpComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPass() {
  const [email, setEmail] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState("");

  const notifySuccess = () => toast.success("OTP Sent Successfully!");
  const notifyError = (message) => toast.error(message);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Enter a valid email");
      notifyError("Enter a valid email");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post("/forget-password", { email });

      if (response.data) {
        setShowOtpInput(true);
      }

      
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Unexpected error";
      setError(errorMessage);
      notifyError(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center mt-28">
      {/*  This is needed to display toasts */}
      <ToastContainer />
      <div className="w-96 border rounded bg-white px-7 py-10">
        {!showOtpInput ? (
          <form onSubmit={handleEmailSubmit}>
            <h4 className="text-2xl mb-7">Enter Email</h4>
            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1 mt-3">{error}</p>}
            <button type="submit" className="btn-primary">
              Send
            </button>
          </form>
        ) : (
          <ValidateOtp email={email} />
        )}
      </div>
    </div>
  );
}

export default ForgetPass;
