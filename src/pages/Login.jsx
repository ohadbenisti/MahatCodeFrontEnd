import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
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
      alert("login");
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(data.token));
      onLogin();
    } else{
      alert("not goging")
      navigate("/")};

      const loginForm = `
          <div>
            <h1>Hello, World!</h1>
            <p>This is some HTML content.</p>
          </div>
        `;
  };
  return (<div className="d-flex justify-content-center">
<form className="col-4" onSubmit={handleLogin}>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} value={email}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} value={password} />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    // <div>
    // <form onSubmit={handleLogin}>
    //   <label htmlFor="">Email</label>
    //   <input onChange={(e) => setEmail(e.target.value)} value={email} />
    //   <label htmlFor="">Password</label>
    //   <input onChange={(e) => setPassword(e.target.value)} value={password} />
    //   <input type="submit" hidden />
    // </form>
    // </div>
  );
};

export default Login;
