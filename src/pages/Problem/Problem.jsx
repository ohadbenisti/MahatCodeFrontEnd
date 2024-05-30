import React from "react";
import Question from "../../features/Question";
import AnswerSection from "../../features/AnswerSection";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Problem = ({ courseQuestion }) => {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const { questionId } = useParams();
  useEffect(() => {
    if (courseQuestion) {
      setCurrentQuestion(courseQuestion);
    } else {
      fetchData(questionId);
    }
  }, [courseQuestion]);

  const fetchData = async (questionId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/problem/${questionId}`
      );
      const data = await response.json();
      const questionToShow = data.questionToShow;
      setCurrentQuestion(questionToShow);
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
    console.log(currentQuestion);
  };

  return (
    <div className="d-flex">
      <Question currentQuestion={currentQuestion} />
      <AnswerSection currentQuestion={currentQuestion} />
    </div>
  );
};

export default Problem;
