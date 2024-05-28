import React from "react";
import Codebox from "./Codebox";
import Answer from "./Answer";
import Forum from "./Forum";
import { useState } from "react";

const AnswerSection = ({ currentQuestion }) => {
  const [activeComponent, setActiveComponent] = useState("Codebox");
  const componentsObj = {
    Codebox: <Codebox />,
    Answer: <Answer currentQuestion={currentQuestion} />,
    Forum: <Forum />,
  };

  return (
    <div className="col-md-5">
      <button onClick={() => setActiveComponent("Codebox")}>קוד</button>
      <button onClick={() => setActiveComponent("Answer")}>פתרון</button>
      <button onClick={() => setActiveComponent("Forum")}>פורום</button>

      {/* Render the active component */}
      <div>{componentsObj[activeComponent]}</div>
      {/* <Codebox /> */}
    </div>
  );
};

export default AnswerSection;
