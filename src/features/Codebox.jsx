import React, { useState } from "react";
import axios from "axios";

const Codebox = () => {
  const [code, setCode] = useState("# Write your Python code here");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json", // Specify the content type of the request body
        "Access-Control-Allow-Origin": "*", // Specify the allowed origin for the request
      },
    };
    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",

        {
          language: "js",
          version: "15.10.0",
          files: [
            {
              name: "my_cool_code.js",
              content: "console.log(process.argv)",
            },
          ],
          stdin: "",
          args: ["1", "2", "3"],
          compile_timeout: 10000,
          run_timeout: 3000,
          compile_memory_limit: -1,
          run_memory_limit: -1,
        }
      );
      setOutput(response.data.output);
    } catch (error) {
      setOutput("An error occurred while running the code.");
    }
  };

  return (
    <div>
      <code-runner language="python">print('hello world')</code-runner>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={50}
      />
      <button onClick={runCode}>Run Python Code</button>
      <pre>{output}</pre>
    </div>
  );
};

export default Codebox;
