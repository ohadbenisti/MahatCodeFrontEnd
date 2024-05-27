import React from "react";

const Answer = ({ currentQuestion }) => {
  return (
    <div
      className="col-md-12"
      style={{ direction: "ltr", whiteSpace: "pre-wrap" }}
    >
      {currentQuestion.solution}
    </div>
  );
};

export default Answer;
