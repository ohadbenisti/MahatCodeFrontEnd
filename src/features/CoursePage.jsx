import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CourseSideBar from "./CourseSideBar";
import useLogin from "../hooks/useLogin";
import Problem from "../pages/Problem/Problem";
import EnrollmentComponent from "./Enrolment";
import "./CoursePage.css";
import LoadingAnimation from "./LoadingAnimation";

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState(null);
  const userInfo = useLogin();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showCourse, setShowCourse] = useState(false);
  const [questions, setQuestions] = useState();
  const [progressStart, setProgressStart] = useState(0);
  const [percentageOfCompletion, setPercentageOfCompletion] = useState();
  const progressBarRef = useRef(null);

  const handleReset = () => {
    if (progressBarRef.current) {
      progressBarRef.current.updateProgress();
    }
  };
  const setQuestionToAnswered = (answeredId) => {
    const updatedQuestions = questions.map((question) => {
      if (question._id === answeredId) {
        return { ...question, isAnswered: true };
      }
      return question;
    });
    setQuestions(updatedQuestions);
    const questionPercentage = Math.floor(100 / questions.length);
    setProgressStart(percentageOfCompletion);
    setPercentageOfCompletion(percentageOfCompletion + questionPercentage);
    percentageOfCompletion > 95 && setPercentageOfCompletion(100);
    if (progressBarRef.current) {
      progressBarRef.current.updateProgress(percentageOfCompletion);
    }
  };

  const fetchCourseData = () => {
    setLoading(true);
    console.log("fetching course...");
    fetch(
      `${import.meta.env.VITE_SERVER}/course/${courseId}?userId=${
        userInfo.data.user._id
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && data.course) {
          setCourse(data.course);
          if (data.course.progress) {
            setUserProgress(data.course.progress);
            const [usersCurrentQuestion] =
              data.course.courseQuestions.questions.filter(
                (question) =>
                  question._id === data.course.progress.currentQuestion
              );
            setCurrentQuestion(usersCurrentQuestion);
            setQuestions(data.course.courseQuestions.questions);

            const calculate = Math.floor(
              (data.course.progress.answeredQuestions.length /
                data.course.progress.totalQuestions) *
                100
            );

            setPercentageOfCompletion(calculate);
          }
          if (data.course.Enrolled) {
            setIsEnrolled(true);
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
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId, userId, isEnrolled]);

  if (loading) {
    return (
      <div
        className="flex justify-center items-center mt-24"
        style={{ minHeight: "400px" }}
      >
        <LoadingAnimation />
      </div>
    );
  }

  if (isEnrolled && userProgress) {
    return (
      <div className="flex flex-col min-h-screen">
        {course ? (
          <div className="flex flex-grow">
            <div
              className="w-1/5 min-h-full bg-gray-200"
              style={{ width: "300px" }}
            >
              <CourseSideBar
                userProgress={userProgress}
                progressStart={progressStart}
                percentageOfCompletion={percentageOfCompletion}
                questions={questions}
                courseDetails={course}
                setCurrentQuestion={setCurrentQuestion}
              />
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
              <Problem
                onRightAnswer={setQuestionToAnswered}
                courseQuestion={currentQuestion}
                courseDetails={course}
              />
              <EnrollmentComponent
                isEnrolled={isEnrolled}
                setIsEnrolled={setIsEnrolled}
                courseId={courseId}
                className="mb-2"
              />
            </div>
          </div>
        ) : (
          <div>Course not found</div>
        )}
      </div>
    );
  }
  if (!isEnrolled) {
    return (
      <>
        <div
          className="flex flex-col"
          style={{
            minHeight: "350px",
            marginTop: "100px",
            fontSize: "1.75rem",
            textAlign: "center"
          }}
        >
          <div>
            ברוכים הבאים לקורס <strong>{course.courseQuestions.name}</strong>
          </div>
          <div>
            בקורס זה תלמדו ותתרגלו{" "}
            <strong>{course.courseQuestions.description}</strong>
            <br />
            <br />
            מוכנים לצלול לאתגר?
          </div>
          <div>💻👨‍💻</div>
        </div>
        <div className="flex-grow p-4 overflow-y-auto justify-center items-center">
          <EnrollmentComponent
            isEnrolled={isEnrolled}
            setIsEnrolled={setIsEnrolled}
            courseId={courseId}
          />
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <EnrollmentComponent
        isEnrolled={isEnrolled}
        setIsEnrolled={setIsEnrolled}
        courseId={courseId}
      />
    </div>
  );
};

export default CoursePage;
