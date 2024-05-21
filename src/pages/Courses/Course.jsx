import React, { useState } from "react";
import CoursesComponent from "../../features/Courses";
import useLogin from "../../hooks/useLogin";

const Course = () => {
  const { userInfo } = useLogin()
  return (
    <>
      <h1>Courses page</h1>
      <CoursesComponent />
    </>
  );
};
export default Course;
