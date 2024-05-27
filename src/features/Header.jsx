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
        alignItems: "center", // כדי ליישר את האלמנטים לאמצע
        backgroundColor: "#577B8D",
        gap: "20px",
        fontSize: "30px",
        borderBottom: "1px solid black",
        width: "100vw",
        padding: "10px", // כדי לתת מרווח מסביב לתכנים
      }}
    >
      {/* השימוש ב-Margin Left Auto יניב תוצאה דומה להגדרת Float Right */}
      {userInfo ? (
        <>
            <Link to={"/"}>
              <img src={logo} style={{ width: "20vw" }} alt="logo" />
            </Link>
        <div
          className="d-flex justify-content-between"
          style={{ width: "100%", gap: "35px" }}
        >
          <div className="d-flex">
            <p style={{ color: "#f8f8f8" }}>שלום {userInfo.data.user.name}😊</p>
            <Link to={"/"} style={{ color: "#f8f8f8", marginRight: "1rem" }}>
              דף הבית
            </Link>
          </div>
          <button
            style={{
              backgroundColor: "lightblue",
              color: "#f8f8f8", // צבע הטקסט,
              border: "none",
              padding: "5px 5px",
              borderRadius: "3px",
              cursor: "pointer",
              marginLeft: "20px",
            }}
            onClick={onLogout}
          >
            התנתקות
          </button>
        </div></>
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
  );
};
