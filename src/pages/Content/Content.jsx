import React, { useState } from "react";
import CoursesComponent from "../../features/Courses";
import QuestionTable from "../../features/QuestionTable";
import Filter from "../../features/Filter";

const Content = () => {
  const [filter, setFilter] = useState("");
  return (
    <div>
      <h2>Courses available:</h2>
      <CoursesComponent />
      <div className="container my-4">
        <Filter setFilter={setFilter} />
        <QuestionTable filter={filter} />
      </div>
    </div>
  );
};

export default Content;
