import React, { useState } from "react";
import PasswordInput from "../Components/PasswordInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../Utilis/helper";
import axiosInstance from "../Utilis/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const handlesignup = async (e) => {
    e.preventDefault();

    if (!name) {
      seterror("enter the name");
      return;
    }

    const words = name.trim().split(/\s+/);

    // Check if the name contains only one word
    if (words.length < 2) {
      seterror("Please enter both a first name and a last name with space.");
      return;
    }

    if (!validateEmail(email)) {
      seterror("enter a valid email");
      return;
    }

    if (!password) {
      seterror("enter the password");
      return;
    }

    seterror("");

    // signup API call
    try {
      const content = {
        fullName: name,
        email: email,
        password: password,
      };
      const response = await axiosInstance.post(
        "/auth/create-account",
        content,
        {}
      );

      //handle successful login response
      if (response.data && response.data.error) {
        seterror(response.data.error);
        return;
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        seterror(error.response.data.message);
      } else {
        seterror("unexpected error");
      }
    }
  };
  return (
    <div className="flex justify-center items-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handlesignup}>
          <h4 className="text-2xl mb-7">Signup</h4>

          {/* // for name */}
          <input
            type="text"
            placeholder="Full name "
            className="input-box"
            value={name}
            onChange={(e) => setname(e.target.value)}
          ></input>

          {/* // for email */}
          <input
            type="text"
            placeholder="email"
            className="input-box mt-4"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          ></input>

          <PasswordInput
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          {/* // for error */}
          {error && <p className="text-red-500  text-xs pb-1 mt-3">{error}</p>}
          <button type="submit" className="btn-primary">
            Signup
          </button>
          <p className="text-sm text-center mt-5">
            Already have account{" "}
            <Link to="/login" className="font-medium text-primary underline">
              Login to account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
