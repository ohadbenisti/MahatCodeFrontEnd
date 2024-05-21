import { Link } from "react-router-dom";
export const Header = ({ onLogout }) => {
  let data = localStorage.getItem("userInfo");
  data = JSON.parse(data);
  const { name } = data.data.user;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center", // יישור האלמנטים במרכז הגובה
        gap: "20px",
        fontSize: "30px",
        borderBottom: "1px solid black",
        width: "100vw",
        padding: "10px", // הוספת ריווח פנימי
        background: "linear-gradient(to right, #ADD8E6, #0000FF)",
      }}
    >
      <h2>שלום {name}😊</h2>
      <Link to={"/"}>דף הבית</Link>
      <button
        style={{
          backgroundColor: "lightblue",
          color: "#8B0000",
          border: "none",
          padding: "8px 16px", // הגדלת הריווח הפנימי של הכפתור
          borderRadius: "5px", // הגדלת הרדיוס של הכפתור
          cursor: "pointer",
          fontWeight: "bold", // הדגשת הטקסט של הכפתור
        }}
        onClick={onLogout}
      >
        התנתקות
      </button>
    </div>
  )}
