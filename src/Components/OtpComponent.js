import React, { useState } from "react";
import PinInput from "react-pin-input";
import axiosInstance from "../Utilis/axiosInstance";
import NewPassword from "./NewPassword"; // Adjust the import path as needed
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ValidateOtp({ email }) {
  const [otpCompleted, setOtpCompleted] = useState(false);
  const [error, setError] = useState("");

  const notifySuccess = () => toast.success("OTP Verified Successfully!");
  const notifyError = (message) => toast.error(message);

  const handleComplete = async (value) => {
    console.log("Entered PIN:", value);

    try {
      const content = {
        email: email,
        otp: String(value),
      };
      const response = await axiosInstance.post(
        "/forget-password/verify-otp",
        content,
        {}
      );
      console.log(response);
      if (response.data) {
        notifySuccess();
        setOtpCompleted(true);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Unexpected error";
      setError(errorMessage);
      notifyError(errorMessage);
    }
  };

  return (
    <div>
      <ToastContainer />
      {!otpCompleted ? (
        <div className="flex justify-center items-center mt-2">
          <div className="w-96 border rounded bg-white py-10 p-17 ">
            <h4 className="text-2xl mb-7 ml-14 pl-8">Validate OTP</h4>
            <PinInput
              length={4}
              type="numeric"
              onChange={(value) => console.log("PIN Changed:", value)}
              onComplete={handleComplete}
              inputMode="numeric"
              style={{ marginBottom: "1rem", marginLeft: "1rem" }}
            />
            {error && <p className="text-red-500 text-xs pb-1 mt-3">{error}</p>}
          </div>
        </div>
      ) : (
        <NewPassword  email={email} />
      )}
    </div>
  );
}

export default ValidateOtp;
