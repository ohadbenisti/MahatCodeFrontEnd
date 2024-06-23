import { useEffect, useState, useRef } from "react";
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
      if (question._id == answeredId) {
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

  useEffect(() => {
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

  if (isEnrolled && userProgress) {
    return (
      <div>
        <EnrollmentComponent
          isEnrolled={isEnrolled}
          setIsEnrolled={setIsEnrolled}
          courseId={courseId}
          setUserProgress={setUserProgress}
        />
        {course ? (
          <div className="d-flex">
            <div className="col-md-2 min-vh-100 bg-light">
              <CourseSideBar
                userProgress={userProgress}
                progressStart={progressStart}
                percentageOfCompletion={percentageOfCompletion}
                questions={questions}
                courseDetails={course}
                setCurrentQuestion={setCurrentQuestion}
              />
            </div>
            <div className="col-md-10">
              <Problem
                onRightAnswer={setQuestionToAnswered}
                courseQuestion={currentQuestion}
                courseDetails={course}
              />
            </div>
          </div>
        ) : (
          <div>Course not found</div>
        )}
      </div>
    );
  }

  return (
    <div style={{ minHeight: "70vh" }}>
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

// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import CourseSideBar from "./CourseSideBar";
// import useLogin from "../hooks/useLogin";
// import Problem from "../pages/Problem/Problem";
// import EnrollmentComponent from "./Enrolment";
// // import Question from "./Question";
// // import AnswerSection from "./AnswerSection";

// const CoursePage = () => {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchParams] = useSearchParams();
//   const userId = searchParams.get("userId");
//   const userInfo = useLogin();
//   const [isEnrolled, setIsEnrolled] = useState(false);

//   useEffect(() => {
//     // Fetch course data
//     fetch(
//       `${import.meta.env.VITE_SERVER}/course/${courseId}?userId=${
//         userInfo.data.user._id
//       }`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         if (data && data.course) {
//           setCourse(data.course);
//           const [usersCurrentQuestion] =
//             data.course.courseQuestions.questions.filter(
//               (question) =>
//                 question._id === data.course.progress.currentQuestion
//             );
//           setCurrentQuestion(usersCurrentQuestion);

//           // Set course data to state
//           if (data.course.Enrolled) {
//             setIsEnrolled(true);
//           }
//         } else {
//           setCourse(null);
//         }
//         setLoading(false); // Update loading state to false once data is fetched
//       })
//       .catch((error) => {
//         console.error("Error fetching course:", error);
//         setCourse(null);
//         setLoading(false); // Update loading state to false in case of error
//       });
//   }, [courseId, userId, isEnrolled]);

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ marginTop: "100px" }}
//       >
//         <div style={{ minHeight: "200px" }}>
//           <l-infinity
//             size="150"
//             stroke="4"
//             stroke-length="0.15"
//             bg-opacity="0.1"
//             speed="1.3"
//             color="black"
//           ></l-infinity>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <EnrollmentComponent
//         isEnrolled={isEnrolled}
//         setIsEnrolled={setIsEnrolled}
//         courseId={courseId}
//       />
//       {isEnrolled && (
//         <div>
//           {course ? (
//             <div className="d-flex">
//               <div className="col-md-2 min-vh-100 bg-light">
//                 <CourseSideBar
//                   courseDetails={course}
//                   setCurrentQuestion={setCurrentQuestion}
//                 />
//               </div>
//               <div className="col-md-10">
//                 <Problem courseQuestion={currentQuestion} />
//                 {/* <Question courseQuestion={currentQuestion} />
//                 <AnswerSection courseQuestion={currentQuestion} /> */}
//               </div>
//             </div>
//           ) : (
//             <div>Course not found</div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default CoursePage;
