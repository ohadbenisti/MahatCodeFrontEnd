import React from "react";
import Question from "../../features/Question";
import AnswerSection from "../../features/AnswerSection";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditQuestion from "../../features/EditQuestion"

const Problem = ({ courseQuestion }) => {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const { questionId } = useParams();
  console.log(questionId);
  useEffect(() => {
    if (courseQuestion) {
      setCurrentQuestion(courseQuestion);
    } else {
      fetchData(questionId);
    }
  }, [courseQuestion, questionId]); //  }, [courseQuestion, questionId]);  //??

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
    // console.log(currentQuestion);
  };

  const handleEditClick = () => {
    setShowEditPopup(true);
  };

  const handleClose = () => {
    setShowEditPopup(false);
  };

  const handleSave = (updatedQuestion) => {
    // Implement the save functionality, such as updating the question in the state or sending a request to the server
    setCurrentQuestion(updatedQuestion);
    setShowEditPopup(false);
  };

  return (
    <>
      <div className="d-flex justify-content-around my-4">
        <Question currentQuestion={currentQuestion} />
        <AnswerSection currentQuestion={currentQuestion} />
        <button onClick={handleEditClick}>Edit Question</button>
        {showEditPopup && (
          <EditQuestion
            question={currentQuestion}
            questionId ={questionId}
            onClose={handleClose}
            onSave={handleSave}
          />
        )}
      </div>
    </>
  );}

export default Problem;
