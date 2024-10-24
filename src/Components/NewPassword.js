import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../Components/PasswordInput";
import { validateEmail } from "../Utilis/helper";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../Utilis/axiosInstance";
import "react-toastify/dist/ReactToastify.css";

function NewPassword({ email }) {
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const notifySuccess = () => toast.success("Password Reset Successfully!");
  const notifyError = (message) => toast.error(message);

  const handlelogin = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("please enter a valid password");
      return;
    } else {
      setError("");
    }

    if (password.length < 8) {
      setError("please enter atLeast 8 digit password");
      return;
    } else {
      setError("");
    }

    if (password !== password1) {
      setError("Password not matched");
      return;
    } else {
      setError("");
    }
    try {
      console.log("email:", email);
      const content = {
        email: email,
        newPassword: password,
      };
      const response = await axiosInstance.post(
        "/forget-password/reset-password",
        content,
        {}
      );

      if (response.data) {
        notifySuccess();
        console.log("Saved successfully ................");
        navigate("/login");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        notifyError(error);
        setError(error.response.data.message);
      } else {
        setError("unexpected error");
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handlelogin}>
        <h4 className="text-2xl mb-7">Enter Password</h4>
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></PasswordInput>
        <PasswordInput
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          placeholder={"Confirm Password"}
        ></PasswordInput>
        {error && <p className="text-red-500  text-xs pb-1 mt-3">{error}</p>}
        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewPassword;
