import React, { createContext } from "react";
import { useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp/SignUp";
import { Header } from "./features/Header";
import CoursePage from "./features/CoursePage";
import Course from "./pages/Courses/Course";
import Content from "./pages/Content/Content";
import "./App.css";
import Problem from "./pages/Problem/Problem";
import AdminPage from "./pages/Admin/AdminPage";
import PersonalArea from "./pages/PersonalArea/PersonalArea";

export const UserContext = createContext();

function App() {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(undefined);
    navigate("/login");
  };

  //   const counter=()=>{

//    const script = document.createElement("script");
//    script.type = "text/javascript";
//    script.src = "https://bringthemhomenow.net/1.1.0/hostages-ticker.js";
//    script.setAttribute(
//      "integrity",
//      "sha384-DHuakkmS4DXvIW79Ttuqjvl95NepBRwfVGx6bmqBJVVwqsosq8hROrydHItKdsne"
//    );
//    script.setAttribute("crossorigin", "anonymous");
//    document.getElementsByTagName("head")[0].appendChild(script);
//  }
//  counter()

  const isContentPage = location.pathname === "/";

//    const script = document.createElement("script");
//    script.type = "text/javascript";
//    script.src = "https://bringthemhomenow.net/1.1.0/hostages-ticker.js";
//    script.setAttribute(
//      "integrity",
//      "sha384-DHuakkmS4DXvIW79Ttuqjvl95NepBRwfVGx6bmqBJVVwqsosq8hROrydHItKdsne"
//    );
//    script.setAttribute("crossorigin", "anonymous");
//    document.getElementsByTagName("head")[0].appendChild(script);
//  }
//  counter()

  // React.useEffect(() => {
  //   // Check for token in local storage
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);
  return (
    <UserContext.Provider value={{ userInfo }}>
      {/* <div id="bthn" lang="he"></div> */}
      <div className={isContentPage ? "content-background" : ""}>
        <Header onLogout={handleLogout} isContentPage={isContentPage} />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/signup" element={<SignUp onSubmit={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/course" element={<Course />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route path="/problem/:questionId" element={<Problem />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/PersonalArea" element={<PersonalArea />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
