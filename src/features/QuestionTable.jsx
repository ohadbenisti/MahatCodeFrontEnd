import React from "react";
import { Link } from "react-router-dom";
import "./QuestionTable.css"; // ייבוא קובץ ה-CSS

const QuestionTable = ({ questions }) => {
  const tagOptions = {
    string: "מחרוזת",
    class: "מחלקה",
    array: "מערך",
    complexity: "סיבוכיות",
    recursion: "רקורסיה",
    "table-tracking": "טבלת מעקב",
    decoding: "פיענוח קוד",
    numbers: "מספרים",
  };

  const getTagLabel = (tag) => tagOptions[tag] || tag;

  const difficultyOptions = {
    easy: "קל",
    medium: "בינוני",
    hard: "קשה",
  };

  const getDifficultyLabel = (difficulty) => difficultyOptions[difficulty] || difficulty;

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">תיאור השאלה</th>
          <th scope="col">רמת קושי</th>
          <th scope="col">תגיות</th>
          <th scope="col">עריכה</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((question, index) => (
          <tr key={question._id}>
            <th scope="row">{index + 1}</th>
            <td>
              <Link to={`/problem/${question._id}`} style={{ color: "inherit" }}>
                {question.title}
              </Link>
            </td>
            <td className={`difficulty-${question.difficulty}`}>
              {getDifficultyLabel(question.difficulty)}
            </td>
            <td>
              {question.tags?.map((tag) => (
                <span key={tag} className={`tag tag-${tag}`}>
                  {getTagLabel(tag)}
                </span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuestionTable;
