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
    { tag: "numbers", label: "מספרים" },
  ];

  const getTagLabel = (tagId) => {
    const tagOption = tagOptions.find((option) => option.tag === tagId);
    return tagOption ? tagOption.label : tagId;
  };

  const { difficulty } = currentQuestion;

  const difficultyHeb = (difficulty) => {
    let iconCount;
    let color;

    switch (difficulty) {
      case 'easy':
        iconCount = 1;
        color = 'yellow';
        break;
      case 'medium':
        iconCount = 2;
        color = 'green';
        break;
      case 'hard':
        iconCount = 3;
        color = 'red';
        break;
      default:
        iconCount = 0;
        color = 'black';
    }

    const icons = Array(iconCount).fill(null).map((_, index) => (
      <i key={index} className="fa-solid fa-pepper-hot fa-lg" style={{ color: color }}></i>
    ));

    return icons;
  };

  return (
    <div className="col-md-5" style={{ whiteSpace: "pre-wrap" }}>
      <div className="font-bold">
        <div className="text-2xl " style={{borderBottom: "solid blue"}}>{currentQuestion.title}</div>
        {testYear && testSeason && testSeasonNum && (
          <div className="text-lg my-1  text-center">
            מבחן : שנת {testYear} - {testSeason} מועד {testSeasonNum}'
          </div>
        )}
        {partOfTheTest && numberOfQuestion && (
          <div className="my-1  text-center">
            חלק {partOfTheTest}'   שאלה {numberOfQuestion}
          </div>
        )}
        <div className="my-1  text-center">רמת קושי: {difficultyHeb(difficulty)}</div>
      </div>
      {currentQuestion.description}
      <div className="tags mt-5">
        {currentQuestion.tags && currentQuestion.tags.map((tag) => (
          <span key={tag} className={`ml-3 tag tag-${tag}`}>
            #{getTagLabel(tag)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Question;
