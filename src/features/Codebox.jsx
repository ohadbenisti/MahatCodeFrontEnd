import React, { useState } from "react";
import axios from "axios";
import "./css/Codebox.css";
import CodeEditor from "./Codebox2";

const Codebox = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const runCode = async () => {
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
          stdin: "",
          args: [],
          compile_timeout: 10000,
          run_timeout: 3000,
          compile_memory_limit: -1,
          run_memory_limit: -1
        }
      );
      console.log(response);
      setOutput(response.data.run.output);
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
      <button onClick={runCode} style={{ alignSelf: "flex-start" }}>
        הרץ קוד
      </button>
      <pre>{output}</pre>
    </div>
  );
};

export default Codebox;
