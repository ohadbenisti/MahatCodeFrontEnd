import React, { useState, useEffect } from 'react';

const CoursesComponent = () => {
    const [availableCourses, setAvailableCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const data = localStorage.getItem('userInfo')
    const dataObject = JSON.parse(data)
    const userId = dataObject.data.user._id

    useEffect(() => {
        fetch('http://localhost:3000/course')
            .then(response => response.json())
            .then(data => setAvailableCourses(data))
            .catch(error => console.error('Error fetching available courses:', error));
    })

    return (
        <div>
            <h2>Available Courses</h2>
            <ul>
                {availableCourses.map(course => (
                    <li key={course._id}>{course.name}</li>
                ))}
            </ul>
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