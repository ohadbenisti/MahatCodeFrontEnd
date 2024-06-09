import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.jpg';

const SignUp = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("The passwords do not match");
      return;
    }
    setError("");

    try {
      const url = `${import.meta.env.VITE_SERVER}/users/signup`;
      console.log("Sending request to:", url);

      const response = await axios.post(url, {
        name,
        email,
        password,
      });

      console.log("Sign up successful", response.data);

      localStorage.setItem("userInfo", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token);

      if (onSubmit) {
        onSubmit();
      }

      navigate("/");
    } catch (err) {
      console.error("Error during sign up", err);
      setError("An error occurred during registration");
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 pt-10">
      <div className="w-full max-w-sm p-6 space-y-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="max-w-xs mb-2" />
        </div>
        {error && <div className="text-red-500 text-center mb-2">{error}</div>}
        <h2 className="text-2xl font-bold text-center text-gray-700">
          הרשמה
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              שם
            </label>
            <input
              type="text"
              id="name"
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              מייל
            </label>
            <input
              type="email"
              id="email"
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              סיסמה
            </label>
            <input
              type="password"
              id="password"
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              אשר סיסמה
            </label>
            <input
              type="password"
              id="confirm-password"
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
            >
              הרשמה
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          כבר יש לך חשבון? <Link to="/login" className="text-blue-500 hover:underline">התחברות</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
