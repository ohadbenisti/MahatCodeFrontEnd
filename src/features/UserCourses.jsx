import React, { useState, useEffect } from "react";
import axios from "axios";
import useLogin from "../hooks/useLogin";

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
      const coursesUrl = `${import.meta.env.VITE_SERVER}/course`;
      const coursesResponse = await axios.get(coursesUrl, { withCredentials: true });
      const allCourses = coursesResponse.data.courses;

      console.log("All Courses:", allCourses);

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

  return (
    <div className="container mx-auto p-4">
      <div className="text-4xl font-bold mb-8">
        פרטי הקורסים
      </div>
      <div className="flex justify-end mt-8">
        <div className="w-full max-w-2xl">
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
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="text-left p-4">שם הקורס</th>
                    <th className="text-left p-4">תאריך הרשמה</th>
                    <th className="text-left p-4">התקדמות</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledCourses.map((course) => (
                    <tr key={course._id} className="border-t border-gray-200">
                      <td className="p-4">{course.name}</td>
                      <td className="p-4">{course.enrolledAt ? new Date(course.enrolledAt).toLocaleDateString() : "לא זמין"}</td>
                      <td className="p-4">
                        {course.progress ? `שאלה: ${course.progress.currentQuestion}` : "לא התחיל"}
                      </td>
                    </tr>
                  ))}
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
