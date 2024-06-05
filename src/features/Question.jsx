import React from "react";

const Question = ({ currentQuestion }) => {
  const { testYear, testSeason, testSeasonNum, partOfTheTest, numberOfQuestion } = currentQuestion.questionSource || {};

  return (
    <div className="col-md-5" style={{ whiteSpace: "pre-wrap" }}>
      <h3>{currentQuestion.title}</h3>
      {testYear && testSeason && testSeasonNum && (
        <h6>
          מבחן : שנת {testYear} - {testSeason} מועד {testSeasonNum}'
        </h6>
      )}
      {partOfTheTest && numberOfQuestion &&(
        <h6>
          חלק {partOfTheTest}'    שאלה {numberOfQuestion}
        </h6>
      )}

      {currentQuestion.description}
    </div>
  );
};

export default Question;