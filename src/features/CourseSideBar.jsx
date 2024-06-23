import React, { useState, useEffect } from "react";
import './CourseSideBar.css'

const CourseSideBar = ({ courseDetails, setCurrentQuestion, questions }) => {
  const progress = courseDetails?.progress || {};
  const answeredQuestions = progress.answeredQuestions || [];
  const AnsweredQuestions = new Set(answeredQuestions);
  
  const [activeQuestionId, setActiveQuestionId] = useState(null);

  useEffect(() => {
    if (courseDetails?.progress?.currentQuestion) {
      setActiveQuestionId(courseDetails.progress.currentQuestion);
    }
  }, [courseDetails]);

  const handleQuestionClick = (question) => {
    setCurrentQuestion(question);
    setActiveQuestionId(question._id);
  };

  return (
    <div className="sidebar">
      <h2>תפריט שאלות</h2>
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
