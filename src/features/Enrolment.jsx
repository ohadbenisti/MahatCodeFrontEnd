import React, { useState, useEffect } from "react";
import useLogin from "../hooks/useLogin";


const EnrollmentComponent = ({ isEnrolled, setIsEnrolled, courseId }) => {
  const userInfo = useLogin();
  const userId = userInfo?.data.user._id;
  const handleClick = async () => {
    isEnrolled ?
      await fetch(`${import.meta.env.VITE_SERVER}/course/${courseId}?userId=${userId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          data.status == "success" && setIsEnrolled(false)})
        .catch((error) => {
          console.error(error)
        })
      
  : await fetch(`${import.meta.env.VITE_SERVER}/course/${courseId}?userId=${userId}`, {
            method: "POST",
          })
          .then((response) => response.json())
          .then((data) => {
            data.status == "success" && setIsEnrolled(true)})
          .catch((error) => {
            console.error(error)
          })
          

  }


  // useEffect(() => {

  // }, []);

  return (
    <button onClick={handleClick}>{isEnrolled ? "ביטול הרשמה לקורס" : "הרשמה לקורס"}</button>
  );
}
export default EnrollmentComponent;


