import React from "react";
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from "./pages/Login"
// import Header from "./features/Header";
// import Problem from "./pages/Problem/Problem";
// import Courses from "./pages/Courses/Courses";
import "./App.css";

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  // };


  
  function App() {

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Login />} />
      </Routes>
    </>
  )
}

export default App;
