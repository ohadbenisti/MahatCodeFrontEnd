
  // const progress = courseDetails?.progress || {};
  // const answeredQuestions = progress.answeredQuestions || [];
import './CourseSideBar.css'
import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

const CourseSideBar = ({
  userProgress,
  courseDetails,
  setCurrentQuestion,
  questions,
  progressStart,
  percentageOfCompletion
}) => {
  // const { progress } = courseDetails;
  const { answeredQuestions } = userProgress;
  const AnsweredQuestions = new Set(answeredQuestions);  
  const [activeQuestionId, setActiveQuestionId] = useState(null);

  useEffect(() => {
    if (courseDetails?.progress?.currentQuestion) {
      setActiveQuestionId(courseDetails.progress.currentQuestion);
    }
  }, [courseDetails]);
  console.log("courseDetails", courseDetails);
  console.log("userProgress", userProgress);
  const handleQuestionClick = (question) => {
    setCurrentQuestion(question);
    setActiveQuestionId(question._id);
  };

  return (
    <div className="sidebar">
      <div className="flex flex-col items-center justify-center" style={{gap: "8px", marginBottom: "15px"}}>
        <h2
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "30px",
            fontWeight: "700",
            color: "gray",
          }}
        >
          {courseDetails.courseQuestions.name}
        </h2>
        <ProgressBar
          progressStart={progressStart}
          percentage={percentageOfCompletion}
        />
      </div>
      <ul className="list-group">
        {questions.map((question) => (
          <li
            key={question._id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              activeQuestionId === question._id ? "active" : ""
            }`}
            onClick={() => handleQuestionClick(question)}
          >
            <span>{question.title}</span>
            <span>
              {(AnsweredQuestions.has(question._id) || question.isAnswered) && (
                <i className="fa-solid fa-circle-check"></i>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseSideBar;
