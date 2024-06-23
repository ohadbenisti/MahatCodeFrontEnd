import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useLogin from "../hooks/useLogin";
import ProgressBar from "./ProgressBar";
// ייבוא התמונות המקומיות
import ai1 from "../assets/ai1.jpg";
import ai2 from "../assets/ai2.jpg";
import "./Courses.css"; // ייבוא קובץ ה-CSS

const UserCourses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userInfo = useLogin();
  const userId = userInfo?.data.user._id;

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/course/user/${userId}`
      );
      setEnrolledCourses(response.data.userCourses);
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

  const colors = ["#FFCDD2", "#C8E6C9", "#BBDEFB", "#FFF9C4", "#D1C4E9"];
  const images = [ai1, ai2, ai1]; // מערך של תמונות מקומיות

  return (
    <div className="container mx-auto p-4">
      <div className="text-4xl font-bold mb-8">פרטי הקורסים</div>
      <div className="mt-8">
        <div className="w-full">
          {loading && (
            <div className="border border-blue-300 shadow rounded-md p-4 w-full mx-auto">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-slate-200 rounded w-1/3"></div>
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          )}
          {error && <div>{error}</div>}
          {!loading && !error && enrolledCourses.length > 0 && (
            <div>
              <table
                className="min-w-full bg-white border border-gray-200 rounded-md shadow-md"
                dir="rtl"
              >
                <thead className="bg-gray-200">
                  <tr>
                    <th className="text-right p-4">קורס</th>
                    <th className="text-right p-4">תאריך הרשמה</th>
                    <th className="text-right p-4">התקדמות</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledCourses.map((course, index) => {
                    console.log("course", course);
                    const percentage = Math.floor(
                      (course.progress.answeredQuestions.length /
                        course.progress.totalQuestions) *
                        100
                    );
                    const imageSrc = images[index % images.length];
                    return (
                      <tr key={course._id} className="border-t border-gray-200">
                        <td className="p-4">
                          <div className="course-card" style={{ backgroundColor: colors[index % colors.length] }}>
                            <Link to={`/course/${course.courseId}?userId=${userId}`} className="course-link">
                              <img src={imageSrc} alt={course.name} className="course-image" />
                              <div className="course-footer">
                                <h5 className="course-title">{course.name}</h5>
                              </div>

                              <div className="">
                                <p className="course-description">
                                  {course.description ||
                                    "No description available."}
                                </p>
                                <div>
                                  <Link to={`/course/${course._id}?userId=${userId}`} className="course-button-link">
                                    ראה עוד
                                  </Link>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </td>
                        <td className="p-4">
                          {course.enrolledAt
                            ? new Date(course.enrolledAt).toLocaleDateString()
                            : "לא זמין"}
                        </td>
                        <td className="p-4">
                          <ProgressBar percentage={percentage} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCourses;
