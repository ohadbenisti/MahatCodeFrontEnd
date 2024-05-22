import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";

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
        <div className="d-flex flex-column min-vh-100">
            <div className="d-flex justify-content-start align-items-start w-100 p-4">
                <nav>
                    <Link to="/login">
                        <button style={{ backgroundColor: 'lightblue', color: 'white', border: 'none', padding: '10px 80px', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
                    </Link>
                </nav>
            </div>
            <div className="d-flex justify-content-center align-items-start flex-grow-1 w-100">
                <div id="signup-container">
                    <h2 id="h">הרשמה</h2>
                    {error && <div className="error">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">שם</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">מייל</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">סיסמה</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-password">אשר סיסמה</label>
                            <input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            id="but"
                            type="submit"
                            className="btn btn-primary"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;


