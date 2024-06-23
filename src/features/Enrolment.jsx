import React from "react";
import useLogin from "../hooks/useLogin";

const EnrollmentComponent = ({
  isEnrolled,
  setIsEnrolled,
  courseId,
  className
}) => {
  const userInfo = useLogin();
  const userId = userInfo?.data.user._id;

  const handleClick = async () => {
    const url = `${
      import.meta.env.VITE_SERVER
    }/course/${courseId}?userId=${userId}`;
    const method = isEnrolled ? "DELETE" : "POST";

    try {
      const response = await fetch(url, { method });
      const data = await response.json();
      if (data.status === "success") {
        setIsEnrolled(!isEnrolled);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`flex justify-center items-center mt-4 ${className}`}>
      <button
        className={`${
          isEnrolled ? "bg-red-500" : "bg-blue-500"
        } text-white px-4 py-2 rounded shadow-md hover:shadow-lg transition-shadow duration-200`}
        onClick={handleClick}
      >
        {isEnrolled ? "ביטול הרשמה לקורס" : "הרשמה לקורס"}
      </button>
    </div>
  );
};

export default EnrollmentComponent;
