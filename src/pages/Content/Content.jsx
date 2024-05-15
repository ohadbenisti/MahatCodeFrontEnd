import React from "react";

const Content = ({ onLogout }) => {
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Content;
