import React, { useContext, useEffect, useState } from "react";
import CoursesComponent from "../../features/Courses";
import QuestionTable from "../../features/QuestionTable";
import Filter from "../../features/Filter";
import useLogin from "../../hooks/useLogin";

const Content = () => {
  const [filter, setFilter] = useState("");
  const userInfo = useLogin()

  return (
    <div className="container ">
      <h2>קורסים</h2>
      <CoursesComponent />
      <h2>שאלות</h2>
      <div className="my-4">
        <Filter setFilter={setFilter} />
        <QuestionTable filter={filter} />
      </div>
    </div>
  );
};

export default Content;
