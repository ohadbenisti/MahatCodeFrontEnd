import React from "react";
import ProgressBar from "./ProgressBar";

const CourseSideBar = ({
  courseDetails,
  setCurrentQuestion,
  questions,
  progressStart,
  percentageOfCompletion
}) => {
  const { progress } = courseDetails;
  const { answeredQuestions } = progress;
  const AnsweredQuestions = new Set(answeredQuestions);
  return (
    <div className="sidebar">
      <div className="flex flex-col items-center justify-center">
        <h2
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "30px",
            fontWeight: "700",
            color: "gray"
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
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={() => {
              setCurrentQuestion(question);
            }}
            style={{ cursor: "pointer" }}
          >
            <span>{question.title}</span>
            <span>
              {(AnsweredQuestions.has(question._id) || question.isAnswered) && (
                <i
                  className="fa-solid fa-circle-check"
                  style={{ color: "green" }}
                ></i>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseSideBar;
