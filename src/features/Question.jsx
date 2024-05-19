import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Question = ({ currentQuestion }) => {
  const [question, setQuestion] = useState([]);
  const { questionId } = useParams();
  useEffect(() => {
    if (currentQuestion) {
      setQuestion(currentQuestion);
    } else {
      fetchData(questionId);
    }
  }, [currentQuestion]);

  const fetchData = async (questionId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/problem/${questionId}`
      );
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  };
  return <div className="col-md-5">{question.description}</div>;
};
export default Question;
