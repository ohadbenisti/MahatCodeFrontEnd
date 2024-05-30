import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Question = ({ currentQuestion }) => {
  // const [questionToDisplay, setQuestionToDisplay] = useState("");
  // const { questionId } = useParams();
  // useEffect(() => {
  //   if (courseQuestion) {
  //     setQuestionToDisplay(courseQuestion);
  //   } else {
  //     fetchData(questionId);
  //   }
  // }, [currentQuestion]);

  // const fetchData = async (questionId) => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_SERVER}/problem/${questionId}`
  //     );
  //     const data = await response.json();
  //     const questionToShow = data.questionToShow;
  //     setQuestionToDisplay(questionToShow);
  //   } catch (error) {
  //     console.error("Error fetching question data:", error);
  //   }
  //   console.log(questionToDisplay);
  // };
  return (
    <div className="col-md-5" style={{ whiteSpace: "pre-wrap" }}>
      <h5> {currentQuestion.title}</h5>
      {currentQuestion.description}
    </div>
  );
};
export default Question;
