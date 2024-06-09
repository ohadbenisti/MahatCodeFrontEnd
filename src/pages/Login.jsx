import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/users/login`,
        { email: email, password },
        { ...config, withCredentials: true }
      );

      if (data.status === "success") {
        localStorage.setItem("userInfo", JSON.stringify(data));
        onLogin();
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred during login");
      }
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 pt-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          התחברות
        </h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              כתובת מייל
            </label>
            <input
              type="email"
              id="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              סיסמה
            </label>
            <input
              type="password"
              id="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
            >
              התחברות
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          אין לך חשבון? <Link to="/signup" className="text-blue-500 hover:underline">הרשמה</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
