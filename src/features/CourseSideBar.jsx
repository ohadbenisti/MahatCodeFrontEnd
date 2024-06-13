import React from "react";

const CourseSideBar = ({ courseDetails, setCurrentQuestion, questions }) => {
  const { progress } = courseDetails;
  const { answeredQuestions } = progress;
  const AnsweredQuestions = new Set(answeredQuestions);
  return (
    <div className="sidebar">
      <h2
        style={{
          fontFamily: "Roboto, sans-serif",
          fontSize: "30px",
          fontWeight: "700",
          color: "gray"
        }}
      >
        תפריט שאלות
      </h2>
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
