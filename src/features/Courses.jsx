import React, { useState, useEffect } from "react";

const CoursesComponent = () => {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const data = localStorage.getItem("userInfo");
  const dataObject = JSON.parse(data);
  const user = dataObject.data.user;
  const { userId } = user;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER}/course`)
      .then((response) => response.json())
      .then((data) => setAvailableCourses(data.courses))
      .catch((error) =>
        console.error("Error fetching available courses:", error)
      );
  });
  //Need to change to course path, and add user to the req.body
  return (
    <div>
      <h2>Available Courses</h2>
      {availableCourses ? (
        availableCourses.map((course) => (
          <div key={course._id}>
            <div key={course._id} className="card" style={{ width: "18rem" }}>
              <a href={`${import.meta.env.VITE_SERVER}/course/${course._id}`}>
                <img
                  className="card-img-top"
                  src={course.image}
                  alt="Card image cap"
                />
              </a>
              <div className="card-body">
                <p className="card-text">{course.name}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h3>Nothing to display</h3>
      )}
      {/* 
            <h2>Enrolled Courses</h2>
            <ul>
                {enrolledCourses.map(course => (
                    <li key={course._id}>{course.name}</li>
                ))}
            </ul> */}
    </div>
  );
};

export default CoursesComponent;
