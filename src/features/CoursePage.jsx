import React from "react";
import { useParams } from "react-router-dom";

const CoursePage = () => {
  const { courseId } = useParams();
  return <div>{courseId}</div>;
};

export default CoursePage;
