import React from "react";
import "./css/ProgressBar.css";

const ProgressBar = ({ value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${percentage}%` }}>
        <span className="progress-value">{percentage.toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
