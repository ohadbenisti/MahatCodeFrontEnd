import React, { useState, useEffect, useRef } from "react";
import "./css/CodeEditor.css";

const CodeEditor = ({ code, setCode }) => {
  const lineNumberRef = useRef(null);
  const codeEditorRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;

      // Set textarea value to: text before caret + 4 spaces + text after caret
      setCode(code.substring(0, start) + "    " + code.substring(end));

      // Move caret to after the inserted spaces
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const currentLine = code.substring(0, start).split("\n").pop();

      let indent = "";
      const match = currentLine.match(/^(\s*)/);
      if (match) {
        indent = match[1];
      }

      const newIndent = shouldIndent(currentLine) ? indent + "    " : indent;

      setCode(
        code.substring(0, start) + "\n" + newIndent + code.substring(end)
      );

      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd =
          start + 1 + newIndent.length;
      }, 0);
    }
  };

  const shouldIndent = (line) => {
    return /:\s*$/.test(line);
  };

  const syncScroll = () => {
    lineNumberRef.current.scrollTop = codeEditorRef.current.scrollTop;
  };

  useEffect(() => {
    const lines = code.split("\n").length;
    const lineNumbers = Array.from({ length: lines }, (_, i) => i + 1).join(
      "\n"
    );
    lineNumberRef.current.value = lineNumbers;
  }, [code]);

  return (
    <div className="editor-container">
      <div className="editor">
        <textarea
          ref={lineNumberRef}
          className="line-numbers"
          readOnly
          value=""
        />
        <textarea
          ref={codeEditorRef}
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={syncScroll}
          placeholder="Write your code here..."
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
