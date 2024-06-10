import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Codebox.css";
import CodeEditor from "./Codebox2";
import LoadingAnimation from "./LoadingAnimation";
import OutputBox from "./OutputBox";

const Codebox = ({ code, setCode, currentQuestion }) => {
  const [output, setOutput] = useState("");
  const [test, setTest] = useState("");
  // console.log(inputForPiston);
  useEffect(() => {
    if (currentQuestion) {
      setTest(currentQuestion.test);
    }
    // console.log("Question info:", currentQuestion?.test);
  }, [currentQuestion]);

  if (!currentQuestion) return <LoadingAnimation />;
  const runCode = async () => {
    // const stringForInput = `${test.input}`;

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json", // Specify the content type of the request body
    //     "Access-Control-Allow-Origin": "*", // Specify the allowed origin for the request
    //   },
    // };
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
      console.log("test", response.data.run.output == test.output);
      // response.data.run.output
      setOutput([
        test.output == response.data.run.output ? (
          <div style={{ background: "green" }}>תשובה נכונה!</div>
        ) : (
          <div style={{ background: "red" }}>נסה שנית</div>
        ),
        "Test Case:",
        <OutputBox code={test.input} style={{ maxHeight: "20vh" }} />,
        "Expected Output: ",
        <OutputBox code={test.output} />,
        "Your Output:",
        <OutputBox code={response.data.run.output} />
      ]);
    } catch (error) {
      setOutput("An error occurred while running the code.");
    }
  };

  return (
    <div className="d-flex flex-column ">
      {/* <code-runner language="python">print('hello world')</code-runner> */}
      {/* <div className="editor-container">
        <textarea
          className="code-editor"
          style={{ direction: "ltr" }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={10}
          cols={50}
        />
      </div> */}
      <CodeEditor code={code} setCode={setCode} />
      <button
        className="btn btn-outline-success mt-2"
        onClick={runCode}
        style={{ alignSelf: "flex-start" }}
      >
        הרץ קוד
      </button>
      <pre>{output}</pre>
    </div>
  );
};

export default Codebox;
