import { React, useEffect } from "react";
import Codebox from "./Codebox";
import Answer from "./Answer";
import Forum from "./Forum";
import { useState } from "react";

const AnswerSection = ({ currentQuestion, courseDetails, onRightAnswer }) => {
  const [activeComponent, setActiveComponent] = useState("Codebox");
  const [code, setCode] = useState("");
  const componentsObj = {
    Codebox: (
      <Codebox
        code={code}
        setCode={setCode}
        currentQuestion={currentQuestion}
        courseDetails={courseDetails}
        onRightAnswer={onRightAnswer}
      />
    ),
    Answer: <Answer currentQuestion={currentQuestion} />,
    Forum: <Forum currentQuestion={currentQuestion} />
  };

  useEffect(() => {
    setCode(currentQuestion.initialCode ? currentQuestion.initialCode : "");
    setActiveComponent("Codebox");
  }, [currentQuestion]);
  return (
    <div className="col-md-5">
      <div className="mb-1">
        <button
          className={
            activeComponent == "Codebox"
              ? "btn btn-primary btn-lg active"
              : "btn btn-secondary btn-lg active"
          }
          onClick={() => setActiveComponent("Codebox")}
        >
          &lt;קוד&gt;
        </button>
        <button
          className={
            activeComponent == "Answer"
              ? "btn btn-primary btn-lg active"
              : "btn btn-secondary btn-lg active"
          }
          style={{ marginRight: "4px" }}
          onClick={() => setActiveComponent("Answer")}
        >
          פתרון
        </button>
        <button
          className={
            activeComponent == "Forum"
              ? "btn btn-primary btn-lg active"
              : "btn btn-secondary btn-lg active"
          }
          style={{ marginRight: "4px" }}
          onClick={() => setActiveComponent("Forum")}
        >
          פורום
        </button>
      </div>

      {/* Render the active component */}
      <div>{componentsObj[activeComponent]}</div>
      {/* <Codebox /> */}
    </div>
  );
};
export default AnswerSection;
