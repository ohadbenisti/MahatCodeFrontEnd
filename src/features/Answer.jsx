import React from "react";
import CodeBoxStyling from "./CodeboxStyling";

const Answer = ({ currentQuestion }) => {
  return (
    <div
      className="col-md-12"
      style={{ direction: "ltr", whiteSpace: "pre-wrap" }}
    >
      <CodeBoxStyling code={currentQuestion.solution} />
    </div>
  );
};

export default Answer;
