import React from "react";
import CoursesComponent from "../../features/Courses";

const Content = ({ onLogout }) => {
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={onLogout}>Logout</button>
      <CoursesComponent />
    </div>
  );
};

export default Content;
