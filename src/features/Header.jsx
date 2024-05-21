// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import useLogin from "../hooks/useLogin";
// import Login from "../pages/Login";

// export const Header = ({ onLogout }) => {
//   const userInfo = useLogin()
//   console.log(userInfo);

//   return (
//     <div
//       style={{
//         display: "flex",
//         gap: "20px",
//         fontSize: "30px",
//         borderBottom: "1px solid black",
//         width: "100vw",
//         backgroundColor: "lightblue",
//       }}
//     > 
//       <h2>שלום {userInfo.data.user.name}😊</h2>
//       <Link to={"/"}>דף הבית</Link>
//       <button
//         style={{
//           backgroundColor: "lightblue",
//           color: "blue",
//           border: "none",
//           padding: "5px 10px",
//           borderRadius: "3px",
//           cursor: "pointer",
//         }}
//         onClick={onLogout}
//       >
//         התנתקות
//       </button>
//     </div>
//   );
// };
