import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    alert("login");
    const config = {
      headers: { "Access-Control-Allow-Origin": "*" },
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER}/users/login`,
      { email: email, password },
      config
    );
    console.log(data);
    if (data.status === "success") {
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(data.token));
      onLogin();
    } else navigate("/");
  };
  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="">Email</label>
      <input onChange={(e) => setEmail(e.target.value)} value={email} />
      <label htmlFor="">Password</label>
      <input onChange={(e) => setPassword(e.target.value)} value={password} />
      <input type="submit" hidden />
    </form>
  );
};

export default Login;
