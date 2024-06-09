import React from "react";

const CourseSideBar = ({ courseDetails, setCurrentQuestion }) => {
  return (
    <div className="sidebar">
      <h2 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '30px', fontWeight: '700', color: 'gray' }}>תפריט שאלות</h2>
      <ul className="list-group">
        {courseDetails.courseQuestions.questions.map((question) => (
          <li
            key={question._id}
            className="list-group-item"
            onClick={() => {
              setCurrentQuestion(question);
            }}
            style={{ cursor: "pointer" }}
          >
            {question.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseSideBar;
