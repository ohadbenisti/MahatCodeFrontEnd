import React from "react";

const Question = ({ currentQuestion }) => {
  const { testYear, testSeason, testSeasonNum, partOfTheTest, numberOfQuestion } = currentQuestion.questionSource || {};

  const tagOptions = [
    { tag: "string", label: "מחרוזת" },
    { tag: "class", label: "מחלקה" },
    { tag: "array", label: "מערך" },
    { tag: "complexity", label: "סיבוכיות" },
    { tag: "recursion", label: "רקורסיה" },
    { tag: "table-tracking", label: "טבלת מעקב" },
    { tag: "decoding", label: "פיענוח קוד" },
  ];

  const getTagLabel = (tagId) => {
    const tagOption = tagOptions.find((option) => option.tag === tagId);
    return tagOption ? tagOption.label : tagId;
  };

  const { difficulty } = currentQuestion;
  const difficultyHeb = (difficulty) => {
    return difficulty === "easy" ? "קל" : difficulty === "medium" ? "בינוני" : "קשה";
  };

  return (
    <div className="col-md-5" style={{ whiteSpace: "pre-wrap" }}>
      <h3>{currentQuestion.title}</h3>
      {testYear && testSeason && testSeasonNum && (
        <h6>
          מבחן : שנת {testYear} - {testSeason} מועד {testSeasonNum}
        </h6>
      )}
      {partOfTheTest && numberOfQuestion && (
        <h6>
          חלק {partOfTheTest} שאלה {numberOfQuestion}
        </h6>
      )}
      <h6>רמת קושי: {difficultyHeb(difficulty)}</h6>
      {currentQuestion.description}
      <div className="tags">
        {currentQuestion.tags && currentQuestion.tags.map((tag) => (
          <span key={tag} className={`tag tag-${tag}`}>
            #{getTagLabel(tag)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Question;
