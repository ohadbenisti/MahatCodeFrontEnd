import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./css/Codebox.css";
import CodeEditor from "./Codebox2";
import LoadingAnimation from "./LoadingAnimation";
import OutputBox from "./OutputBox";
import MatrixAnimation from "./MatrixAnimation";

const Codebox = ({
  code,
  setCode,
  currentQuestion,
  courseDetails,
  onRightAnswer
}) => {
  const [output, setOutput] = useState("");
  const [test, setTest] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const location = useLocation();
  const isCourse = location.pathname.split("/")[1] == "course";

  useEffect(() => {
    if (currentQuestion) {
      setTest(currentQuestion.test);
    }
    setOutput("");
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
    setIsPending(true);
    setOutput("");
    // Add code to end of users code, if needed
    const newCode = `${code}\n${test.injectCode ? test.injectCode : ""}`;

    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",

        {
          language: "python",
          version: "3.10.0",
          files: [
            {
              name: "my_cool_code.py",
              content: newCode
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
      setIsPending(false);
      const rightAnswer = response.data.run.output == test.output;
      const SyntaxError = response.data.run.stderr != "";

      // Update the answered question in the usersCourses progress
      rightAnswer && isCourse && onRightAnswered();

      // Div to display in right answer
      const RightAnswer = () => (
        <div
          style={{
            background: "green",
            direction: "rtl",
            fontSize: "24px",
            color: "white"
          }}
        >
          תשובה נכונה!
        </div>
      );

      // Div to display in error
      const ErrorBlock = ({ error }) => (
        <div>
          <div style={{ background: "red", direction: "rtl" }}>
            שגיאה בהרצת התוכנית. תוכן השגיאה:
          </div>
          <div wrap="soft" style={{ whiteSpace: "pre-wrap" }}>
            {error}
          </div>
        </div>
      );

      // Div to display in wrong answer

      const TryAgain = () => (
        <div style={{ background: "red", direction: "rtl" }}>נסה שנית</div>
      );

      const TestCaseOutput = ({ test, response }) => (
        <>
          <div>Test Case:</div>
          <OutputBox code={test.input} style={{ maxHeight: "20vh" }} />
          <div>Expected Output:</div>
          <OutputBox code={test.output} />
          <div>Your Output:</div>
          <OutputBox code={response.data.run.output} />
        </>
      );

      setOutput([
        rightAnswer ? (
          <RightAnswer key="right-answer" />
        ) : SyntaxError ? (
          <ErrorBlock key="error-block" error={response.data.run.stderr} />
        ) : (
          <TryAgain key="try-again" />
        ),
        !SyntaxError && (
          <TestCaseOutput
            key="test-case-output"
            test={test}
            response={response}
          />
        )
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
      {isPending && <MatrixAnimation />}
      <pre style={{ direction: "ltr" }}>{output}</pre>
    </div>
  );
};

export default Codebox;
