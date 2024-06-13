import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import "./Courses.css";

// ייבוא התמונות המקומיות
import ai1 from "../assets/ai1.jpg";
import ai2 from "../assets/ai2.jpg";

const CoursesComponent = () => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const userInfo = useLogin();
  const userId = userInfo?.data.user._id;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER}/course`)
      .then((response) => response.json())
      .then((data) => setAvailableCourses(data.courses))
      .catch((error) =>
        console.error("Error fetching available courses:", error)
      );
  }, []);

  const colors = ["#f28b82", "#fbbc04", "#ccff90", "#a7ffeb"];
  const images = [ai1, ai2, ai1]; // מערך של תמונות מקומיות

  return (
    <div className="courses-container">
      {availableCourses.length > 0 ? (
        availableCourses.map((course, index) => {
          const imageSrc = images[index % images.length];
          return (
            <div key={course._id} className="course-card" style={{ backgroundColor: colors[index % colors.length] }}>
              <Link to={`/course/${course._id}?userId=${userId}`} className="course-link">
                <img src={imageSrc} alt={course.name} className="course-image" />
                <h5 className="course-title">{course.name}</h5>
                <div className="course-overlay">
                  <p className="course-description">
                    {course.description || "No description available."}
                  </p>
                  <div>
                    <Link to={`/course/${course._id}?userId=${userId}`} className="course-button-link">
                      Learn More
                    </Link>
                  </div>
                </div>
              </Link>

            </div>
          );
        })
      ) : (
        <h3>אין כלום להראות</h3>
      )}
    </div>
  );
};

export default CoursesComponent;
