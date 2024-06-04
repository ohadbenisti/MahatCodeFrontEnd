import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingAnimation from "./LoadingAnimation";
import useLogin from "../hooks/useLogin";

const UserCourses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const userInfo = useLogin();
  const userId = userInfo?.data.user._id;

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      // שליפת כל הקורסים
      const coursesUrl = `${import.meta.env.VITE_SERVER}/course`;
      const coursesResponse = await axios.get(coursesUrl, { withCredentials: true });
      const allCourses = coursesResponse.data.courses;

      console.log("All Courses:", allCourses);

      // שליפת כל הקורסים שהמשתמש רשום אליהם
      const userCourses = [];
      for (const course of allCourses) {
        const courseUrl = `${import.meta.env.VITE_SERVER}/course/${course._id}?userId=${userId}`;
        const response = await axios.get(courseUrl, { withCredentials: true });
        
        console.log(`Course ID: ${course._id}`, response.data.course);

        if (response.data.course.Enrolled) {
          userCourses.push({
            ...course,
            enrolledAt: response.data.course.progress ? response.data.course.progress.enrolledAt : null,
            progress: response.data.course.progress,
          });
        }
      }
      setEnrolledCourses(userCourses);
    } catch (error) {
      console.error(
        "Error fetching courses:",
        error.response ? error.response.data : error.message
      );
      setError("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCourses();
    }
  }, [userId]);

  const toggleCoursesList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white border-none rounded-md cursor-pointer ml-5 py-2 px-4 hover:bg-blue-600 transition-all duration-300"
        onClick={toggleCoursesList}
      >
        {isOpen ? "סגור רשימת קורסים" : "הצג רשימת קורסים"}
      </button>
      {isOpen && (
        <div>
          {loading && <LoadingAnimation />}
          {error && <div>{error}</div>}
          {!loading && !error && enrolledCourses.length > 0 && (
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>שם הקורס</th>
                  <th>תאריך הרשמה</th>
                  <th>התקדמות</th>
                </tr>
              </thead>
              <tbody>
                {enrolledCourses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.name}</td>
                    <td>{course.enrolledAt ? new Date(course.enrolledAt).toLocaleDateString() : "לא זמין"}</td>
                    <td>
                      {course.progress ? `שאלה: ${course.progress.currentQuestion}` : "לא התחיל"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCourses;
