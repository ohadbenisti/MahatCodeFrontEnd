import React, { useEffect, useState } from "react";

const QuestionTable = () => {
  const [questions, setQuestions] = useEffect();
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">תיאור השאלה</th>
          <th scope="col">רמת קושי</th>
          <th scope="col">תגיות</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </table>
  );
};

export default QuestionTable;
