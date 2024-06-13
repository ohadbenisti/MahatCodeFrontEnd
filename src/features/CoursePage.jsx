import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CourseSideBar from "./CourseSideBar";
import useLogin from "../hooks/useLogin";
import Problem from "../pages/Problem/Problem";
import EnrollmentComponent from "./Enrolment";
import "./CoursePage.css";
// import Question from "./Question";
// import AnswerSection from "./AnswerSection";

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const userInfo = useLogin();
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    // Fetch course data
    fetch(
      `${import.meta.env.VITE_SERVER}/course/${courseId}?userId=${
        userInfo.data.user._id
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.course) {
          setCourse(data.course);
          const [usersCurrentQuestion] =
            data.course.courseQuestions.questions.filter(
              (question) =>
                question._id === data.course.progress.currentQuestion
            );
          setCurrentQuestion(usersCurrentQuestion);

          // Set course data to state
          if (data.course.Enrolled) {
            setIsEnrolled(true);
          }
        } else {
          setCourse(null);
        }
        setLoading(false); // Update loading state to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
        setCourse(null);
        setLoading(false); // Update loading state to false in case of error
      });
  }, [courseId, userId, isEnrolled]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginTop: "100px" }}
      >
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

  return (
    <>
      <EnrollmentComponent
        isEnrolled={isEnrolled}
        setIsEnrolled={setIsEnrolled}
        courseId={courseId}
      />
      {isEnrolled && (
        <div>
          {course ? (
            <div className="d-flex">
              <div className="course-page-col-md-2 min-vh-100 bg-light mt-7">
                <CourseSideBar
                  courseDetails={course}
                  setCurrentQuestion={setCurrentQuestion}
                />
              </div>
              <div className="course-page-col-md-10">
                <div className="course-page-wrapper course-page-questions-wrapper mt-7">
                  <Problem courseQuestion={currentQuestion} />
                </div>
                {/* <div className="course-page-wrapper course-page-problem-wrapper">
                  <Question courseQuestion={currentQuestion} />
                  <AnswerSection courseQuestion={currentQuestion} />
                </div> */}
              </div>
            </div>
          ) : (
            <div>Course not found</div>
          )}
        </div>
      )}
    </>
  );
};

export default CoursePage;
