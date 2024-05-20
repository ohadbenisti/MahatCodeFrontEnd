import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Header } from "./features/Header";
import CoursePage from "./features/CoursePage";
// import Problem from "./pages/Problem/Problem";
import Course from "./pages/Courses/Course";
import Content from "./pages/Content/Content";
import "./App.css";
import Problem from "./pages/Problem/Problem";

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
  return isLoggedIn ? (
    <>
      <Header onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/course" element={<Course />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/problem/:questionId" element={<Problem />} />
      </Routes>
    </>
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;
