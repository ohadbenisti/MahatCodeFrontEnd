import React, { useState } from "react";
import CoursesComponent from "../../features/Courses";
import QuestionTable from "../../features/QuestionTable";

const Content = () => {
  const [filter, setFilter] = useState("");
  return (
    <div>
      <h2>Courses available:</h2>
      <CoursesComponent />
      {/* <Filter setFilter={setFilter} /> */}
      <QuestionTable filter={filter} />
    </div>
  );
};

export default Content;
