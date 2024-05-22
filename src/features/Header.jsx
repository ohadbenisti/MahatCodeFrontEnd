// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
// import Login from "../pages/Login";
import logo from "../assets/logo.jpg"
export const Header = ({ onLogout }) => {
  const userInfo = useLogin()
  console.log(userInfo);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center", // כדי ליישר את האלמנטים לאמצע
        gap: "20px",
        fontSize: "30px",
        borderBottom: "1px solid black",
        width: "100vw",
        backgroundColor: "#577B8D",
        padding: "10px", // כדי לתת מרווח מסביב לתכנים
      }}
    >
      <img src={logo} style={{ width: "20vw" }} alt="logo" />
      <div style={{ display: "flex", gap: "35px", marginLeft: "auto" }}> {/* השימוש ב-Margin Left Auto יניב תוצאה דומה להגדרת Float Right */}
        {userInfo ? (
          <>
            <h2 style={{ color: "#f8f8f8" }}>שלום {userInfo.data.user.name}😊</h2>
            <Link to = {"/"} style={{ color: "#f8f8f8" }}>דף הבית</Link>
            <button
              style={{
                backgroundColor: "lightblue",
                color: "#f8f8f8", // צבע הטקסט,
                border: "none",
                padding: "5px 10px",
                borderRadius: "3px",
                cursor: "pointer",
              }}
              onClick={onLogout}
            >
              התנתקות
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" style={{ color: "#f8f8f8" }}>
              הרשמה
            </Link>
            <Link to="/login" style={{ color: "#f8f8f8" }}>
              כניסה
            </Link>
          </>
        )}
      </div>
    </div>
  );
};