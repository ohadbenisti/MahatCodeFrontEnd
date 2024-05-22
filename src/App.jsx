import React, { createContext } from "react";
import { useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp/SignUp";
import { Header } from "./features/Header";
import CoursePage from "./features/CoursePage";
// import Problem from "./pages/Problem/Problem";
import Course from "./pages/Courses/Course";
import Content from "./pages/Content/Content";
import "./App.css";
import Problem from "./pages/Problem/Problem";

export const UserContext = createContext()

function App() {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))
  // const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('userInfo'))?.token ? true : false);
  const navigate = useNavigate()

  const handleLogin = () => {
    setUserInfo(JSON.parse(localStorage.getItem('userInfo')))
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(undefined)
    navigate('/login')
  };


  // React.useEffect(() => {
  //   // Check for token in local storage
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);
  return (
    // isLoggedIn ? (
    <UserContext.Provider value={{ userInfo }}>
      <Header onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/signup" element={<SignUp onSubmit={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/course" element={<Course />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/problem/:questionId" element={<Problem />} />
      </Routes>
    </UserContext.Provider>
    // ) : (
    //   <>
    //     <Routes>
    //     </Routes>
    //     <nav>
    //       <Link to="/signup">
    //         <button style={{ backgroundColor: 'lightblue', color: 'white', border: 'none', padding: '10px 100px', borderRadius: '5px', cursor: 'pointer' }}>Sign Up</button>
    //       </Link>
    //     </nav>
    // </>

  );
}

export default App;
