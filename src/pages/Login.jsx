import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/users/login`,
        { email: email, password },
        config
      );

      if (data.status === "success") {
        localStorage.setItem("userInfo", JSON.stringify(data));
        localStorage.setItem("token", JSON.stringify(data.token));
        onLogin();
      } else {
        alert("Login failed");
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred during login");
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };



  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="">Email:  </label>
      <br />
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email || localStorage.getItem("email") || ""}
      />
      <br />
      <label htmlFor="">Password:</label>
      <div>
        <input
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password || localStorage.getItem("password") || ""}
        />


        <button type="button" onClick={toggleShowPassword}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <br />
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;