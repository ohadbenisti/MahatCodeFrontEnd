import React, { useState } from "react";
import CoursesComponent from "../../features/Courses";
import QuestionTable from "../../features/QuestionTable";
import FilteredQuestions from "../../features/FilteredQuestions";
import useLogin from "../../hooks/useLogin";
import TypeEffect from "./TypeEffect";
import "./Content.css"; // ייבוא של קובץ ה-CSS

const Content = () => {
  const [filter, setFilter] = useState("");
  const userInfo = useLogin();

  return (
    <div className="content-background">
      <div className="content-body">
        <div className="container">
          <TypeEffect />
          <h2 className="title">תכנית לימוד</h2>
          <CoursesComponent />
          <h2 className="title"></h2>
          <div className="my-4">
            <FilteredQuestions setFilter={setFilter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
