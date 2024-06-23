import React from "react";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const EnrollmentComponent = ({
  isEnrolled,
  setIsEnrolled,
  courseId,
  setUserProgress
}) => {
  const userInfo = useLogin();
  const userId = userInfo?.data.user._id;
  const navigate = useNavigate();

  const handleClick = async () => {
    const url = `${
      import.meta.env.VITE_SERVER
    }/course/${courseId}?userId=${userId}`;
    const method = isEnrolled ? "DELETE" : "POST";

    try {
      const response = await fetch(url, { method });
      const data = await response.json();
      // if (data.newEnrolment) setUserProgress(data.newEnrolment.progress);
      if (data.status === "success") {
        setIsEnrolled(!isEnrolled);
        // if (!isEnrolled) {
        //   setShowCourse(true);
        // }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <div className="min-h-screen flex flex-col justify-center items-center">
    //   <div className="container mx-auto text-center">
    //     <h1 className="text-3xl font-bold mb-4">קורסים</h1>
    //     <p className="text-lg mb-8">ברוכים הבאים לעמוד הקורסים שלנו!</p>
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={handleClick}
    >
      {isEnrolled ? "ביטול הרשמה לקורס" : "הרשמה לקורס"}
    </button>
    //   </div>
    // </div>
  );
};

export default EnrollmentComponent;
