import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.jpg';
import illustration from '../assets/login2.jpg'; // נתיב לאיור שהעלית
import background from '../assets/background2.jpg'; // נתיב לתמונת הרקע

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
        { email, password },
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
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
      <div className="flex w-full max-w-5xl bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden">
        <div className="hidden md:block md:w-2/3 bg-blue-50">
          <img src={illustration} alt="Illustration" className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/3 p-8 space-y-6">
          <div className="flex justify-center">
            <img src={logo} alt="Logo" className="max-w-xs mb-4" />
          </div>
          <h2 className="text-2xl font-bold text-center">התחברות</h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">כתובת מייל</label>
              <input
                type="email"
                id="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">סיסמה</label>
              <input
                type="password"
                id="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
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
    </div>
  );
};

export default Login;
