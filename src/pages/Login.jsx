import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

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
        config
      );

      if (data.status === "success") {
        localStorage.setItem("userInfo", JSON.stringify(data));
        // localStorage.setItem("token", JSON.stringify(data.token));
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


  ;
  return (
    <div className="d-flex justify-content-center w-100 p-4">
      <nav>
        <Link to="/signup">
          <button style={{ backgroundColor: 'lightblue', color: 'white', border: 'none', padding: '10px 72px', borderRadius: '5px', cursor: 'pointer' }}>Sign Up</button>
        </Link>
      </nav>
      <div className="d-flex justify-content-center flex-grow-1" style={{marginLeft: '150px'}}>
        <form className="col-4" onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} value={email} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary btn-md d-block mx-auto">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;


