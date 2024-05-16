import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Header } from "./features/Header";
// import Problem from "./pages/Problem/Problem";
// import Courses from "./pages/Courses/Courses";
import Content from "./pages/Content/Content";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  React.useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <>
            <Header onLogout={handleLogout}/>
            <Content />
            </>) : (
            <Login onLogin={handleLogin} />
          )
        }
      />
    </Routes>
  );
}

export default App;
