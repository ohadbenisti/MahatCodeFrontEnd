import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./css/Codebox.css";
import CodeEditor from "./Codebox2";
import LoadingAnimation from "./LoadingAnimation";
import OutputBox from "./OutputBox";

const Codebox = ({
  code,
  setCode,
  currentQuestion,
  courseDetails,
  onRightAnswer
}) => {
  const [output, setOutput] = useState("");
  const [test, setTest] = useState("");
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const location = useLocation();
  const isCourse = location.pathname.split("/")[1] == "course";

  useEffect(() => {
    if (currentQuestion) {
      setTest(currentQuestion.test);
    }
  }, [currentQuestion]);

  if (!currentQuestion) return <LoadingAnimation />;

  const onRightAnswered = async () => {
    const payload = { questionId: currentQuestion._id };
    const url = `${
      import.meta.env.VITE_SERVER
    }/course/${courseId}?userId=${userId}`;
    try {
      const response = await axios.patch(url, payload);
      onRightAnswer(currentQuestion._id);
    } catch {
      console.log("error");
    }
  };

  const runCode = async () => {
    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",

        {
          language: "python",
          version: "3.10.0",
          files: [
            {
              name: "my_cool_code.py",
              content: code
            }
          ],
          stdin: test.input,
          args: [],
          compile_timeout: 10000,
          run_timeout: 3000,
          compile_memory_limit: -1,
          run_memory_limit: -1
        }
      );
      console.log(response);

      const rightAnswer = response.data.run.output == test.output;
      const SyntaxError = response.data.run.stderr;

      rightAnswer && isCourse && onRightAnswered();

      setOutput([
        rightAnswer ? (
          <div style={{ background: "green", direction: "rtl" }}>
            תשובה נכונה!
          </div>
        ) : SyntaxError ? (
          <div>
            <div style={{ background: "red", direction: "rtl" }}>
              שגיאה בהרצת התוכנית. תוכן השגיאה:
            </div>

            <div wrap="soft" style={{ whiteSpace: "pre-wrap" }}>
              {SyntaxError}
            </div>
          </div>
        ) : (
          <div style={{ background: "red", direction: "rtl" }}>נסה שנית</div>
        ),
        !SyntaxError &&
          ("Test Case:",
          (<OutputBox code={test.input} style={{ maxHeight: "20vh" }} />),
          "Expected Output: ",
          (<OutputBox code={test.output} />),
          "Your Output:",
          (<OutputBox code={response.data.run.output} />))
      ]);
    } catch (error) {
      setOutput("An error occurred while running the code.");
    }
  };

  return (
    <div className="d-flex flex-column ">
      <CodeEditor code={code} setCode={setCode} />
      <button
        className="btn btn-outline-success mt-2"
        onClick={runCode}
        style={{ alignSelf: "flex-start" }}
      >
        הרץ קוד
      </button>
      <pre style={{ direction: "ltr" }}>{output}</pre>
    </div>
  );
};

export default Codebox;
