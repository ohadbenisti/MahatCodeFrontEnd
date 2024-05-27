import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CourseSideBar from "./CourseSideBar";
import useLogin from "../hooks/useLogin";
import Problem from "../pages/Problem/Problem";
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
          setCourse(data.course); // Set course data to state
          if (data.course.Enrolled) {
            setCurrentQuestion(data.course.progress);
          } else if (
            data.course.courseQuestions &&
            data.course.courseQuestions.questions.length > 0
          ) {
            setCurrentQuestion(data.course.courseQuestions.questions[0]);
            console.log(currentQuestion);
          } else {
            setCurrentQuestion(null);
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
  }, [courseId, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("current question:" + currentQuestion);

  return (
    <div>
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
            {/* <Question courseQuestion={currentQuestion} />
            <AnswerSection courseQuestion={currentQuestion} /> */}
          </div>
        </div>
      ) : (
        <div>Course not found</div>
      )}
    </div>
  );
};

export default CoursePage;
