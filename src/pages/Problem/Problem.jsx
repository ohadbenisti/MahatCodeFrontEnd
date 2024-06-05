import React from "react";
import Question from "../../features/Question";
import AnswerSection from "../../features/AnswerSection";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditQuestion from "../../features/EditQuestion";
import useLogin from "../../hooks/useLogin";
import DeleteAlertDialog from "../../features/DeleteQuestionAlerDialog";

const Problem = ({ courseQuestion }) => {
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const { questionId } = useParams();
    useEffect(() => {
        if (courseQuestion) {
            setCurrentQuestion(courseQuestion);
        } else {
            fetchData(questionId);
        }
    }, [courseQuestion, questionId]);

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
    };

    const handleEditClick = () => {
        setShowEditPopup(true);
    };

    const handleClose = () => {
        setShowEditPopup(false);
    };

    const handleSave = (updatedQuestion) => {
        setCurrentQuestion(updatedQuestion);
        setShowEditPopup(false);
    };

    const handleDeleteClick = () => {
        setShowDeletePopup(true);
    };

    const handleDeleteClose = () => {
        setShowDeletePopup(false);
    };

    const isAdmin = (useLogin().data.user.role === "admin");

    return (
        <>
            {isAdmin && (
                <>
                    <button className="mt-3 mx-4" onClick={handleEditClick}>עריכת שאלה</button>
                    {showEditPopup && (
                        <EditQuestion
                            question={currentQuestion}
                            questionId={questionId}
                            onClose={handleClose}
                            onSave={handleSave}
                        />
                    )}
                    <button className="mt-3 mx-4" onClick={handleDeleteClick}>מחיקת שאלה</button>
                    {showDeletePopup && <DeleteAlertDialog onClose={handleDeleteClose} />}
                </>
            )}
            <div className="d-flex justify-content-around my-4">
                <Question currentQuestion={currentQuestion} />
                <AnswerSection currentQuestion={currentQuestion} />
            </div>
        </>
    );
};

export default Problem;
