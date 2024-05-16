import { Link } from "react-router-dom";
export const Header = ({ onLogout }) => {
  let data = localStorage.getItem("userInfo");
  data = JSON.parse(data);
  const { name } = data.data.user;

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        fontSize: "30px",
        borderBottom: "1px solid black",
        width: "100vw",
      }}
    >
      <Link to={"/"}>Home</Link>
      <Link to={"/problem"}>Problem</Link>
      <Link to={"/course"}>Courses</Link>
      <h2>Hello {name}😊</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};
