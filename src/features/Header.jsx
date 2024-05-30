// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useLocation } from "react-router-dom";
// import Login from "../pages/Login";
import logo from "../assets/logo.jpg";

export const Header = ({ onLogout }) => {
  const userInfo = useLogin();
  console.log(userInfo);
  const location = useLocation();


  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#577B8D",
        gap: "20px",
        fontSize: "30px",
        borderBottom: "1px solid black",
        width: "100vw",
        padding: "8px",
      }}
    >
      {userInfo ? (
        <>
          <Link to="/">
            <img src={logo} style={{ width: "20vw" }} alt="logo" />
          </Link>
          <div
            className="d-flex justify-content-between"
            style={{ width: "100%", gap: "35px" }}
          >
            <div className="d-flex">
              <p style={{ color: "#f8f8f8" }}>שלום {userInfo.data.user.name} 😊</p>
              <Link to="/" style={{ color: "#f8f8f8", marginRight: "1rem" }}>
                דף הבית
              </Link>
            </div>
            <div>
              {userInfo.data.user.role === "admin" && (
                <Link to="/admin" >
                  <button
                    style={{
                      backgroundColor: "lightblue",
                      color: "#f8f8f8",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginLeft: "20px",
                      marginTop:"6px"
                    }}
                  >
                    דף ניהול
                  </button>
                </Link>
              )}
              <button
                style={{
                  backgroundColor: "lightblue",
                  color: "#f8f8f8",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginLeft: "20px",
                  marginTop:"6px"
                }}
                onClick={onLogout}
              >
                התנתקות
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <img src={logo} style={{ width: "20vw" }} alt="logo" />
          {location.pathname === "/login" && (
            <Link to="/signup" style={{ color: "#f8f8f8" }}>
              הרשמה
            </Link>
          )}
          {location.pathname === "/signup" && (
            <Link to="/login" style={{ color: "#f8f8f8" }}>
              כניסה
            </Link>
          )}
        </>
      )}
    </div>
  )
}

export default Header