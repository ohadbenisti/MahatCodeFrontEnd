import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const CoursesComponent = () => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
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

  return (
    <div className="d-flex">
      {availableCourses ? (
        availableCourses.map((course) => (
          <div key={course._id} className="card mx-1 shadow p-3 mb-5 bg-body-tertiary rounded" style={{ width: "18rem"}}>
            <Link to={`/course/${course._id}?userId=${userId}`}>
              <img
                className="card-img-top"
                src={course.image}
                alt="Card image cap"
              />
            </Link>
            <div className="card-body">
              <p className="card-text text-center" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '24px', fontWeight: '700', color: '#333' }}>{course.name}</p>
            </div>
          </div>
        ))
      ) : (
        <h3>Nothing to display</h3>
      )}
    </div>
  );
};

export default CoursesComponent;
