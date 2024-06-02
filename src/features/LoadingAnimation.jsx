import React from "react";

const LoadingAnimation = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ marginTop: "100px" }}
    >
      <div style={{ minHeight: "200px" }}>
        <l-infinity
          size="150"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.3"
          color="black"
        ></l-infinity>
      </div>
    </div>
  );
};

export default LoadingAnimation;
