import React from "react";
import Codebox from "./Codebox";
import Answer from "./Answer";
import Forum from "./Forum";
import { useState } from "react";

const AnswerSection = ({ currentQuestion }) => {
  const [activeComponent, setActiveComponent] = useState("Codebox");
  const [code, setCode] = useState("");
  const componentsObj = {
    Codebox: (
      <Codebox
        code={code}
        setCode={setCode}
        currentQuestion={currentQuestion}
      />
    ),
    Answer: <Answer currentQuestion={currentQuestion} />,
    Forum: <Forum currentQuestion={currentQuestion} />
  };

  return (
    <div className="col-md-5">
      <button
        className={
          activeComponent == "Codebox" ? "button-active" : "button-colored"
        }
        onClick={() => setActiveComponent("Codebox")}
      >
        קוד
      </button>
      <button
        className={
          activeComponent == "Answer" ? "button-active" : "button-colored"
        }
        style={{ marginRight: "4px" }}
        onClick={() => setActiveComponent("Answer")}
      >
        פתרון
      </button>
      <button
        className={
          activeComponent == "Forum" ? "button-active" : "button-colored"
        }
        style={{ marginRight: "4px" }}
        onClick={() => setActiveComponent("Forum")}
      >
        פורום
      </button>

      {/* Render the active component */}
      <div>{componentsObj[activeComponent]}</div>
      {/* <Codebox /> */}
    </div>
  );
};
export default AnswerSection;
