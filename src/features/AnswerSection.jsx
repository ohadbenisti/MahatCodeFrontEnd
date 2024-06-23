import { React, useEffect, useState } from "react";
import Codebox from "./Codebox";
import Answer from "./Answer";
import Forum from "./Forum";

const AnswerSection = ({ currentQuestion, courseDetails, onRightAnswer }) => {
  const [activeComponent, setActiveComponent] = useState("Codebox");
  const [code, setCode] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  const handleAnswerClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    setActiveComponent("Answer");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="col-md-5">
      <div className="mb-1">
        <button
          className={
            activeComponent === "Codebox"
              ? "btn btn-primary btn-lg active"
              : "btn btn-secondary btn-lg active"
          }
          onClick={() => setActiveComponent("Codebox")}
        >
          &lt;קוד&gt;
        </button>
        <button
          className={
            activeComponent === "Answer"
              ? "btn btn-primary btn-lg active"
              : "btn btn-secondary btn-lg active"
          }
          style={{ marginRight: "4px" }}
          onClick={handleAnswerClick}
        >
          פתרון
        </button>
        <button
          className={
            activeComponent === "Forum"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white p-5 rounded shadow-lg z-10" style={{ borderRadius: '8px' }}>
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 mx-auto text-yellow-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h2 className="text-xl font-bold py-4">
                האם אתה בטוח שאתה רוצה לראות את הפתרון?
              </h2>
              <p className="text-gray-500 px-8">
                אולי תנסה שוב, זה יכול להיות מאתגר ומועיל! אם אתה עדיין רוצה לראות את הפתרון, לחץ על כן.
              </p>
              <div className="mt-4 flex justify-center">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mx-2"
                  style={{ borderRadius: '4px' }}
                  onClick={handleClose}
                >
                  לא, אני אנסה שוב
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mx-2"
                  style={{ borderRadius: '4px' }}
                  onClick={handleConfirm}
                >
                  כן, אני רוצה לראות את הפתרון
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerSection;
