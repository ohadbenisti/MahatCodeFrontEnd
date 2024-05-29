import React, { useState } from "react";
import CoursesComponent from "../../features/Courses";
import useLogin from "../../hooks/useLogin";
import EnrollmentComponent from  "../../features/Enrolment"

const Course = () => {
  const { userInfo } = useLogin()
  return (
    <>
      <h1>Courses page</h1>
      {/* <EnrollmentComponent userInfo={userInfo} /> */}
      <CoursesComponent />
    </>
  );
};
export default Course;
