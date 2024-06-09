import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CourseSideBar from "./CourseSideBar";
import useLogin from "../hooks/useLogin";
import Problem from "../pages/Problem/Problem";
import EnrollmentComponent from "./Enrolment";

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = useLogin();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId")
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showCourse, setShowCourse] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_SERVER}/course/${courseId}?userId=${userInfo.data.user._id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.course) {
          setCourse(data.course);
          const [usersCurrentQuestion] = data.course.courseQuestions.questions.filter(
            (question) => question._id === data.course.progress.currentQuestion
          );
          setCurrentQuestion(usersCurrentQuestion);
          if (data.course.Enrolled) {
            setIsEnrolled(true);
            setShowCourse(true);
          }
        } else {
          setCourse(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
        setCourse(null);
        setLoading(false);
      });
  }, [courseId, userId, isEnrolled]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "100px" }}>
        <div style={{ minHeight: "200px" }}>
          <l-infinity
            size="150"
            stroke="4"
            stroke-length="0.15"
            bg-opacity="0.1"
            speed="1.3"
            color="black"
          ></l-infinity>
        </div>
      </div>
    );
  }

  if (isEnrolled) {
    return (
      <div>
        <EnrollmentComponent
      isEnrolled={isEnrolled}
      setIsEnrolled={setIsEnrolled}
      courseId={courseId}
      // setShowCourse={setShowCourse}
    />
        {course ? (
          <div className="d-flex">
            <div className="col-md-2 min-vh-100 bg-light">
              <CourseSideBar
                courseDetails={course}
                setCurrentQuestion={setCurrentQuestion}
              />
            </div>
            <div className="col-md-10">
              <Problem courseQuestion={currentQuestion} />
            </div>
          </div>
        ) : (
          <div>Course not found</div>
        )}
      </div>
    );
  }

  return (
    <div style={{ minHeight: "70vh"}}>
    <EnrollmentComponent
      isEnrolled={isEnrolled}
      setIsEnrolled={setIsEnrolled}
      courseId={courseId}
      // setShowCourse={setShowCourse}
    />
    </div>
  );
};

export default CoursePage;
