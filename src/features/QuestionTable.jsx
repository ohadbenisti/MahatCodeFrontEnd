import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const QuestionTable = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER}/problem`)
      .then((response) => response.json())
      .then((data) => setQuestions(data.questions))
      .catch((error) =>
        console.error("Error fetching available courses:", error)
      );
  }, []);
  return (
    <table className="table table-striped table-hover container">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" className="col-md-6">
            תיאור השאלה
          </th>
          <th scope="col">רמת קושי</th>
          <th scope="col">תגיות</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((question, index) => (
          <tr key={question._id}>
            <th scope="row">{index + 1}</th>
            <td>
              <Link
                to={`/problem/${question._id}`}
                style={{ color: "inherit" }}
              >
                {question.title}
              </Link>
            </td>
            <td>{question.difficulty}</td>
            <td>{question.tags?.join(", ")}</td>{" "}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default QuestionTable;
