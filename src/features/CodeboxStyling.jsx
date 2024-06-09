import React, { useEffect } from 'react';

const CodeBoxStyling = ({ code }) => {
  useEffect(() => {
    // Ensure Prism highlights the code
    window.Prism.highlightAll();
  }, []);

  return (
    <pre className="bg-black text-white p-4 rounded-lg overflow-auto">
      <code className="language-jsx">{code}</code>
    </pre>
  );
};

export default CodeBoxStyling;
